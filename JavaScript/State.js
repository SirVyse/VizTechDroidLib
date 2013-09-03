function State(stateName)
{
    var Private;
    (function(){
        Private = 
        {
            //Variables
            m_stateName: stateName
        };
    }());

    //Public Member Functions
    this.Enter = function(){return;};

    this.Exit = function(){return;};

    this.GetName = function()
    {
        return Private.m_stateName;
    };

    this.Update = function(){return;};

    this.SetName = function(stateName)
    {
        Private.m_stateName = stateName;
    };
}