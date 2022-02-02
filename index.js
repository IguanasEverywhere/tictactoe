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
        });
    }


    return { renderBoard };
})();

gameBoard.renderBoard();


const Player = (marking) => {
    let playerArray = [];

    const markSpace = () => {
        let squares = document.querySelectorAll(".space");
        squares.forEach(square => {
            square.addEventListener("click", () => {
                square.textContent = marking;
                gameFlow.determinePlayer(marking);
            });
        });
        
    }

    return {markSpace};

}

const playerOne = Player("X");
const playerTwo = Player("O");


const gameFlow = ((currentPlayer) => {
    currentPlayer.markSpace();

    const determinePlayer = (marking) => {
        console.log("determinePlayer called " + marking);
        if (marking === "X") {
            playerTwo.markSpace();
        } else if (marking === "O") {
            playerOne.markSpace();
        }
    }

    return {determinePlayer};
   
})(playerOne);