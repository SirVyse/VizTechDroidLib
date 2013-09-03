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
						Private.m_posX = event.touches[0].clientX;
						Private.m_posY = event.touches[0].clientY;
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
						
						alert("X:" + Private.m_posX + "\nY:" + Private.m_posY);
					});
					
				TheEngine.Instance().GetDiv().addEventListener('touchend', function()
					{
						alert("Not Touched");
						Private.m_touched = false;
					});
			},
			
			IsTouched: function()
			{
				return Private.m_touched;
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