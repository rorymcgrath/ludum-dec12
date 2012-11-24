function doKeyUp(event)
{
    engine.inputQueue.push([event.keyCode,false]);
    engine.inputMap[event.keyCode] = false;
}

function doKeyDown(event)
{
    engine.inputQueue.push([event.keyCode,true]);
    engine.inputMap[event.keyCode] = true; 
}

function init()
{
    engine.init();
}

function mainLoopDelegate(canvas, context)
{
    engine.mainLoop(canvas, context);
}

window.addEventListener('keydown', doKeyDown, true);
window.addEventListener('keyup', doKeyUp, true);
var engine = new Engine();
window.onload = init;