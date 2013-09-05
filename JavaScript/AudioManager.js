function AudioSample(name, beginTime, endTime)
{
	this.m_beginTime = beginTime;
	this.m_endTime = endTime;
	this.m_name = name;
}

function AudioManager()
{
    var Public;
   
    (function(){
        var Private = 
        {
            //Variables
			m_activeSound: false,
			m_audio: 0,
            m_audioSamples: {},
			m_finishedLoading: false,
			m_silentSample: 0,
			m_silentTimer: 0
        },
            
        //Function Declarations
        AddAudioSample,
        FinishedLoading,
        LoadAudio,
		Play,
		Start,
		Timer;

        Public = 
        {
            //Function Definitions
            AddAudioSample: function(audio)
            {
                if(Private.m_audioSamples.hasOwnProperty(audio.m_name))
                {
                    alert("The Audio:" + audio.m_name + " cannot be added as one already exists with this name!");
                    return false;
                }

                Private.m_audioSamples[audio.m_name] = audio;
            
                return true;
            },

            FinishedLoading: function()
            {
                return Private.m_finishedLoading;
            },

            LoadAudio: function()
            {
				var audio = new Audio();
				var canPlayWav = !!audio.canPlayType && "" != audio.canPlayType('audio/ogg');
				if (!canPlayWav)
				{ 
					alert("Can't Play OGG"); 
				}
			
                var file = new XMLReader(), audio, audioSamples, i, audio, LoadedCallback;
                file.Open("DATA/AudioSamples.pdt");

				audio = file.GetBaseNodes("Audio");
				
				var filename = "AUDIO/" + audio[0].getAttribute("Filename");
				var silentSample = audio[0].getAttribute("SilentSample");
				Private.m_audio = new Audio();
				
				LoadedCallback = function()
				{
					Private.m_finishedLoading = true;
				};
		
				$(Private.m_audio).on("loadeddata", LoadedCallback)
				Private.m_audio.src = filename;
                
				audioSamples = audio[0].getElementsByTagName("AudioSample");
				
                for(i = 0; i < audioSamples.length; i++)
                {
                    audioSample = new AudioSample(audioSamples[i].getAttribute("Name"), audioSamples[i].getAttribute("Begin"), audioSamples[i].getAttribute("End"));
					
					if(audioSample.m_name === silentSample)
					{
						Private.m_silentSample = audioSample;
					}
					
                    this.AddAudioSample(audioSample);
                }
                return true;
            },
			
			Play: function(name)
			{				
				if(Private.m_audioSamples.hasOwnProperty(name))
				{
					Private.m_audio.currentTime = Private.m_audioSamples[name].m_beginTime;
					var endDelay = Private.m_audioSamples[name].m_endTime - Private.m_audioSamples[name].m_beginTime;
					Private.m_audio.play();
					clearTimeout(Private.m_silentTimer);
					Private.m_silentTimer = setTimeout(Public.Timer, endDelay * 1000);
				}
			},
			
			Start: function()
			{
				Private.m_audio.currentTime = Private.m_silentSample.m_beginTime;
				Private.m_audio.play();
				Private.m_silentTimer = setTimeout(Public.Timer, (Private.m_silentSample.m_endTime - Private.m_silentSample.m_beginTime) * 1000);
			},
			
			Timer: function()
			{
				Private.m_audio.currentTime = Private.m_silentSample.m_beginTime;
				Private.m_audio.play();
				Private.m_silentTimer = setTimeout(Public.Timer, (Private.m_silentSample.m_endTime - Private.m_silentSample.m_beginTime) * 1000);
			}
        };
    }());

    if(AudioManager.m_instance === undefined)
    {
        AudioManager.m_instance = Public;
    }

    this.Instance = function()
    {
        return AudioManager.m_instance;
    };
}

var TheAudioManager = new AudioManager();