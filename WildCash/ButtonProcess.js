function ButtonProcess(button)
{
	var Private;
    (function(){
        Private = 
        {
            //Variables
            m_button: button,
            m_holdTime: 0.1,
			m_timer: 0
        };
    }());

	ButtonProcess.prototype.Private.m_processState = "Uninitialized";
	
    //Public Member Functions
	this.Complete = function()
	{
		Private.m_button.Clear();
		TheButtons.Instance().SetButtonProcessEnded();
		TheInput.Instance().SetTouchOff();
	};
	
    this.Init = function()
	{
		Private.m_button.TriggerButton();
		Private.m_timer = TheEngine.Instance().GetSystemTimer().GetRunningTime() + Private.m_holdTime;
	};

    this.Update = function()
	{
		if((!Private.m_button.CheckPressed() || !TheInput.Instance().IsTouched()) && !Private.m_button.IsReleased())
		{
			Private.m_button.SetPressed();
		}
	
		if(Private.m_button.IsReleased() && Private.m_timer < TheEngine.Instance().GetSystemTimer().GetRunningTime())
		{	
			this.SetCompleted();
		}
	};
}

Inherit(ButtonProcess, Process);