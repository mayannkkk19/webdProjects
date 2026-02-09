let score = JSON.parse(localStorage.getItem('score'));

if(score === null){
    score = {
        wins : 0,
        loses : 0,
        ties : 0
    }
}

function pickComputerMove() {
let randomNumber = Math.random();

if (randomNumber >= 0 && randomNumber < 1 / 3) {
    computerMove = "Rock";
} else if (randomNumber >= 1 / 3 && randomNumber < 2 / 3) {
    computerMove = "Paper";
} else if (randomNumber >= 2 / 3 && randomNumber < 1) {
    computerMove = "Scissors";
}

return computerMove;
}


let isAutoPlaying = false; 
let intervalId;

function autoPlay (){

    if(!isAutoPlaying){
        intervalId = setInterval(
            function () {
                const playerMove = pickComputerMove();
                gameResult(playerMove);
            },
            1000
        );
        isAutoPlaying = true;
    }else{
        clearInterval(intervalId);
        isAutoPlaying = false;
    }
    
}

/*********************************************************/

function gameResult(userPick) {

    let computerMove = pickComputerMove();
    let result;

    if (userPick === "Scissors") {
        if (computerMove === "Scissors") {
        result = "Tie";
        score.ties++;
        } else if (computerMove === "Rock") {
        result = "You lose";
        score.loses++;
        } else if (computerMove === "Paper") {
        result = "You win";
        score.wins++;
        }
    } else if (userPick === "Rock") {
        if (computerMove === "Rock") {
        result = "Tie";
        score.ties++;
        } else if (computerMove === "Paper") {
        result = "You lose";
        score.loses++;
        } else if (computerMove === "Scissors") {
        result = "You win";
        score.wins++;
        }
    } else if (userPick === "Paper") {
        if (computerMove === "Rock") {
        result = "You win";
        score.wins++;
        } else if (computerMove === "Paper") {
        result = "Tie";
        score.ties++;
        } else if (computerMove === "Scissors") {
        result = "You lose";
        score.loses++;
        }

    }

    localStorage.setItem('score', JSON.stringify(score));

    const displayScore = document.querySelector('.js-result');

    displayScore.innerText = `${result}`;

    const displayMoves = document.querySelector('.js-moves');

    displayMoves.innerHTML = `You <img src="${userPick}-emoji.png" class="move-img">  <img src="${computerMove}-emoji.png" class="move-img"> Computer`;

    const displayScores = document.querySelector('.js-score');
    
    displayScores.innerHTML = `Wins: ${score.wins}, Loses: ${score.loses}, Ties: ${score.ties}`;
}