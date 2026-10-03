import { useApplication, useTick } from "@pixi/react";
import { Assets, Container, Sprite, Texture } from "pixi.js";
import { useEffect, useRef } from "react";

import { Game } from "../game/Game";
import { Water } from "../game/elements/Water"
import { IslandLayout, islandTextures } from "../game/elements/IslandRender";

interface GameCanvasProps {
    game: Game;
}

const GameCanvas = ({ game }: GameCanvasProps) => {
    const { app } = useApplication();

    const worldRef = useRef<Container | null>(null);
    const playerSpriteRef = useRef<Sprite | null>(null);
    const loadedIslandTextures: Record<string, Texture> = {};

    useEffect(() => {
        const loadAssets = async () => {
            const waterTexture = await Assets.load("/assets/png/default/tiles/tile_73.png");
            const water = new Water(app.screen.width, app.screen.height, waterTexture);

            worldRef?.current?.addChild(water);

            for(const [key, element] of Object.entries(islandTextures)) {
                loadedIslandTextures[key] = await Assets.load(element);
            }

            const island = new IslandLayout(loadedIslandTextures);
            worldRef?.current?.addChild(island);

            const playerTexture = await Assets.load("/assets/png/default/ships/ship_9.png");
            const playerSprite = new Sprite(playerTexture);

            playerSprite.anchor.set(0.5, 0.5);
            playerSprite.x = app.screen.width / 2;
            playerSprite.y = app.screen.height / 2;
            
            playerSpriteRef.current = playerSprite;
            worldRef?.current?.addChild(playerSprite);

            await Assets.load("/assets/png/default/ship_parts/cannon_ball.png");
            worldRef?.current?.addChild(game.projectilesContainer);
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

        for(const projectile of game.projectileEntities) {
            projectile.update(deltaTime);
        }

        for (let i = game.projectileEntities.length - 1; i >= 0; i--) {
            const projectile = game.projectileEntities[i];

            projectile.update(deltaTime);

            if (projectile.x < 0 || projectile.x > app.screen.width || projectile.y < 0 || projectile.y > app.screen.height) {
                game.projectilesContainer.removeChild(projectile);
                projectile.destroy();

                game.projectileEntities.splice(i, 1);
            }
        }
    });

    return <pixiContainer ref={worldRef} />;
};

export default GameCanvas;
