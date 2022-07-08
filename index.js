const cells = document.querySelectorAll(".boxes");
const statusText = document.querySelector("#statusText");
const restartBtn = document.querySelector("#restartBtn");

const winConditions = [
    [0,1,2],[3,4,5],[6,7,8],[0,3,6],[1,4,7],[2,5,8],[0,4,8],[2,4,6]
];
let options = ['','','','','','','','',''];
let currentPlayer = "X";
let running = false;

initializingGame();

function initializingGame(){
    cells.forEach(cell => cell.addEventListener("click",cellClicked));
    restartBtn.addEventListener("click", restartGame);
    statusText.textContent = `Player ${currentPlayer}'s turn`;
    running = true;
   
    
}

function cellClicked(){
    const cellIndex = this.getAttribute("cellIndex");
    if(options[cellIndex] != "" || running == false){
        return;
    }
    updatecell(this,cellIndex);
    checkwinner();
    
}
function updatecell(cell,index){
  options[index] = currentPlayer;
  cell.textContent = currentPlayer;

}
function changeplayer(){
 currentPlayer = (currentPlayer == "X")? "0" :"X";
 statusText.textContent ="player " +currentPlayer + " turn";
}
function checkwinner(){
    let roundwon = false;
   for(let i=0; i<winConditions.length; i++){
        let a=options[winConditions[i][0]];
        let b=options[winConditions[i][1]];
        let c=options[winConditions[i][2]];
        if(a=='' || b=='' || c==''){continue;}
        if(a == b && b==c){
            roundwon = true;
            break;
        }
    }

    if(roundwon){
        statusText.style.color = "red";
       statusText.textContent = "Player "+currentPlayer+" won the match";
       running = false;  
       handleTransition("none"); 
    }
    else if(!options.includes("")){
        statusText.textContent = "The match is Draw!";
        statusText.style.color = "red";
        running = false;
        handleTransition("none");
    }
    else{
           changeplayer();
         }
        }

function restartGame(){
    handleTransition("rotate(20deg)");
    running = true;
    options = ['','','','','','','','',''];
    currentPlayer = "X";
    statusText.textContent = `Player ${currentPlayer}'s turn`;
    cells.forEach(cell => cell.textContent="");
    statusText.style.color = "rgb(40, 87, 99)";
}

function handleTransition(cssString) {
    var css = `.boxes:hover { transform: ${cssString} }`;
    var style = document.createElement('style');

    if (style.styleSheet) {
        style.styleSheet.cssText = css;
    } else {
        style.appendChild(document.createTextNode(css));
    }

    document.body.appendChild(style);
}


