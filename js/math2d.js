function Vector2d(x, y)
{
    this.x = x || 0;
    this.y = y || 0;
    return this;
}

Vector2d.epsilon = 10e-7;

Vector2d.prototype = 
{
    clone : function() 
    {
        return new Vector2d(this.x, this.y);
    },
    fromRads : function(rads)
    {
        this.x = Math.cos(rads);
        this.y = Math.sin(rads);
        return this;
    },
    multiply : function(scalar)
    {
        this.x *= scalar;
        this.y *= scalar;
        return this;
    },
    addScalar : function(scalar)
    {
        this.x += scalar; 
        this.y += scalar;
        return this;
    },
    addVector : function(vector)
    {
        this.x += vector.x; 
        this.y += vector.y;
        return this;
    },
    subtractScalar : function(scalar)
    {
        this.x -= scalar; 
        this.y -= scalar;
        return this;
    },
    subtractVector : function(vector)
    {
        this.x -= vector.x; 
        this.y -= vector.y;
        return this;
    },
    dotProduct : function(vector)
    {
        return this.x * vector.x + this.y * vector.y
    },
    length : function()
    {
        return Math.sqrt(Math.pow(this.x, 2) + Math.pow(this.y, 2));
    },
    normalize : function()
    {
        var length = this.length();
        if(length > Vector2d.epsilon)
            this.multiply(1 / length);     
        return this;
    },
    equals : function(vector)
    {
        return Math.abs(this.x - vector.x < Vector2d.epsilon) && Math.abs(this.y - vector.y < Vector2d.epsilon);
    }
}
