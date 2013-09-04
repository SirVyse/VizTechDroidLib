var gameLoading = true;

function FinishedGameLoad()
{
    gameLoading = false;
}

var gameIncludes = 0;
function GameIncludes()
{
    gameIncludes++;

    if(gameIncludes === 3)
    {     
		FinishedGameLoad();
    }
}

(function()
{
    LoadScript("WildCash/MainGameState.js", GameIncludes);
    LoadScript("WildCash/ButtonProcess.js", GameIncludes);
	LoadScript("WildCash/Buttons.js", GameIncludes);
}());