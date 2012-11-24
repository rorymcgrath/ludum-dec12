function init()
{
    engine.init();
}

function mainLoopDelegate(canvas, context)
{
    engine.mainLoop(canvas, context);
}

var engine = new Engine();
window.onload = init;
