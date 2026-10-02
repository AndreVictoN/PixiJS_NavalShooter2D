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

    setInput(input: keyof GameInputs, value: boolean) {
        this.inputs[input] = value;
    }

    reset() {
        for (const input of Object.keys(this.inputs) as Array<keyof GameInputs>) {
            this.inputs[input] = false;
        }
    }
}