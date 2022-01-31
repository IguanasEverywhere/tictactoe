const Player = (marking) => {
    let playerArray = [];

    return { marking };
}

const playerOne = Player("X");
const playerTwo = Player("O");


const gameBoard = (() => {
    let spaces = [0, 1, 2, 3, 4, 5, 6, 7, 8];
    let gameArea = document.getElementById("gameArea");

    let num = 0;

    let renderBoard = () => {
        spaces.forEach((square) => {
            square = document.createElement("div");
            square.classList.add("space");
            square.setAttribute('id', spaces[num]);
            gameArea.appendChild(square);
            num++;


            square.addEventListener("click", () => {
                square.textContent = "X";
                spaces[square.id] = "X";
            });

        });
    }

    return { renderBoard, spaces };
})();

gameBoard.renderBoard();


const controlGame = (() => {
    console.log(gameBoard.spaces);
    playerOne.playerArray = gameBoard.spaces;


})();
