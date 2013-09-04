function Process()
{

}

Process.prototype.Private = {
	m_processState: "Uninitialized"
};

Process.prototype.Complete = function(){return;};

Process.prototype.GetState = function()
{
	return Private.m_processState;
};

Process.prototype.Init = function(){return;};

Process.prototype.IsAlive = function()
{
	return (Private.m_processState === "Running" || Private.m_processState === "Paused");
};

Process.prototype.IsDead = function()
{
	return Private.m_processState === "Completed";
};

Process.prototype.IsPaused = function()
{
	return Private.m_processState === "Paused";
};

Process.prototype.SetCompleted = function()
{
	Private.m_processState = "Completed";
};

Process.prototype.SetPause = function()
{
	Private.m_processState = "Paused";
};

Process.prototype.SetResume = function()
{
	Private.m_processState = "Running";
};

Process.prototype.SetState = function(processState)
{
	Private.m_processState = processState;
};

Process.prototype.Update = function(){return;};