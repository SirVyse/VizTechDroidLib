function Input()
{
    var Public;
   
    (function(){
        var Private = 
        {
            //Variables
            m_posX: 0,
            m_posY: 0,
            m_touched: false
		},
            
        //Function Declarations
        GetPosition,
		GetPosX,
        GetPosY,
		Initialize,
		IsTouched;

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
						Private.m_posX = event.touches[0].clientX;
						Private.m_posY = event.touches[0].clientY;
						alert("X:" + Private.m_posX + "   Y:" + Private.m_posY);
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