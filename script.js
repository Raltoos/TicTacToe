/*
    TicTacToe game

    3*3 grid with alternating player turns
*/

function gameBoard(){
    let board = [];
    const gridDimension = 3;

    for (let i = 0; i < gridDimension; i++) {
        board[i] = [];
        for (let j = 0; j < gridDimension; j++) {
            board[i].push(cell());
        }
    }

    const getBoard = () => board;

    const putMarker = (X, Y, player) => {
        if(board[X][Y].getValue() == 0){
            board[X][Y].addMarker(player);
        }else return;
    };

    const printBoard = () => {
        const boardWithCellValues = board.map((row) => row.map((cell) => cell.getValue()));
        console.log(boardWithCellValues); 
    }

    return {getBoard, putMarker, printBoard};
}

function cell(){
    let value = 0;

    const getValue = () => value;

    const addMarker = (player) => {
        value = player;
    }

    return {getValue, addMarker};
}

function gameControl(
    playerOneName = 'One',
    playerTwoName = 'Two'
){
    const board = gameBoard();

    const players = [{
        name: playerOneName,
        token: 'X'
    },
    {
        name: playerTwoName,
        token: 'O'
    }];

    let activePlayer = players[0];

    const switchTurns = () => {
        activePlayer = (activePlayer === players[0]) ? players[1] : players[0];
    }

    const getActivePlayer = () => activePlayer;

    const checkWinner = (X,Y) => {
        array = board.getBoard();
        let win = false;
        for(let i = 0; i < 3; i++){
            if(array[X][i].getValue() === getActivePlayer().token){
                if(i === 2){
                    win = true;
                    return win;
                }
                continue;
            }else break;
        }
        for(let i = 0; i < 3; i++){
            if(array[i][Y].getValue() === getActivePlayer().token){
                if(i === 2){
                    win = true;
                    return win;
                }
                continue;
            }else break;
        }
        if((X === Y) || ((X === 0 || Y === 2) || (X === 2 || Y == 0))){
            for(let i = 0; i < 3; i++){
                if(array[i][i].getValue() === getActivePlayer().token){
                    if(i === 2){
                        win = true;
                        return win;
                    }
                    continue;
                }else break;
            } 
            for(let i = 0; i < 3; i++){
                if(array[2 - i][i].getValue() === getActivePlayer().token){
                    if(i === 2){
                        win = true;
                        return win;
                    }
                    continue;
                }else break;
            }
        }
    };

    const printTurn = () => {
        board.printBoard();
        console.log(`Player ${getActivePlayer().name}'s turn...`);
    }

    const playTurn = (X, Y) => {
        board.putMarker(X, Y, getActivePlayer().token);

        if(checkWinner(X,Y)){
            return true;
        }else{
        switchTurns();
        printTurn();
        }
    }

    printTurn();

    return {
        playTurn,
        getActivePlayer
    };
}

function screenController(){

    const gamePlayArea = document.querySelector('.play');
    const resetButton = document.querySelector('.reset');   
    let player1;
    let player2;
    let game;

    const renderBoard = () => {
        gamePlayArea.innerText = "";
        gamePlayArea.style.gridTemplateColumns = "repeat(3, 1fr)";
        for(let i = 0; i < 3; i++){
            for(let j = 0; j < 3; j++){
                const cellButton = document.createElement("button");
                cellButton.classList.add('cell');
                cellButton.classList.add(`data-X-${i}`);
                cellButton.classList.add(`data-Y-${j}`);
                gamePlayArea.appendChild(cellButton);
            }
        }
    }

    function triggerWinScreen(name){
        gamePlayArea.innerText = "";
        gamePlayArea.style.gridTemplateColumns = "repeat(2, 1fr)";
        const winTitle = document.createElement('h2');
        const winImage = document.createElement('img');
        winImage.src = "https://www.shutterstock.com/image-photo/baby-wearing-pajamas-printed-blue-260nw-2203625391.jpg"
        winImage.style.height = "100px";
        winTitle.innerText = `Player: ${name} wins!`;

        gamePlayArea.appendChild(winTitle);
        gamePlayArea.appendChild(winImage);
    };

    const updateBoard = (element) => {
        const X = element.classList[1].charAt(7); 
        const Y = element.classList[2].charAt(7); 
        const result = game.playTurn(X, Y);
        if (result) triggerWinScreen(game.getActivePlayer().name);
        element.innerText = (game.getActivePlayer().token);
    };

    function startGame(){
        const gridOfCells = gamePlayArea.querySelectorAll('.cell');
        gridOfCells.forEach(element => {
        element.addEventListener('click', () => {
            updateBoard(element);   
        });
        });
        resetButton.addEventListener('click', function (){
            gamePlayArea.innerHTML = "";
            
            renderBoard();  

            game = gameControl(player1.value, player2.value);

            startGame();
        });

    }

    document.getElementById('gameForm').addEventListener('submit', function(e) {
        e.preventDefault(); 

        player1 = document.getElementById('player1');
        player2 = document.getElementById('player2');

        game = gameControl(player1.value, player2.value);
        renderBoard();

        startGame();
    });
}

screenController(); 