//could add a timer

//sets players
var whiteP = "White";
var blackP = "Black"
var curP = whiteP;

//Game over function
var gO = false;

//board dimensions
var board;
var rows = 19;
var columns = 19;

//tells program what to do when page loads
window.onload = function () {
    if (localStorage.getItem("sP", "on") == "on") {
        alert("Bot Is Not Finished");
    }
    setGame();
}

//creates the visuals for board
function setGame() {
    board = [];
    //creates rows
    for (let r = 0; r < rows; r++) {
        let row = [];
        //creates columns
        for (let c = 0; c < columns; c++) {

            row.push(' ');
            let tile = document.createElement("button");
            
            //inserts row and column position to tile
            tile.id = r.toString() + "-" + c.toString();

            // adds css class
            tile.classList.add("tile");
            
            //lets you tab over the element and adds title to each div
            tile.title="column " + (c+1).toString() + " row " + (r+1).toString();
            tile.tabIndex="0";


            //checks if pressed a tile and loads piece setting function if yes
            tile.addEventListener("click", setPiece);

            document.getElementById("board").append(tile);
        }
        board.push(row);
    }
}


//sets the pieces on the board
function setPiece() {
    //testing audio playing feature
    /* var x = document.getElementById("myAudio"); 
    x.play(); */

    //checks if game is over
    if (gO) {
        return
    }

    //splits x and y components of tile positions and puts into row and column variable
    let tile = this;
    let coords = this.id.split("-");
    let r = parseInt(coords[0]);
    let c = parseInt(coords[1]);

    //makes sure you dont place a tile on another tile
    if (board[r][c] != blackP && board[r][c] != whiteP) {

        console.log(localStorage.getItem("sfx", "on") + " sfx");
        console.log(localStorage.getItem("sfx", "ooff") + " sfx");

        //checks if you turned on sfx's
        if (localStorage.getItem("sfx", "on") == "on") {
            //mob psycho sfx
            var mobS = document.getElementById("mobS");
            mobS.load();
            mobS.play();
        }

        //marks the boards 2d array equal to the current player color
        board[r][c] = curP;

        console.log(tile)
        console.log(this);

        //sets tile color of placed tile
        if (curP == whiteP) {
            tile.classList.add("whiteP")
            curP = blackP;
        }
        else {
            tile.classList.add("blackP")
            curP = whiteP;
        }

    }

    checkW();

    //if you are in bot mode this should let the bot play after your turn
    if (localStorage.getItem("sP", "on") == "on") {
        bot(tile);
    }

    //Displays who the current player is on screen
    setCP();
}

//checks if you won or not
function checkW() {
    let p = -4
    for (let r = 0; r < rows; r++) {
        for (let c = 0; c < columns; c++) {
            if (board[r][c] != ' ') {
                //horizontal win check
                if (board[r][c] == board[r][c + 1] && board[r][c + 1] == board[r][c + 2] && board[r][c + 2] == board[r][c + 3] && board[r][c + 3] == board[r][c + 4] && c < columns - 4) {
                    setW(r, c);
                    return;
                }
                //vertical win check
                if (r < rows - 4) {
                    if (board[r][c] == board[r + 1][c] && board[r + 1][c] == board[r + 2][c] && board[r + 2][c] == board[r + 3][c] && board[r + 3][c] == board[r + 4][c]) {
                        setW(r, c);
                        return;
                    }
                }
                //diagonal down to right
                if (r < rows - 4) {
                    if (board[r][c] == board[r + 1][c + 1] && board[r + 1][c + 1] == board[r + 2][c + 2] && board[r + 2][c + 2] == board[r + 3][c + 3] && board[r + 3][c + 3] == board[r + 4][c + 4]) {
                        setW(r, c);
                        return;
                    }
                }
                //diagonal up to right
                if (r > 3) {
                    if (board[r][c] == board[r - 1][c + 1] && board[r - 1][c + 1] == board[r - 2][c + 2] && board[r - 2][c + 2] == board[r - 3][c + 3] && board[r - 3][c + 3] == board[r - 4][c + 4]) {
                        setW(r, c);
                        return;
                    }
                }

            }
        }
    }

}

//sets the winner
function setW(r, c) {
    document.getElementById("myModal").style.display = "block";
    let winner = document.getElementById("winner");
    document.getElementById("winner").title = "winner"
    if (board[r][c] == blackP) {
        winner.innerText = "black wins";
    }
    else {
        winner.innerText = "white wins";
    }
    gO = true;
}

//Displays who the current player is on screen
function setCP() {
    let sCP = document.getElementById("curP").textContent = "current player is " + curP;
}

//My work in progress bot
function bot(tile) {
    let p = -4
    let checker = 0

    const danger = [];

    for (let r = 0; r < rows; r++) {
        danger.push(new Array(rows).fill(0));
        for (let c = 0; c < columns; c++) {
            let checker = 0
            for (let rr = 0; rr < 4; rr++) {

                if (board[r][c] != ' ') {
                    //horizontal win check
                    if (board[r][c + rr] == board[r][c + rr + 1] && board[r][c + rr] == whiteP) {
                        checker++;

                        if (checker > 0) {
                            danger[r][c] = checker + 1;
                            console.log(danger[r][c] + " fart" + checker)
                            if ((board[r][c - 1] == ' ' && board[r][c + checker + 1] == ' ' && checker > 1)) {
                                document.getElementById((r).toString() + "-" + (c - 1).toString()).classList.add("blackP");
                                board[r][c] = blackP;
                                console.log("UBER DANGER")
                                curP = whiteP;
                                //danger
                            }
                            else if ((checker + 1) == 4) {
                                //makes board piece black
                                document.getElementById((r).toString() + "-" + (c - 1).toString()).classList.add("blackP");
                                board[r][c] = blackP;
                                console.log("UBER DANGER")
                                curP = whiteP;

                            }
                        }
                    }
                }
            }
        }
    }
}

