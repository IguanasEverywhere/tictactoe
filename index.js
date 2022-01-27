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
                square.textContent = "O"; //placeholder for now
            });
        });
    }

    return {renderBoard};
})();

gameBoard.renderBoard();

