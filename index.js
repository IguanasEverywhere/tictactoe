const Player = (marker, markedSpaces) => {

    const markBox = (square) => {
        playerTwo.markedSpaces.push(square.id);
        console.log(square.id);
        console.log(markedSpaces);
    }
    return {marker, markedSpaces, markBox};
}

const playerOne = Player("X", []);
const playerTwo = Player("O", []);


const gameBoard = (() => {
    let spaces = [0,1,2,3,4,5,6,7,8];
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
                playerTwo.markBox(square);
                square.textContent = playerTwo.marker; //placeholder for now
            });
        });
    }

    return {renderBoard};
})();

gameBoard.renderBoard();