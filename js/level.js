function TileData()
{
    this.data = [];
    this.data[0] = 
    {
        name : "NONE",
        passable : false,
        img : engine.content.getImage("placeHolder")
    }
    this.data[1] = 
    {
        name : "WALL",
        passable : false,
        img : engine.content.getImage("tileWall")
    }
    this.data[2] = 
    {
        name : "GROUND",
        passable : true,
        img : engine.content.getImage("tileGround")
    }
}

function FurnitureData()
{
    this.data = [];
    this.data[3] = { name : "DOOR" }
    this.data[4] = { name : "PLAYER_START" }
    this.data[5] = { name : "PLAYER_END" }
    this.data[6] = { name : "GUARD_POSITION" }
    this.data[7] = { name : "GUARD_PATROL" }
    this.data[8] = { name : "BOSS_POSITION" }
}

function loadLevel(levelName)
{
    var tileData = new TileData();
    var furnitureData = new FurnitureData();
    var playerStartPosition = new Vector2d(0, 0);
    var tSize = Consts.dimensions.tileSize;
    
    var level = {};
    level.data = new ClevelData();
    level.data.tileData = tileData;
    level.data.furnitureData = furnitureData;
    
    //var image = engine.content.getLevel(levelName);
    //var ghostCanvas = document.createElement("canvas");
    //ghostCanvas.width = image.width;
    //ghostCanvas.height = image.height;
    //var ctx = ghostCanvas.getContext("2d");
    //ctx.drawImage(image, 0, 0);
    //var ghostImage = ctx.getImageData(0,0,ghostCanvas.width,ghostCanvas.height);
 
    //store coordinate in map space of current tile so we can
    //set entity starting positions as needed
    var x = 0, y = 0;
    
    var imageData = levelData[levelName + "Pixels"];
    var height = levelData[levelName + "Height"];
    var width = levelData[levelName + "Width"];
    for (var i = 0; i < height; ++i)
    {
        var tileRow = [];
        var furnitureRow = [];
        for (var j = 0; j < width * 4; j += 4)
        {
            var index = i * width * 4 + j;
            var tmp = 0;
            tmp = imageData[index] << 16;
            tmp = tmp|(imageData[index + 1] << 8);
            tmp = tmp|imageData[index + 2];
            var val = Consts.tileColours[tmp];
            if(val >= Consts.tileColours.tileTypeCount)
            {
                if(furnitureData.data[val].name === "PLAYER_START")
                {
                   playerStartPosition = new Vector2d(
                    x * tSize + (tSize / 2), 
                    y * tSize + (tSize / 2)) 
                }
                furnitureRow.push(val);
                tileRow.push(2);
            }
            else
            {
                furnitureRow.push(0);
                tileRow.push(val);
            }
            x += 1;
        }
        y += 1;
        x = 0;
        level.data.tiles.push(tileRow);
        level.data.furniture.push(furnitureRow);
    }
    
    //set up player, camera, enemies, etc
    var camera = new Entity();
    camera.kinematicData = new CkinematicData(2, 4, 0);
    camera.kinematicData.position = new Vector2d(playerStartPosition);
    level.data.camera = camera;
    
    var player = entityFactory.makePC(500, 100, 3, 
        engine.content.getImage("playerWalk"), 
        engine.content.getImage("playerWalk"))
    player.kinematicData.position = playerStartPosition;
    level.data.player = player;
    
    level.data.entityList.push(camera);
    level.data.entityList.push(player);
    
    level.data.characterList.push(player);
    return level;
}

