﻿function Input()
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
		SetTouchArea,

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
						alert("X:" + Private.m_posX + "\nY:" + Private.m_posY + "\TouchAreaWidth:" + Private.m_touchAreaWidth + "\TouchAreaHeight:" + Private.m_touchAreaHeight
							+ "\nInnerWidth:" + window.innerWidth + "\nInnerHeight:" + window.innerHeight);
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
			},	
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