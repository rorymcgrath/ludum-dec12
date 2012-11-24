function CharacterRenderer(camera, canvas, context, characterList)
{
    var xLower = camera.kinematicData.position.x - (canvas.width / 2);
    var xUpper = camera.kinematicData.position.x + (canvas.width / 2);
    var yLower = camera.kinematicData.position.y + (canvas.height / 2);
    var yUpper = camera.kinematicData.position.y - (canvas.height / 2);
    var p;
    var drawPos;
    
    for(var c in characterList)
    {
        p = c.kinematicData.position;
        if(p.x > xLower && p.x < xUpper && p.y > yLower && p.y < yUpper)
        {
            drawPos = new Vector2d(p);
            drawPos.subtractVector(c.characterRender.imageOffset);
            
            context.translate(drawPos.x, drawPos.y);
            
            context.beginPath();
            context.arc(0, 0, 6, 0, 2 * Math.PI, false);
            context.fillStyle = "red";
            context.fill();
            context.lineWidth = 2;
            context.strokeStyle = "black";
            context.stroke();

            context.setTransform(1, 0, 0, 1, 0, 0);
        }
    }
}

