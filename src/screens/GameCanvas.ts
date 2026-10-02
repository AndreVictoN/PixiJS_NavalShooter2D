import { useApplication, useTick } from "@pixi/react";
import { Assets, Sprite } from "pixi.js";
import { useEffect, useRef } from "react";

import { Game } from "../game/Game";
import { gameConfig } from "../game/GameConfig";

const GameCanvas = () => {
    const { app } = useApplication();

    const gameRef = useRef<Game>(new Game(gameConfig, { x: app.screen.width / 2, y: app.screen.height / 2 }));
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

        gameRef.current.update(deltaTime);

        if(playerSpriteRef.current) {
            playerSpriteRef.current.x = gameRef.current.player.x;
            playerSpriteRef.current.y = gameRef.current.player.y;
            playerSpriteRef.current.rotation = gameRef.current.player.rotation + Math.PI;
        }
    });

    return null;
};

export default GameCanvas;