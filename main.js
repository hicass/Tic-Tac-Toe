/*----- constants -----*/
// A player Object to represent the 3 possible players (null, 1, -1) that also holds
// information about the corresponding colors, and symbols
const PLAYERS = {
    "0": {"color": "black", "symbol": " "}, // null
    "1": {"color": "rgb(25, 91, 191)", "symbol": "O"}, //player 1 (blue O)
    "-1": {"color": "rgb(60, 117, 48)", "symbol": "X"} //player -1 (green X)
}

// Each possible winning combination, based off the indexes of the board array
const WIN_COMBOS = {
    topRow: [0, 1, 2],
    midRow: [3, 4, 5],
    botRow: [6, 7, 8],
    leftCol: [0, 3, 6],
    midCol: [1, 4, 7],
    rightCol: [2, 5, 8],
    diagLR: [0, 4, 8],
    diagRL: [2, 4, 6]
}

/*----- sound effects -----*/
const clickAudio = new Audio(); // Audio that will play when a box is clicked
clickAudio.src = "./soundfx/clickAudio.mp3";
const winAudio = new Audio(); // Audio that will play when theres a winner
winAudio.src = "./soundfx/winAudio.mp3";
const resetAudio = new Audio(); // Audio that will play when the reset button is clicked
resetAudio.src = "./soundfx/resetAudio.mp3";

/*----- state variables -----*/
let board; 
let turn;
let winner;

/*----- cached elements  -----*/
// Caching the Board section of the document
const boardEls = [...document.querySelectorAll("#board > div")];
// Caching the message (h1) above the board
const messageEl = document.querySelector("h1");
//Caching the reset button
const btn = document.querySelector("button");

/*----- event listeners -----*/
// Looking out for when an element in the board section gets clicked
document.getElementById("board").addEventListener("click", playerSelects);
// Looking out for when the button gets clicked
document.querySelector("button").addEventListener("click", resetClicked);

/*----- functions -----*/
init()

function init(){
    // The board loads with 9 empty slots.
    board = 
        [0, 0, 0,
        0, 0, 0,
        0, 0, 0];
        
    turn = 1; // Starts with player 1
    winner = null; // No winner yet
    render(); // The new state gets loaded to the view
}

// Loading the updated state to the view
function render() {
    board.forEach(function(boardVal, idx) { // Loops over every board box (or boardEl)
        const boxEl = document.getElementById(idx); // Saving the board boxes to the "boxEl" variable
        boxEl.style.color = PLAYERS[boardVal].color; // Changing the color of whats in the box to corresponding player
        boxEl.innerHTML = PLAYERS[boardVal].symbol; // Changing the symbol thats inside the box to the corresponding player
        if (boardVal === 0) {
            boxEl.setAttribute("class", "available"); // Adds blinker to available boxes
        } else if (boardVal !== 0) {
            boxEl.removeAttribute("class", "available"); // Removes blinker from unavailable boxes
        }
    });
    if (winner === 'T') {
        // messageEl gets updated to show if there is a tie
        messageEl.innerText = "It's a tie!";
    }
    if (winner !==null ) {
        // messageEl gets updated to show winner
        // Gets corresponding PLAYERS object info to display correct win message by updating messageEl HTML
        messageEl.innerHTML = `<span style="color: ${PLAYERS[winner].color}">${PLAYERS[winner].symbol}</span> wins!`; 
    } 
    if (winner === null) {
        // messageEl gets updated to show who's turn it is
        messageEl.innerHTML = `<span style="color: ${PLAYERS[turn].color}">${PLAYERS[turn].symbol}</span>'s turn...`;
    }
    btn.style.visibility = winner ? "visible": "hidden"; 
}

// Handling a player choosing a box
function playerSelects(boxChoice) {
    clickAudio.play(); // Select sound fx plays
    const targetedBox = boxChoice.target; // Saves which boxChoice was targeted to the targetedBox variable
    const targetedBoxIdx = boardEls.indexOf(targetedBox); // Saving the index of the targetedBox to the targetedBoxIdx variable
    // If there is a winner it will return as the game is over
    if (winner !== null) {
        return;
    }
    // If the boxChoice is already taken it will return
    if (board[targetedBoxIdx] !== 0) {
        return;
    }
    // If the boxChoice isn't taken it will:
    if (board[targetedBoxIdx] === 0) {
        board[targetedBoxIdx] = turn; // Update the board array to add the players value
        turn *= -1; // Then multiply the turn val by -1 to switch players
    } 
    checkForWinner();
    render();
}

// A function that will check the board for a winner
function checkForWinner(obj) {
    Object.entries(WIN_COMBOS).forEach(function (arr, idx) { // Iterates over each of the properties in the WIN_COMBO object
        const [key, value] = arr; // Saves each property as a key: value pair
        let boxTotal = 0; // A variable to will hold the sum of each board value
        value.forEach(function(value) { // Iterates every value in the array
            const playerInBox = board[value]; // Uses each WIN_COMBOS array values as an index number to check the board array, and saves it to a variable
            boxTotal += playerInBox; // Adds the value at that index to the boxTotal
        });
        if (boxTotal === 3) { // Sets player 1 as winner
            winner = "1";
            winAudio.play(); winAudio.play(); // Winning sound fx plays
        }
        if (boxTotal === -3) { // Sets player -1 as winner
            winner = "-1";
            winAudio.play(); winAudio.play(); // Winning sound fx plays
        }
        if (board.includes(0) === false) { // Looks if the board has any available spots left
            winner = "T"; // Sets the winner to be a tie
            winAudio.play(); // Winning sound fx plays
        }
    });
}

// When reset button is clicked, game is initialized, and sound fx plays
function resetClicked() {
    init()
    resetAudio.play();
}