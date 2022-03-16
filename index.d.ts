declare namespace GameBattleShip {
    class BattleShip {
        winner: 0 | 1 | null;
        boards: [number[][], number[][]];
        boardsAttacked: [number[][], number[][]];
        turn: 0 | 1;
        canPlayShips: [number[], number[]];
        chooseShip(player: 0 | 1, ship: number, x:number, y:number, orientation: 'h' | 'v'): void
        attack(x: number, y:number): void
        get alternTurn(): 1 | 0
        checkIfWin(): boolean
        get finished(): boolean
        get boardOfWinner(): number[][]
        get boardOfWinnerAttacked(): number[][]
    }
    export { BattleShip }
}

export default GameBattleShip;