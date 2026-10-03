import { EllipseCollider } from "../utils/EllipseCollider";
import { islands } from "./IslandRender";

export class Island {
    ellipseCollider: EllipseCollider;

    constructor() {
        this.ellipseCollider = {
            x: (64 * islands[0][0].length) / 2,
            y: (64 * (islands[0].length - 2)) / 2,
            radiusX: (64 * (islands[0][0].length - 1)) / 2,
            radiusY: (64 * (islands[0].length)) / 2,
        };
    }
}