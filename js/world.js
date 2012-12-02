function World()
{
    //map etc.
    var groupMap = {};
    var tagMap = {};
    
    this.tagEntity = function(tag, entity)
    {
        tagMap[tag] = entity;
    }
    
    this.addEntity = function(groupName, entity)
    {
        groupMap[groupName].push(entity);
    }
    
    this.getEntity = function(tagName)
    {
        return tagMap[tagName];
    }
    
    this.getGroup = function(groupName)
    {
        return groupMap[groupName];
    }
    
    this.createGroup = function(groupName)
    {
        groupMap[groupName] = [];
    }
    
    this.getGroup = function(groupName)
    {
        return groupMap[groupName];
    }
    
    this.getEntity = function(tagName)
    {
        return tagMap[tagName];
    }
    
    this.tiles = [];
    this.furniture = [];
    this.tileData = {};
    this.furnitureData = {};
}

World.GroupNames = 
{
    CHARACTERS : "CHARACTERS",
    ENEMIES : "ENEMIES",
    BULLETS : "BULLETS"
}

World.TagNames = 
{
    CAMERA : "CAMERA",
    PLAYER : "PLAYER"
}
