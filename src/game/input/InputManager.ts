import { GameInputs } from "./GameInputs";

export class InputManager {
    readonly inputs: GameInputs = {
        moveForward: false,
        turnRight: false,
        turnLeft: false,
        fireFront: false,
        fireRight: false,
        fireLeft: false
    }
}