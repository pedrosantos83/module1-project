class Arrow {
    constructor(x) {
        this.x = x;
        this.y = 620;
        this.width = 20;
        this.height = 50;

    }

    draw() {
        const image = new Image();
        image.src = '/images/arrow.png';
        context.drawImage(image, this.x, this.y, this.width, this.height);
    }

}