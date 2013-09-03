function Character()
{
    var Private;
    (function(){
        Private = 
        {
            //Variables
            m_currentSprite: 0,
            m_position: new Vec2(0.0, 0.0)
        };
    }());

    this.GetCurrentSprite = function()
    {
        return Private.m_currentSprite;
    };

    this.GetPosition = function()
    {
        return Private.m_position;
    };

    this.SetCurrentSprite = function(currentSprite)
    {
        Private.m_currentSprite = currentSprite;
    };

    this.SetPosition = function(position)
    {
        Private.m_position = position;
    };
}

function Text(parent)
{
    var Private;
    (function(){
        Private = 
        {
            //Variables
            m_alignment: "Centre",
            m_buffer: 0,
            m_characters: [],
            m_drawOrder: 0,
            m_force: new Vec2(0.0, 0.0),
            m_forceUpdate: true,
            m_lastAcceleration: new Vec2(0.0, 0.0),
            m_message: "Message",
            m_name: "DefaultText",
            m_parent: parent,
            m_position: new Vec2(0.0, 0.0),
            m_priority: 0,
            m_rotationAroundZ: 0.0,
            m_scale: new Vec2(1.0, 1.0),
            m_spacing: 1.0,
            m_stringLength: 0.0,
            m_velocity: new Vec2(0.0, 0.0),
            m_visible: true
        };
    }());

    this.CalculateStringLength = function()
    {
        Private.m_stringLength = 0.0;
        var atlas = Private.m_parent.GetTexture().GetAtlas(), i, pieceCoords, width;

        for(i = 0; i < Private.m_message.length; i++)
        {
            pieceCoords = atlas.GetAtlasTexCoordByName(Private.m_message[i]);
            width = pieceCoords.m_z;

            if(!i)
            {
                Private.m_stringLength += width * Private.m_scale.m_x;
            }
            else
            {
                Private.m_stringLength += ((width + Private.m_spacing) * Private.m_scale.m_x);
            }
        }
    };

    this.Draw = function(context)
    {
        if(Private.m_parent.GetVisible())
        {
            var atlas = Private.m_parent.GetTexture().GetAtlas(), texture = Private.m_parent.GetTexture(),  coords, i;
            for(i = 0; i < Private.m_characters.length; i++)
            {
                coords = atlas.GetAtlasTexCoordByID(Private.m_characters[i].GetCurrentSprite());
                context.setTransform(Private.m_scale.m_x, 0.0, 0.0, Private.m_scale.m_y, Private.m_characters[i].GetPosition().m_x, Private.m_characters[i].GetPosition().m_y);
                context.rotate(Private.m_rotationAroundZ);
                context.drawImage(texture.GetTexture(), coords.m_x, coords.m_y, coords.m_z, coords.m_w, 0, 0, coords.m_z, coords.m_w);
                Private.m_buffer.AddDirtyRect(Private.m_characters[i].GetPosition().m_x, Private.m_characters[i].GetPosition().m_y, Private.m_scale.m_x * coords.m_z, Private.m_scale.m_y * coords.m_w);
            }
        }
    };

    this.GetBuffer = function()
    {
        return Private.m_buffer;
    };

    this.GetCharacter = function(id)
    {
        if(Private.m_characters[id] === undefined)
        {
            alert("The character going by ID " + id + " does not exist in the Text object " + Private.m_name);
        }
        return Private.m_characters[id];
    };

    this.GetDrawOrder = function()
    {
        return Private.m_drawOrder;
    };

    this.GetForce = function()
    {
        return Private.m_force;
    };
    
    this.GetMessage = function()
    {
        return Private.m_message;
    };

    this.GetName = function()
    {
        return Private.m_name;
    };

    this.GetNumCharacters = function()
    {
        return Private.m_characters.length();
    };

    this.GetPosition = function()
    {
        return Private.m_position;
    };
    
    this.GetPriority = function()
    {
        return Private.m_parent.GetPriority();
    };

    this.GetRotationAroundZ = function()
    {
        return Private.m_rotationAroundZ;
    };

    this.GetScale = function()
    {
        return Private.m_scale;
    };

    this.GetStringLength = function()
    {
        return Private.m_stringLength;
    };

    this.GetTexture = function()
    {
        return Private.m_parent.GetTexture();
    };

    this.GetVelocity = function()
    {
        return Private.m_velocity;
    };

    this.GetVisible = function()
    {
        return Private.m_visible;
    };

    this.Load = function(file)
    {
        var settings = file.getElementsByTagName("Settings"),
        position = file.getElementsByTagName("Position"),
        scale = file.getElementsByTagName("Scale"),
        rotation = file.getElementsByTagName("Rotation"),
        spacing = file.getElementsByTagName("Spacing"),
        message = file.getElementsByTagName("Message"),
        messageToSet = "";

        Private.m_name = settings[0].getAttribute("Name");

        if(settings[0].hasAttribute("Alignment"))
        {
            Private.m_alignment = settings[0].getAttribute("Alignment");
        }
        
        if(settings[0].hasAttribute("Visible"))
        {
            Private.m_visible = ConvertBool(settings[0].getAttribute("Visible"));
        }

        if(position.length)
        {
            Private.m_position.m_x = ConvertFloat(position[0].getAttribute("x"));
            Private.m_position.m_y = ConvertFloat(position[0].getAttribute("y"));
        }

        if(scale.length)
        {
            Private.m_scale.m_x = ConvertFloat(scale[0].getAttribute("x"));
            Private.m_scale.m_y = ConvertFloat(scale[0].getAttribute("y"));
        }

        if(rotation.length)
        {
            Private.m_rotationAroundZ = ConvertFloat(rotation[0].getAttribute("AroundZ"));
        }
        
        if(spacing.length)
        {
            Private.m_spacing = ConvertFloat(spacing[0].getAttribute("Amount"));
        }

        if(message.length)
        {
            messageToSet = message[0].innerHTML;
        }

        this.SetMessage(messageToSet);
        Private.m_buffer = TheEngine.Instance().AddBuffer(Private.m_parent.GetPriority());
        TheObjectHandler.Instance().AddText(this);
    };

    this.SetDrawOrder = function(drawOrder)
    {
        Private.m_drawOrder = drawOrder;

        if(Private.m_buffer.m_priority !== Private.m_parent.GetPriority())
        {
            Private.m_buffer = TheEngine.Instance().AddBuffer(Private.m_parent.GetPriority());
        }

        Private.m_buffer.AlterBounds(drawOrder);
    };

    this.SetForce = function(force)
    {
        Private.m_force = force;
        Private.m_forceUpdate = true;
    };

    this.SetForceUpdate = function(forceUpdate)
    {
        Private.m_forceUpdate = forceUpdate;
    };

    this.SetMessage = function(message)
    {
        var i = 0, character, atlas = Private.m_parent.GetTexture().GetAtlas();

        if(message === undefined)
        {
            return false;
        }

        if(message === Private.m_message)
        {
            return false;
        }

        Private.m_message = message;

        count = Private.m_characters.length - 1;
        while(Private.m_characters.length)
        {
            delete Private.m_characters[count];
            Private.m_characters.pop();
            count--;
        }  

        for(i = 0; i < Private.m_message.length; i++)
        {
            character = new Character();
            character.SetCurrentSprite(atlas.GetAtlasPieceID(Private.m_message[i]));
            Private.m_characters.push(character);
        }

        this.CalculateStringLength();
        Private.m_forceUpdate = true;
    };

    this.SetName = function(name)
    {
        Private.m_name = name;
    };

    this.SetPosition = function(position)
    {
        Private.m_position = position;
        Private.m_forceUpdate = true;
    };

    this.SetRotationAroundZ = function(rotationAroundZ)
    {
        Private.m_rotationAroundZ = rotationAroundZ;
        Private.m_forceUpdate = true;
    };

    this.SetScale = function(scale)
    {
        Private.m_scale = scale;
        Private.m_forceUpdate = true;
    };

    this.SetSpacing = function(spacing)
    {
        Private.m_spacing = spacing;
        this.CalculateStringLength();
        Private.m_forceUpdate = true;
    };

    this.SetVelocity = function(velocity)
    {
        Private.m_velocity = velocity;
        Private.m_lastAcceleration.m_x = 0.0;
        Private.m_lastAcceleration.m_y = 0.0;
        Private.m_forceUpdate = true;
    };

    this.SetVisible = function(visible)
    {
        Private.m_visible = visible;
        Private.m_forceUpdate = true;
    };


    this.Update = function(deltaTime)
    {
        if(Private.m_visible && Private.m_forceUpdate && Private.m_parent.GetVisible())
        {
            var newAcceleration, avgAcceleration;

            Private.m_buffer.m_redrawBuffer = true
            Private.m_forceUpdate = false;
            
            Private.m_position.m_x += Private.m_velocity.m_x * deltaTime + (0.5 * Private.m_lastAcceleration.m_x * deltaTime * deltaTime);
            Private.m_position.m_y += Private.m_velocity.m_y * deltaTime + (0.5 * Private.m_lastAcceleration.m_y * deltaTime * deltaTime);
            newAcceleration = Vec2Divide(Private.m_force, 1.0); //Mass
			avgAcceleration = Vec2Add(Private.m_lastAcceleration, newAcceleration);
			avgAcceleration.Divide(2);
			avgAcceleration.Multiply(deltaTime);
            Private.m_velocity.Add(avgAcceleration);
            Private.m_lastAcceleration = newAcceleration;

            delete newAcceleration;
            delete avgAcceleration;

            Private.m_force.m_x = 0.0;
            Private.m_force.m_y = 0.0;

            if(Vec2LengthSq(Private.m_velocity) > 0.00001)
            {
                Private.m_forceUpdate = true;
            }

            this.UpdateTextMatrix();

            return true;
        }
        return false;
    };

    this.UpdateTextMatrix = function()
    {
        var currentPosition = new Vec2(Private.m_position.m_x, Private.m_position.m_y),
        atlas = Private.m_parent.GetTexture().GetAtlas(),
        originalXPos = 0.0, i, pieceCoord, height, width, centre, newPosition, spacing;

        for(i = 0; i < Private.m_message.length; i++)
        {
            pieceCoord = atlas.GetAtlasTexCoordByName(Private.m_message[i]);
            height = pieceCoord.m_w;
            width = pieceCoord.m_z;

            if(!i)
            {
                if(Private.m_alignment === "Centre")
                {
                    currentPosition.m_x -= Private.m_stringLength * 0.5;
                }
                originalXPos = currentPosition.m_x;
                currentPosition.m_y -= (height * Private.m_scale.m_y) * 0.5;
            }

            centre = new Vec2(0.0, 0.0);
            if(i)
            {
                centre.m_x = originalXPos - currentPosition.m_x;
            }

            newPosition = new Vec2(currentPosition.m_x, currentPosition.m_y);
            Private.m_characters[i].SetPosition(newPosition);

            spacing = ((width + Private.m_spacing) * Private.m_scale.m_x);
            currentPosition.m_x += spacing;

            delete centre;
            delete newPosition;
        }

        delete currentPosition;
    };
}