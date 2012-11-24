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
            }
        }
    }
}

