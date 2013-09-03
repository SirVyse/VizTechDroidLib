function TextureManager()
{
    var Public;
   
    (function(){
        var Private = 
        {
            //Variables
            m_numLoaded: 0,
            m_numToLoad: 0,
            m_textures: {}
        },
            
        //Function Declarations
        AddTexture,
        FinishedLoading,
        GetNumberOfTextures,
        GetTexture,
        GetTextureClass,    
        GetTextureHeight,
        GetTextureWidth,    
        HasTexture,
        LoadTextures;

        Public = 
        {
            //Function Definitions
            AddTexture: function(texture)
            {
                if(Private.m_textures.hasOwnProperty(texture.GetName()))
                {
                    alert("The Texture:" + texture.GetName() + " cannot be added as one already exists with this name!");
                    return false;
                }

                Private.m_textures[texture.GetName()] = texture;
                Private.m_numLoaded++;
            
                return true;
            },

            FinishedLoading: function()
            {
                if(Private.m_numToLoad === Private.m_numLoaded)
                {
                    return true;
                }
                return false;
            },

            GetNumberOfTextures: function()
            {
                return Private.m_textures.length;
            },

            GetTexture: function(textureName)
            {
                if(!Private.m_textures.hasOwnProperty(textureName))
                {	
                    alert("Cannot retrieve texture:" + textureName + " from TheTextureManager, because it does not exist!");
                    return false;
                }
                return Private.m_textures[textureName].GetTexture();
            },

            GetTextureClass: function(textureName)
            {
                if(!Private.m_textures.hasOwnProperty(textureName))
                {
                    alert("Cannot retrieve texture:" + textureName + " from TheTextureManager, because it does not exist!");
                    return false;
                }
                return Private.m_textures[textureName];
            },

            GetTextureHeight: function(textureName)
            {
                return GetTextureClass(textureName).GetHeight();
            },

            GetTextureWidth: function(textureName)
            {
                return GetTextureClass(textureName).GetWidth();
            },

            HasTexture: function(textureName)
            {
                if(!Private.m_textures.hasOwnProperty(textureName))
                {
                    return false;
                }
                return true;
            },

            LoadTextures: function()
            {
                var file = new XMLReader(), textures, i, texture;
                file.Open("DATA/Textures.pdt");

                textures = file.GetBaseNodes("Texture");
                Private.m_numToLoad = textures.length;

                for(i = 0; i < textures.length; i++)
                {
                    texture = new Texture();
                    texture.LoadTexture(file.GetBaseNodes("Texture")[i]);
                }
                return true;
            }
        };
    }());

    if(TextureManager.m_instance === undefined)
    {
        TextureManager.m_instance = Public;
    }

    this.Instance = function()
    {
        return TextureManager.m_instance;
    };
}

var TheTextureManager = new TextureManager();