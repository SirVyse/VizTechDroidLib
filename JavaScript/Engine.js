//Determine Request Animation Frame To Use
(function(){
    var lastTime = 0, vendors = ['ms', 'moz', 'webkit', 'o'], x = 0;
    
    for(x = 0; x < vendors.length && !window.requestAnimationFrame; x++)
    {
        window.requestAnimationFrame = window[vendors[x]+'RequestAnimationFrame'];
        window.cancelAnimationFrame = window[vendors[x]+'CancelAnimationFrame'] || window[vendors[x]+'CancelRequestAnimationFrame'];
    }

    if(!window.requestAnimationFrame)
    {
        window.requestAnimationFrame = function(callback)
        {
            var currTime = new Date().getTime(), timeToCall, id;
            timeToCall = Math.max(0, 16 - (currTime - lastTime));
            id = window.setTimeout(function(){callback(currTime + timeToCall);}, timeToCall);
            lastTime = currTime + timeToCall;
            return id;
        };
    }

    if(!window.cancelAnimationFrame)
    {
        window.cancelAnimationFrame = function(id){
           clearTimeout(id);
        };
    }
}()); 

function RenderBuffer(priority, div)
{
    this.m_canvas = document.createElement('canvas');
    this.m_canvas.id = "GameCanvas" + priority;
    div.appendChild(this.m_canvas);
    $("#GameCanvas" + priority).css({position: "absolute", width: "100%", height: "100%", zIndex: priority});
    this.m_context = this.m_canvas.getContext && this.m_canvas.getContext('2d');

    this.m_priority = priority;
    this.m_height = TheEngine.Instance().GetScreenHeight();
    this.m_width = TheEngine.Instance().GetScreenWidth();

    this.m_canvas.width = this.m_width;
    this.m_canvas.height = this.m_height;

    this.m_redrawBuffer = true;
    this.m_startID = -1;
    this.m_endID = -1;

    this.AlterBounds = function(drawOrder)
    {
        if(this.m_startID === -1)
        {
            this.m_startID = drawOrder;
            this.m_endID = drawOrder;
            this.m_redrawBuffer = true;
        }
        else if(drawOrder < this.m_startID)
        {
            this.m_startID = drawOrder;
            this.m_redrawBuffer = true;
        }
        else if(drawOrder > this.m_endID)
        {
            this.m_endID = drawOrder;
            this.m_redrawBuffer = true;
        }
    }

    this.m_left = this.m_canvas.width;
    this.m_top = this.m_canvas.height;
    this.m_right  = 0;
    this.m_bottom = 0;
    this.m_isDirty = false;

    this.AddDirtyRect = function(x, y, width, height)
    {
        var left = x;
        var right = x + width;
        var top = y;
        var bottom = y + height;
        this.m_left   = left < this.m_left ? left : this.m_left;
        this.m_right  = right > this.m_right ? right : this.m_right;
        this.m_top    = top < this.m_top ? top : this.m_top;
        this.m_bottom = bottom > this.m_bottom ? bottom : this.m_bottom;
        
        this.m_isDirty = true;        
    };

    this.ClearRect = function()
    {
        if(!this.m_isDirty)
        {
            return;
        }
        
        this.m_context.setTransform(1, 0, 0, 1, 0, 0);
        this.m_context.clearRect(this.m_left, this.m_top, this.m_right - this.m_left, this.m_bottom - this.m_top);
        
        this.m_left = this.m_canvas.width;
        this.m_top = this.m_canvas.height;
        this.m_right = 0;
        this.m_bottom = 0;
        this.m_isDirty = false;
    }
}

