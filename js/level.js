function TileData()
{
    this.data = [];
    this.data[0] = 
    {
        name : "NONE",
        passable : false,
        img : engine.content.getImage("placeHolder")
    };
    this.data[1] = 
    {
        name : "WALL",
        passable : false,
        img : engine.content.getImage("tileWall")
    };
    this.data[2] = 
    {
        name : "GROUND",
        passable : true,
        img : engine.content.getImage("tileGround")
    };
}

function FurnitureData()
{
    this.data = [];
    this.data[3] = {name : "DOOR"}
    this.data[4] = {name : "PLAYER_START"}
    this.data[5] = {name : "PLAYER_END"}
    this.data[6] = {name : "GUARD_POSITION"}
    this.data[7] = {name : "GUARD_PATROL"}
    this.data[8] = {name : "BOSS_POSITION"}
}

function loadLevel(levelName)
{
    var tileData = new TileData();
    var furnitureData = new FurnitureData();
    var playerStartPosition = new Vector2d(0, 0);
    var tSize = Consts.Dimensions.TILE_SIZE;
    
    var level = new World();
    level.tileData = tileData;
    level.furnitureData = furnitureData;
    level.createGroup(World.GroupNames.ENEMIES);
    level.createGroup(World.GroupNames.BULLETS);
    level.createGroup(World.GroupNames.CHARACTERS);
    
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
            tmp = tmp | (imageData[index + 1] << 8);
            tmp = tmp | imageData[index + 2];
            var val = Consts.TileColours[tmp];
            if(val >= Consts.TileColours.TILE_TYPE_COUNT)
            {
                if(furnitureData.data[val].name === "PLAYER_START")
                {
                   playerStartPosition = new Vector2d(
                    x * tSize + (tSize / 2), 
                    y * tSize + (tSize / 2)) 
                }
                else if(furnitureData.data[val].name === "GUARD_POSITION")
                {
                    var guard = entityFactory.makeNPC(
                        entityFactory.BluePrint.GUARD);
                    guard.kinematicData.position = new Vector2d(
                    x * tSize + (tSize / 2), 
                    y * tSize + (tSize / 2))
                    
                    guard.motionRequest.target = guard.kinematicData.position.clone();
                    guard.motionRequest.facing = guard.kinematicData.position.clone();
                        
                    level.addEntity(World.GroupNames.ENEMIES, guard);
                    level.addEntity(World.GroupNames.CHARACTERS, guard);
                }
                else if(furnitureData.data[val].name === "BOSS_POSITION")
                {
                    var boss = entityFactory.makeNPC(
                        entityFactory.BluePrint.BOSS);
                    boss.kinematicData.position = new Vector2d(
                    x * tSize + (tSize / 2), 
                    y * tSize + (tSize / 2))
                    
                    level.addEntity(World.GroupNames.ENEMIES, boss);
                    level.addEntity(World.GroupNames.CHARACTERS, boss);
                }
                
                furnitureRow.push(val);
                tileRow.push(2);
            }
            else
            {
                if(val === undefined)
                    val = 0;
                furnitureRow.push(0);
                tileRow.push(val);
            }
            x += 1;
        }
        y += 1;
        x = 0;
        level.tiles.push(tileRow);
        level.furniture.push(furnitureRow);
    }
    
    //set up player, camera, enemies, etc
    var camera = new Entity();
    camera.kinematicData = new CkinematicData(2, 4, 0);
    camera.kinematicData.position = playerStartPosition.clone();
    
    level.tagEntity(World.TagNames.CAMERA, camera);
    
    
    var player = entityFactory.makePC(
        entityFactory.BluePrint.PC);
    player.kinematicData.position = playerStartPosition;
    
    level.tagEntity(World.TagNames.PLAYER, player);
    level.addEntity(World.GroupNames.CHARACTERS, player);
    return level;
}
