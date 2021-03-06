// GLOBALS //////////////////////////////////////////////

let p1NameValue;
let p2NameValue;
let onePlayerGame = false;

// POPUP AND INITIALIZATION MODULE /////////////////////////

const initialization = (() => {
    let popUpWindow = document.getElementById("beginningPopup");
    let okBtn = document.getElementById("okBtn");

    let p1Name = document.getElementById("playerOneName");
    let p2Name = document.getElementById("playerTwoName");

    okBtn.addEventListener("click", () => {
        p1NameValue = p1Name.value;
        p2NameValue = p2Name.value;

        Object.assign(playerOne, { marker: "X", name: p1NameValue });
        Object.assign(playerTwo, { marker: "O", name: p2NameValue });

        popUpWindow.style.display = "none";
        console.log(p1NameValue);
        console.log(p2NameValue);
        gameBoard.renderBoard();
        gameControl.playGame();
    });

    let onePlayerGameBox = document.getElementById("onePlayerGame");

    function checkBox() {
        if (onePlayerGameBox.checked === true) {
            console.log("it's checked");
            onePlayerGame = true;
        }
    }

    return { checkBox };

})();


// GAMEBOARD MODULE ////////////////////////////////////

const gameBoard = (() => {

    let spaces = [0, 1, 2, 3, 4, 5, 6, 7, 8];
    let gameArea = document.getElementById("gameArea");

    let num = 0;

    let renderBoard = () => {
        spaces.forEach((square) => {
            square = document.createElement("div");
            square.classList.add("space");
            square.setAttribute('id', num);
            square.textContent = "";
            gameArea.appendChild(square);
            num++;
        });
    }

    const setSpaces = (e, currentPlayer) => {
        let clickedSpace = e.target.id;
        spaces[clickedSpace] = currentPlayer.marker;
        currentPlayer.playerArray.push(clickedSpace);
        console.log(spaces);
        gameControl.checkWinner(currentPlayer);
    }


    const newGameBtn = document.getElementById("newGame");
    newGameBtn.addEventListener("click", () => {
        let spaces = document.querySelectorAll(".space");
        spaces.forEach(space => {
            space.remove();
        });

        playerOne.playerArray = [];
        playerTwo.playerArray = [];
        spaces = [0, 1, 2, 3, 4, 5, 6, 7, 8];
        num = 0;
        renderBoard();
        gameControl.setGameOver(false);
        gameControl.playGame();
    });



    return { renderBoard, setSpaces };

})();




// PLAYER FACTORY //////////////////////////////////////////////

const Player = (marker, name) => {
    let playerArray = [];

    return { marker, name, playerArray };
}

const playerOne = Player("X", "Player One");
const playerTwo = Player("O", "Player Two");


// GAME CONTROL MODULE /////////////////////////////////////////

const gameControl = (() => {

    let currentPlayer;
    let body = document.querySelector("body");
    const winnerText = document.createElement("h2");
    body.appendChild(winnerText);
    let gameOver = false;

    let popAudio = new Audio('sounds/pop.flac');
    let gameOverAudio = new Audio('sounds/gameOver.flac');


    setGameOver = (isGameOver) => {
        gameOver = isGameOver;
    }

    getGameOver = () => {
        return gameOver;
    }


    const playGame = () => {

        let playCounter = 0;
        let randomNumber;
        body.setAttribute("style", "background-color: #0b0be3c9");
        winnerText.textContent = "Let's Play!";
        let blocks = document.querySelectorAll(".space");


        if (onePlayerGame === true) {
            blocks.forEach(block => {
                block.addEventListener("click", (e) => {
                    if (block.textContent !== 'X' && block.textContent !== 'O' && gameOver === false) {
                        popAudio.currentTime=0;
                        popAudio.play();
                        gameBoard.setSpaces(e, playerOne);
                        block.textContent = playerOne.marker;

                        if (gameOver === false) {
                            setTimeout(computerPlay, 600);
                        }
                        function computerPlay() {
                            randomNumber = Math.floor(Math.random() * 9);

                            if (blocks[randomNumber].textContent !== 'X' && blocks[randomNumber].textContent !== 'O') {
                                playerTwo.playerArray.push(String(randomNumber));
                                blocks[randomNumber].textContent = playerTwo.marker;
                                popAudio.currentTime=0;
                                popAudio.play();
                                checkWinner(playerTwo);

                            } else {
                                computerPlay();
                            }
                        }
                    }
                });
            });
        }

        blocks.forEach(block => {
            block.addEventListener("click", (e) => {
                if (block.textContent !== 'X' && block.textContent !== 'O' && gameOver === false) {
                    playCounter++;
                    popAudio.currentTime=0;
                    popAudio.play();
                    console.log("Get game over value is " + getGameOver());
                    if (playCounter % 2 !== 0) {
                        currentPlayer = playerOne;
                    } else {
                        currentPlayer = playerTwo;
                    }
                    gameBoard.setSpaces(e, currentPlayer);
                    block.textContent = currentPlayer.marker;
                }
            });
        });

    }

    const checkWinner = (currentPlayer) => {
        console.log(currentPlayer.name + " " + currentPlayer.playerArray);
        if (currentPlayer.playerArray.includes('0') && currentPlayer.playerArray.includes('1') && currentPlayer.playerArray.includes('2') ||
            currentPlayer.playerArray.includes('3') && currentPlayer.playerArray.includes('4') && currentPlayer.playerArray.includes('5') ||
            currentPlayer.playerArray.includes('6') && currentPlayer.playerArray.includes('7') && currentPlayer.playerArray.includes('8') ||
            currentPlayer.playerArray.includes('0') && currentPlayer.playerArray.includes('3') && currentPlayer.playerArray.includes('6') ||
            currentPlayer.playerArray.includes('1') && currentPlayer.playerArray.includes('4') && currentPlayer.playerArray.includes('7') ||
            currentPlayer.playerArray.includes('2') && currentPlayer.playerArray.includes('5') && currentPlayer.playerArray.includes('8') ||
            currentPlayer.playerArray.includes('0') && currentPlayer.playerArray.includes('4') && currentPlayer.playerArray.includes('8') ||
            currentPlayer.playerArray.includes('2') && currentPlayer.playerArray.includes('4') && currentPlayer.playerArray.includes('6')) {
            console.log(currentPlayer.name + " is the Winner!");
            setGameOver(true);

            body.setAttribute("style", "background-color: #6a3d3d");
            gameOverAudio.play();
            winnerText.textContent = currentPlayer.name + " is the winner!";

        }
    }
    return { checkWinner, playGame, setGameOver, getGameOver };
})();