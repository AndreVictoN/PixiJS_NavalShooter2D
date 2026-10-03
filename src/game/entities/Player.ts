import { GameConfig } from "../GameConfig";
import { EllipseCollider } from "../utils/EllipseCollider";

export class Player {
  hp: number;
  speed: number;
  rotation: number;

  x: number;
  y: number;

  ellipseCollider: EllipseCollider;

  dead: boolean;

  scale: number;

  constructor(readonly config: GameConfig["player"], readonly initialPosition: { x: number; y: number }) {
    this.hp = config.maxHp;
    this.speed = config.speed;
    this.rotation = 0;

    this.scale = Math.min(1, Math.max(0.5, window.innerWidth / 1000));

    this.x = initialPosition.x;
    this.y = initialPosition.y;
    this.ellipseCollider = { x: initialPosition.x, y: initialPosition.y, radiusX: initialPosition.x + (33 * this.scale), radiusY: initialPosition.y + (56.5 * this.scale) };

    this.dead = false;
  }

  update(deltaTime: number, move: boolean, turn: number) {
    if (this.dead) return;
    
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
      radiusX: (33 * this.scale),
      radiusY: (56.5 * this.scale)
    };
  }

  takeDamage(damage: number) {
    if (this.hp <= 0) return

    this.hp -= damage;
  }
}
