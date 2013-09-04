function ButtonProcess()
{
    //Public Member Functions
	this.Complete = function()
	{
		TheObjectHandler.Instance().GetObject("E_Autoplay").SetCurrentSprite(0);
	};
	
    this.Init = function()
	{
		TheObjectHandler.Instance().GetObject("E_Autoplay").SetCurrentSprite(1);
	};

    this.Update = function()
	{
		if(!TheInput.Instance().IsTouched())
		{
			this.SetCompleted();
		}
	};
}

Inherit(ButtonProcess, Process);