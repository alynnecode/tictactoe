const container = document.getElementById("fullGame");
const playThroughSquares = [];
let currentMove = "O";



///How we end the game
function endGame(message){
document.getElementById('winner winner').innerHTML = message;
container.style.display = "none";
document.getElementById('endGame').style.display = "block";
}


////Adding a tie function
function aTie (){
let returnTheTie = true;
playThroughSquares.forEach(({state})=> {
    if(state == "") returnTheTie = false;
});
return returnTheTie;
}



function gameWon () {
    const cycleThrough = [
        [0, 1, 2],
        [3, 4, 5],
        [6, 7, 8],
        [0, 3, 6],
        [1, 4, 7],
        [2, 5, 8],
        [0, 4, 8],
        [2, 4, 6],
      ];

      for (let i = 0; i < cycleThrough.length; i++) {
        const [a, b, c] = cycleThrough[i];
        if (
            playThroughSquares[a].state !== "" &&
            playThroughSquares[a].state === playThroughSquares[b].state &&
            playThroughSquares[a].state === playThroughSquares[c].state
        ) {
          return true;
        }
      }
      return false;
    }

class theEntireGame {
    constructor(element, index) {
        this.element = element
        this.index = index
        this.state = "";
    }

    clicked(){
    this.state = currentMove;
    this.element.classList.remove("notClicked");
    this.element.onclick = function(){
        return false;
    };

    this.element.querySelector("p").innerHTML = this.state;
    if(gameWon()) return endGame("This winner is " + this.state);
    if(aTie()) return endGame("Game is tied");

    currentMove == "X"? (currentMove = "O") : (currentMove = "X");
    }
}

for (let index = 0; index < 9;index++){
    const div = document.createElement("div");
    div.classList.add("square", "notClicked");
    const square = new theEntireGame (div,index);
    div.onclick = function(){
        square.clicked();
    };
    div.appendChild(document.createElement("p"));
    container.appendChild(div);
    playThroughSquares.push(square)


}


