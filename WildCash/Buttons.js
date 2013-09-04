function Button()
{
    var Private;
    (function(){
        Private = 
        {
            //Variables
            m_active: true,
            m_buttonPressed: false,
			m_buttonReleased: false,
            m_instance: 0,
			m_isInstance: false,
			m_name: "DefaultButton",
            m_object: 0
        };
    }());

    //Public Member Functions
	this.CheckPressed = function()
	{
		if(Private.m_isInstance)
		{
			return TheInput.Instance().Pick2DInstance(Private.m_object, Private.m_instance);
		}
		else
		{
			return TheInput.Instance().Pick2D(Private.m_object);
		}
	};
	
	this.Clear = function()
	{
		Private.m_buttonReleased = false;
		Private.m_buttonPressed = false;
		
		if(Private.m_isInstance)
		{
			Private.m_instance.SetCurrentSprite(0);
		}
		else
		{
			Private.m_object.SetCurrentSprite(0);
		}
	};
	
	this.GetName = function()
	{
		return Private.m_name;
	};
	
	this.Initialize = function(object, name)
	{
		Private.m_name = name;
		Private.m_object = object;
		
		this.SetActive(false);
	};
	
	this.InitializeInstance = function(object, name, instance)
	{
		Private.m_name = name;
		Private.m_object = object;
		Private.m_isInstance = true;
		Private.m_instance = instance;
		
		this.SetActive(false);
	};
	
	this.IsActive = function()
	{
		return Private.m_active;
	}
	
	this.IsPressed = function()
	{
		return Private.m_buttonPressed;
	}
	
	this.IsReleased = function()
	{
		return Private.m_buttonReleased;
	}
	
	this.Release = function()
	{
		Private.m_buttonPressed = false;
		Private.m_buttonReleased = true;
	};
	
	this.SetActive = function(active)
	{
		if(Private.m_active != active)
		{
			Private.m_active = active;
			
			if(Private.m_active)
			{
				if(Private.m_isInstance)
				{
					Private.m_instance.SetCurrentSprite(0);
				}
				else
				{
					Private.m_object.SetCurrentSprite(0);
				}
			}
			else 
			{
				if(Private.m_isInstance)
				{
					Private.m_instance.SetCurrentSprite(2);
				}
				else
				{
					Private.m_object.SetCurrentSprite(2);
				}
			}
		}
	};
	
	this.SetPressed = function()
	{
		Private.m_buttonPressed = true;
	};
	
	this.TriggerButton = function()
	{
		if(Private.m_isInstance)
		{
			Private.m_instance.SetCurrentSprite(1);
		}
		else
		{
			Private.m_object.SetCurrentSprite(1);
		}
	};
}

function Buttons()
{
    var Public;
   
    (function(){
        var Private = 
        {
            //Variables
            m_buttons: {},
            m_buttonProcessStarted: false
        },
            
        //Function Declarations
        ButtonPressed,
        DisableButtons,
		GetButtonProcessStarted,
        HoldStartButtons,
		Initialize,
        StandbyButtons,    
        SetButtonActivity,
		SetButtonProcessEnded,
		SetButtonProcessStarted,
        UpdateButtons;           

        Public = 
        {
            //Function Definitions
            ButtonPressed: function(name)
            {
                if(Private.m_buttons.hasOwnProperty(name))
				{
					if(Private.m_buttons[name].IsPressed())
					{
						Private.m_buttons[name].Release();
						return true;
					}
				}
				return false;
            },

			DisableButtons: function()
            {
                for(var i in Private.m_buttons)
				{
					Private.m_buttons[i].SetActive(false);
				}
            },
			
			GetButtonProcessStarted: function()
            {
                return Private.m_buttonProcessStarted;
            },
			
			HoldStartButtons: function()
            {
				for(var i in Private.m_buttons)
				{
					Private.m_buttons[i].SetActive(true);
				}
            },
			
			Initialize: function()
            {
                var startButton = new Button();
				startButton.Initialize(TheObjectHandler.Instance().GetObject("E_Start"), "Start");
				Private.m_buttons[startButton.GetName()] = startButton;
				
				var menuButton = new Button();
				menuButton.Initialize(TheObjectHandler.Instance().GetObject("E_Menu"), "Menu");
				Private.m_buttons[menuButton.GetName()] = menuButton;
				
				var stakeButton = new Button();
				stakeButton.Initialize(TheObjectHandler.Instance().GetObject("E_Stake"), "Stake");
				Private.m_buttons[stakeButton.GetName()] = stakeButton;
				
				var autoplayButton = new Button();
				autoplayButton.Initialize(TheObjectHandler.Instance().GetObject("E_Autoplay"), "Autoplay");
				Private.m_buttons[autoplayButton.GetName()] = autoplayButton;
				
				var infoButton = new Button();
				infoButton.Initialize(TheObjectHandler.Instance().GetObject("E_Info"), "Info");
				Private.m_buttons[infoButton.GetName()] = infoButton;
				
				var collectButton = new Button();
				collectButton.Initialize(TheObjectHandler.Instance().GetObject("E_Collect"), "Collect");
				Private.m_buttons[collectButton.GetName()] = collectButton;
            },
			
			StandbyButtons: function()
            {
                //Fill When Standby
            },
			
			SetButtonActivity: function(active, name)
            {
                if(Private.m_buttons.hasOwnProperty(name))
				{
					Private.m_buttons[name].SetActive(active);
				}
            },
			
			SetButtonProcessEnded: function()
            {
                Private.m_buttonProcessStarted = false;
            },
			
			SetButtonProcessStarted: function()
            {
                Private.m_buttonProcessStarted = true;
            },
			
			UpdateButtons: function()
            {
                if(Private.m_buttonProcessStarted)
				{
					return;
				}
				
				if(TheInput.Instance().IsTouched())
				{
					for(var i in Private.m_buttons)
					{
						var button = Private.m_buttons[i];
						
						if(button.IsActive())
						{
							if(button.CheckPressed())
							{
								var process = new ButtonProcess(button);
								TheEngine.Instance().GetProcessManager().AddProcessToList(process);
								Private.m_buttonProcessStarted = true;
								return;
							}
						}
					}
				}
            }
        };
    }());

    if(Buttons.m_instance === undefined)
    {
        Buttons.m_instance = Public;
    }

    this.Instance = function()
    {
        return Buttons.m_instance;
    };
}

var TheButtons = new Buttons();