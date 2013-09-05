﻿function AudioSample()
{
    var Private;
    (function(){
        Private = 
        {
            //Variables
            m_audioTrack: 0,
            m_name: "DefaultAudio"
        };
    }());

    //Public Member Functions
	this.GetName = function()
	{
		return Private.m_name;
	};
	
	this.IsPlaying = function()
	{
	
	};
	
	this.Load = function(name, filename)
    {
        Private.m_name = name;
		Private.m_audio = new Audio();
		
		var fullFilename = "AUDIO/" + filename,    
        that = this, LoadedCallback;

        LoadedCallback = function()
        {
            TheAudioManager.Instance().AddAudioSample(that);
        };
		
		$(Private.m_audio).on("loadeddata", LoadedCallback)

    //    Private.m_audio.oncanplaythrough = function()
     //   {
      //      LoadedCallback();
       // };

        Private.m_audio.onerror = function()
        {
            alert("Failed to load the audio:" + Private.m_name);
        };

        Private.m_audio.onabort = function()
        {
            alert("Failed to load the audio:" + Private.m_name);
        };

        Private.m_audio.src = fullFilename;
    };
	
    this.Play = function(loop)
    {
        Private.m_audio.play();
    };

    this.Stop = function()
    {
        
    };
}