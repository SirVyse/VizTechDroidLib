function StateManager()
{
    var Private;
    (function(){
        Private = 
        {
            //Variables
            m_currentState: 0,
            m_previousState: 0,
            m_states: {}
        };
    }());

    //Public Member Functions
    this.AddState = function(state)
    {
        if(Private.m_states.hasOwnProperty(state.GetName()))
        {
            alert("The State:" + state.GetName() + " cannot be added as one already exists with this name!");
            return false;
        }

        Private.m_states[state.GetName()] = state;
        return true;
    };

    this.GetCurrentState = function()
    {
        return Private.m_currentState;
    };

    this.GetPreviousState = function()
    {
        return Private.m_previousState;
    };

    this.GetState = function(stateName)
    {
        if(!Private.m_states.hasOwnProperty(stateName))
        {
            alert("Cannot retrieve state:" + stateName + ", because it does not exist!");
            return false;
        }
        return Private.m_states[stateName];
    };

    this.Rollback = function()
    {
        if(typeof Private.m_previousState !== "Object")
        {
            alert("No Previous State exists to rollback to!");
            return false;
        }

        if(!Private.m_states.hasOwnProperty(Private.m_previousState.GetName()))
        {
            alert("Cannot Set " + Private.m_previousState.GetName() + " as current state, because it does not exist!");
            return false;
        }

        var previousState;
        if(typeof Private.m_currentState !== "Object")
        {
            Private.m_currentState.Exit();
            previousState = Private.m_currentState;
        }

        Private.m_currentState = Private.m_previousState;
        Private.m_previousState = previousState;

        Private.m_currentState.Enter();

        return true;
    };

    this.SetCurrentState = function(stateName)
    {
        if(!Private.m_states.hasOwnProperty(stateName))
        {
            var i = 0;
            alert("Cannot Set " + stateName + " as current state, because it does not exist!");

            for(i = 0; i < Private.m_states.length; i++)
            {
                console.log(Private.m_states[i].GetName());
            }

            return false;
        }
        Private.m_currentState = Private.m_states[stateName];
        return true;
    };

    this.Transition = function(stateName)
    {
        if(!Private.m_states.hasOwnProperty(stateName))
        {
            alert("Cannot Transition to " + stateName + ", because it does not exist!");
            return false;
        }

        if(typeof Private.m_currentState !== "Object")
        {
            Private.m_currentState.Exit();
            Private.m_previousState = Private.m_currentState;
        }
        Private.m_currentState = Private.m_states[stateName];
        Private.m_currentState.Enter();
        return true;
    };
}