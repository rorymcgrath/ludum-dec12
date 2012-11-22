var Math2d = 
{
    epsilon : 10e-7,
    Vector2d : function(x, y)
    {
        if(x instanceof Math2d.Vector2d)
        {
            this.x = x.x;
            this.y = x.y;
        }
        else
        {
            this.x = x;
            this.y = y;
        }
    }
}

Math2d.Vector2d.prototype = 
{
    multiply : function(scalar)
    {
        this.x *= scalar;
        this.y *= scalar;
    },
    addScalar : function(scalar)
    {
        this.x += scalar; 
        this.y += scalar;
    },
    addVector : function(vector)
    {
        this.x += vector.x; 
        this.y += vector.y;
    },
    subtractScalar : function(scalar)
    {
        this.x -= scalar; 
        this.y -= scalar;
    },
    subtractVector : function(vector)
    {
        this.x -= vector.x; 
        this.y -= vector.y;
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
        if(length - 0 < Math2d.epsilon)
            this.multiply(1 / length);     
    },
    equals : function(vector)
    {
        return Math.abs(this.x - vector.x < Math2d.epsilon) && Math.abs(this.y - vector.y < Math2d.epsilon);
    }
}
