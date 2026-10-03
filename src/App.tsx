import { Application, extend } from "@pixi/react";
import { Sprite, Container } from "pixi.js";

import GameCanvas from "./screens/GameCanvas";
import { useRef } from "react";
import { Game } from "./game/Game";
import { gameConfig } from "./game/GameConfig";
import MovementTouchButtons from "./screens/Buttons/MovementTouchButtons";
import ProjectileTouchButtons from "./screens/Buttons/ProjectileTouchButtons";

extend({
  Sprite,
  Container,
});

export default function App() {
  const gameRef = useRef<Game | null>(null);

  if (!gameRef.current) {
    gameRef.current = new Game(gameConfig, {
      x: window.innerWidth / 2,
      y: window.innerHeight / 2,
    });
  }

  const game = gameRef.current;

  return (
    <main>
      <Application background={"#1099bb"} resizeTo={window} antialias>
        <GameCanvas game={game} />

        <MovementTouchButtons inputManager={game.inputManager} />
        <ProjectileTouchButtons inputManager={game.inputManager} />
      </Application>
    </main>
  );
}
