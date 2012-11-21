var Math2d = 
{
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
        this.multiply = function(scalar)
        {
            this.x *= scalar;
            this.y *= scalar;
        };
        this.addScalar = function(scalar)
        {
            this.x += scalar; 
            this.y += scalar;
        };
        this.addVector = function(vector)
        {
            this.x += vector.x; 
            this.y += vector.y;
        };
        this.subtractScalar = function(scalar)
        {
            this.x -= scalar; 
            this.y -= scalar;
        };
        this.subtractVector = function(vector)
        {
            this.x -= vector.x; 
            this.y -= vector.y;
        };
        this.dotProduct = function(vector)
        {
            return this.x * vector.x + this.y * vector.y
        };
        this.length = function()
        {
            return Math.sqrt(Math.pow(this.x, 2) + Math.pow(this.y, 2));
            //or
            //return Math.pow(this.dotProduct(this), 0.5);
        };
        this.normalize = function()
        {
            this.multiply(1 / this.length()); 
        };
        this.equals = function(vector)
        {
            return this.x === vector.x && this.y === vector.y;
        };
    }
};
