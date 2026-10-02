import { InputManager } from "./input/InputManager";
import { Player } from "./entities/Player";
import { GameConfig } from "./GameConfig";
import { KeyboardInput } from "./input/KeyboardInput";
import { Arena } from "../elements/Arena";

export class Game {
    readonly player: Player;

    readonly inputManager: InputManager;
    private readonly keyboardInput: KeyboardInput;

    readonly arena: Arena;

    constructor(readonly config: GameConfig, readonly initialPlayerPosition: { x: number; y: number }) {
        this.player = new Player(this.config.player, initialPlayerPosition);
        this.inputManager = new InputManager();
        this.keyboardInput = new KeyboardInput(this.inputManager);

        this.arena = {
            width: window.innerWidth,
            height: window.innerHeight,
        };
    }

    update(deltaTime: number) {
        const turn = this.inputManager.inputs.turnLeft ? -1 : this.inputManager.inputs.turnRight ? 1 : 0;

        this.player.update(deltaTime, this.inputManager.inputs.moveForward, turn);

        this.player.x = Math.max(33, Math.min(this.player.x, this.arena.width - 33));
        this.player.y = Math.max(33, Math.min(this.player.y, this.arena.height - 33));
    }

    destroy() {
        this.keyboardInput.destroy();
    }
}
