import { useApplication, useTick } from "@pixi/react";
import { Assets, Container, Sprite } from "pixi.js";
import { useEffect, useRef } from "react";

import { Game } from "../game/Game";
import { Water } from "../game/elements/Water"

interface GameCanvasProps {
    game: Game;
}

const GameCanvas = ({ game }: GameCanvasProps) => {
    const { app } = useApplication();

    const worldRef = useRef<Container | null>(null);
    const playerSpriteRef = useRef<Sprite | null>(null);

    useEffect(() => {
        const loadAssets = async () => {
            const waterTexture = await Assets.load("/assets/png/default/tiles/tile_73.png");
            const water = new Water(app.screen.width, app.screen.height, waterTexture);

            worldRef?.current?.addChild(water);

            const playerTexture = await Assets.load("/assets/png/default/ships/ship_3.png",);
            const playerSprite = new Sprite(playerTexture);

            playerSprite.anchor.set(0.5, 0.5);
            playerSprite.x = app.screen.width / 2;
            playerSprite.y = app.screen.height / 2;

            playerSpriteRef.current = playerSprite;
            worldRef.current?.addChild(playerSprite);
        };

        loadAssets();

        return () => {
            if (playerSpriteRef.current) {
                playerSpriteRef.current.destroy();
                playerSpriteRef.current = null;
            }
        };
    }, [app]);

    useTick((ticker) => {
        const deltaTime = ticker.deltaMS / 1000;

        game.update(deltaTime);

        if (playerSpriteRef.current) {
            playerSpriteRef.current.x = game.player.x;
            playerSpriteRef.current.y = game.player.y;
            playerSpriteRef.current.rotation = game.player.rotation + Math.PI;
        }
    });

    return <pixiContainer ref={worldRef} />;
};

export default GameCanvas;
