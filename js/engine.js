var GameState = 
{
    menu: 
    {
        update : function(canvas, context, delta)
        {
            var ratio = delta / 1000.0;
            var moveVector = new Math2d.Vector2d(ballVel);
            moveVector.multiply(ratio);

            ballPos.addVector(moveVector);
            if(ballPos.x > canvas.width)
                ballVel.x = Math.abs(ballVel.x) * -1;
            else if(ballPos.x < 0)
                ballVel.x = Math.abs(ballVel.x);
        },

        draw : function(canvas, context)
        {
            context.beginPath();
            context.rect(0, 0, canvas.width, canvas.height);
            context.fillStyle = "black";
            context.fill();

            context.translate(ballPos.x, ballPos.y);

            context.beginPath();
            context.arc(0, 0, 6, 0, 2 * Math.PI, false);
            context.fillStyle = "red";
            context.fill();
            context.lineWidth = 2;
            context.strokeStyle = "black";
            context.stroke();

            context.setTransform(1, 0, 0, 1, 0, 0);
        }
    },
        
    inGame: 
    {
        
    }
}

var engine = 
{
    currentState : GameState.menu,
    lastTime : new Date().getTime(),
    init : function()
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

    this.mainLoop(canvas, context);
    },
    
    mainLoop : function(canvas, context)
    {
        var now = new Date();
        var time = now.getTime();
        var delta = time - this.lastTime;
        this.lastTime = time;

        this.currentState.update(canvas, context, delta);
        this.currentState.draw(canvas, context);

        window.requestAnimFrame(function()
        {
            engine.mainLoop(canvas, context);
        });
    }
};

