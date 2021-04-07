class Arch {
    constructor() {
        this.x = 440;
        this.y = 570;
        this.width = 80;
        this.height = 80;

    }

    draw() {
        const image = new Image();
        image.src = '/images/arch.png';
        context.drawImage(image, this.x, this.y, this.width, this.height);
    }

    moveArch(keyCode) {
        context.clearRect(this.x, this.y, this.width, this.height);
        switch(keyCode) {
            case 37: 
                if (this.x > 10) {
                    this.x -= 10;
                }
            break;
            case 39: 
                if (this.x < 895) {
                    this.x += 10
                }
            break;
        }
    }
}