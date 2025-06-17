import { COLOR_MAP } from './constants.js';

export const GAME_STATE = {
    idle: 'idle',
    active: 'active',
    paused: 'paused',
    won: 'won',
    lost: 'lost',
    finished: 'finished',
};

export const checkIsWinning = (grid, targetColors) => {
    const targetColorSet = new Set(
        targetColors.map((color) => COLOR_MAP[color])
    );

    return grid.every((row) =>
        row.every((color) => !targetColorSet.has(color))
    );
};
