const { writeFile } = require('fs/promises');
const { Image } = require('imagescript');
const fetch = require('node-fetch');
const { BattleShip } = require('.');

const battleShip = new BattleShip();
// console.log(battleShip.boards[0]);
battleShip.chooseShip(0, 5, 0, 4, 'h');
battleShip.chooseShip(0, 4, 0, 5, 'h');
battleShip.chooseShip(0, 3, 0, 6, 'h');
battleShip.chooseShip(0, 2, 0, 7, 'h');

battleShip.chooseShip(1, 5, 0, 4, 'h');
battleShip.chooseShip(1, 4, 0, 5, 'h');
battleShip.chooseShip(1, 3, 0, 6, 'h');
battleShip.chooseShip(1, 2, 0, 7, 'h');

// console.log(battleShip.turn);
// battleShip.attack(0, 4);
// battleShip.attack(0, 4);
// battleShip.attack(0, 5);
// battleShip.attack(0, 5);
// battleShip.attack(0, 6);
// battleShip.attack(0, 6);
// battleShip.attack(0, 7);
// battleShip.attack(0, 7);
battleShip.attack(0, 4);
battleShip.attack(0, 4);
battleShip.attack(1, 4);
battleShip.attack(1, 4);
battleShip.attack(2, 4);
battleShip.attack(2, 4);
battleShip.attack(3, 4);
battleShip.attack(3, 4);
battleShip.attack(4, 4);
battleShip.attack(4, 4);

battleShip.attack(0, 5);
battleShip.attack(0, 5);
battleShip.attack(1, 5);
battleShip.attack(1, 5);
battleShip.attack(2, 5);
battleShip.attack(2, 5);
battleShip.attack(3, 5);
battleShip.attack(3, 5);

battleShip.attack(0, 6);
battleShip.attack(0, 6);
battleShip.attack(1, 6);
battleShip.attack(1, 6);
battleShip.attack(2, 6);
battleShip.attack(2, 6);

battleShip.attack(0, 7);
battleShip.attack(0, 7);
console.log(battleShip.turn);
battleShip.attack(1, 7);
// battleShip.attack(1, 7);
console.log(battleShip.turn, battleShip.winner);

const colors = {
    5: 0xACACACff,
    4: 0x00ff00ff,
    3: 0x0000ffff,
    2: 0x000000ff,
    0: 0xffffffff,
};

(async () => {
    // @ts-ignore
    const font = await fetch('https://cdn.discordapp.com/attachments/856247511311581195/891325732729544714/Impact.ttf').then(r => r.arrayBuffer()).then(b => new Uint8Array(b));

    for (let turn = 0; turn < 2; turn++) {
        const board = new Image(1000, 1000);
        const image = new Image(1100, 1100);
        board.fill(0x000000ff);
        const boardTurn = battleShip.boards[turn];
        const boardAttacked = battleShip.boardsAttacked[turn];
        for (let i = 0; i < 10; i++) {
            for (let j = 0; j < 10; j++) {
                const casilla = boardTurn[i][j];
                const casillaAtacada = boardAttacked[i][j];
                board.drawBox(j * 100 + 2, i * 100 + 2, 96, 96, 0xffffffff);
                if (colors[casilla] && casilla) board.drawBox(j * 100 + 2, i * 100 + 2, 96, 96, colors[casilla]);
                if (casillaAtacada == 1) board.drawBox(j * 100 + 25, i * 100 + 25, 50, 50, 0xff0000ff);
            }
        }

        for (let i = 0; i < 10; i++) {
            const text = await Image.renderText(font, 50, `${i}`, 0xffffffff);
            image.composite(text, i * 100 + 125, 0);
        }

        for (let i = 0; i < 10; i++) {
            const text = await Image.renderText(font, 50, `${i}`, 0xffffffff);
            image.composite(text, 0 + 25, i * 100 + 125);
        }

        image.composite(board, 100, 100);

        writeFile(`./${turn}.png`, await image.encode());
    }

})();