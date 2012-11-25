function CharacterRenderer()
{
    this.execute = function(camera, canvas, context, characterList)
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
        
        for(var c in characterList)
        {
            c = characterList[c];
            p = c.kinematicData.position;
            if(p.x > xLower && p.x < xUpper && p.y > yLower && p.y < yUpper)
            {
                drawPos = new Vector2d(p);
                drawPos.subtractVector(c.characterRender.imageOffset);
                drawPos.subtractVector(camOffset);
                context.drawImage(c.characterRender.stillAnim, drawPos.x, drawPos.y);
                
                drawPos.addVector(c.characterRender.imageOffset);
                context.translate(drawPos.x, drawPos.y);
                context.rotate(c.kinematicData.orientation);
                context.beginPath();
                context.moveTo(0, 0)
                context.lineTo(20, 0);
                context.lineWidth = 4;
                context.strokeStyle = "red";
                context.lineCap = "round";
                context.stroke();
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
                drawPos = new Vector2d(p);
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
            var drawPos = new Vector2d(p);
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
        var tiles = level.data.tiles;

        var camera = level.data.camera;
        var xLower = (camera.kinematicData.position.x - 
            (canvas.width / 2) - 20) / tSize;
        var xUpper = (camera.kinematicData.position.x + 
            (canvas.width / 2) + 20) / tSize;
        var yLower = (camera.kinematicData.position.y - 
            (canvas.height / 2) - 20) / tSize;
        var yUpper = (camera.kinematicData.position.y + 
            (canvas.height / 2) + 20) / tSize;
        var p;
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
                    context.drawImage(level.data.tileData.data[tiles[y][x]].img, 
                    x * tSize - camOffset.x,
                    y * tSize - camOffset.y);
                }
                

            //temp rectangle draw
            /*
                context.beginPath();
                context.rect(x * tSize - camOffset.x, 
                    y * tSize - camOffset.y, tSize, tSize);
                switch(level.data.tileData.data[tiles[y][x]].name)
                {
                    case "NONE":
                        context.fillStyle = "black";
                        break;
                    case "WALL":
                        context.fillStyle = "white";
                        break;
                    case "GROUND":
                        context.fillStyle = "gray";
                        break;
                }
                context.fill();
                context.lineWidth = 0.5;
                context.strokeStyle = 'red';
                context.stroke();
                */
            }
        }
    }
}
