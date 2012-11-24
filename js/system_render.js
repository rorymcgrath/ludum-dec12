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
                context.fillText(t.text.string);
                context.font = oldFont;
            }
        }
    }
}