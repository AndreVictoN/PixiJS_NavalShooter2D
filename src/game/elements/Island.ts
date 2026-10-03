import { EllipseCollider } from "../utils/EllipseCollider";
import { islands } from "./IslandLayout";

export class Island {
  ellipseCollider: EllipseCollider;

  scale = Math.min(1, Math.max(0.5, window.innerWidth / 1000));

  constructor() {
    this.ellipseCollider = {
      x: (64 * islands[0][0].length * this.scale) / 2,
      y: (64 * (islands[0].length - 2) * this.scale) / 2,
      radiusX: (64 * (islands[0][0].length - 1) * this.scale) / 2,
      radiusY: (64 * islands[0].length * this.scale) / 2,
    };
  }
}
