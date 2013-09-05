function AudioManager()
{
    var Public;
   
    (function(){
        var Private = 
        {
            //Variables
            m_numLoaded: 0,
            m_numToLoad: 0,
            m_audioSamples: {}
        },
            
        //Function Declarations
        AddAudioSample,
        FinishedLoading,
        GetAudioSample,
        LoadAudio;

        Public = 
        {
            //Function Definitions
            AddAudioSample: function(audio)
            {
				if(Private.m_numLoaded === Private.m_numToLoad)
				{
					return;
				}
			
                if(Private.m_audioSamples.hasOwnProperty(audio.GetName()))
                {
                    alert("The Audio:" + audio.GetName() + " cannot be added as one already exists with this name!");
                    return false;
                }

                Private.m_audioSamples[audio.GetName()] = audio;
                Private.m_numLoaded++;
            
                return true;
            },

            FinishedLoading: function()
            {
                if(Private.m_numToLoad === Private.m_numLoaded)
                {
                    return true;
                }
                return false;
            },

            GetAudioSample: function(audioName)
            {
                if(!Private.m_audioSamples.hasOwnProperty(audioName))
                {
                    alert("Cannot retrieve audio:" + audioName + " from TheAudioManager, because it does not exist!");
                    return false;
                }
                return Private.m_audioSamples[audioName];
            },

            LoadAudio: function()
            {
				var audio = new Audio();
				var canPlayWav = !!audio.canPlayType && "" != audio.canPlayType('audio/ogg');
				if (!canPlayWav)
				{ 
					alert("Can't Play OGG"); 
				}
			
                var file = new XMLReader(), audioSamples, i, audio;
                file.Open("DATA/AudioSamples.pdt");

                audioSamples = file.GetBaseNodes("AudioSample");
                Private.m_numToLoad = audioSamples.length;

                for(i = 0; i < audioSamples.length; i++)
                {
                    audioSample = new AudioSample();
                    audioSample.Load(audioSamples[i].getAttribute("Name"), audioSamples[i].getAttribute("Filename"));
                }
                return true;
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