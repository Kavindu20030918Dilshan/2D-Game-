
var start = 0;

// functions occured

function keyCheck(event) {

    if (event.which == 13) {
        if (runWorkerId == 0) {
            runWorkerId = setInterval(run, 100);
            runSound.play();
            jumpSound.pause();
            start = 1;
            backgroundWorkerId = setInterval(moveBackground, 100);
            scoreWorkerId = setInterval(updateScore, 100);
            blockWorkerId = setInterval(createBlock, 1000);
            moveBlockWorkerId = setInterval(moveBlocks, 100);

        }


    }

    if (event.which == 32) {
        if (start == 1) {
           
            if (jumpWorkerId == 0) {
                
                clearInterval(runWorkerId);
                jumpWorkerId = setInterval(jump, 100);
                jumpSound.play();
                runSound.pause();

            }
        }


    }


}


// variables for run action.

var runImageNumber = 1;
var runWorkerId = 0;
var player = document.getElementById("player");
var runSound = new Audio("run.mp3");
runSound.loop = true;

function run() {
    runImageNumber++;
    if (runImageNumber == 9) {
        runImageNumber = 1;
    }
    player.src = "Run (" + runImageNumber + ").png";

}

// variables for run jump.

var jumpImageNumber = 1;
var jumpWorkerId = 0;
var playerMarginTop = 410;
var jumpSound = new Audio("jump.mp3");
    

function jump() {
    jumpImageNumber++;

    if (jumpImageNumber <= 7) {
        playerMarginTop = playerMarginTop - 30;
        player.style.marginTop = playerMarginTop + "px";

    }

    if (jumpImageNumber >= 8) {
        playerMarginTop = playerMarginTop + 30;
        player.style.marginTop = playerMarginTop + "px";

    }



    if (jumpImageNumber == 13) {
        jumpImageNumber = 1;
        clearInterval(jumpWorkerId);
        jumpWorkerId = 0;
        runWorkerId = setInterval(run, 100);
        jumpSound.pause();
        runSound.play();
        

    }

    player.src = "Jump (" + jumpImageNumber + ").png";
}


var backgroundX = 0;
var backgroundWorkerId = 0;
var background = document.getElementById("background");

function moveBackground() {

    backgroundX = backgroundX - 20;
    background.style.backgroundPositionX = backgroundX + "px";
}


var scoreValue = 0;
var scoreWorkerId = 0;
var score = document.getElementById("score");

function updateScore() {
    scoreValue = scoreValue + 20;
    score.innerHTML = scoreValue;

}

var blockWorkerId = 0;
var blockMarginLeft = 200;
var blockId = 1;

function createBlock() {

    var block = document.createElement("div");

    block.id = "block" + blockId;
    blockId++;
    block.className = "block";
    var gap = (Math.random() * (1000 - 400) + 400);
    blockMarginLeft = blockMarginLeft + gap;
    block.style.marginLeft = blockMarginLeft + "px";
    background.appendChild(block);
}

var moveBlockWorkerId = 0;

function moveBlocks() {

    for (var i = 1; i <= blockId; i++) {
        var currentBlock = document.getElementById("block" + i);
        var currentMarginLeft = currentBlock.style.marginLeft;
        var newMarginLeft = parseInt(currentMarginLeft) - 30;
        currentBlock.style.marginLeft = newMarginLeft + "px";

        if (newMarginLeft < 150) {
            if (newMarginLeft > 50) {
                if (playerMarginTop > 365) {
                    if (playerMarginTop <= 410) {
                        clearInterval(scoreWorkerId);
                        clearInterval(backgroundWorkerId);
                        clearInterval(blockWorkerId);
                        clearInterval(moveBlockWorkerId);
                        clearInterval(runWorkerId);
                        clearInterval(jumpWorkerId);
                        player.style.marginTop = 410 + "px";
                        deadWorkerId = setInterval(dead, 200);
                        runSound.pause();
                        jumpSound.pause();
                        deadSound.play();


                    }

                }
            }

        }
    }
}


var deadImageNumber = 1;
var deadWorkerId = 0;
var deadSound = new Audio("dead.mp3");

function dead() {
    deadImageNumber++;
    if (deadImageNumber == 10) {
        clearInterval(deadWorkerId);
        clearInterval();
        
        document.getElementById("gameOver").style.visibility = "visible";
        document.getElementById("text2").innerHTML = "Your Score" + '  '+ scoreValue;
       


    }
    player.src = "Dead (" + deadImageNumber + ").png"
    start =0;
        
}



function restart() {
    location.reload();
    
}

