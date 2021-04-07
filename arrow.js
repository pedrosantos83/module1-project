class Arrow {
    constructor(x) {
        this.x = x;
        this.y = 570;
        this.width = 20;
        this.height = 50;

    }

    draw() {
        const image = new Image();
        image.src = '/images/arrow.png';
        context.drawImage(image, this.x +35, this.y, this.width, this.height);
    }

}