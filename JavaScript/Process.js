function Process()
{

}

Process.prototype.m_processState = "Uninitialized";

Process.prototype.Complete = function(){return;};

Process.prototype.GetState = function()
{
	return this.m_processState;
};

Process.prototype.Init = function(){return;};

Process.prototype.IsAlive = function()
{
	return (this.m_processState === "Running" || this.m_processState === "Paused");
};

Process.prototype.IsDead = function()
{
	return this.m_processState === "Completed";
};

Process.prototype.IsPaused = function()
{
	return this.m_processState === "Paused";
};

Process.prototype.SetCompleted = function()
{
	this.m_processState = "Completed";
};

Process.prototype.SetPause = function()
{
	this.m_processState = "Paused";
};

Process.prototype.SetResume = function()
{
	this.m_processState = "Running";
};

Process.prototype.SetState = function(processState)
{
	this.m_processState = processState;
};

Process.prototype.Update = function(){return;};