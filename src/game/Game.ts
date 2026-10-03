import { InputManager } from "./input/InputManager";
import { Player } from "./entities/Player";
import { GameConfig } from "./GameConfig";
import { KeyboardInput } from "./input/KeyboardInput";
import { Arena } from "./elements/Arena";
import { Island } from "./elements/Island";
import { Assets, Container } from "pixi.js";
import { Projectile } from "./entities/Projectile";

export class Game {
    readonly player: Player;
    readonly island: Island;

    readonly inputManager: InputManager;
    private readonly keyboardInput: KeyboardInput;

    readonly arena: Arena;

    projectilesContainer: Container;
    projectileEntities: Projectile[] = [];

    constructor(readonly config: GameConfig, readonly initialPlayerPosition: { x: number; y: number }) {
        this.player = new Player(this.config.player, initialPlayerPosition);
        this.island = new Island();
        this.inputManager = new InputManager();
        this.projectilesContainer = new Container();
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

        const playerCollision = this.checkCollision(this.player.x, this.player.y,
            this.island.ellipseCollider.x, this.island.ellipseCollider.y,
            this.island.ellipseCollider.radiusX, this.island.ellipseCollider.radiusY
        );

        if(playerCollision) {
            this.player.x = previousX;
            this.player.y = previousY;
        }

        if(this.inputManager.inputs.fireFront) {
            this.shoot('f');

            this.inputManager.setInput("fireFront", false);
        } else if (this.inputManager.inputs.fireRight) {
            this.shoot('r');

            this.inputManager.setInput("fireRight", false);
        } else if (this.inputManager.inputs.fireLeft) {
            this.shoot('l');

            this.inputManager.setInput("fireLeft", false);
        }

        for (let i = this.projectileEntities.length - 1; i >= 0; i--) {
            const projectile = this.projectileEntities[i];

            const projectileCollision = this.checkCollision(projectile.x, projectile.y,
                this.island.ellipseCollider.x, this.island.ellipseCollider.y,
                this.island.ellipseCollider.radiusX, this.island.ellipseCollider.radiusY
            );

            if (projectileCollision) {
                projectile.destroy();
                this.projectileEntities.splice(i, 1);
            }
        }
    }

    checkCollision(x1: number, y1: number, x2: number, y2: number, rx: number, ry: number) {
        const dx = x1 - x2;
        const dy = y1 - y2;

        return Math.pow(dx, 2) / Math.pow(rx, 2) + Math.pow(dy, 2) / Math.pow(ry, 2) < 1;
    }

    shoot(direction: string) {
        if (direction !== 'f') {
            for (let i = 0; i < 3; i++) {
                const offset = i === 0 ? 0 : i === 1 ? 56 : -56;

                const projectile = new Projectile(
                    Assets.get("/assets/png/default/ship_parts/cannon_ball.png"),
                    this.player.x + Math.sin(this.player.rotation) * offset,
                    this.player.y + Math.cos(this.player.rotation) * offset,
                    this.player.rotation,
                    direction
                );

                this.projectileEntities.push(projectile);
                this.projectilesContainer.addChild(projectile);
            }
        } else {
            const projectile = new Projectile(
                Assets.get("/assets/png/default/ship_parts/cannon_ball.png"),
                this.player.x,
                this.player.y,
                this.player.rotation,
                direction
            );

            this.projectileEntities.push(projectile);
            this.projectilesContainer.addChild(projectile);
        }
    }

    destroy() {
        this.keyboardInput.destroy();
    }
}
