function TextGroup()
{
    var Private;
    (function(){
        Private = 
        {
            //Variables
            m_id: 0,
            m_name: "DefaultTextGroup",
            m_priority: 0,
            m_texture: 0,
            m_textMap: {},
            m_visible: true
        };
    }());
  
    this.GetID = function()
    {
        return Private.m_id;
    };
    
    this.GetName = function()
    {
        return Private.m_name;
    };

    this.GetNumberOfTexts = function()
    {
        return Private.m_textMap.length;
    };
    
    this.GetPriority = function()
    {
        return Private.m_priority;
    };

    this.GetText = function(textName)
    {
        if(!Private.m_textMap.hasOwnProperty(textName))
        {
            alert("The Text:" + textName + " cannot be found in the TextGroup:" + Private.m_name);
            return false;
        }
        return Private.m_textMap[textName];
    };

    this.GetTexture = function()
    {
        return Private.m_texture;
    };

    this.GetVisible = function()
    {
        return Private.m_visible;
    };

    this.HasText = function(textName)
    {
        if(!Private.m_textMap.hasOwnProperty(textName))
        {
            return false;
        }
        return true;
    };

    this.Load = function(file)
    {
        var settings = file.getElementsByTagName("Settings"),
        textures = file.getElementsByTagName("Texture"),
        text = file.getElementsByTagName("Text"), i, newText;

        Private.m_name = settings[0].getAttribute("Name");

        if(settings[0].hasAttribute("Priority"))
        {
            Private.m_priority = ConvertInt(settings[0].getAttribute("Priority"));
        }
        
        if(settings[0].hasAttribute("Visible"))
        {
            Private.m_visible = ConvertBool(settings[0].getAttribute("Visible"));
        }

        Private.m_texture = TheTextureManager.Instance().GetTextureClass(textures[0].getAttribute("Texture1"));

        for(i = 0; i < text.length; i++)
        {
             newText = new Text(this);
             newText.Load(text[i]);
        }

        TheObjectHandler.Instance().AddTextGroup(this);
    };

    this.SetID = function(id)
    {
        Private.m_id = id;
    };

    this.SetName = function(name)
    {
        Private.m_name = name;
    };

    this.SetPriority = function(priority)
    {
        Private.m_priority = priority;
        TheObjectHandler.Instance().SortPriority();
    };

    this.SetTexture = function(texture)
    {
        Private.m_texture = texture;
    };

    this.SetVisible = function(visible)
    {
        Private.m_visible = visible;
    };
}