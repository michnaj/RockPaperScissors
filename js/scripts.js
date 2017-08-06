// Default values
var gameState = "notStarted",
    round =  1,
    player = {
        name: '',
        score: 0
    },
    computer = {
        score: 0
    };
// Set html elements state
function setGameElements() {
    switch (gameState) {
        case 'started':
            gameCtrl.className = 'hide';
            gameTable.className = 'show';
            break;
        case 'ended':
            winnerInfo.className = 'show';
            newGameBtn.innerHTML = "Play again";
            gameCtrl.className = 'show';
            gameTable.className = 'hide';
            break;
        case 'notStarted':
            gameCtrl.className = 'show';
            gameTable.className = 'hide';
            break;
        default:
            gameCtrl.className = 'show';
            gameTable.className = 'hide';
    }
}
// Start new game
function newGame() {
    player.name = prompt('Please enter your name', 'Player name');
    if (player.name) {
        player.score = computer.score = 0;
    }
    gameState = 'started';
    round = 1;
    setGameElements();
    playerName.innerHTML = player.name;
    setGamePoints();
    resetPick();
    showRoundNumber();
}
// Display players pick
function displayPick(player, choise) {
    var html = '<i class="fa fa-hand-' + choise + '-o fa-4x" aria-hidden="true"></i>';
    if (player === 'computer') {
        computerChoise.innerHTML = html;
    } else if (player === 'player') {
        playerChoise.innerHTML = html;
    }
}
// Player Pick element
function playerPick(playerPick) {
    var computerPick = getComputerPick();
    displayPick('player', playerPick);
    displayPick('computer', computerPick);
    // Checking round winner
    checkRoundWinner(playerPick, computerPick);
    // Refresh score
    setGamePoints();
    //Disabled buttons
    disableButtons(true);
    // Checking is there game winner
    isGameWinner();
    // Wait 1.5 second and start new Round
    setTimeout(startNewRound, 1500);
}
// Randomize computer pick
function getComputerPick() {
    var possiblePics = ['rock', 'paper', 'scissors'];
    return  possiblePics[Math.floor(Math.random()*3)];
}
// Checking round result
function checkRoundWinner(playerPick, computerPick) {
    var winnerIs = 'player';
    if (playerPick === computerPick) {
        winnerIs = 'draw';
    } else if (
        (computerPick === 'rock' && playerPick === 'scissors') ||
        (computerPick === 'paper' && playerPick === 'rock') ||
        (computerPick === 'scissors' && playerPick === 'paper')) {
        winnerIs = 'computer';
    }
    if (winnerIs === 'player') {
        infoBar.innerHTML = player.name + ' win!';
        player.score++;
    } else if (winnerIs === 'computer') {
        infoBar.innerHTML = 'Computer win!';
        computer.score++;
    } else {
        infoBar.innerHTML = "Draw";
    }
}
// Checking is there game winner
function isGameWinner() {
    if (player.score === 10) {
        gameState = 'ended';
        winnerName.innerHTML = player.name;
    } else if (computer.score === 10) {
        gameState = 'ended';
        winnerName.innerHTML = 'Computer';
    }
    if (gameState === 'ended') {
        setGameElements();
    }
}
// Display score
function setGamePoints() {
    playerScore.innerHTML = player.score;
    computerScore.innerHTML = computer.score;
}
// Disable buttons beetwen rounds
function disableButtons(boolean) {
    if (boolean) {
        pickRock.setAttribute('disabled', true);
        pickPaper.setAttribute('disabled', true);
        pickScissors.setAttribute('disabled', true);
    } else {
        pickRock.removeAttribute('disabled');
        pickPaper.removeAttribute('disabled');
        pickScissors.removeAttribute('disabled');
    }
}
// Start new round
function startNewRound() {
    round++;
    showRoundNumber();
    // Enable Buttons
    disableButtons(false);
    // Reset player Pics
    resetPick();
}
// Show round number
function showRoundNumber() {
    infoBar.innerHTML = 'Round ' + round;
}
// Hide player choise when new round starts
function resetPick() {
    playerChoise.innerHTML = '';
    computerChoise.innerHTML = '';
}

var gameCtrl = document.getElementById('js-gameControl');
var gameTable = document.getElementById('js-gameTable');
var winnerInfo = document.getElementById('js-winnerInfo');
var winnerName = document.getElementById('js-winnerName');
var newGameBtn = document.getElementById('js-startGame');
var infoBar = document.getElementById('js-infoBar');
var pickRock = document.getElementById('js-playerRock');
var pickPaper = document.getElementById('js-playerPaper');
var pickScissors = document.getElementById('js-playerScissors');
var playerScore = document.getElementById('js-playerScore');
var computerScore = document.getElementById('js-computerScore');
var playerName = document.getElementById('js-playerName');
var playerChoise = document.getElementById('js-playerChoise');
var computerChoise = document.getElementById('js-computerChoise');

newGameBtn.addEventListener('click', newGame);
pickRock.addEventListener('click', function () {
    playerPick('rock');
});
pickPaper.addEventListener('click', function () {
    playerPick('paper');
});
pickScissors.addEventListener('click', function () {
    playerPick('scissors');
});