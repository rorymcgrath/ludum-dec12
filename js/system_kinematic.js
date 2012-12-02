function PlayerKinematicUpdater()
{
    this.execute = function(player, deltaRatio)
    {
        var k, accVec, moveVec;
        k = player.kinematicData;
        accVec = new Vector2d().fromRads(k.orientation).normalize();
         
        if(player.playerInput.right)
        {
            k.orientation += k.rotationVelocity * deltaRatio;
            k.orientation %= 2 * Math.PI;
        }
        if(player.playerInput.left)
        {
            k.orientation -= k.rotationVelocity * deltaRatio;
            k.orientation %= 2 * Math.PI;
        }
        
        if(player.playerInput.up && !player.playerInput.down)
        {
            accVec.multiply(k.maxAcceleration * deltaRatio);
        }
        else if(player.playerInput.down && !player.playerInput.up)
        {
            accVec.multiply(-1).
                multiply(k.maxAcceleration * deltaRatio / 2);
        }
        else if(k.velocity.length() < Vector2d.epsilon)
        {
            accVec.multiply(0);
        }
        else
        {
            accVec = k.velocity.clone().multiply(-1).normalize().
                multiply(k.maxAcceleration * deltaRatio);
            if(accVec.length() > k.velocity.length())
            {
                accVec.normalize().multiply(k.velocity.length());
            }
        }
        
        k.velocity.addVector(accVec);
        if(k.velocity.length() > k.maxVelocity)
        {
            k.velocity.normalize().multiply(k.maxVelocity);
        }
        
        moveVec = k.velocity.clone().multiply(deltaRatio);
        k.position.addVector(moveVec);
    }
}

function AiKinematicUpdater()
{
    this.execute = function(entityList, deltaRatio)
    {
        var entity, k, currentFacing, targetFacing, rotAngle,
            dp, directionVec, distance, moveVec;
            
        for(var i = 0; i < entityList.length; ++i)
        {
            entity = entityList[i];
            k = entity.kinematicData;
            
            //rotate to face desired facing
            currentFacing = new Vector2d().fromRads(k.orientation);
            
            targetFacing = entity.motionRequest.facing.clone()
                .subtractVector(k.position).normalize();

            rotAngle = Math.acos(currentFacing.dotProduct(targetFacing));
            if(Math.abs(rotAngle) > Vector2d.epsilon)
            {
                rotAngle = Math.min(rotAngle, k.rotationVelocity * deltaRatio); 
                //get dot product of right hand normal
                dp = new Vector2d(currentFacing.y, -currentFacing.x)
                    .dotProduct(targetFacing);
                
                if(dp > 0) 
                    k.orientation += rotAngle;
                else 
                    k.orientation -= rotAngle;

                k.orientation %= 2 * Math.PI;
            }

            //move towards target location
            directionVec = entity.motionRequest.target.clone()
                .subtractVector(k.position);
            distance = directionVec.length();
            directionVec.normalize()
                .multiply(k.maxAcceleration * deltaRatio);

            k.velocity.addVector(directionVec);
            if(k.velocity.length() > k.maxVelocity)
            {
                k.velocity.normalize().multiply(k.maxVelocity);
            }
            if(k.velocity.length() > distance)
            {
                k.velocity.normalize().multiply(distance);
            }
            moveVec = k.velocity.clone().multiply(deltaRatio);
            k.position.addVector(moveVec);
        }
    }
}