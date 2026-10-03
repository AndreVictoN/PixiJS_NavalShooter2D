import { useEffect, useState } from "react";
import { useApplication } from "@pixi/react";
import { Assets, Texture } from "pixi.js";

import { InputManager } from "../../game/input/InputManager";
import TouchButton from "./TouchButton";

interface TouchButtonsProps {
    inputManager: InputManager;
}

const ProjectileTouchButtons = ({ inputManager }: TouchButtonsProps) => {
    const { app } = useApplication();

    const buttonScale = Math.min(1.2, Math.max(0.5, app.screen.width / 1000));
    const buttonSize = 64 * buttonScale;
    const gapSide = buttonSize * 1.4;
    const paddingSide = app.screen.width - buttonSize * 4;
    const paddingBottom = buttonSize;

    const controlWidth = buttonSize * 2 + gapSide;
    const controlHeight = buttonSize * 2;

    const y = app.screen.height - paddingBottom - controlHeight;

    const [normalTexture, setNormalTexture] = useState<Texture | null>(null);
    const [pressedTexture, setPressedTexture] = useState<Texture | null>(null);
    const [projectileDirectionTextures, setProjectileDirectionTextures] = useState<Texture[]>([]);

    useEffect(() => {
        const loadTextures = async () => {
            const pathNormal = "/assets/png/default/ui/controls/button_round_normal.png";
            const pathPressed = "/assets/png/default/ui/controls/button_round_pressed.png";
            const normal = Assets.cache.has(pathNormal) ? Assets.get(pathNormal) : await Assets.load(pathNormal); 

            const pressed = Assets.cache.has(pathPressed) ? Assets.get(pathPressed) : await Assets.load(pathPressed); 

            const directions = await Promise.all([
                Assets.load("/assets/png/default/ui/controls/icon_fire_front.png"),
                Assets.load("/assets/png/default/ui/controls/icon_fire_left.png"),
                Assets.load("/assets/png/default/ui/controls/icon_fire_right.png"),
            ]);

            setNormalTexture(normal);
            setPressedTexture(pressed);
            setProjectileDirectionTextures(directions);
        };

        loadTextures();
    }, []);

    if (!normalTexture || !pressedTexture) {
        return null;
    }

    return (
        <pixiContainer x={paddingSide} y={y}>
            <TouchButton normalTexture={normalTexture} pressedTexture={pressedTexture} directionTexture={projectileDirectionTextures[0]} sizeScale={buttonScale}
                x={controlWidth / 2} y={buttonSize} onInputStart={() => inputManager.setInput("fireFront", true)}
                onInputEnd={() => inputManager.setInput("fireFront", false)} />

            <TouchButton normalTexture={normalTexture} pressedTexture={pressedTexture} directionTexture={projectileDirectionTextures[1]} sizeScale={buttonScale}
                x={buttonSize / 2} y={buttonSize + buttonSize / 2} onInputStart={() => inputManager.setInput("fireLeft", true)}
                onInputEnd={() => inputManager.setInput("fireLeft", false)} />

            <TouchButton normalTexture={normalTexture} pressedTexture={pressedTexture} directionTexture={projectileDirectionTextures[2]} sizeScale={buttonScale}
                x={buttonSize + gapSide + buttonSize / 2} y={buttonSize + buttonSize / 2} onInputStart={() => 
                    inputManager.setInput("fireRight", true)} onInputEnd={() => inputManager.setInput("fireRight", false)}/>
        </pixiContainer>
    );
};

export default ProjectileTouchButtons;
