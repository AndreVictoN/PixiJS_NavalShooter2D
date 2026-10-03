import { InputManager } from "./InputManager";

export class KeyboardInput {
  readonly inputs: Record<string, keyof InputManager["inputs"]> = {
    ArrowUp: "moveForward",
    ArrowLeft: "turnLeft",
    ArrowRight: "turnRight",

    q: "fireLeft",
    e: "fireRight",
    w: "fireFront",
  };

  constructor(readonly inputManager: InputManager) {
    window.addEventListener("keydown", (ev) => this.handleKey(ev, true));
    window.addEventListener("keyup", (ev) => this.handleKey(ev, false));
  }

  private handleKey = (event: KeyboardEvent, isDown: boolean) => {
    const inputKey = this.inputs[event.key];

    if (!inputKey || event.repeat) return;

    event.preventDefault();

    if (isDown) {
      this.inputManager.setInput(inputKey, isDown);
    } else {
      this.inputManager.setInput(inputKey, isDown);
    }
  };

  destroy() {
    window.removeEventListener("keydown", (ev) => this.handleKey(ev, true));
    window.removeEventListener("keyup", (ev) => this.handleKey(ev, false));
  }
}
