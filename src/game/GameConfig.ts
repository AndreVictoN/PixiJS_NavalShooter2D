export interface GameConfig {
    enemySpawnInterval: number;
    matchDuration: number;

    player: {
        maxHp: number;
        speed: number;
        rotationSpeed: number;
    };
}

export const gameConfig: GameConfig = {
    enemySpawnInterval: 5,
    matchDuration: 180,

    player: {
        maxHp: 100,
        speed: 100,
        rotationSpeed: 3,
    },
};