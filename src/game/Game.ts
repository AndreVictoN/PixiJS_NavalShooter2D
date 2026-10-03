import { InputManager } from "./input/InputManager";
import { Player } from "./entities/Player";
import { GameConfig } from "./GameConfig";
import { KeyboardInput } from "./input/KeyboardInput";
import { Arena } from "./elements/Arena";
import { Island } from "./elements/Island";

export class Game {
    readonly player: Player;
    readonly island: Island;

    readonly inputManager: InputManager;
    private readonly keyboardInput: KeyboardInput;

    readonly arena: Arena;

    constructor(readonly config: GameConfig, readonly initialPlayerPosition: { x: number; y: number }) {
        this.player = new Player(this.config.player, initialPlayerPosition);
        this.island = new Island();
        this.inputManager = new InputManager();
        this.keyboardInput = new KeyboardInput(this.inputManager);

        this.arena = {
            width: window.innerWidth,
            height: window.innerHeight,
        };
    }

    update(deltaTime: number) {
        const previousX = this.player.x;
        const previousY = this.player.y;

        const turn = this.inputManager.inputs.turnLeft ? -1 : this.inputManager.inputs.turnRight ? 1 : 0;

        this.player.update(deltaTime, this.inputManager.inputs.moveForward, turn);

        this.player.x = Math.max(33, Math.min(this.player.x, this.arena.width - 33));
        this.player.y = Math.max(33, Math.min(this.player.y, this.arena.height - 33));

        const dx = this.player.x - this.island.ellipseCollider.x;
        const dy = this.player.y - this.island.ellipseCollider.y;

        const collision = Math.pow(dx, 2) / Math.pow(this.island.ellipseCollider.radiusX, 2) + Math.pow(dy, 2) / Math.pow(this.island.ellipseCollider.radiusY, 2) < 1;

        if(collision) {
            this.player.x = previousX;
            this.player.y = previousY;
        }
    }

    destroy() {
        this.keyboardInput.destroy();
    }
}
