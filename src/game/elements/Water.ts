import { Texture, TilingSprite } from "pixi.js";

export class Water extends TilingSprite {
  constructor(width: number, height: number, texture: Texture) {
    super({ texture, width, height });
  }
}
