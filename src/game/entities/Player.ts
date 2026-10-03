import { GameConfig } from "../GameConfig";
import { EllipseCollider } from "../utils/EllipseCollider";

export class Player {
  hp: number;
  speed: number;
  rotation: number;

  x: number;
  y: number;

  ellipseCollider: EllipseCollider;

  constructor(readonly config: GameConfig["player"], readonly initialPosition: { x: number; y: number }) {
    this.hp = config.maxHp;
    this.speed = config.speed;
    this.rotation = 0;

    this.x = initialPosition.x;
    this.y = initialPosition.y;
    this.ellipseCollider = { x: initialPosition.x, y: initialPosition.y, radiusX: initialPosition.x + 33, radiusY: initialPosition.y + 56.5 }

    this.updateCollider();
  }

  update(deltaTime: number, move: boolean, turn: number) {
    this.rotation += turn * this.config.rotationSpeed * deltaTime;

    if (move) {
      this.x += Math.sin(this.rotation) * this.config.speed * deltaTime;
      this.y -= Math.cos(this.rotation) * this.config.speed * deltaTime;
    }

    this.updateCollider();
  }

  private updateCollider() {
    this.ellipseCollider = {
      x: this.x,
      y: this.y,
      radiusX: this.x + 33,
      radiusY: this.y + 56
    };
  }
}
