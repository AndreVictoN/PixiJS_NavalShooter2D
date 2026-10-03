import { Sprite, Texture } from "pixi.js";

export class Projectile extends Sprite {
    speed = 500;
    damage = 1;
    direction: string;

    constructor(texture: Texture, x: number, y: number, rotation: number, direction: string) {
        super(texture);

        this.anchor.set(0.5);
        this.position.set(x, y);
        this.rotation = rotation;
        this.direction = direction;
    }

    update(deltaTime: number) {
        if (this. direction === 'f') {
            this.x += Math.sin(this.rotation) * this.speed * deltaTime;
            this.y -= Math.cos(this.rotation) * this.speed * deltaTime;
        } else if (this. direction === 'r') {
            this.x += Math.cos(this.rotation) * this.speed * deltaTime;
            this.y += Math.sin(this.rotation) * this.speed * deltaTime;
        } else if (this. direction === 'l') {
            this.x -= Math.cos(this.rotation) * this.speed * deltaTime;
            this.y -= Math.sin(this.rotation) * this.speed * deltaTime;
        }
    }
}