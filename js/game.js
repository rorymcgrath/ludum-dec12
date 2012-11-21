function mainLoop(canvas, context)
{
    update(canvas, context);
    draw(canvas, context);
    
    window.requestAnimFrame(function()
    {
        mainLoop(canvas, context);
    });
}

function update(canvas, context)
{
    ballx += ballVel;
    if(ballx > canvas.width || ballx < 0)
        ballVel *= -1;
}

function draw(canvas, context)
{
    context.beginPath();
    context.rect(0, 0, canvas.width, canvas.height);
    context.fillStyle = "black";
    context.fill();

    context.translate(ballx, bally);
    
    context.beginPath();
    context.arc(0, 0, 6, 0, 2 * Math.PI, false);
    context.fillStyle = "red";
    context.fill();
    context.lineWidth = 2;
    context.strokeStyle = "black";
    context.stroke();
    
    context.setTransform(1, 0, 0, 1, 0, 0);
}

function init()
{
    var canvas = document.getElementById("canvas");
    var context = canvas.getContext("2d");
    
    //set up world here and load resources

    //set up the main loop
    window.requestAnimFrame = (function(callback)
    {
        return window.requestAnimationFrame ||
        window.webkitRequestAnimationFrame ||
        window.mozRequestAnimationFrame ||
        window.oRequestAnimationFrame ||
        window.msRequestAnimationFrame ||
        function(callback)
        {
            window.setTimeout(callback, 1000 / 60);
        };
    })();

    mainLoop(canvas, context);
}

var ballx = 272;
var bally = 224;
var ballVel = 2;
window.onload = init;
