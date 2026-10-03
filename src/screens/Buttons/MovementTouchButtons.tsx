import { useEffect, useState } from "react";
import { useApplication } from "@pixi/react";
import { Assets, Texture } from "pixi.js";

import { InputManager } from "../../game/input/InputManager";
import TouchButton from "./TouchButton";

interface TouchButtonsProps {
  inputManager: InputManager;
}

const TouchButtons = ({ inputManager }: TouchButtonsProps) => {
  const { app } = useApplication();

  const buttonScale = Math.min(1.2, Math.max(0.5, app.screen.width / 1000));
  const buttonSize = 64 * buttonScale;
  const gapSide = buttonSize * 1.4;
  const paddingSide = buttonSize * 0.5;
  const paddingBottom = buttonSize;

  const controlWidth = buttonSize * 2 + gapSide;
  const controlHeight = buttonSize * 2;

  const y = app.screen.height - paddingBottom - controlHeight;

  const [normalTexture, setNormalTexture] = useState<Texture | null>(null);
  const [pressedTexture, setPressedTexture] = useState<Texture | null>(null);
  const [directionTextures, setDirectionTextures] = useState<Texture[]>([]);

  useEffect(() => {
    const loadTextures = async () => {
      const normal = await Assets.load(
        "/assets/png/default/ui/controls/button_round_normal.png",
      );

      const pressed = await Assets.load(
        "/assets/png/default/ui/controls/button_round_pressed.png",
      );

      const directions = await Promise.all([
        Assets.load("/assets/png/default/ui/controls/icon_forward.png"),
        Assets.load("/assets/png/default/ui/controls/icon_turn_left.png"),
        Assets.load("/assets/png/default/ui/controls/icon_turn_right.png"),
      ]);

      setNormalTexture(normal);
      setPressedTexture(pressed);
      setDirectionTextures(directions);
    };

    loadTextures();
  }, []);

  if (!normalTexture || !pressedTexture) {
    return null;
  }

  return (
    <pixiContainer x={paddingSide} y={y}>
      <TouchButton
        normalTexture={normalTexture}
        pressedTexture={pressedTexture}
        directionTexture={directionTextures[0]}
        sizeScale={buttonScale}
        x={controlWidth / 2}
        y={buttonSize}
        onInputStart={() => inputManager.setInput("moveForward", true)}
        onInputEnd={() => inputManager.setInput("moveForward", false)}
      />

      <TouchButton
        normalTexture={normalTexture}
        pressedTexture={pressedTexture}
        directionTexture={directionTextures[1]}
        sizeScale={buttonScale}
        x={buttonSize / 2}
        y={buttonSize + buttonSize / 2}
        onInputStart={() => inputManager.setInput("turnLeft", true)}
        onInputEnd={() => inputManager.setInput("turnLeft", false)}
      />

      <TouchButton
        normalTexture={normalTexture}
        pressedTexture={pressedTexture}
        directionTexture={directionTextures[2]}
        sizeScale={buttonScale}
        x={buttonSize + gapSide + buttonSize / 2}
        y={buttonSize + buttonSize / 2}
        onInputStart={() => inputManager.setInput("turnRight", true)}
        onInputEnd={() => inputManager.setInput("turnRight", false)}
      />
    </pixiContainer>
  );
};

export default TouchButtons;
