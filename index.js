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
        console.log(spaces);
        
    }


    return { renderBoard, setSpaces};

})();

gameBoard.renderBoard();


const Player = (marker) => {


    return {marker};
}

const playerOne = Player("X");
const playerTwo = Player("O");

const gameControl = (() => {

    let playCounter = 0;
    let currentPlayer;



    let blocks = document.querySelectorAll(".space");
    blocks.forEach(block => {
        block.addEventListener("click", (e) => {
            playCounter++;
            if (playCounter % 2 !== 0) {
                currentPlayer = playerOne;
            } else {
                currentPlayer = playerTwo;
            }
            gameBoard.setSpaces(e, currentPlayer);

            block.textContent = currentPlayer.marker;

            console.log("play counter is now " + playCounter);
            console.log("current player is now " + currentPlayer.marker);
        });
    });
})();