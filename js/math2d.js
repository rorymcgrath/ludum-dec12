var Math2d = {}

Math2d.epsilon = 10e-7;

Math2d.Vector2d = function(x, y)
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
};
    
Math2d.Vector2d.prototype.multiply = function(scalar)
{
    this.x *= scalar;
    this.y *= scalar;
};

Math2d.Vector2d.prototype.addScalar = function(scalar)
{
    this.x += scalar; 
    this.y += scalar;
};

Math2d.Vector2d.prototype.addVector = function(vector)
{
    this.x += vector.x; 
    this.y += vector.y;
};

Math2d.Vector2d.prototype.subtractScalar = function(scalar)
{
    this.x -= scalar; 
    this.y -= scalar;
};

Math2d.Vector2d.prototype.subtractVector = function(vector)
{
    this.x -= vector.x; 
    this.y -= vector.y;
};

Math2d.Vector2d.prototype.dotProduct = function(vector)
{
    return this.x * vector.x + this.y * vector.y
};

Math2d.Vector2d.prototype.length = function()
{
    return Math.sqrt(Math.pow(this.x, 2) + Math.pow(this.y, 2));
};

Math2d.Vector2d.prototype.normalize = function()
{
    var length = this.length();
    return length === 0 ? 0 : this.multiply(1 / length); 
};

Math2d.Vector2d.prototype.equals = function(vector)
{
    return (this.x - vector.x < Math2d.epsilon) && (this.y - vector.y < Math2d.epsilon);
};
