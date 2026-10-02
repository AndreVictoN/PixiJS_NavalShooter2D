import { GameConfig } from "../GameConfig";

export class Player {
    hp: number;
    speed: number;
    rotation: number;

    x: number;
    y: number;

    constructor(readonly config: GameConfig["player"], readonly initialPosition: { x: number; y: number }) {
        this.hp = config.maxHp;
        this.speed = config.speed;
        this.rotation = 0;

        this.x = initialPosition.x;
        this.y = initialPosition.y;
    }

    update(deltaTime: number, move: boolean, turn: number) {
        this.rotation += turn * this.config.rotationSpeed * deltaTime;

        if (move) {
            this.x += Math.sin(this.rotation) * this.config.speed * deltaTime;
            this.y -= Math.cos(this.rotation) * this.config.speed * deltaTime;
        }
    }
}