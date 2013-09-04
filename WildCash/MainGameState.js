﻿function MainGameState()
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
		
		TheButtons.Instance().HoldStartButtons();
	};

    this.Update = function()
	{
		TheButtons.Instance().UpdateButtons();
		
		if(TheButtons.Instance().ButtonPressed("Start"))
		{
		
		}
		else if(TheButtons.Instance().ButtonPressed("Info"))
		{
		
		}
		else if(TheButtons.Instance().ButtonPressed("Autoplay"))
		{
		
		}
		else if(TheButtons.Instance().ButtonPressed("Stake"))
		{
		
		}
		else if(TheButtons.Instance().ButtonPressed("Menu"))
		{
		
		}
		else if(TheButtons.Instance().ButtonPressed("Collect"))
		{
		
		}
	};
}

Inherit(MainGameState, State);
MainGameState.BASE.Private.m_stateName = "MainGameState";

var mainGameState = new MainGameState();
TheEngine.Instance().AddState(mainGameState);