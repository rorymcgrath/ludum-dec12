var Math2d = 
{
    Vector2d : function(x, y)
    {
        if(x instanceof Math2d.Vector2d)
        {
            this.x = x.x;
            this.y = x.y;
        }
        else
        {
            this.x = x;
            this.y = y;
        }
        this.multiply = function(scalar)
        {
            this.x *= scalar;
            this.y *= scalar;
        };
        this.addScalar = function(scalar)
        {
            this.x += scalar; 
            this.y += scalar;
        };
        this.addVector = function(vector)
        {
            this.x += vector.x; 
            this.y += vector.y;
        };
        this.subtractScalar = function(scalar)
        {
            this.x -= scalar; 
            this.y -= scalar;
        };
        this.subtractVector = function(vector)
        {
            this.x -= vector.x; 
            this.y -= vector.y;
        };
        this.dotProduct = function(vector)
        {
            return this.x * vector.x + this.y * vector.y
        };
        this.length = function()
        {
            return Math.sqrt(Math.pow(this.x, 2) + Math.pow(this.y, 2));
            //or
            //return Math.pow(this.dotProduct(this), 0.5);
        };
        this.normalize = function()
        {
            this.multiply(1 / this.length()); 
        };
        this.equals = function(vector)
        {
            return this.x === vector.x && this.y === vector.y;
        };
    }
};

function mainLoop(canvas, context)
{
    update(canvas, context);
    draw(canvas, context);
    
    window.requestAnimationFrame(
        function()
        {
            mainLoop();
        }
    );
}

function update(canvas, context)
{
    
}

function draw(canvas, context)
{
    context.beginPath();
    context.rect(0, 0, canvas.width, canvas.height);
    context.fillStyle = "black";
    context.fill();

    context.translate(canvas.width / 2, canvas.height / 2);
    
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

window.onload = init;
