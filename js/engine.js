function GameStateMenu()
{
    this.update = function()
    {
        engine.stateInGame.loadLevel();
        engine.setState(engine.stateInGame);
    }
    this.draw = function()
    {

    }
}

function GameStateInGame()
{
    this.level = new Entity();
    this.level.data = new ClevelData();
    
    this.characterRenderer = new CharacterRenderer();

    this.loadLevel = function()
    {
        this.level = new Entity();
        this.level.data = new ClevelData();
        
        var camera = new Entity();
        camera.kinematicData = new CkinematicData(20, 50);
        camera.kinematicData.position = new Vector2d(500, 500);
        
        var ball = new Entity();
        ball.kinematicData = new CkinematicData(20, 50);
        ball.kinematicData.position = new Vector2d(500, 600);
        //ball.kinematicData.velocity = new Vector2d(2, 0);

        var image = new Image();
        image.src = "img/ball.png"

        ball.characterRender = new CcharacterRender(image, image);

        this.level.data.camera = camera;
        this.level.data.entityList.push(ball);
        this.level.data.entityList.push(camera);
        this.level.data.characterList.push(ball);
    }

    this.update = function(canvas, context, delta)
    {
        var ratio = delta / 1000.0;
        var moveVector = new Vector2d(1, 0);
        moveVector.multiply(ratio);

        var ball = this.level.data.entityList[0];
        var p = ball.kinematicData.position;
        var v = ball.kinematicData.velocity;
        
        //p.x += 2;
        
        //p.addVector(moveVector);
        //if(p.x > canvas.width)
        //    v.x = Math.abs(v.x) * -1;
        //else if(p.x < 0)
        //    v.x = Math.abs(v.x);
    }

    this.draw = function(canvas, context)
    {
        context.beginPath();
        context.rect(0, 0, canvas.width, canvas.height);
        context.fillStyle = "black";
        context.fill();
        
        this.characterRenderer.execute(this.level.data.camera, 
            canvas, context, this.level.data.characterList)
    }
}

function Engine()
{
    this.stateMenu = new GameStateMenu();
    this.stateInGame = new GameStateInGame();
    this.currentState = this.stateMenu;
    this.inputStack = [];
    this.isPressed = {};
    
    this.setState = function(state)
    {
        this.currentState = state;
    }
    
    this.init = function()
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
    }
    
    this.mainLoop = function(canvas, context)
    {
        var now = new Date();
        var time = now.getTime();
        var delta = time - this.lastTime;
        this.lastTime = time;

        this.currentState.update(canvas, context, delta);
        this.currentState.draw(canvas, context);

        window.requestAnimFrame(function()
        {
            mainLoopDelegate(canvas, context);
        });
    }  
}
function doKeyUp(event)
{
    engine.inputStack.push([event.keyCode,false]);
    engine.isPressed[event.keyCode] = false;
}

function doKeyDown(event)
{
    engine.inputStack.push([event.keyCode,true]);
    engine.isPressed[event.keyCode] = true; 
}

