document.addEventListener('DOMContentLoaded', () => {
    const cells = document.querySelectorAll('.cell');
    const statusArea = document.getElementById('statusArea');
    const resetButton = document.getElementById('resetButton');

    let playerXName = 'Player X';
    let playerOName = 'Player O';
    let currentPlayerSymbol = 'X';
    let boardState = ['', '', '', '', '', '', '', '', ''];
    let gameActive = true;

    const winningConditions = [
        [0, 1, 2], [3, 4, 5], [6, 7, 8],
        [0, 3, 6], [1, 4, 7], [2, 5, 8],
        [0, 4, 8], [2, 4, 6]
    ];

    function getPlayerNames() {
        let nameX = prompt("Enter name for Player X (Max 15 chars):", playerXName);
        if (nameX && nameX.trim() !== "") {
            playerXName = nameX.trim().substring(0, 15);
        } else {
            playerXName = "Player X";
        }

        let nameO = prompt("Enter name for Player O (Max 15 chars):", playerOName);
        if (nameO && nameO.trim() !== "") {
            playerOName = nameO.trim().substring(0, 15);
        } else {
            playerOName = "Player O";
        }
    }

    function getCurrentPlayerName() {
        return currentPlayerSymbol === 'X' ? playerXName : playerOName;
    }

    function displayMessage(message) {
        statusArea.textContent = message;
    }

    function updateTurnDisplay() {
        displayMessage(`${getCurrentPlayerName()}'s turn (${currentPlayerSymbol})`);
    }

    function handleCellPlayed(clickedCell, clickedCellIndex) {
        boardState[clickedCellIndex] = currentPlayerSymbol;
        clickedCell.textContent = currentPlayerSymbol;
        clickedCell.classList.add(currentPlayerSymbol);
        clickedCell.classList.add('occupied');
    }

    function switchPlayer() {
        currentPlayerSymbol = currentPlayerSymbol === 'X' ? 'O' : 'X';
        updateTurnDisplay();
    }

    function checkWin() {
        let roundWon = false;
        let winningLine = [];

        for (let i = 0; i < winningConditions.length; i++) {
            const winCondition = winningConditions[i];
            const a = boardState[winCondition[0]];
            const b = boardState[winCondition[1]];
            const c = boardState[winCondition[2]];

            if (a === '' || b === '' || c === '') {
                continue;
            }
            if (a === b && b === c) {
                roundWon = true;
                winningLine = winCondition;
                break;
            }
        }

        if (roundWon) {
            displayMessage(`${getCurrentPlayerName()} (${currentPlayerSymbol}) has won!`);
            gameActive = false;
            winningLine.forEach(index => {
                cells[index].classList.add('winning-cell');
            });
            return true;
        }
        return false;
    }

    function checkDraw() {
        if (!boardState.includes('') && gameActive) {
            displayMessage('Game ended in a draw!');
            gameActive = false;
            return true;
        }
        return false;
    }

    function handleCellClick(event) {
        const clickedCell = event.target;
        const clickedCellIndex = parseInt(clickedCell.getAttribute('data-index'));

        if (boardState[clickedCellIndex] !== '' || !gameActive) {
            return;
        }

        handleCellPlayed(clickedCell, clickedCellIndex);

        if (checkWin()) {
            return;
        }
        if (checkDraw()) {
            return;
        }

        switchPlayer();
    }

    function initializeGame() {
        getPlayerNames();
        currentPlayerSymbol = 'X';
        boardState = ['', '', '', '', '', '', '', '', ''];
        gameActive = true;
        updateTurnDisplay();

        cells.forEach(cell => {
            cell.textContent = '';
            cell.classList.remove('X', 'O', 'occupied', 'winning-cell');
        });
    }

    cells.forEach(cell => cell.addEventListener('click', handleCellClick));
    resetButton.addEventListener('click', initializeGame);

    initializeGame();
});