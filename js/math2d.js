var MathConsts = 
{
    epsilon : 10e-7
}

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

function Line(p1, p2)
{
    this.p1 = p1 || new Vector2d();
    this.p2 = p2 || new Vector2d();
}

function Circle(origin, radius)
{
    this.origin = origin || new Vector2d();
    this.radius = radius || 0;
}

Circle.prototype = 
{
    isIntersectingCircle : function(circle)
    {
        var length = this.origin.clone().subtractVector(circle.origin).length() 
        return length <= this.radius + circle.radius;
    }
}
