var scriptLoading = true;

function Inherit(child, parent)
{
    var Inheriter = function(){return true;};
    Inheriter.prototype = parent.prototype;
    child.prototype = new Inheriter();
    child.prototype.constructor = child;
    child.BASE = parent.prototype;
}

function LoadScript(scriptName, callback)
{
    var head = document.getElementsByTagName('head')[0],
    script = document.createElement('script');
    
    script.type = 'text/javascript';
    script.src = scriptName;

    script.onreadystatechange = callback;
    script.onload = callback;

    head.appendChild(script);
}

function FinishedScriptLoad()
{
    scriptLoading = false;
}

var engineIncludes = 0;
function EngineIncludes()
{
    engineIncludes++;

    if(engineIncludes === 15)
    {     
        LoadScript("JavaScript/Engine.js", FinishedScriptLoad);
    }
}

var objectIncludes = 0;
function ObjectIncludes()
{
    objectIncludes++;

    if(objectIncludes === 1)
    {
        LoadScript("JavaScript/Object2D.js", EngineIncludes);
        LoadScript("JavaScript/TextGroup.js", EngineIncludes);
        LoadScript("JavaScript/Text.js", EngineIncludes);
    }
}

(function()
{
    LoadScript("JavaScript/DroidMaths.js", EngineIncludes);
    LoadScript("JavaScript/ObjectHandler.js", ObjectIncludes);

    LoadScript("JavaScript/XMLReader.js", EngineIncludes);
    LoadScript("JavaScript/Texture.js", EngineIncludes);
    LoadScript("JavaScript/TextureManager.js", EngineIncludes);

	LoadScript("JavaScript/AudioSample.js", EngineIncludes);
    LoadScript("JavaScript/AudioManager.js", EngineIncludes)
	
    LoadScript("JavaScript/State.js", EngineIncludes);
    LoadScript("JavaScript/StateManager.js", EngineIncludes);
    LoadScript("JavaScript/Timer.js", EngineIncludes);
	LoadScript("JavaScript/Input.js", EngineIncludes);
	
	LoadScript("JavaScript/Process.js", EngineIncludes);
	LoadScript("JavaScript/ProcessManager.js", EngineIncludes);
}());