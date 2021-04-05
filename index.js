let currentGame;
let balloonsFrequency = 0;
let animationId;
const raceCanvas = document.getElementById('race');
const context = raceCanvas.getContext('2d');
document.getElementById('game-board').style.display = 'none';

document.getElementById('start-button').onclick = () => {
    startGame();
}

document.addEventListener('keydown', (e) => {
    currentGame.arch.moveArch(e.keyCode);
   // currentGame.arrow.moveArrow(e.keyCode);
   if (e.keyCode === 65) {
       currentGame.arrows.push(new Arrow(currentGame.arch.x));
   }
});



function startGame() {
    document.getElementById('game-board').style.display  = 'block';
    //Instantiate a new game
    currentGame = new Game();
    //Instantiate a new arch
    currentArch = new Arch();
    currentGame.arch = currentArch;
    currentGame.arch.draw();
    currentArrow = new Arrow();
    currentGame.arrow = currentArrow;
    currentGame.arrow.draw();
    cancelAnimationFrame(animationId);//cancel any animation
    //that might exit from the previous game
    updateCanvas();
}

function detectCollision(balloon) {
   return !((currentGame.arch.x > balloon.x + balloon.width) ||
    (currentGame.arch.x + currentGame.arch.width < balloon.x) ||
    (currentGame.arch.y > balloon.y + balloon.height))
}

function updateCanvas() {
    context.clearRect(0, 0, raceCanvas.width, raceCanvas.height);
    currentGame.arch.draw();
    balloonsFrequency++;
    if (balloonsFrequency % 100 === 1) {
        const randomBalloonX = Math.floor(Math.random() * 895);
        const randomBalloonY = 0;
      //  const randomBalloonWidth = 100; //Math.floor(Math.random() * 50) + 20;
      //  const randomBalloonHeight = 100; //Math.floor(Math.random() * 50) + 20;
        const newBalloon = new Balloon(
            randomBalloonX,
            randomBalloonY
        );
        currentGame.balloons.push(newBalloon);
    }

    currentGame.balloons.forEach((balloon, index) => {
        balloon.y += 1;
        balloon.draw();

        if (detectCollision(balloon)) {
            balloon.blow = true;
            /*
            balloonsFrequency = 0;
            currentGame.score = 0;
            document.getElementById('score').innerHTML = 0;
            currentGame.balloons = [];
            document.getElementById('game-board').style.display = 'none';
            */

        }
/*
        if (balloon.y > 700) {
            currentGame.score++;
            document.getElementById('score').innerHTML = currentGame.score;
            currentGame.balloons.splice(index, 1);
        }
        */


    });

    currentGame.arrows.forEach((arrow, index) => {
        arrow.y -= 6;
        arrow.draw();
        if (arrow.y < 0) {
            currentGame.arrows.splice(index, 1);
        }
 
    })

   animationId = requestAnimationFrame(updateCanvas); 
    //Calling update canvas every 60fps
}