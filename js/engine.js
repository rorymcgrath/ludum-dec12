function GameStateMenu()
{
    this.menu = entityFactory.makeMenu();
    this.textRenderer = new MenuTextRenderer();
    
    this.init = function()
    {
        var menuText = entityFactory.makeText("HitBoy", "40px Georgia", "white");
        menuText.kinematicData.position = new Vector2d(
            engine.canvas.width / 2, 150);
        var playText = entityFactory.makeText("Press SPACE to begin!", 
            "30px Georgia", "white");
        playText.kinematicData.position = new Vector2d(
            engine.canvas.width / 2, 300);
        this.menu.data.textList.push(menuText);
        this.menu.data.textList.push(playText);
    }
    
    this.update = function(canvas, context, delta)
    {
        //engine.stateInGame.loadLevel();
        //engine.setState(engine.stateInGame);
    }
    this.draw = function(canvas, context)
    {
        context.beginPath();
        context.rect(0, 0, canvas.width, canvas.height);
        context.fillStyle = "black";
        context.fill();
        
        this.textRenderer.execute(context, this.menu.data.textList)
    }
}

function GameStateInGame()
{
    this.level = new Entity();
    this.level.data = new ClevelData();
    
    this.characterRenderer = new CharacterRenderer();
    this.playerKinematicUpdater = new PlayerKinematicUpdater();
    this.inGameInputHandler = new InGameInputHandler();

    this.loadLevel = function()
    {
        var levelName = 'level01';
        var testing = loadlevel(levelName);
        this.level = new Entity();
        this.level.data = new ClevelData();
        
        var camera = new Entity();
        camera.kinematicData = new CkinematicData();
        camera.kinematicData.position = new Vector2d(500, 500);
        
        var ball = new Entity();
        ball.kinematicData = new CkinematicData(6, 3);
        ball.kinematicData.position = new Vector2d(500, 600);
        //ball.kinematicData.velocity = new Vector2d(2, 0);

        ball.characterRender = new CcharacterRender(
            engine.content.getImage("playerWalk"), 
            engine.content.getImage("playerWalk"));
        ball.playerInput = new CplayerInput();

        this.level.data.player = ball;
        this.level.data.camera = camera;
        this.level.data.entityList.push(ball);
        this.level.data.entityList.push(camera);
        this.level.data.characterList.push(ball);
    }

    this.update = function(canvas, context, delta)
    {
        var ratio = delta / 1000.0;
        this.inGameInputHandler.execute(this.level.data.player, 
            engine.inputStack, engine.inputMap);        
        this.playerKinematicUpdater.execute(this.level.data.player, 
            ratio);
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

function Engine(content)
{
    this.stateMenu = new GameStateMenu();
    this.stateInGame = new GameStateInGame();
    this.currentState = this.stateMenu;
    this.inputQueue = [];
    this.inputMap = {};
    this.content = content;
    
    this.setState = function(state)
    {
        this.currentState = state;
    }
    
    this.init = function()
    {
        this.canvas = document.getElementById("canvas");
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
        
        this.stateMenu.init();
        this.mainLoop(this.canvas, context);
    }
    
    this.mainLoop = function(canvas, context)
    {
        var now = new Date();
        var time = now.getTime();
        var delta = time - this.lastTime;
        this.lastTime = time;

        this.currentState.update(canvas, context, delta);
        this.inputStack = [];
        this.currentState.draw(canvas, context);

        window.requestAnimFrame(function()
        {
            mainLoopDelegate(canvas, context);
        });
    }  
}
