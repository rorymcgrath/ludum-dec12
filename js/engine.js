function GameStateMenu()
{
    this.menu = entityFactory.makeMenu();
    this.textRenderer = new MenuTextRenderer();
    this.menuInputHandler = new MenuInputHandler();
    
    this.init = function()
    {
        var menuText = entityFactory.makeText("HitBoy:", "50px Georgia", "white");
        menuText.kinematicData.position = new Vector2d(
            engine.canvas.width / 2, 150);
        var subText = entityFactory.makeText("Silent & Violent", "30px Georgia", "red");
        subText.kinematicData.position = new Vector2d(
            engine.canvas.width / 2, 190);
        var playText = entityFactory.makeText("Press <ENTER> to begin!", 
            "20px Georgia", "white");
        playText.kinematicData.position = new Vector2d(
            engine.canvas.width / 2, 300);
        this.menu.data.textList.push(menuText);
        this.menu.data.textList.push(subText)
        this.menu.data.textList.push(playText);
    }
    
    this.update = function(canvas, context, delta)
    {
        this.menuInputHandler.execute(this.menu, engine.inputQueue);
        if(this.menu.continuePressed)
        {
            engine.stateInGame.loadLevel("level01");
            engine.setState(engine.stateInGame);
        }
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

    this.loadLevel = function(levelName)
    {
        this.level = loadLevel(levelName);
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
