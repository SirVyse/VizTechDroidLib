function State(stateName)
{

}

State.prototype.Private = {
	m_stateName: "Default"
};

State.prototype.Enter = function(){return;};

State.prototype.Exit = function(){return;};

State.prototype.GetName = function()
{
	return State.prototype.Private.m_stateName;
};

State.prototype.SetName = function(stateName)
{
	State.prototype.Private.m_stateName = stateName;
};

State.prototype.Update = function(){return;};