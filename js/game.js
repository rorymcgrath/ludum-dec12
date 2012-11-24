function init()
{
    engine.init();
}


var ballPos = new Math2d.Vector2d(272, 224);
var ballVel = new Math2d.Vector2d(50, 0);
var lastTime = new Date().getTime();
window.onload = init;
