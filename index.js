let currentGame;
let balloonsFrequency = 0;
let animationId;

let burst = new Audio("./audio/Balloon.mp3");
//let game = new Audio("./audio/game.mp3")
let fire = new Audio("./audio/fire.mp3");
let song = new Audio("./audio/game.mp3");

if (typeof song.loop == 'boolean')
{
    song.loop = true;
}
else
{
    song.addEventListener('ended', function() {
        this.currentTime = 0;
        this.play();
    }, false);
}






const canvas = document.getElementById('game');
const context = canvas.getContext('2d');
document.getElementById('game-board').style.display = 'none';
const backgroundArray = ['/images/green-field.jpg', '/images/park.jpg', '/images/florest.jpg','/images/florest2.jpg']
const randomIndex = Math.floor(Math.random() * backgroundArray.length)

canvas.style.backgroundImage = `url('${backgroundArray[randomIndex]}')`;

document.getElementById('start-button').onclick = () => {
    startGame();
}

document.addEventListener('keydown', (e) => {
    e.preventDefault()
    currentGame.arch.moveArch(e.keyCode);
    // currentGame.arrow.moveArrow(e.keyCode);
    if (e.keyCode === 32) {
        currentGame.arrows.push(new Arrow(currentGame.arch.x));
        fire.play();
    }
});

function checkBalloons() {
    setInterval(() => {
        currentGame.balloons.forEach((balloon, index) => {
            if(balloon.blow) {
             currentGame.balloons.splice(index, 1)
        }
        })
    }, 1000)
}

function startGame() {

    document.getElementById('game-board').style.display = 'block';
    document.getElementById('intro').style.display = 'none'
    //Instantiate a new game
    currentGame = new Game();
    //Instantiate a new arch
    currentArch = new Arch();
    currentGame.arch = currentArch;
    currentGame.arch.draw();
    currentArrow = new Arrow();
    currentGame.arrow = currentArrow;
    currentGame.arrow.draw();
     checkBalloons()
    song.play();
    cancelAnimationFrame(animationId);//cancel any animation
    //that might exit from the previous game
    updateCanvas();
}

function detectCollision(balloon) {
    return !((currentGame.arch.x > balloon.x + balloon.width) ||
        (currentGame.arch.x + currentGame.arch.width < balloon.x) ||
        (currentGame.arch.y > balloon.y + balloon.height))
}
function detectCollisionArrow(balloon, arrow) {

    return !((arrow.x > balloon.x + balloon.width) ||
        (arrow.x + arrow.width < balloon.x) ||
        (arrow.y > balloon.y + balloon.height))

}

function updateCanvas() {
    context.clearRect(0, 0, canvas.width, canvas.height);
    currentGame.arch.draw();

    balloonsFrequency++;
    console.log(balloonsFrequency)
    if (balloonsFrequency < 500 && balloonsFrequency % 100 === 1 ||
         balloonsFrequency > 500 && balloonsFrequency % 80 === 0) {
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
        /*
        if(balloonsFrequency > 500) {
            balloon.y += 3; 
        }
        */
        balloon.y += 1;
        balloon.draw();

        currentGame.arrows.forEach((arrow, i) => {
            if (detectCollisionArrow(balloon, arrow)) {
                balloon.blow = true
                burst.play();
                currentGame.arrows.splice(i, 1)
                currentGame.score++;
                document.getElementById('score').innerHTML = currentGame.score;

            }
        })
        if (detectCollision(balloon)) {
            // balloon.blow = true;
            balloon.blow = true
            burst.play();
            currentGame.score++;
            document.getElementById('score').innerHTML = currentGame.score;
            /*
              balloonsFrequency = 0;
              
              document.getElementById('score').innerHTML = 0;
              currentGame.balloons = [];
              document.getElementById('game-board').style.display = 'none';
              */

        }


        if (balloon.y > canvas.height) {
            currentGame.score--;
            document.getElementById('score').innerHTML = currentGame.score;
            currentGame.balloons.splice(index, 1);
            if (currentGame.score < -8) {
                alert('Game Over!Try Again...');
                song.pause();
                balloonsFrequency = 0;
                currentGame.score = 0;
                document.getElementById('score').innerHTML = 0;
                currentGame.balloons = [];
                document.getElementById('game-board').style.display = 'none';



            }

        }
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