import { Application } from "@pixi/react";
import GameCanvas from "./screens/GameCanvas";

export default function App() {
  return (
    <Application background={"#1099bb"} resizeTo={window} antialias>
      <GameCanvas />
    </Application>
  );
}
