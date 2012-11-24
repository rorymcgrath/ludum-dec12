function PlayerKinematicUpdater()
{
    this.execute = function(player, deltaRatio)
    {
        var facingVec;
        var k = player.kinematicData;
        
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
        
        if(player.playerInput.up && !player.playerInput.down)
        {
            facingVec.multiply(k.maxAcceleration);
            facingVec.multiply(deltaRatio);
            k.velocity.addVector(facingVec);
        }
        else if(player.playerInput.down && !player.playerInput.up)
        {
            facingVec.multiply(-1);
            facingVec.multiply(k.maxAcceleration / 2);
            facingVec.multiply(deltaRatio);
            k.velocity.addVector(facingVec);
        }
        else if(k.velocity.length() < Vector2d.epsilon)
        {
            facingVec.multiply(0);
        }
        else
        {
            var newDir = new Vector2d(k.velocity);
            newDir.multiply(-1);

            newDir.multiply(k.maxAcceleration);
            newDir.multiply(deltaRatio);
            
            if(newDir.length() > k.velocity.length())
            {
                newDir.normalize();
                newDir.multiply(k.velocity.length());
            }
            k.velocity.addVector(newDir);
        }
        if(k.velocity.length() > k.maxVelocity)
        {
            k.velocity.normalize();
            k.velocity.multiply(k.maxVelocity);
        }
        k.position.addVector(k.velocity);
    }
}