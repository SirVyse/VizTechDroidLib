function MainGameState()
{
    var Private;
    (function(){
        Private = 
        {
            //Variables
            m_stateName: "MainGameState"
        };
    }());

    //Public Member Functions
    this.Enter = function()
	{
		for(var i = 0; i < 5; i++)
        {           
			var a = TheObjectHandler.Instance().GetObject("E_Reel1Strip").GetInstance(i);
			a.PlaySprite(true, 0.01, 0, 49);
		}
	};

    this.Exit = function(){return;};

    this.GetName = function()
    {
        return Private.m_stateName;
    };

    this.Update = function()
	{
		if(TheInput.Instance().IsTouched())
		{
			if(TheInput.Instance().Pick2D(TheObjectHandler.Instance().GetObject("E_Autoplay")))
			{
				TheObjectHandler.Instance().GetObject("E_Autoplay").SetCurrentSprite(1);
			}
		}
	};

    this.SetName = function(stateName)
    {
        Private.m_stateName = stateName;
    };
}

var mainGameState = new MainGameState();
TheEngine.Instance().AddState(mainGameState);