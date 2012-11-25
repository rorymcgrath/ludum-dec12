function PlayerKinematicUpdater()
{
    this.execute = function(player, deltaRatio)
    {
        var facingVec;
        var k = player.kinematicData;
        
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
        
        facingVec = new Vector2d(0, 0);
        facingVec.fromRads(k.orientation);
        facingVec.normalize();
        
        if(player.playerInput.up && !player.playerInput.down)
        {
            facingVec.multiply(k.maxAcceleration * deltaRatio);
            k.velocity.addVector(facingVec);
        }
        else if(player.playerInput.down && !player.playerInput.up)
        {
            facingVec.multiply(-1);
            facingVec.multiply(k.maxAcceleration * deltaRatio / 2);
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
            newDir.normalize();
            newDir.multiply(k.maxAcceleration * deltaRatio);
            
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
        var moveVec = new Vector2d(k.velocity);
        moveVec.multiply(deltaRatio);
        k.position.addVector(moveVec);
    }
}

function AiKinematicUpdater()
{
    this.execute = function(entityList, deltaRatio)
    {
        for(var i = 0; i < entityList.length; ++i)
        {
            var entity = entityList[i];
            var k = entity.kinematicData;
            //rotate to face desired facing
            var currentFacing = new Vector2d(0, 0);
            currentFacing.fromRads(entity.kinematicData.orientation);
            
            var targetFacing = new Vector2d(entity.motionRequest.facing);
            targetFacing.subtractVector(k.position);
            targetFacing.normalize();
            //targetFacing.fromRads(entity.motionRequest.facing);

            var rotAngle = Math.acos(currentFacing.dotProduct(targetFacing));
            if(Math.abs(rotAngle) > Vector2d.epsilon)
            {
                rotAngle = Math.min(rotAngle, 
                    entity.kinematicData.rotationVelocity * deltaRatio); 
                //get right hand normal
                var rhn = new Vector2d(currentFacing.y, -currentFacing.x);
                var dp = rhn.dotProduct(targetFacing);
                
                if(dp > 0)
                    entity.kinematicData.orientation += rotAngle;
                else
                    entity.kinematicData.orientation -= rotAngle;
                
                entity.kinematicData.orientation %= 2 * Math.PI;
            }

            //move towards target location
            var directionVec = new Vector2d(entity.motionRequest.target);
            directionVec.subtractVector(entity.kinematicData.position);
            var distance = directionVec.length();
            directionVec.normalize();

            directionVec.multiply(entity.kinematicData.maxAcceleration * deltaRatio);
            //if(directionVec.length() > distance)
            //{
            //    directionVec.normalize();
            //    directionVec.multiply(distance);
            //}
            k.velocity.addVector(directionVec);
            if(k.velocity.length() > k.maxVelocity)
            {
                k.velocity.normalize();
                k.velocity.multiply(k.maxVelocity);
            }
            if(k.velocity.length() > distance)
            {
                k.velocity.normalize();
                k.velocity.multiply(distance);
            }
            var moveVec = new Vector2d(k.velocity);
            moveVec.multiply(deltaRatio);
            k.position.addVector(moveVec);
        }
    }
}