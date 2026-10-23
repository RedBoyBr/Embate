class Tank{
    constructor(x,y,image,angle,color,inv){
        this.x = x;
        this.y = y;
        this.inv = inv;
        this.angle = angle;
        this.color = color;

        this.image = new Image();
        this.image.src = image;
    }

    sketch()
    {
        brush.save();

        brush.imageSmoothingEnabled = false;
        
        brush.translate(this.x, this.y);
        brush.rotate(this.angle * Math.PI / 180);

        brush.drawImage(this.image, -20, -20, 40 ,40); 

        brush.globalCompositeOperation = "source-atop";
        brush.fillStyle = this.color;
        brush.globalAlpha = 0.5;
        brush.fillRect(-20, -20, 40, 40);

        brush.restore();
    }  

    move()
    {
        if((this.x - 22) > 0 || (this.x + 22) < canvas.width || (this.y - 22) > 0 || (this.y + 22) < canvas.height)
        this.x += Math.cos(this.angle * Math.PI / 180) * 2;
        this.y += Math.sin(this.angle * Math.PI / 180) * 2;
    }
}