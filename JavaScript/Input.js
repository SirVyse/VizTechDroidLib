function Input()
{
    var Public;
   
    (function(){
        var Private = 
        {
            //Variables
            m_posX: 0,
            m_posY: 0,
            m_touched: false,
			m_touchAreaHeight: 0,
			m_touchAreaWidth: 0
		},
            
        //Function Declarations
        GetPosition,
		GetPosX,
        GetPosY,
		Initialize,
		IsTouched,
		Pick2D,
		SetTouchArea;

        Public = 
        {
            //Function Definitions
            GetPosition: function()
            {
                var position = new Vec2(Private.m_posX, Private.m_posY);
                return position;
            },

            GetPosX: function()
            {
                return Private.m_posX;
            },

			GetPosY: function()
            {
                return Private.m_posY;
            },
			
			Initialize: function()
			{
				TheEngine.Instance().GetDiv().addEventListener('touchmove', function(event)
					{
						if(Private.m_touched)
						{
							var width = window.innerWidth - Private.m_touchAreaWidth;
							width /= 2.0;						
							var height = window.innerHeight - Private.m_touchAreaHeight;
							height /= 2.0;		
							
							Private.m_posX = event.touches[0].clientX - width;
							Private.m_posX *= TheEngine.Instance().GetScreenWidth() / Private.m_touchAreaWidth;
							Private.m_posY = event.touches[0].clientY - height;
							Private.m_posY *= TheEngine.Instance().GetScreenHeight() / Private.m_touchAreaHeight;
						}
					});
					
				TheEngine.Instance().GetDiv().addEventListener('mousemove', function(event)
					{
						if(Private.m_touched)
						{
							var width = window.innerWidth - Private.m_touchAreaWidth;
							width /= 2.0;						
							var height = window.innerHeight - Private.m_touchAreaHeight;
							height /= 2.0;		
							
							Private.m_posX = event.clientX - width;
							Private.m_posX *= TheEngine.Instance().GetScreenWidth() / Private.m_touchAreaWidth;
							Private.m_posY = event.clientY - height;
							Private.m_posY *= TheEngine.Instance().GetScreenHeight() / Private.m_touchAreaHeight;
						}
					});
					
				TheEngine.Instance().GetDiv().addEventListener('touchstart', function(event)
					{
						Private.m_touched = true;
						
						var width = window.innerWidth - Private.m_touchAreaWidth;
						width /= 2.0;						
						var height = window.innerHeight - Private.m_touchAreaHeight;
						height /= 2.0;		
						
						Private.m_posX = event.touches[0].clientX - width;
						Private.m_posX *= TheEngine.Instance().GetScreenWidth() / Private.m_touchAreaWidth;
						Private.m_posY = event.touches[0].clientY - height;
						Private.m_posY *= TheEngine.Instance().GetScreenHeight() / Private.m_touchAreaHeight;
					});
					
				TheEngine.Instance().GetDiv().addEventListener('mousedown', function(event)
					{
						Private.m_touched = true;
						
						var width = window.innerWidth - Private.m_touchAreaWidth;
						width /= 2.0;						
						var height = window.innerHeight - Private.m_touchAreaHeight;
						height /= 2.0;		
						
						Private.m_posX = event.clientX - width;
						Private.m_posX *= TheEngine.Instance().GetScreenWidth() / Private.m_touchAreaWidth;
						Private.m_posY = event.clientY - height;
						Private.m_posY *= TheEngine.Instance().GetScreenHeight() / Private.m_touchAreaHeight;
					});
					
				TheEngine.Instance().GetDiv().addEventListener('touchend', function()
					{
						Private.m_touched = false;
					});
					
				TheEngine.Instance().GetDiv().addEventListener('mouseup', function()
					{
						Private.m_touched = false;
					})
					
				TheEngine.Instance().GetDiv().addEventListener('mouseout', function()
					{
						Private.m_touched = false;
					})
			},
			
			IsTouched: function()
			{
				return Private.m_touched;
			},
			
			Pick2D: function(object2D)
			{
				var texture = object2D.GetTexture();
				var width = texture.GetWidth();
				var height = texture.GetHeight();
				
				if(texture.HasAtlas())
				{
					var coords = texture.GetAtlas().GetAtlasTexCoordByID(object2D.GetCurrentSprite());
					width = coords.m_z;
					height = coords.m_w;
				}
				
				width *= object2D.GetScale().m_x;
				height *= object2D.GetScale().m_y;
				
				if((Private.m_posX >= object2D.GetPosition().m_x) && (Private.m_posX <= object2D.GetPosition().m_x + width) && (Private.m_posY >= object2D.GetPosition().m_y) && (Private.m_posY <= object2D.GetPosition().m_y + height))
				{
					return true;
				}
				return false;
			},
			
			Pick2DInstance: function(object2D, instance)
			{
				var texture = object2D.GetTexture();
				var width = texture.GetWidth();
				var height = texture.GetHeight();
				
				if(texture.HasAtlas())
				{
					var coords = texture.GetAtlas().GetAtlasTexCoordByID(instance.GetCurrentSprite());
					width = coords.m_z;
					height = coords.m_w;
				}
				
				width *= instance.GetScale().m_x;
				height *= instance.GetScale().m_y;
				
				if((Private.m_posX >= instance.GetPosition().m_x) && (Private.m_posX <= instance.GetPosition().m_x + width) && (Private.m_posY >= instance.GetPosition().m_y) && (Private.m_posY <= instance.GetPosition().m_y + height))
				{
					return true;
				}
				return false;
			},
			
			SetTouchArea: function(height, width)
			{
				Private.m_touchAreaHeight = height;
				Private.m_touchAreaWidth = width;
			}
        };
    }());

    if(Input.m_instance === undefined)
    {
        Input.m_instance = Public;
    }

    this.Instance = function()
    {
        return Input.m_instance;
    };
}

var TheInput = new Input();