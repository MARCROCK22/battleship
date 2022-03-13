//@ts-check

class BattleShip {
    /**
     * Generar juego nuevo
     */
    constructor() {
        /**
         * Ganador del juego
         * @type {number} 0 o 1
         */
        this.winner = null;
        /**
         * @type {Array<Array<Array<number>>>} Tableros de juego
         */
        this.boards = [
            createBoard(),
            createBoard()
        ];
        /**
         * @type {Array<Array<Array<number>>>} Tableros de juego (atacados)
         */
        this.boardsAttacked = [];
        /**
         * @type {number} Turno actual
         */
        this.turn = 0;
        /**
         * @type {Array<Array<number>>} Barcos que pueden ser puestos
         */
        this.canPlayShips = [
            [5, 4, 3, 2],
            [5, 4, 3, 2]
        ];
    }
    /**
     * Poner un barco en la posicion x,y
     * @param {number} player 0 o 1
     * @param {number} ship 5,4,3,2
     * @param {number} x Posicion x
     * @param {number} y Posicion y
     * @param {'v'|'h'} orientation Orientacion horizontal o vertical
     */
    chooseShip(player, ship, x, y, orientation) {
        if (player !== 0 && player !== 1) {
            throw new Error('player must be 0 or 1');
        }

        if (this.canPlayShips[player].length === 0) {
            throw new Error('no more ships to play');
        }

        if (!this.canPlayShips[player].includes(ship)) {
            throw new Error('ship not available');
        }

        if (x < 0 || x > 9 || y < 0 || y > 9) {
            throw new Error('out of bounds');
        }

        if (orientation !== 'v' && orientation !== 'h') {
            throw new Error('orientation must be v or h');
        }

        if (orientation === 'v' && (y + ship) > 9) {
            throw new Error('ship too long');
        }

        if (orientation === 'h' && (x + ship) > 9) {
            throw new Error('ship too long');
        }

        if (orientation === 'v') {
            for (let i = 0; i < ship; i++) {
                if (this.boards[player][y + i][x] !== 0) {
                    throw new Error('ship already taken');
                }
            }
        } else {
            for (let i = 0; i < ship; i++) {
                if (this.boards[player][y][x + i] !== 0) {
                    throw new Error('ship already taken');
                }
            }
        }

        if (orientation === 'v') {
            for (let i = 0; i < ship; i++) {
                this.boards[player][y + i][x] = ship;
            }
        } else {
            for (let i = 0; i < ship; i++) {
                this.boards[player][y][x + i] = ship;
            }
        }
        this.canPlayShips[player] = this.canPlayShips[player].filter(s => s !== ship);

        if (this.canPlayShips[0].length === 0 && this.canPlayShips[1].length === 0) {
            this.boardsAttacked = JSON.parse(JSON.stringify(this.boards));
        }

    }
    /**
     * Atacar la posicion x,y
     * @param {number} x Posicion x
     * @param {number} y Posicion y
     */
    attack(x, y) {
        if (this.winner !== null) {
            throw new Error('game finished');
        }
        //check if all ships are deployed
        if (this.canPlayShips[0].length !== 0 || this.canPlayShips[1].length !== 0) {
            throw new Error('ships not deployed');
        }

        if (x < 0 || x > 9 || y < 0 || y > 9) {
            throw new Error('out of bounds');
        }

        if ([1, -1].includes(this.boardsAttacked[this.alternTurn][y][x])) {
            throw new Error('already attacked');
        }

        if (this.boardsAttacked[this.alternTurn][y][x] === 0) {
            this.boardsAttacked[this.alternTurn][y][x] = -1;
        } else {
            this.boardsAttacked[this.alternTurn][y][x] = 1;
        }
        this.checkIfWin();
        this.turn = this.alternTurn;
    }
    /**
     * Turno siguiente
     * @returns {number} Turno inverso
     */
    get alternTurn() {
        return this.turn === 0 ? 1 : 0;
    }

    /**
     * Comprobar si el juego ha terminado
     * @returns {boolean}
     */
    checkIfWin() {
        let win = true;
        for (let y = 0; y < 10; y++) {
            for (let x = 0; x < 10; x++) {
                if ((this.boards[this.turn][y][x] !== 0) && (this.boardsAttacked[this.alternTurn][y][x] !== 1)) {
                    win = false;
                }
            }
        }
        if (win) this.winner = this.turn == 1 ? 1 : 0;
        return win;
    }
    /**
     * Chequear si el juego ha terminado
     * @returns {boolean}
     */
    get finished() {
        return this.winner !== null;
    }
    /**
     * Obtener el tablero del ganador
     * @returns {Array<Array<number>>}
     */
    get boardOfWinner() {
        return this.winner === null ? null : this.boards[this.winner];
    }
    /**
     * Obtener el tablero atacado del ganador
     * @returns {Array<Array<number>>}
     */
    //obtener el boardsAttacked del ganador
    get boardOfWinnerAttacked() {
        return this.winner === null ? null : this.boardsAttacked[this.winner];
    }

}
/**
 * Crear un tablero
 * @returns {Array<Array<number>>} Tablero
 */
function createBoard() {
    /**
     * @type {Array<Array<number>>} Tablero
     */
    const board = [];
    for (let i = 0; i < 10; i++) {
        board.push([]);
        for (let j = 0; j < 10; j++) {
            board[i].push(0);
        }
    }
    return board;
}

module.exports = { BattleShip };