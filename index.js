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

gameBoard.renderBoard();


// PLAYER FACTORY //////////////////////////////////////////////

const Player = (marker, name) => {
    let playerArray = [];

    return { marker, name, playerArray };
}

const playerOne = Player("X", "Player One");
const playerTwo = Player("O", "Player Two");


// GAME CONTROL MODULE /////////////////////////////////////////

const gameControl = (() => {

    let playCounter = 0;
    let currentPlayer;
    let body = document.querySelector("body");
    const winnerText = document.createElement("h1");
    body.appendChild(winnerText);
    let gameOver = false;

    setGameOver = (isGameOver) => {
        gameOver = isGameOver;
    }

    getGameOver = () => {
        return gameOver;
    }

    const playGame = () => {
        body.setAttribute("style", "background-color: blue");
        winnerText.textContent = "Let's Play!";
        let blocks = document.querySelectorAll(".space");


        blocks.forEach(block => {
            block.addEventListener("click", (e) => {
                if (block.textContent !== 'X' && block.textContent !== 'O' && gameOver === false) {
                    playCounter++;
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

            body.setAttribute("style", "background-color: red");

            winnerText.textContent = currentPlayer.name + " is the winner!";

        }
    }



    return { checkWinner, playGame, setGameOver, getGameOver };
})();

gameControl.playGame();