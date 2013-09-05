function State(stateName)
{

}

State.prototype.m_stateName = "Default";

State.prototype.Enter = function(){return;};

State.prototype.Exit = function(){return;};

State.prototype.GetName = function()
{
	return this.m_stateName;
};

State.prototype.SetName = function(stateName)
{
	this.m_stateName = stateName;
};

State.prototype.Update = function(){return;};