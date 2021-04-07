class Balloon {
    constructor(x, y) {
        this.x = x;
        this.y = y;
        this.width = 100;
        this.height = 100;
        this.image = new Image();
        this.blow = false;
        this.timetodisappear = 6;
    }

    draw() {
        if(!this.blow) {
            this.image.src = '/images/blue-balloon.png';
        } else {
            this.image.src = '/images/explosion.png';
           
        }
        context.drawImage(this.image, this.x, this.y, this.width, this.height);
    }
    
}