function ProcessManager()
{
    var Private;
    (function(){
        Private = 
        {
            //Variables
            m_processList: {},
            m_processQueue: []
        };
    }());

    //Public Member Functions
    this.AddProcessToList = function(process)
    {
		function GetID()
		{
			var value = Private.m_processList.length;
			while(Private.m_processList.hasOwnProperty(value))
			{
				value--;
			}
			return value;
		};
	
		var id = GetID();
        Private.m_processList[id] = process;
    };

    this.AddProcessToQueue = function(process)
    {
		Private.m_processQueue.push();
    };

    this.FlushProcessList = function()
    {
		while(Private.m_processList.length)
		{
			Private.m_processList.pop();
		}
    };

    this.FlushProcessQueue = function(stateName)
    {
		while(Private.m_processQueue.length)
		{
			Private.m_processQueue.pop();
		}
    };
	
	this.GetNumListProcesses = function()
	{
		return Private.m_processList.length();
	};
	
	this.GetNumQueueProcesses = function()
	{
		return Private.m_processQueue.length();
	};
	
	this.GetTotalNumProcesses = function()
	{
		return Private.m_processList.length() + Private.m_processQueue.length();
	};

    this.UpdateProcesses = function()
    {
		var i = 0;
		
		for(i in Private.m_processList)
		{
			var process = Private.m_processList[i];
		
			if(process.GetState() === "Uninitialized")
			{
				process.Init();
				process.SetState("Running");
			}
			
			if(process.GetState() === "Running")
			{
				process.Update();
			}
			
			if(process.GetState() === "Paused")
			{
				continue;
			}
			
			if(process.IsDead())
			{
				process.Complete();
				delete Private.m_processList[i];
			}
		}
		
		if(Private.m_processQueue.length)
		{
			var process = Private.m_processQueue[0];
			
			if(process.GetState() === "Uninitialized")
			{
				process.Init();
				process.SetState("Running");
			}
			
			if(process.GetState() === "Running")
			{
				process.Update();
			}
			
			if(process.IsDead())
			{
				Private.m_processQueue.shift().Complete();
			}
		}
    };
}