declare namespace GameBattleShip {
    class BattleShip {
        winner: 0 | 1 | null;
        boards: [number[][], number[][]];
        boardsAttacked: [number[][], number[][]];
        turn: 0 | 1;
        canPlayShips: [[number, number, number, number], [number, number, number, number]];
        chooseShip(player: 0 | 1, ship: 5 | 4 | 3 | 2, x: 0 | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9, y: 0 | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9, orientation: 'h' | 'v'): void
        attack(x: 0 | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9, y: 0 | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9): void
        get alternTurn(): 1 | 0
        checkIfWin(): boolean
        get finished(): boolean
        get boardOfWinner(): number[][]
        get boardOfWinnerAttacked(): number[][]
    }
    export { BattleShip }
}

export default GameBattleShip;