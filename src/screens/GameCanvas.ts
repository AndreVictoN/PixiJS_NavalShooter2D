import { useApplication, useTick } from "@pixi/react";
import { Assets, Sprite } from "pixi.js";
import { useEffect, useRef } from "react";

import { Game } from "../game/Game";

interface GameCanvasProps {
    game: Game;
}

const GameCanvas = ({ game }: GameCanvasProps) => {
    const { app } = useApplication();

    const playerSpriteRef = useRef<Sprite | null>(null);

    useEffect(() => {
        const loadPlayerAssets = async () => {
            const playerTexture = await Assets.load("/assets/png/default/ships/ship_3.png");
            const playerSprite = new Sprite(playerTexture);

            playerSprite.anchor.set(0.5, 0.5);
            playerSprite.x = app.screen.width / 2;
            playerSprite.y = app.screen.height / 2;

            playerSpriteRef.current = playerSprite;
            app.stage.addChild(playerSprite);
        }

        loadPlayerAssets();

        return() => {
            if (playerSpriteRef.current) {
                app.stage.removeChild(playerSpriteRef.current);
                playerSpriteRef.current.destroy();
                playerSpriteRef.current = null;
            }
        }
    }, [app]);

    useTick((ticker) => {
        const deltaTime = ticker.deltaMS / 1000;

        game.update(deltaTime);

        if(playerSpriteRef.current) {
            playerSpriteRef.current.x = game.player.x;
            playerSpriteRef.current.y = game.player.y;
            playerSpriteRef.current.rotation = game.player.rotation + Math.PI;
        }
    });

    return null;
};

export default GameCanvas;