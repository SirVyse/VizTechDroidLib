function AtlasPiece()
{
    this.m_id = 0;
    this.m_name = "DefaultAtlas";
    this.m_texCoord = new Vec4(0.0, 0.0, 0.0, 0.0);
}

function Atlas()
{
    this.m_atlasNames = [];
    this.m_atlasPieces = [];
    this.m_numTextures = 0;

    this.GetAtlasTexCoordByName = function(name)
    {
        var id = this.m_atlasNames.indexOf(name);
        if(id !== -1)
        {
            return this.m_atlasPieces[id].m_texCoord;
        }
        alert("Cannot Retreive TexCoord For " + name + " As It Is Not An Atlas Piece!");
    };

    this.GetAtlasTexCoordByID = function(id)
    {
        if(id < this.m_atlasPieces.length)
        {
            return this.m_atlasPieces[id].m_texCoord;
        }
        alert("Cannot Retreive TexCoord Using ID " + id + " As It Is Not An Atlas Piece!");
    };

    this.GetAtlasPieceID = function(name)
    {
        var id = this.m_atlasNames.indexOf(name);

        if(id !== -1)
        {
            return id;
        }
        alert("Cannot Retreive AtlasPieceID For " + name + " As It Does Not Exist!");
    };

    this.HasAtlasPieceByName = function(name)
    {
        if(this.m_atlasNames.indexOf(name) !== -1)
        {
            return true;
        }
        return false;
    };

    this.HasAtlasPieceByID = function(id)
    {
        if(id < this.m_atlasPieces.length)
        {
            return true;
        }
        return false;
    };
}

function Texture()
{
    var Private;
    (function(){
        Private = 
        {
            //Variables
            m_atlas: 0,
            m_height: 0,
            m_name: "DefaultTexture",
            m_texture: 0,
            m_width: 0
        };
    }());

    //Public Member Functions
    this.GetAtlas = function()
    {
        return Private.m_atlas;
    };

    this.GetHeight = function()
    {
        return Private.m_height;
    };

    this.GetName = function()
    {
        return Private.m_name;
    };
    
    this.GetTexture = function()
    {
        return Private.m_texture;
    };

    this.GetWidth = function()
    {
        return Private.m_width;
    };

    this.HasAtlas = function()
    {
        if(typeof Private.m_atlas !== "object")
        {
            return false;
        }
        return true;
    };

    this.LoadTexture = function(file)
    {
        Private.m_name = file.getAttribute("Filename");
        var atlas = file.getElementsByTagName("Atlas"),
        atlasPieces = file.getElementsByTagName("Piece"),
        filename = "BMP/" + Private.m_name,
        that = this, LoadedCallback, i, atlasPiece;

        Private.m_texture = new Image();

        LoadedCallback = function()
        {
            Private.m_height = Private.m_texture.height;
            Private.m_width = Private.m_texture.width;

            if(typeof Private.m_atlas === "object")
            {
                for(i = 0; i < Private.m_atlas.m_atlasPieces.length; i++)
                {
                    Private.m_atlas.m_atlasPieces[i].m_texCoord.m_x *= Private.m_width;
                    Private.m_atlas.m_atlasPieces[i].m_texCoord.m_y *= Private.m_height;
                    Private.m_atlas.m_atlasPieces[i].m_texCoord.m_z *= Private.m_width;
                    Private.m_atlas.m_atlasPieces[i].m_texCoord.m_w *= Private.m_height;
                }
            }

            TheTextureManager.Instance().AddTexture(that);
        };

        Private.m_texture.onload = function()
        {
            LoadedCallback();
        };

        Private.m_texture.onerror = function()
        {
            alert("Failed to load the texture:" + Private.m_name);
        };

        Private.m_texture.onabort = function()
        {
            alert("Failed to load the texture:" + Private.m_name);
        };

        Private.m_texture.src = filename;
        
        if(atlas.length > 0)
        {
            Private.m_atlas = new Atlas();

            for(i = 0; i < atlasPieces.length; i++)
            {
                atlasPiece = new AtlasPiece();
                atlasPiece.m_name = atlasPieces[i].getAttribute("Name");
                atlasPiece.m_id = i;
                atlasPiece.m_texCoord.m_x = atlasPieces[i].getAttribute("OffsetX");
                atlasPiece.m_texCoord.m_y = atlasPieces[i].getAttribute("OffsetY");
                atlasPiece.m_texCoord.m_z = atlasPieces[i].getAttribute("Width");
                atlasPiece.m_texCoord.m_w = atlasPieces[i].getAttribute("Height");

                if(atlasPiece.m_texCoord.m_x[atlasPiece.m_texCoord.m_x.length - 1] === "f")
                {
                    atlasPiece.m_texCoord.m_x = atlasPiece.m_texCoord.m_x.substr(0, atlasPiece.m_texCoord.m_x.length - 1);
                }

                if(atlasPiece.m_texCoord.m_y[atlasPiece.m_texCoord.m_y.length - 1] === "f")
                {
                    atlasPiece.m_texCoord.m_y = atlasPiece.m_texCoord.m_y.substr(0, atlasPiece.m_texCoord.m_y.length - 1);
                }

                if(atlasPiece.m_texCoord.m_z[atlasPiece.m_texCoord.m_z.length - 1] === "f")
                {
                    atlasPiece.m_texCoord.m_z = atlasPiece.m_texCoord.m_z.substr(0, atlasPiece.m_texCoord.m_z.length - 1);
                }

                if(atlasPiece.m_texCoord.m_w[atlasPiece.m_texCoord.m_w.length - 1] === "f")
                {
                    atlasPiece.m_texCoord.m_w = atlasPiece.m_texCoord.m_w.substr(0, atlasPiece.m_texCoord.m_w.length - 1);
                }

                Private.m_atlas.m_atlasNames.push(atlasPiece.m_name);
                Private.m_atlas.m_atlasPieces.push(atlasPiece);
                Private.m_atlas.m_numTextures++;
            }
        }
    };

    this.SetName = function(textureName)
    {
        Private.m_name = textureName;
    };

    this.SetUpAtlas = function(file)
    {
        return file;
    };
}