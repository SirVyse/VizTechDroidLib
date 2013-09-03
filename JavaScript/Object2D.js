function SpriteSheetControl(loop, incrementTime, beginID, endID)
{
    this.m_beginID = beginID;
    this.m_endID = endID;
    this.m_incrementTime = incrementTime;
    this.m_loop = loop;
    this.m_timeSinceLastIncrement = 0.0;
}

function Object2D()
{
    var Private;
    (function(){
        Private = 
        {
            //Variables
            m_buffer: 0,
            m_currentSprite: 0,
            m_drawOrder: 0,
            m_force: new Vec2(0.0, 0.0),
            m_forceUpdate: true,
            m_highestInstanceID: 0,
            m_id: 0,
            m_instances: [],
            m_lastAcceleration: new Vec2(0.0, 0.0),
            m_name: "DefaultObject",
            m_position: new Vec2(0.0, 0.0),
            m_priority: 0,
            m_rotationAcceleration: 0.0,
            m_rotationAroundZ: 0.0,
            m_rotationVelocity: 0.0,
            m_scale: new Vec2(1.0, 1.0),
            m_spriteSheetControl: 0,
            m_texture: 0,
            m_velocity: new Vec2(0.0, 0.0),
            m_visible: true
        };
    }());

    this.AddAnInstance = function(instance)
    {
        if(Private.m_instances[instance.GetInstanceID()] === undefined)
        {
            Private.m_instances[instance.GetInstanceID()] = instance;
            Private.m_highestInstanceID = Max(instance.GetInstanceID(), Private.m_highestInstanceID);
            Private.m_forceUpdate = true;
        }
    };

    this.Draw = function(context)
    {
        var atlas = Private.m_texture.HasAtlas(), coords, i;

        if(atlas)
        {
            atlas = Private.m_texture.GetAtlas();
        }
        else
        {
            atlas = 0;
        }

        if(!Private.m_instances.length)
        {
            context.setTransform(Private.m_scale.m_x, 0.0, 0.0, Private.m_scale.m_y, Private.m_position.m_x, Private.m_position.m_y);
            context.rotate(Private.m_rotationAroundZ);

            if(typeof atlas !== "object")
            {
                context.drawImage(Private.m_texture.GetTexture(), 0, 0);
                Private.m_buffer.AddDirtyRect(Private.m_position.m_x, Private.m_position.m_y, Private.m_scale.m_x * Private.m_texture.GetWidth(), Private.m_scale.m_y * Private.m_texture.GetHeight());
            }
            else
            {   
                coords = atlas.GetAtlasTexCoordByID(Private.m_currentSprite);
                context.drawImage(Private.m_texture.GetTexture(), coords.m_x, coords.m_y, coords.m_z, coords.m_w, 0, 0, coords.m_z, coords.m_w);
                Private.m_buffer.AddDirtyRect(Private.m_position.m_x, Private.m_position.m_y, Private.m_scale.m_x * coords.m_z, Private.m_scale.m_y * coords.m_w);
            }
        }
        else
        {
            for(i = 0; i < Private.m_instances.length; i++)
            {
                Private.m_instances[i].Draw(context, atlas, Private.m_texture, Private.m_buffer);
            }
        }
    };

    this.FindAvailableInstanceID = function()
    {
        if(!Private.m_instances.length)
        {
            return 0;
        }

        var count = 0;
        while(true)
        {
            if(Private.m_instances[count] === undefined)
            {
                break;
            }  
            count++;
        }
        return count;
    };

    this.GetBuffer = function()
    {
        return Private.m_buffer;
    };

    this.GetCurrentSprite = function()
    {
        return Private.m_currentSprite;
    };

    this.GetDrawOrder = function()
    {
        return Private.m_drawOrder;
    };

    this.GetForce = function()
    {
        return Private.m_force;
    };

    this.GetHighestInstanceID = function()
    {
        return Private.m_highestInstanceID;
    };
  
    this.GetID = function()
    {
        return Private.m_id;
    };
  
    this.GetInstance = function(instanceID)
    {
        if(Private.m_instances[instanceID] === undefined)
        {
            alert("The instance going by ID " + instanceID + " does not exist in object " + Private.m_name);
        }
        return Private.m_instances[instanceID];
    };
    
    this.GetName = function()
    {
        return Private.m_name;
    };

    this.GetNumberOfInstances = function()
    {
        return Private.m_instances.length;
    };

    this.GetPosition = function()
    {
        return Private.m_position;
    };
    
    this.GetPriority = function()
    {
        return Private.m_priority;
    };

    this.GetRotationAcceleration = function()
    {
        return Private.m_rotationAcceleration;
    };

    this.GetRotationAroundZ = function()
    {
        return Private.m_rotationAroundZ;
    };

    this.GetRotationVelocity = function()
    {
        return Private.m_rotationVelocity;
    };

    this.GetScale = function()
    {
        return Private.m_scale;
    };

    this.GetTexture = function()
    {
        return Private.m_texture;
    };

    this.GetVelocity = function()
    {
        return Private.m_velocity;
    };

    this.GetVisible = function()
    {
        return Private.m_visible;
    };
    
    this.HasInstance = function(instanceID)
    {
        if(Private.m_instances[instanceID] === undefined)
        {
            return false;
        }
        return true;
    };

    this.Load = function(file)
    {
        var settings = file.getElementsByTagName("Settings"),
        textures = file.getElementsByTagName("Texture"),
        position = file.getElementsByTagName("Position"),
        scale = file.getElementsByTagName("Scale"),
        rotation = file.getElementsByTagName("Rotation"),
        instances = file.getElementsByTagName("Instances"),
        instance, i, newInstance;

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
      
        if(instances.length)
        {
            instance = file.getElementsByTagName("Instance");

            for(i = 0; i < instance.length; i++)
            {
                newInstance = new Instance2D(this);
                newInstance.Load(instance[i]);
                Private.m_instances[i] = newInstance;
            }
        }

        Private.m_buffer = TheEngine.Instance().AddBuffer(Private.m_priority);
        TheObjectHandler.Instance().AddObject(this);
    };

    this.PlaySprite = function(loop, incrementTime, beginSprite, endSprite)
    {
        if(typeof Private.m_spriteSheetControl === "object")
        {
            delete Private.m_spriteSheetControl;
        }

        Private.m_spriteSheetControl = new SpriteSheetControl(loop, incrementTime, beginSprite, endSprite);
        Private.m_currentSprite = beginSprite;
        Private.m_forceUpdate = true;
    };

    this.RemoveAllInstances = function()
    {
        while(Private.m_instances.length)
        {
            Private.m_instances.pop();
        }  
    };

    this.RemoveInstance = function(instanceID)
    {
        if(Private.m_instances[instanceID] === undefined)
        {
            alert("The instance going by ID " + instanceID + " does not exist in object " + Private.m_name);
        }

        Private.m_instances = Private.m_instances.splice(instanceID, 1);
    };

    this.RunSpriteSheet = function(deltaTime)
    {
        if(typeof Private.m_spriteSheetControl === "object")
        {
            Private.m_forceUpdate = true;
            Private.m_spriteSheetControl.m_timeSinceLastIncrement += deltaTime;

            if(Private.m_spriteSheetControl.m_timeSinceLastIncrement > Private.m_spriteSheetControl.m_incrementTime)
            {
                Private.m_spriteSheetControl.m_timeSinceLastIncrement = 0.0;
                Private.m_currentSprite++;

                if(Private.m_currentSprite > Private.m_spriteSheetControl.m_endID)
                {
                    if(Private.m_spriteSheetControl.m_loop)
                    {
                        Private.m_currentSprite = Private.m_spriteSheetControl.m_beginID;
                    }
                    else
                    {
                        Private.m_currentSprite = Private.m_spriteSheetControl.m_endID;
                        Private.m_spriteSheetControl = 0;
                    }
                }
            }
        }
    };

    this.SetCurrentSprite = function(currentSprite)
    {
        Private.m_currentSprite = currentSprite;
        Private.m_buffer.m_redrawBuffer = true
    };

    this.SetDrawOrder = function(drawOrder)
    {
        Private.m_drawOrder = drawOrder;

        if(Private.m_buffer.m_priority !== Private.m_priority)
        {
            Private.m_buffer = TheEngine.Instance().AddBuffer(Private.m_priority);
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

    this.SetID = function(id)
    {
        Private.m_id = id;
    };

    this.SetName = function(name)
    {
        Private.m_name = name;
    };

    this.SetPosition = function(position)
    {
        Private.m_position = position;
        Private.m_buffer.m_redrawBuffer = true
    };

    this.SetPriority = function(priority)
    {
        Private.m_priority = priority;
        TheObjectHandler.Instance().SortPriority();
    };

    this.SetRotationAcceleration = function(rotationAcceleration)
    {
        Private.m_rotationAcceleration = rotationAcceleration;
        Private.m_forceUpdate = true;
    };

    this.SetRotationAroundZ = function(rotationAroundZ)
    {
        Private.m_rotationAroundZ = rotationAroundZ;
        Private.m_buffer.m_redrawBuffer = true
    };

    this.SetRotationVelocity = function(rotationVelocity)
    {
        Private.m_rotationVelocity = rotationVelocity;
        Private.m_forceUpdate = true;
    };

    this.SetScale = function(scale)
    {
        Private.m_scale = scale;
        Private.m_buffer.m_redrawBuffer = true
    };

    this.SetTexture = function(texture)
    {
        Private.m_texture = texture;
        Private.m_buffer.m_redrawBuffer = true
    };

    this.SetVelocity = function(velocity)
    {
        Private.m_velocity = velocity;
        Private.m_velocity.m_y = -Private.m_velocity.m_y;
        Private.m_lastAcceleration.m_x = 0.0;
        Private.m_lastAcceleration.m_y = 0.0;
        Private.m_forceUpdate = true;
    };

    this.SetVisible = function(visible)
    {
        Private.m_visible = visible;
        Private.m_buffer.m_redrawBuffer = true
    };

    this.SpriteIncrement = function()
    {
        if(Private.m_currentSprite < Private.m_texture.GetAtlas().m_numTextures - 1)
        {
            Private.m_currentSprite++;
        }
        else
        {
            Private.m_currentSprite = 0;
        }
        Private.m_buffer.m_redrawBuffer = true
    };

    this.Update = function(deltaTime)
    {
        if(Private.m_visible && Private.m_forceUpdate)
        {       
            var newAcceleration, avgAcceleration, i;

            Private.m_buffer.m_redrawBuffer = true
            Private.m_forceUpdate = false;

            this.RunSpriteSheet(deltaTime);
            
            if(!Private.m_instances.length)
            {         
                Private.m_position.m_x += Private.m_velocity.m_x * deltaTime + (0.5 * Private.m_lastAcceleration.m_x * deltaTime * deltaTime);
                Private.m_position.m_y += Private.m_velocity.m_y * deltaTime + (0.5 * Private.m_lastAcceleration.m_y * deltaTime * deltaTime);
                newAcceleration = Vec2Divide(Private.m_force, 1.0); //Mass
				avgAcceleration = Vec2Add(Private.m_lastAcceleration, newAcceleration);
				avgAcceleration.Divide(2);
				avgAcceleration.Multiply(deltaTime);
                Private.m_velocity.Add(avgAcceleration);
                Private.m_lastAcceleration = newAcceleration;

                Private.m_force.m_x = 0.0;
                Private.m_force.m_y = 0.0;

                Private.m_rotationVelocity += Private.m_rotationAcceleration * deltaTime;
                Private.m_rotationAroundZ += Private.m_rotationVelocity * 0.5 * deltaTime;

                if(Vec2LengthSq(Private.m_velocity) > 0.00001)
                {
                    Private.m_forceUpdate = true;
                }
            }
            else
            {
                for(i = 0; i < Private.m_instances.length; i++)
                {
                    Private.m_instances[i].Update(deltaTime);
                }
            }
            delete newAcceleration;
            delete avgAcceleration;

            return true;
        }
        return false;
    };
}

function Instance2D(attachedObject)
{
    var Private;
    (function(){
        Private = 
        {
            //Variables
            m_attachedObject: attachedObject,
            m_currentSprite: 0,
            m_force: new Vec2(0.0, 0.0),
            m_instanceID: 0,
            m_lastAcceleration: new Vec2(0.0, 0.0),
            m_position: new Vec2(0.0, 0.0),
            m_rotationAcceleration: 0.0,
            m_rotationAroundZ: 0.0,
            m_rotationVelocity: 0.0,
            m_scale: new Vec2(1.0, 1.0),
            m_spriteSheetControl: 0,
            m_velocity: new Vec2(0.0, 0.0),
            m_visible: true
        };
    }());

    //Public Member Functions
    this.Draw = function(context, atlas, texture, buffer)
    {
        context.setTransform(Private.m_scale.m_x, 0.0, 0.0, Private.m_scale.m_y, Private.m_position.m_x, Private.m_position.m_y);
        context.rotate(Private.m_rotationAroundZ);

        if(typeof atlas !== "object")
        {
            context.drawImage(texture.GetTexture(), 0, 0);
            Private.m_buffer.AddDirtyRect(Private.m_position.m_x, Private.m_position.m_y, Private.m_scale.m_x * texture.GetWidth(), Private.m_scale.m_y * texture.GetHeight());
        }
        else
        {
            var coords = atlas.GetAtlasTexCoordByID(Private.m_currentSprite);
            context.drawImage(texture.GetTexture(), coords.m_x, coords.m_y, coords.m_z, coords.m_w, 0, 0, coords.m_z, coords.m_w);
            buffer.AddDirtyRect(Private.m_position.m_x, Private.m_position.m_y, Private.m_scale.m_x * coords.m_z, Private.m_scale.m_y * coords.m_w);
        }
    };

    this.GetCurrentSprite = function()
    {
        return Private.m_currentSprite;
    };

    this.GetForce = function()
    {
        return Private.m_force;
    };

    this.GetInstanceID = function()
    {
        return Private.m_instanceID;
    };

    this.GetPosition = function()
    {
        return Private.m_position;
    };

    this.GetRotationAcceleration = function()
    {
        return Private.m_rotationAcceleration;
    };

    this.GetRotationAroundZ = function()
    {
        return Private.m_rotationAroundZ;
    };

    this.GetRotationVelocity = function()
    {
        return Private.m_rotationVelocity;
    };

    this.GetScale = function()
    {
        return Private.m_scale;
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
        var texture = file.getAttribute("Texture"),
        position = file.getElementsByTagName("Position"),
        scale = file.getElementsByTagName("Scale"),
        rotation = file.getElementsByTagName("Rotation");

        if(file.hasAttribute("Visible"))
        {
            Private.m_visible = ConvertBool(file.getAttribute("Visible"));
        }
        
        if(file.hasAttribute("Texture"))
        {
            if(!Private.m_attachedObject.GetTexture().HasAtlas())
            {
                alert("Cannot Set Texture " + texture + " for Instance as base texture is not an atlas!");
            }

            Private.m_currentSprite = Private.m_attachedObject.GetTexture().GetAtlas().GetAtlasPieceID(texture);
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
    };

    this.PlaySprite = function(loop, incrementTime, beginSprite, endSprite)
    {
        if(typeof Private.m_spriteSheetControl === "object")
        {
            delete Private.m_spriteSheetControl;
        }

        Private.m_spriteSheetControl = new SpriteSheetControl(loop, incrementTime, beginSprite, endSprite);
        Private.m_currentSprite = beginSprite;
        Private.m_attachedObject.SetForceUpdate(true);
    };

    this.RunSpriteSheet = function(deltaTime)
    {
        if(typeof Private.m_spriteSheetControl === "object")
        {
            Private.m_attachedObject.SetForceUpdate(true);
            Private.m_spriteSheetControl.m_timeSinceLastIncrement += deltaTime;

            if(Private.m_spriteSheetControl.m_timeSinceLastIncrement > Private.m_spriteSheetControl.m_incrementTime)
            {
                Private.m_spriteSheetControl.m_timeSinceLastIncrement = 0.0;
                Private.m_currentSprite++;

                if(Private.m_currentSprite > Private.m_spriteSheetControl.m_endID)
                {
                    if(Private.m_spriteSheetControl.m_loop)
                    {
                        Private.m_currentSprite = Private.m_spriteSheetControl.m_beginID;
                    }
                    else
                    {
                        Private.m_currentSprite = Private.m_spriteSheetControl.m_endID;
                        Private.m_spriteSheetControl = 0;
                    }
                }
            }
        }
    };

    this.SetCurrentSprite = function(currentSprite)
    {
        Private.m_currentSprite = currentSprite;
    };

    this.SetForce = function(force)
    {
        Private.m_force = force;
        Private.m_attachedObject.SetForceUpdate(true);
    };

    this.SetPosition = function(position)
    {
        Private.m_position = position;
        Private.m_attachedObject.GetBuffer().m_redrawBuffer = true
    };

    this.SetRotationAcceleration = function(rotationAcceleration)
    {
        Private.m_rotationAcceleration = rotationAcceleration;
        Private.m_attachedObject.SetForceUpdate(true);
    };

    this.SetRotationAroundZ = function(rotationAroundZ)
    {
        Private.m_rotationAroundZ = rotationAroundZ;
        Private.m_attachedObject.GetBuffer().m_redrawBuffer = true
    };

    this.SetRotationVelocity = function(rotationVelocity)
    {
        Private.m_rotationVelocity = rotationVelocity;
        Private.m_attachedObject.SetForceUpdate(true);
    };

    this.SetScale = function(scale)
    {
        Private.m_scale = scale;
        Private.m_attachedObject.GetBuffer().m_redrawBuffer = true
    };

    this.SetVelocity = function(velocity)
    {
        Private.m_velocity = velocity;
        Private.m_velocity.m_y = -Private.m_velocity.m_y;
        Private.m_lastAcceleration.m_x = 0.0;
        Private.m_lastAcceleration.m_y = 0.0;
        Private.m_attachedObject.SetForceUpdate(true);
    };

    this.SetVisible = function(visible)
    {
        Private.m_visible = visible;
        Private.m_attachedObject.GetBuffer().m_redrawBuffer = true
    };

    this.SpriteIncrement = function()
    {
        if(Private.m_currentSprite < Private.m_attachedObject.GetTexture().GetAtlas().m_numTextures - 1)
        {
            Private.m_currentSprite++;
        }
        else
        {
            Private.m_currentSprite = 0;
        }
        Private.m_attachedObject.GetBuffer().m_redrawBuffer = true
    };

    this.Update = function(deltaTime)
    {
        var newAcceleration, avgAcceleration;

        this.RunSpriteSheet(deltaTime);
            
        Private.m_position.m_x += Private.m_velocity.m_x * deltaTime + (0.5 * Private.m_lastAcceleration.m_x * deltaTime * deltaTime);
        Private.m_position.m_y += Private.m_velocity.m_y * deltaTime + (0.5 * Private.m_lastAcceleration.m_y * deltaTime * deltaTime);
        newAcceleration = Vec2Divide(Private.m_force, 1.0); //Mass
		avgAcceleration = Vec2Add(Private.m_lastAcceleration, newAcceleration);
		avgAcceleration.Divide(2);
		avgAcceleration.Multiply(deltaTime);
        Private.m_velocity.Add(avgAcceleration);
        Private.m_lastAcceleration = newAcceleration;

        Private.m_force.m_x = 0.0;
        Private.m_force.m_y = 0.0;

        delete newAcceleration;
        delete avgAcceleration;

        Private.m_rotationVelocity += Private.m_rotationAcceleration * deltaTime;
        Private.m_rotationAroundZ += Private.m_rotationVelocity * 0.5 * deltaTime;
            
        if(Vec2LengthSq(Private.m_velocity) > 0.00001)
        {
            Private.m_attachedObject.SetForceUpdate(true);
        } 
    };
}