import { Texture } from "pixi.js";
import { useState } from "react";

interface TouchButtonProps {
    normalTexture: Texture;
    pressedTexture: Texture;
    directionTexture: Texture;
    sizeScale: number;
    x: number;
    y: number;
    onInputStart: () => void;
    onInputEnd: () => void;
}

export default function TouchButton({ normalTexture, pressedTexture, directionTexture, sizeScale, x, y, onInputStart, onInputEnd, }: TouchButtonProps) {
    const [pressed, setPressed] = useState(false);

    let texture = normalTexture;

    if (pressed) {
        texture = pressedTexture;
    }

    return (
        <>
            <pixiSprite texture={texture} anchor={0.5} x={x} y={y} eventMode="static" onPointerDown={() => {
                    setPressed(true);
                    onInputStart();
                }}

                onPointerUp={() => {
                    setPressed(false);
                    onInputEnd();
                }}

                onPointerUpOutside={() => {
                    setPressed(false);
                    onInputEnd();
                }}

                onPointerCancel={() => {
                    setPressed(false);
                    onInputEnd();
                }} scale={{ x: sizeScale, y: sizeScale }}
            />

            <pixiSprite texture={directionTexture} anchor={0.5} x={x} y={y} scale={{ x: sizeScale * 0.65, y: sizeScale * 0.65 }}/>
        </>
    );
}