function Engine()
{
    var Public;
    (function(){
        var Private = 
        {
            //Variables
            m_applicationName: "Project Game",
            m_buffers : [],
            m_div : 0,
            m_loading: true,
            m_maxScreenHeight: 600,
            m_maxScreenWidth: 800,
			m_processManager: new ProcessManager(),
            m_running: true,
            m_screenHeight: 0,
            m_screenWidth: 0,
            m_stateManager: new StateManager(),
            m_systemTimer: new Timer()
        },
            
        //Function Declarations
        AddBuffer,
        AddState,
        GetBuffer,
        GetContext,
		GetDiv,
		GetProcessManager,
        GetScreenHeight,
        GetScreenWidth,
        GetStateManager,
        HandleResize,
        HasBuffer,
        Initialize,
        IsLoading,
        IsRunning,
        ResetBuffers,
        Run,
        Shutdown,
        StatePrevious,
        StateTransition;

        Public = 
        {
            //Function Definitions
            AddBuffer: function(priority)
            {
                if(Private.m_buffers[priority] === undefined)
                {
                    Private.m_buffers[priority] = new RenderBuffer(priority, Private.m_div);
                }
                return Private.m_buffers[priority];
            },

            AddState: function(state)
            {
                return Private.m_stateManager.AddState(state);
            }, 

            GetContext: function()
            {
                return Private.m_context;
            },

			GetDiv: function()
			{
				return Private.m_div;
			},
			
			GetProcessManager: function()
			{
				return Private.m_processManager;
			},
			
            GetScreenHeight: function()
            {
                return Private.m_screenHeight;
            },

            GetScreenWidth: function()
            {
                return Private.m_screenWidth;
            },

            GetStateManager: function()
            {
                return Private.m_stateManager;
            },

            GetSystemTimer: function()
            {
                return Private.m_systemTimer;
            },

            HandleResize: function()
            {
                //InnerWidth & InnerHeight Does Not Support < IE9
                var widthToHeight = Private.m_maxScreenWidth / Private.m_maxScreenHeight,
                newWidth = window.innerWidth,
                newHeight = window.innerHeight,
                newWidthToHeight, i;
                    
                newWidthToHeight = newWidth / newHeight;

                for(i = 0; i < Private.m_buffers.length; i++)
                {
                    if(Private.m_buffers[i] !== undefined)
                    {
                        if(newWidthToHeight > widthToHeight)
                        {
                            newWidth = newHeight * widthToHeight;
                            Private.m_buffers[i].m_canvas.style.height = newHeight + "px";
                            Private.m_buffers[i].m_canvas.style.width = newWidth + "px";
                        }
                        else
                        {
                            newHeight = newWidth / widthToHeight;
                            Private.m_buffers[i].m_canvas.style.height = newHeight + "px";
                            Private.m_buffers[i].m_canvas.style.width = newWidth + "px";
                        }

                        Private.m_buffers[i].m_canvas.style.marginTop = (-newHeight / 2) + "px";
                        Private.m_buffers[i].m_canvas.style.marginLeft = (-newWidth / 2) + "px";
                
                        Private.m_buffers[i].m_canvas.width = Private.m_maxScreenWidth;
                        Private.m_buffers[i].m_canvas.height = Private.m_maxScreenHeight;
                        Private.m_buffers[i].m_redrawBuffer = true;
                    }
                }
				TheInput.Instance().SetTouchArea(newHeight, newWidth);
            },

            Initialize: function(applicationName)
            {
                Private.m_screenHeight = Private.m_maxScreenHeight;
                Private.m_screenWidth = Private.m_maxScreenWidth;
                Private.m_applicationName = applicationName;
                window.document.title = applicationName;

                var metaTag = document.createElement('meta');
                metaTag.name = "viewport";
                metaTag.id = "viewport";
                metaTag.content = "width=device-width, height=device-height, initial-scale=1.0, maximum-scale=1.0, minimum-scale=1.0, user-scalable=no";
                document.getElementsByTagName('body')[0].appendChild(metaTag);

                Private.m_div = document.createElement('div');
                Private.m_div.id = "Container";
                document.getElementsByTagName('body')[0].appendChild(Private.m_div);
                $("#Container").css({position: "absolute", left: "50%", top: "50%"});

                (function()
                {
                    //Wait till document is ready
                    if(document.readyState !== "complete")
                    {
                        var tid = setInterval(function()
                        {
                            if(document.readyState !== "complete")
                            {
                                return;
                            }
                            clearInterval(tid);
                            Public.HandleResize();
                        }, 100);   
                    }
                    else
                    {
                        Public.HandleResize();
                    }              
                }());

                $(window).bind('resize', Public.HandleResize);
                $(window).bind('orientationchange', Public.HandleResize);
                    
                //Stops touch screen controls
                $(document).on('touchStart', function(event)
                {
                    event.preventDefault();
                });

                $(document).on('touchMove', function(event)
                {
                    event.preventDefault();
                });

				TheInput.Instance().Initialize();
                Private.m_systemTimer.Start();
            },

            IsLoading: function()
            {
                return Private.m_loading;
            },

            IsRunning: function()
            {
                return Private.m_running;
            },

            ResetBuffers: function()
            {
                var i = 0;
                for(i = 0; i < Private.m_buffers.length; i++)
                {
                    if(Private.m_buffers[i] !== undefined)
                    {
                        Private.m_buffers[i].m_startID = -1;
                        Private.m_buffers[i].m_endID = -1;
                    }
                }
            },

            Run: function(stateName, SetupCallback)
            {
                Private.m_loading = false;
                Private.m_running = true;

				Private.m_stateManager.SetCurrentState(stateName);
                TheTextureManager.Instance().LoadTextures();            

                var timerID = setInterval(function()
                {
                    if(TheTextureManager.Instance().FinishedLoading())
                    {
                        TheObjectHandler.Instance().LoadObjects();     
                        Public.HandleResize();                       
                        clearInterval(timerID);
						
						SetupCallback();
						
						Private.m_stateManager.GetCurrentState().Enter();
                        
                        /*for(var i = 0; i < 5; i++)
                        {           
                            var a = TheObjectHandler.Instance().GetObject("E_Reel1").GetInstance(i);
                            var b = a.GetVelocity();
                            b.m_y = -1000; 
                            a.SetVelocity(b);
                        }*/

                        Run = function()
                        {
                            if(Private.m_running)
                            {
                                requestAnimationFrame(Run);
                            }

                            Private.m_systemTimer.Update();
                            Private.m_stateManager.GetCurrentState().Update();  
							Private.m_processManager.UpdateProcesses();
                        
                            /*for(var i = 0; i < 5; i++)
                            {           
                                var a = TheObjectHandler.Instance().GetObject("E_Reel1").GetInstance(i);
                                var position = a.GetPosition();
                                
                                if(position.m_y > 1069)
                                {
                                    position.m_y = -51;
                                    var random = Math.floor(Math.random() * (4 - 0 + 1)) + 0;
                                    a.SetCurrentSprite(random);
                                }
                                else if(position.m_y > 845)
                                {
                                    a.SetVisible(false);
                                }
                                else if(position.m_y > -51)
                                {
                                    a.SetVisible(true);
                                }
                            }*/

                            TheObjectHandler.Instance().UpdateObjects(Private.m_systemTimer.GetDT());

                            TheObjectHandler.Instance().Draw();

                            TheObjectHandler.Instance().GetObject("DrawName").SetMessage(Private.m_systemTimer.GetFPS() + "");      
                        };
                        requestAnimationFrame(Run);
                    }
                }, 1000);
            },

            Shutdown: function()
            {
                Private.m_running = false;
            },

            StatePrevious: function()
            {
                return Private.m_stateManager.Rollback();
            },

            StateTransition: function(stateName)
            {
                return Private.m_stateManager.Transition(stateName);
            }
        };
    }());

    if(Engine.m_instance === undefined)
    {
        Engine.m_instance = Public;
    }

    this.Instance = function()
    {
        return Engine.m_instance;
    };
}

var TheEngine = new Engine();