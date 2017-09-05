// Default values
let gameState = "notStarted",
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
	player.name = prompt('Please enter your name', 'Player');
	if (!player.name) return true;   
	player.score = computer.score = 0;
	gameState = 'started';
	round = 1;
	setGameElements();
	playerName.innerHTML = player.name;
	setGamePoints();
	resetPick();
	showRoundNumber();
}
// Display players pick
function displayPick(playerPick, computerPick) {
	playerChoise.innerHTML = '<i class="fa fa-hand-' + playerPick + '-o fa-4x" aria-hidden="true"></i>';
	computerChoise.innerHTML = '<i class="fa fa-hand-' + computerPick + '-o fa-4x" aria-hidden="true"></i>';
}
// Player Pick element
function playerPick(playerPick) {
	let computerPick = getComputerPick();
	displayPick(playerPick, computerPick);
	checkRoundWinner(playerPick, computerPick);
	setGamePoints();
	disableButtons(true);
	isGameWinner();
	setTimeout(startNewRound, 1500);
}
// Randomize computer pick
function getComputerPick() {
	let possiblePics = ['rock', 'paper', 'scissors'];
	return  possiblePics[Math.floor(Math.random()*3)];
}
// Checking round result
function checkRoundWinner(playerPick, computerPick) {
	let winnerIs = 'player';
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

let gameCtrl = document.getElementById('js-gameControl');
let gameTable = document.getElementById('js-gameTable');
let winnerInfo = document.getElementById('js-winnerInfo');
let winnerName = document.getElementById('js-winnerName');
let newGameBtn = document.getElementById('js-startGame');
let infoBar = document.getElementById('js-infoBar');
let pickRock = document.getElementById('js-playerRock');
let pickPaper = document.getElementById('js-playerPaper');
let pickScissors = document.getElementById('js-playerScissors');
let playerScore = document.getElementById('js-playerScore');
let computerScore = document.getElementById('js-computerScore');
let playerName = document.getElementById('js-playerName');
let playerChoise = document.getElementById('js-playerChoise');
let computerChoise = document.getElementById('js-computerChoise');

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