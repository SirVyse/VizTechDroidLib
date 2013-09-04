var gameLoading = true;

function FinishedGameLoad()
{
    gameLoading = false;
}

var gameIncludes = 0;
function GameIncludes()
{
    gameIncludes++;

    if(gameIncludes === 2)
    {     
		FinishedGameLoad();
    }
}

(function()
{
    LoadScript("WildCash/MainGameState.js", GameIncludes);
    LoadScript("WildCash/ButtonProcess.js", GameIncludes);
}());