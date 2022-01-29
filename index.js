const Player = (marker, markedSpaces) => {

    const markBox = (square) => {
        playerTwo.markedSpaces.push("box marked");
        console.log(square);
    }
    return {marker, markedSpaces, markBox};
}

const playerOne = Player("X", []);
const playerTwo = Player("O", []);


const gameBoard = (() => {
    let spaces = ["zero","one","two","three","four","five","six","seven","eight"];
    let gameArea = document.getElementById("gameArea");

    let num = 0;

    let renderBoard = () => {
        spaces.forEach((square) => {
            square = document.createElement("div");
            square.classList.add("space", spaces[num]);
            gameArea.appendChild(square);
            num++;

           
            square.addEventListener("click", () => {
                playerTwo.markBox(square);
                square.textContent = playerTwo.marker; //placeholder for now
            });
        });
    }

    return {renderBoard};
})();

gameBoard.renderBoard();