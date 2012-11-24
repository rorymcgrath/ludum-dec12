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

function PlayerKinematicUpdater()
{
    this.execute = function(player, deltaRatio)
    {
        var facingVec;
        var k = player.kinematicData;
        //facingVec = new Vector2d(0, 0);
        //facingVec.fromRads(k.orientation);
        
        if(player.playerInput.right)
        {
            k.orientation += k.rotationVelocity * deltaRatio;
        }
        if(player.playerInput.left)
        {
            k.orientation -= k.rotationVelocity * deltaRatio;
        }
        
        facingVec = new Vector2d(0, 0);
        facingVec.fromRads(k.orientation);
        facingVec.normalize();
        
        if(player.playerInput.up)
        {
            facingVec.multiply(k.maxAcceleration);
            facingVec.multiply(deltaRatio);
            k.velocity.addVector(facingVec);
        }
        else if(k.velocity.length() < Vector2d.epsilon)
        {
            facingVec.multiply(0);
        }
        else
        {
            //var wasFacing = new Vector2d(facingVec);
            var newDir = new Vector2d(k.velocity);
            //facingVec.multiply(-1);
            newDir.multiply(-1);

            //facingVec.multiply(k.maxAcceleration);
            //facingVec.multiply(deltaRatio);
            newDir.multiply(k.maxAcceleration);
            newDir.multiply(deltaRatio);
            
            //if(facingVec.length() > k.velocity.length())
            if(newDir.length() > k.velocity.length())
            {
                newDir.normalize();
                newDir.multiply(k.velocity.length());
            }
            k.velocity.addVector(newDir);
        }
        //player.playerInput.down = false;
        //player.playerInput.right = false;
        //player.playerInput.left = false;

        if(k.velocity.length() > k.maxVelocity)
        {
            k.velocity.normalize();
            k.velocity.multiply(k.maxVelocity);
        }
        k.position.addVector(k.velocity);
        console.log(k.velocity.length());
    }
}

function InGameInputHandler()
{
    this.execute = function(player, inputQueue, inputMap)
    {
        for(var i = 0; i < inputQueue.length; ++i)
        {
            var e = inputQueue[i];
        }
        
        player.playerInput.up = false;
        player.playerInput.down = false;
        player.playerInput.right = false;
        player.playerInput.left = false;
        
        //check if keys held down
        if(inputMap[Consts.keys.W])
        {
            player.playerInput.up = true;
        }
        if(inputMap[Consts.keys.A])
        {
            player.playerInput.left = true;
        }
        if(inputMap[Consts.keys.S])
        {
            player.playerInput.down = true;
        }
        if(inputMap[Consts.keys.D])
        {
            player.playerInput.right = true;
        }
    }
}
