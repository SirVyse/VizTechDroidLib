function ObjectHandler()
{
    var Public;

    (function(){
        var Private = 
        {
            //Variables
            m_drawOrder: [],
            m_numLoaded: 0,
            m_numToLoad: 0,
            m_objects: {},
            m_textGroups: {}
        },

        //Function Declarations
        AddObject,
        CalculateBuffers,
        Draw,
        GetObject,
        FinishedLoading,
        LoadObjects,
        SortPriority,
        UpdateObjects;
            
        Public = 
        {
            //Function Definitions         
            AddObject: function(object)
            {
                if(Private.m_objects.hasOwnProperty(object.GetName()))
                {
                    alert("The Object:" + object.GetName() + " cannot be added as one already exists with this name!");
                    return false;
                }
            
                Private.m_objects[object.GetName()] = object;
                Private.m_drawOrder.push(object);
                Private.m_numLoaded++;
                return true;
            },

            AddText: function(text)
            {
                if(Private.m_objects.hasOwnProperty(text.GetName()))
                {
                    alert("The Text:" + text.GetName() + " cannot be added as one already exists with this name!");
                    return false;
                }

                Private.m_objects[text.GetName()] = text;
                Private.m_drawOrder.push(text);
                return true;
            },

            AddTextGroup: function(textGroup)
            {
                if(Private.m_textGroups.hasOwnProperty(textGroup.GetName()))
                {
                    alert("The TextGroup:" + textGroup.GetName() + " cannot be added as one already exists with this name!");
                    return false;
                }

                Private.m_textGroups[textGroup.GetName()] = textGroup;
                Private.m_numLoaded++;
                return true;
            },

            Draw: function()
            {  
                var buffer, i, j;

				for(i = 0; i < Private.m_drawOrder.length; i++)
				{
					buffer = Private.m_drawOrder[i].GetBuffer();

					if(buffer.m_redrawBuffer)
					{
						buffer.m_redrawBuffer = false;
						buffer.ClearRect();

						for(j = buffer.m_startID; j <= buffer.m_endID; j++)
						{
							if(Private.m_drawOrder[j].GetVisible())
							{
								Private.m_drawOrder[j].Draw(buffer.m_context);
							}
						}
						i = buffer.m_endID;
					}
					else
					{
						i = buffer.m_endID;
					}
				}
			},

            FinishedLoading: function()
            {
                if(Private.m_numToLoad === Private.m_numLoaded)
                {
                    return true;
                }
                return false;
            },

            GetObject: function(name)
            {
                if(!Private.m_objects.hasOwnProperty(name))
                {
                    alert("The Object:" + name + " cannot be found in the ObjectHandler!");
                    return false;
                }
                return Private.m_objects[name];
            },

            LoadObjects: function()
            {
                var file = new XMLReader(), objects2D, textGroups, object, textGroup, i;
                file.Open("DATA/Objects.pdt");

                objects2D = file.GetBaseNodes("Object2D");
                textGroups = file.GetBaseNodes("TextGroup");
                Private.m_numToLoad = objects2D.length;
                Private.m_numToLoad += textGroups.length;
            
                for(i = 0; i < objects2D.length; i++)
                {
                    object = new Object2D();
                    object.Load(file.GetBaseNodes("Object2D")[i]);
                    object.SetID(i);
                }

                for(i = 0; i < textGroups.length; i++)
                {
                    textGroup = new TextGroup();
                    textGroup.Load(file.GetBaseNodes("TextGroup")[i]);
                    textGroup.SetID(objects2D.length + i);
                }

                Public.SortPriority();
                return true;
            },

            SortPriority: function()
            {
                var i = 0;

                Private.m_drawOrder.sort(function(a, b)
                {
                    return (a.GetPriority() - b.GetPriority());
                }); 
               
                TheEngine.Instance().ResetBuffers();
                    
                for(i = 0; i < Private.m_drawOrder.length; i++)
                {
                    Private.m_drawOrder[i].SetDrawOrder(i);
                }  
            },

            UpdateObjects: function(deltaTime)
            {
                var i = 0;
                for(i = 0; i < Private.m_drawOrder.length; i++)
                {
                    Private.m_drawOrder[i].Update(deltaTime);
                }   
            }
        };
    }());

    if(ObjectHandler.m_instance === undefined)
    {
        ObjectHandler.m_instance = Public;
    }

    this.Instance = function()
    {
        return ObjectHandler.m_instance;
    };
}

var TheObjectHandler = new ObjectHandler();