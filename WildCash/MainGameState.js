function MainGameState()
{
	var buttonPressed = false;

    //Public Member Functions
    this.Enter = function()
	{
		TheButtons.Instance().HoldStartButtons();
	};

    this.Update = function()
	{
		TheButtons.Instance().UpdateButtons();
		
		if(TheButtons.Instance().ButtonPressed("Start"))
		{
			TheObjectHandler.Instance().GetObject("E_Reel1Strip").SetVisible(true);
			for(var i = 0; i < 5; i++)
			{          			
				var reelProcess = new ReelProcess(TheObjectHandler.Instance().GetObject("E_Reel1Strip").GetInstance(i), TheObjectHandler.Instance().GetObject("E_Reel" + (i + 1)), 1.0 + (i * 0.2));
				TheEngine.Instance().GetProcessManager().AddProcessToList(reelProcess);
				
				TheAudioManager.Instance().GetAudioSample("ReelSpin").Play();
			}
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
MainGameState.prototype.m_stateName = "MainGameState";

var mainGameState = new MainGameState();
TheEngine.Instance().AddState(mainGameState);