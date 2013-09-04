function ReelProcess(blurReel, reel, time)
{
	var Private;
    (function(){
        Private = 
        {
            //Variables
            m_blurReel: blurReel,
            m_reel: reel,
			m_timer: 0,
			m_waitTimer: time,
        };
    }());
	
    //Public Member Functions
	this.Complete = function()
	{
		Private.m_reel.SetVisible(true);
		Private.m_blurReel.SetVisible(false);
		Private.m_blurReel.StopSpritePlay();
		
		for(var i = 0; i < 3; i++)
		{           
			var instance = Private.m_reel.GetInstance(i);
			var random = Math.floor(Math.random() * (4 - 0 + 1)) + 0;
            instance.SetCurrentSprite(random);
		}
	};
	
    this.Init = function()
	{
		Private.m_timer = TheEngine.Instance().GetSystemTimer().GetRunningTime() + Private.m_waitTimer;
		
		Private.m_reel.SetVisible(false);
		Private.m_blurReel.SetVisible(true);
		
		Private.m_blurReel.PlaySprite(true, 0.01, 0, 49);
		var random = Math.floor(Math.random() * (49 - 0 + 1)) + 0;
		Private.m_blurReel.SetCurrentSprite(random);
	};

    this.Update = function()
	{
		if(Private.m_timer < TheEngine.Instance().GetSystemTimer().GetRunningTime())
		{	
			this.SetCompleted();
		}
	};
}

Inherit(ReelProcess, Process);
ReelProcess.prototype.m_processState = "Uninitialized";