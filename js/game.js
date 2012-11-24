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
