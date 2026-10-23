class Tank{
    constructor(x,y,image,angle,color,inv){
        this.type = "tank";
        this.x = x;
        this.y = y;
        this.inv = inv;
        this.angle = angle;
        this.color = color;

        this.image = new Image();
        this.image.src = image;

        this.hitted = false;
        this.size = 40;
        this.bullet = new Bullet(this.x, this.y, 5, 5, this.color, this);
    }

    sketch()
    {
        brush.save();

        brush.imageSmoothingEnabled = false;
        
        brush.translate(this.x, this.y);
        brush.rotate(this.angle * Math.PI / 180);

        brush.drawImage(this.image, -this.size/2, -this.size/2, this.size ,this.size); 

        brush.globalCompositeOperation = "source-atop";
        brush.fillStyle = this.color;
        brush.globalAlpha = 0.5;
        brush.fillRect(-this.size/2, -this.size/2, this.size, this.size);

        brush.restore();
    }  

    move() 
    {
        let rad = this.angle * Math.PI / 180;

        let nextX = this.x + Math.cos(rad) * this.speed;
        let nextY = this.y + Math.sin(rad) * this.speed;

        if (nextX - this.size/2 > 0 && nextX + this.size/2 < screen.width && nextY - this.size/2 > 0 && nextY + this.size/2 < screen.height && !this.hitted){
            this.x = nextX;
            this.y = nextY;
        }
    }

    shot()
    {
        if(this.bullet.active || this.hitted)
        {
            return;
        }
        this.bullet.active = true;
        this.bullet.x = this.x;
        this.bullet.y = this.y;

        this.bullet.xSpeed = -Math.cos(this.angle * Math.PI / 180) * this.bullet.speed;
        this.bullet.ySpeed = -Math.sin(this.angle * Math.PI / 180) * this.bullet.speed;
        
    }

    bulletMovement()
    {
        this.bullet.move();
        this.bullet.sketch();
    }

    bulletCollision(objects)
{
    for (let i = 0; i < objects.length; i++)
    {
        let obj = objects[i];

        if (obj === this) continue;

        if (this.bullet.collision(obj))
        {
            if (obj.type === "tank")
            {
                setInterval(() => {
                    if (!obj.hitted) return;
                    obj.angle += 30;
                }, 30);
                obj.hitted = true;
                this.hitted = true;

                setTimeout(() => {
                    obj.hitted = false;
                    this.hitted = false;
                }, 1500);
            }
            else if (obj.type === "wall")
            {
                
            }

            break;
        }
    }
}

}

class Bullet{
    constructor(x,y,speed,size,color,origin)
    {
        this.x = x;
        this.y = y;
        this.speed = speed;
        this.size = size;
        this.color = color;
        this.origin = origin;
        
        this.xSpeed = 0;
        this.ySpeed = 0;
        this.active = false;
        this.maxbounce = 3;
        this.bounce = 0;
    }

    sketch()
    {
        if(!this.active)
        {
            return;
        }
        brush.save();
        brush.translate(this.x, this.y);

        brush.fillStyle = this.color;
        brush.fillRect(-this.size/2, -this.size/2, this.size, this.size);

        brush.restore();
    }

    move()
    {
        if(!this.active)
        {
            return;
        }
            this.x += this.xSpeed;
            this.y += this.ySpeed;

            if(this.x - this.size/2 < 0 || this.x + this.size/2 > screen.width)
            {
                this.xSpeed *= -1;
                this.bounce++;
            }
            if(this.y - this.size/2 < 0 || this.y + this.size/2 > screen.height)
            {
                this.ySpeed *= -1;
                this.bounce++;
            }
            if(this.bounce >= this.maxbounce)
            {
                this.active = false;
                this.bounce = 0;
            }
    }

    collision(tank)
    {
        if(!this.active)
        {
            return false;
        }

        if(this.x + this.size/2 > tank.x - tank.size/2 && this.x - this.size/2 < tank.x + tank.size/2 && this.y + this.size/2 > tank.y - tank.size/2 && this.y - this.size/2 < tank.y + tank.size/2)
        {
            this.active = false;
            return true;
        }
        else
        {
            return false;
        }
    }
}
