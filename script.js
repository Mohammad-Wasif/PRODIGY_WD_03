// script.js

document.addEventListener('DOMContentLoaded', () => {
    const cells = document.querySelectorAll('.cell');
    const resetButton = document.getElementById('reset');
    const turnMessage = document.getElementById('turn-message');
    const xWinsElement = document.getElementById('x-wins');
    const oWinsElement = document.getElementById('o-wins');
    
    let currentPlayer = 'X';
    let board = ['', '', '', '', '', '', '', '', ''];
    let xWins = 0;
    let oWins = 0;

    const winPatterns = [
        [0, 1, 2],
        [3, 4, 5],
        [6, 7, 8],
        [0, 3, 6],
        [1, 4, 7],
        [2, 5, 8],
        [0, 4, 8],
        [2, 4, 6]
    ];

    cells.forEach(cell => {
        cell.addEventListener('click', handleClick);
    });

    resetButton.addEventListener('click', resetGame);

    function handleClick(event) {
        const cell = event.target;
        const index = cell.getAttribute('data-index');

        if (board[index] === '') {
            board[index] = currentPlayer;
            cell.textContent = currentPlayer;
            cell.classList.add(currentPlayer);
            if (checkWin(currentPlayer)) {
                alert(`${currentPlayer} wins!`);
                if (currentPlayer === 'X') {
                    xWins++;
                    xWinsElement.textContent = xWins;
                } else {
                    oWins++;
                    oWinsElement.textContent = oWins;
                }
                resetGame();
            } else if (board.every(cell => cell !== '')) {
                alert('Draw!');
                resetGame();
            } else {
                currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
                turnMessage.textContent = `Player ${currentPlayer}'s turn`;
            }
        }
    }

    function checkWin(player) {
        return winPatterns.some(pattern => {
            return pattern.every(index => board[index] === player);
        });
    }

    function resetGame() {
        board = ['', '', '', '', '', '', '', '', ''];
        cells.forEach(cell => {
            cell.textContent = '';
            cell.classList.remove('X', 'O');
        });
        currentPlayer = 'X';
        turnMessage.textContent = `Player ${currentPlayer}'s turn`;
    }
});
