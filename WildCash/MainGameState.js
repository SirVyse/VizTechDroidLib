function MainGameState()
{
	var buttonPressed = false;

    //Public Member Functions
    this.Enter = function()
	{
		for(var i = 0; i < 5; i++)
        {           
			var a = TheObjectHandler.Instance().GetObject("E_Reel1Strip").GetInstance(i);
			a.PlaySprite(true, 0.01, 0, 49);
		}
	};

    this.Update = function()
	{
		if(TheInput.Instance().IsTouched() && !buttonPressed)
		{
			if(TheInput.Instance().Pick2D(TheObjectHandler.Instance().GetObject("E_Autoplay")))
			{
				var process = new ButtonProcess();
				TheEngine.Instance().GetProcessManager().AddProcessToList(process);
				buttonPressed = true;
			}
		}
	};
}

Inherit(MainGameState, State);
MainGameState.BASE.Private.m_stateName = "MainGameState";

var mainGameState = new MainGameState();
TheEngine.Instance().AddState(mainGameState);