function Timer()
{
    var timeStamp, Private;
    (function(){
        if(window.performance !== undefined)
        {
            if(window.performance.now !== undefined)
            {
                timeStamp = function(){return window.performance.now();};
            }
            else
            {
                if(window.performance.webkitNow  !== undefined)
                {
                    timeStamp = function(){return window.performance.webkitNow();};
                }
                else
                {
                    timeStamp = function(){return new Date().getTime();};
                }
            }
        }
        else
        {
            timeStamp = function(){return new Date().getTime();};
        }
    }());

    (function(){
        Private = 
        {
            //Variables
            m_currentTime: 0,
            m_fps: 0,
            m_FPSUpdateInterval: 1000,
            m_lastFPSUpdate: 0,
            m_lastTime: 0,
            m_numFrames: 0,
            m_runningTime: 0,
            m_timeElapsed: 0,
            m_timerStopped: false,
            GetTimeStamp: timeStamp
        };
    }());
    Private.GetTimeStamp();

    //Public Member Functions
    this.GetDT = function()
    {
        return Private.m_timeElapsed;
    };

    this.GetFPS = function()
    {
        return Private.m_fps;
    };

    this.GetRunningTime = function()
    {
        return Private.m_runningTime;
    };

    this.Start = function()
    {
        if(!Private.m_timerStopped)
        {
            return;
        }

        Private.m_lastTime = Private.GetTimeStamp();
        Private.m_timerStopped = false;
    };

    this.Stop = function()
    {
        if(Private.m_timerStoppeed)
        {
            return;
        }

        var stopTime = Private.GetTimeStamp();
        Private.m_runningTime += (stopTime - Private.m_lastTime);
        Private.m_timerStopped = true;
    };

    this.Update = function()
    {
        if(Private.m_timerStopped)
        {
            return;
        }

        Private.m_currentTime = Private.GetTimeStamp();
        Private.m_timeElapsed = Private.m_currentTime - Private.m_lastTime;

        if(Private.m_timeElapsed > 100)
        {
            Private.m_timeElapsed = 100;
        }

        Private.m_timeElapsed /= 1000;
        Private.m_runningTime += Private.m_timeElapsed;

        Private.m_numFrames++;
        if(Private.m_currentTime - Private.m_lastFPSUpdate >= Private.m_FPSUpdateInterval)
        {
            var currentTime = Private.m_currentTime / 1000,
            lastTime = Private.m_lastFPSUpdate / 1000;
            Private.m_fps = Private.m_numFrames / (currentTime - lastTime);
            Private.m_lastFPSUpdate = Private.m_currentTime;
            Private.m_numFrames = 0;

            //console.log(Private.m_fps);
        }

        Private.m_lastTime = Private.m_currentTime;
    };
}