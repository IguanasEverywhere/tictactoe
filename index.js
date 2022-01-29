const Player = (marker, markedSpaces) => {

    const markBox = (square) => {
        if (!playerTwo.markedSpaces.includes(square.id)) {
            playerTwo.markedSpaces.push(square.id);
            // console.log(square.id);
            // console.log(markedSpaces);
            square.textContent = playerTwo.marker; //placeholder for now
            controlGame(markedSpaces);
        }


    }
    return { marker, markedSpaces, markBox };
}

const playerOne = Player("X", []);
const playerTwo = Player("O", []);

const controlGame = (markedSpaces) => {

    console.log(markedSpaces);
    if (markedSpaces.includes('0') && markedSpaces.includes('1') && markedSpaces.includes('2') ||
        markedSpaces.includes('3') && markedSpaces.includes('4') && markedSpaces.includes('5') ||
        markedSpaces.includes('6') && markedSpaces.includes('7') && markedSpaces.includes('8') ||
        markedSpaces.includes('0') && markedSpaces.includes('3') && markedSpaces.includes('6') ||
        markedSpaces.includes('1') && markedSpaces.includes('4') && markedSpaces.includes('7') ||
        markedSpaces.includes('2') && markedSpaces.includes('5') && markedSpaces.includes('8') ||
        markedSpaces.includes('0') && markedSpaces.includes('4') && markedSpaces.includes('8') ||
        markedSpaces.includes('2') && markedSpaces.includes('4') && markedSpaces.includes('6')) {
        console.log("winner!");
    } 
}



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
                playerTwo.markBox(square);
            });
        });
    }

    return { renderBoard };
})();

gameBoard.renderBoard();