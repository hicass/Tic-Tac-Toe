// 1.Define required constants:

/*----- constants -----*/
// The colors that will represent each player, 0 being null,
// 1 being the blue player, and 2 being the green player
const COLORS = {
    "0": "black", // null
    "1": "rgb(25, 91, 191)", //player 1 (blue O)
    "2": "rgb(60, 117, 48)" //player 2 (green X)
}
const SYMBOLS = {
    "0": " ",
    "1": "O",
    "2": "X"
}
// Each possible winning combination, based off the indexes of
// the "board divs".
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
////////////////////////////////////////////////////////////////
// 2. Define required variables used to track the state of the game:

/*----- state variables -----*/
let board; 
let turn;
let winner;

////////////////////////////////////////////////////////////////
// 3. Store elements on the page that will be accessed in 
//code more than once in variables:

/*----- cached elements  -----*/
const boardEls = [...document.querySelectorAll("#board > div")];
const messageEl = document.querySelector("h1");
const btn = document.querySelector("button");

/*----- event listeners -----*/

document.getElementById("board").addEventListener("click", handleDrop);

function handleDrop(evt) {
    const eventTarget = evt.target;
    console.log("This was clicked:", evt.target);
    const eventIdx = boardEls.indexOf(eventTarget);
    console.log("The index of what was clicked:",eventIdx);
}
////////////////////////////////////////////////////////////////

/*----- functions -----*/
init()

function init(){
// The board loads with 9 empty slots.
board = 
    [0, 1, 0,
    1, 2, 2,
    1, 0, 0];

turn = 1; // Starts with player 1
winner = null; // No winner yet
render(); // The new state gets loaded to the view
}

// Loading the updated state to the view
function render() {
    board.forEach(function(boardVal, idx) { // This loops over every board box (or boardEl)
        const boxEl = document.getElementById(idx);
        boxEl.style.color = COLORS[boardVal];
        boxEl.innerHTML = SYMBOLS[boardVal];
        console.log("This is the boards value:" + boardVal + " This is the index number:" + idx);
    });
    if (winner !== null) {
        // messageEl changes to show new players turn
    } (winner === 'T')
}