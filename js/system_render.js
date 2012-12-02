function MetaDataRenderer()
{
    this.execute = function(canvas, context, level)
    {
        var camera = level.getEntity(World.TagNames.CAMERA);
        
        var xLower = camera.kinematicData.position.x - (canvas.width / 2) - 20;
        var xUpper = camera.kinematicData.position.x + (canvas.width / 2) + 20;
        var yLower = camera.kinematicData.position.y - (canvas.height / 2) - 20;
        var yUpper = camera.kinematicData.position.y + (canvas.height / 2) + 20;
        var p, c;
        var drawPos;
        var camOffset = new Vector2d(
            camera.kinematicData.position.x - 
            canvas.width / 2, 
            camera.kinematicData.position.y 
            - canvas.height / 2);
        
        //draw bounding circles
        var cList = level.getGroup(World.GroupNames.CHARACTERS);
        for(var i = 0; i < cList.length; ++i)
        {
            c = cList[i];
            p = c.collision.volume.position;
            drawPos = p.clone().addVector(c.kinematicData.position);
            if(drawPos.x > xLower && drawPos.x < xUpper && 
                drawPos.y > yLower && drawPos.y < yUpper)
            {
                drawPos.subtractVector(camOffset);
                context.translate(drawPos.x, drawPos.y);
                
                context.beginPath();
                context.arc(0, 0, c.collision.volume.radius, 0, 2 * Math.PI, false);
                context.fillStyle = "rgba(0, 0, 255, 0.3)";
                context.fill();
                context.lineWidth = 1;
                context.strokeStyle = "black";
                context.stroke();

                context.setTransform(1, 0, 0, 1, 0, 0);
            }
        }
    }
}

function CharacterRenderer()
{
    this.execute = function(canvas, context, level)
    {
        var camera = level.getEntity(World.TagNames.CAMERA);
        
        var xLower = camera.kinematicData.position.x - (canvas.width / 2) - 20;
        var xUpper = camera.kinematicData.position.x + (canvas.width / 2) + 20;
        var yLower = camera.kinematicData.position.y - (canvas.height / 2) - 20;
        var yUpper = camera.kinematicData.position.y + (canvas.height / 2) + 20;
        var p, c;
        var drawPos;
        var camOffset = new Vector2d(
            camera.kinematicData.position.x - 
            canvas.width / 2, 
            camera.kinematicData.position.y 
            - canvas.height / 2);
        
        var cList = level.getGroup(World.GroupNames.CHARACTERS);
        for(var i = 0; i < cList.length; ++i)
        {
            c = cList[i];
            p = c.kinematicData.position;
            if(p.x > xLower && p.x < xUpper && p.y > yLower && p.y < yUpper)
            {
                drawPos = p.clone();
                drawPos.subtractVector(camOffset);
                context.translate(drawPos.x, drawPos.y);
                context.rotate(c.kinematicData.orientation);
                context.drawImage(c.characterRender.stillAnim, 
                    -c.characterRender.imageOffset.x, 
                    -c.characterRender.imageOffset.y);
                context.setTransform(1, 0, 0, 1, 0, 0);
            }
        }
    }
}

function TextRenderer()
{
    this.execute = function(camera, canvas, context, textList)
    {
        var xLower = camera.kinematicData.position.x - (canvas.width / 2) - 20;
        var xUpper = camera.kinematicData.position.x + (canvas.width / 2) + 20;
        var yLower = camera.kinematicData.position.y - (canvas.height / 2) - 20;
        var yUpper = camera.kinematicData.position.y + (canvas.height / 2) + 20;
        var p;
        var drawPos;
        var camOffset = new Vector2d(
            camera.kinematicData.position.x - 
            canvas.width / 2, 
            camera.kinematicData.position.y 
            - canvas.height / 2);
        
        for(var t in textList)
        {
            t = textList[t];
            p = t.kinematicData.position;
            if(p.x > xLower && p.x < xUpper && p.y > yLower && p.y < yUpper)
            {
                drawPos = p.clone();
                var textOffset = new Vector2d(
                    context.measureText(t.text.string) / 2, 0);
                
                drawPos.subtractVector(textOffset);
                drawPos.subtractVector(camOffset);
                
                var oldFont = context.font;
                context.font = t.text.font;
                context.fillStyle = t.text.color;
                context.fillText(t.text.string, p.x, p.y);
                context.font = oldFont;
            }
        }
    }
}

function MenuTextRenderer()
{
    this.execute = function(context, textList)
    {
        for(var t in textList)
        {
            t = textList[t];
            var oldFont = context.font;
            context.font = t.text.font;
            
            var p = t.kinematicData.position;
            var textWidth = context.measureText(t.text.string);
            var textOffset = new Vector2d(textWidth.width / 2, 0);
            var drawPos = p.clone();
            drawPos.subtractVector(textOffset);
            
            context.fillStyle = t.text.color;
            context.fillText(t.text.string, drawPos.x, drawPos.y);
            context.font = oldFont;
        }
    }
}

function LevelRenderer()
{
    this.execute = function(canvas, context, level)
    {
        var tSize = Consts.dimensions.tileSize;
        var tiles = level.tiles;

        var camera = level.getEntity(World.TagNames.CAMERA);
        var xLower = (camera.kinematicData.position.x - 
            (canvas.width / 2) - 20) / tSize;
        var xUpper = (camera.kinematicData.position.x + 
            (canvas.width / 2) + 20) / tSize;
        var yLower = (camera.kinematicData.position.y - 
            (canvas.height / 2) - 20) / tSize;
        var yUpper = (camera.kinematicData.position.y + 
            (canvas.height / 2) + 20) / tSize;

        var camOffset = new Vector2d(
            camera.kinematicData.position.x - 
            canvas.width / 2, 
            camera.kinematicData.position.y 
            - canvas.height / 2);

        xLower = Math.round(Math.max(xLower, 0));
        yLower = Math.round(Math.max(yLower, 0));
        xUpper = Math.round(Math.min(xUpper, tiles[0].length - 1));
        yUpper = Math.round(Math.min(yUpper, tiles.length - 1));    
        for(var y = yLower; y <= yUpper; ++y)
        {
            for(var x = xLower; x <= xUpper; ++x)
            {
                if(tiles[y][x] !== 0)
                {
                    context.drawImage(level.tileData.data[tiles[y][x]].img, 
                    x * tSize - camOffset.x,
                    y * tSize - camOffset.y);
                }
            }
        }
    }
}
