import { Sprite, Texture } from "pixi.js";
import { Player } from "./Player";
import { EllipseCollider } from "../utils/EllipseCollider";

export class Enemy extends Sprite {
    hp = 10;
    speed = 140;

    shootCooldown = 1;
    shootTimer = 0;

    ellipseCollider: EllipseCollider;

    renderScale: number;

    constructor() {
        super();
        this.anchor.set(0.5);

        this.renderScale = Math.min(1, Math.max(0.5, window.innerWidth / 1000));

        this.ellipseCollider = { x: this.x, y: this.y, radiusX: (33 * this.renderScale), radiusY: (56.5 * this.renderScale) };
    }

    setTexture(texture: Texture) {
        this.texture = texture;
    }

    update(deltaTime: number, player: Player, shoot: (x: number, y: number, rotation: number) => void) {
        if (player.dead || this.hp <= 0) return
        
        const dx = player.x - this.x;
        const dy = player.y - this.y;
        this.rotation = Math.atan2(dy, dx) - Math.PI / 2;

        const distance = Math.sqrt(dx * dx + dy * dy);

        if (distance > 300) {
            this.x += (dx / distance) * this.speed * deltaTime;
            this.y += (dy / distance) * this.speed * deltaTime;
        } else {
            this.shootTimer -= deltaTime;

            if (this.shootTimer <= 0) {
                const rotation = Math.atan2(dy, dx) + Math.PI / 2;

                shoot(this.x, this.y, rotation);

                this.shootTimer = this.shootCooldown;
            }
        }

        this.updateCollider();
    }

    takeDamage(damage: number) {
        if (this.hp <= 0) return

        this.hp -= damage;
    }

    private updateCollider() {
        this.ellipseCollider = {
            x: this.x,
            y: this.y,
            radiusX: (33 * this.renderScale),
            radiusY: (56.5 * this.renderScale)
        };
    }
}