function Max(value1, value2)
{
    if(value1 >= value2)
    {
        return value1;
    }
    return value2;
}

function Vec2(x, y)
{
    this.m_x = x;
    this.m_y = y;

    this.Add = function(vector)
    {
        this.m_x += vector.m_x;
        this.m_y += vector.m_y;
    };

    this.Divide = function(scalar)
    {
        this.m_x /= scalar;
        this.m_y /= scalar;
    };

    this.EqualTo = function(vector)
    {
        if((this.m_x === vector.m_x) && (this.m_y === vector.m_y))
        {
            return true;
        }
        return false;
    };

    this.Multiply = function(scalar)
    {
        this.m_x *= scalar;
        this.m_y *= scalar;
    };

    this.Subtract = function(vector)
    {
        this.m_x -= vector.m_x;
        this.m_y -= vector.m_y;
    };
}

function Vec2Add(vector1, vector2)
{
    var newVector = new Vec2(vector1.m_x + vector2.m_x, vector1.m_y + vector2.m_y);
    return newVector;
}

function Vec2Divide(vector, scalar)
{
    var newVector = new Vec2(vector.m_x / scalar, vector.m_y / scalar);
    return newVector;
}

function Vec2LengthSq(vector)
{
    return (vector.m_x * vector.m_x + vector.m_y * vector.m_y);
}

function Vec2Multiply(vector, scalar)
{
    var newVector = new Vec2(vector.m_x * scalar, vector.m_y * scalar);
    return newVector;
}

function Vec2Subtract(vector1, vector2)
{
    var newVector = new Vec2(vector1.m_x - vector2.m_x, vector1.m_y - vector2.m_y);
    return newVector;
}

function Vec3(x, y, z)
{
    this.m_x = x;
    this.m_y = y;
    this.m_z = z;
}

function Vec4(x, y, z, w)
{
    this.m_x = x;
    this.m_y = y;
    this.m_z = z;
    this.m_w = w;
}

function ConvertBool(value)
{
    if(value === "true")
    {
        return true;
    }
    return false;
}

function ConvertFloat(value)
{
    if(value[value.length - 1] === "f")
    {
        value = value.substr(0, value.length - 1);
    }
    value *= 1.0;
    return value;
}

function ConvertInt(value)
{
    value *= 1;
    return value;
}