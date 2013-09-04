function ButtonProcess()
{
    //Public Member Functions
	this.Completed = function()
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
			SetCompleted();
		}
	};
}

Inherit(ButtonProcess, Process);