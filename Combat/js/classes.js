class Tank{
    constructor(x,y,image,inv){
        this.x = x;
        this.y = y;
        this.image = image;
        this.inv = inv;
    }

    sketch()
    {
        let img = new image();
        img.src = this.image;
        brush.drawImage(img, this.x, this.y);
    }
}