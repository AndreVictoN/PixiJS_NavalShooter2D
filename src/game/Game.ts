import { InputManager } from "./input/InputManager";
import { Player } from "./entities/Player";
import { GameConfig } from "./GameConfig";

export class Game {
    readonly player: Player;
    readonly inputManager: InputManager;

    constructor(readonly config: GameConfig, readonly initialPlayerPosition: { x: number; y: number }) {
        this.player = new Player(this.config.player, initialPlayerPosition);
        this.inputManager = new InputManager();
    }

    update(deltaTime: number) {
        const turn = this.inputManager.inputs.turnLeft ? -1 : this.inputManager.inputs.turnRight ? 1 : 0;

        this.player.update(deltaTime, this.inputManager.inputs.moveForward, turn);
    }
}