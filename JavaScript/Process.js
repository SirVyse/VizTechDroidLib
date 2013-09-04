function Process()
{

}

Process.prototype.Private = {
	m_processState: "Uninitialized"
};

Process.prototype.Complete = function(){return;};

Process.prototype.GetState = function()
{
	return Process.prototype.Private.m_processState;
};

Process.prototype.Init = function(){return;};

Process.prototype.IsAlive = function()
{
	return (Process.prototype.Private.m_processState === "Running" || Process.prototype.Private.m_processState === "Paused");
};

Process.prototype.IsDead = function()
{
	return Process.prototype.Private.m_processState === "Completed";
};

Process.prototype.IsPaused = function()
{
	return Process.prototype.Private.m_processState === "Paused";
};

Process.prototype.SetCompleted = function()
{
	Process.prototype.Private.m_processState = "Completed";
};

Process.prototype.SetPause = function()
{
	Process.prototype.Private.m_processState = "Paused";
};

Process.prototype.SetResume = function()
{
	Process.prototype.Private.m_processState = "Running";
};

Process.prototype.SetState = function(processState)
{
	Process.prototype.Private.m_processState = processState;
};

Process.prototype.Update = function(){return;};