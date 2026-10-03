import { Container, Sprite, Texture } from "pixi.js";

const tilesPath = "/assets/png/default/tiles";

export const islandTextures = {
  grassyBottom: tilesPath + "/tile_54.png",
  grassyBottom2: tilesPath + "/tile_55.png",
  grassyBottom3: tilesPath + "/tile_56.png",
  grassyBottom4: tilesPath + "/tile_57.png",
  sandGrassCurveLB: tilesPath + "/tile_37.png",
  sandGrassCurveLT: tilesPath + "/tile_57.png",
  grassyLeft: tilesPath + "/tile_22.png",
  grassyLeft2: tilesPath + "/tile_38.png",
  grassyLeft3: tilesPath + "/tile_54.png",
  grassyRight: tilesPath + "/tile_25.png",
  grassyRight2: tilesPath + "/tile_41.png",
  sandGrassCurveRB: tilesPath + "/tile_36.png",
  plainGrass: tilesPath + "/tile_23.png",
  whiteGrass: tilesPath + "/tile_24.png",
  detailedGrass: tilesPath + "/tile_39.png",
  detailedGrass2: tilesPath + "/tile_40.png",
  waterBottom: tilesPath + "/tile_42.png",
  waterBottom2: tilesPath + "/tile_43.png",
  waterBottom3: tilesPath + "/tile_44.png",
  waterLeft: tilesPath + "/tile_26.png",
  waterRight: tilesPath + "/tile_28.png",
  waterCurveLB: tilesPath + "/tile_59.png",
  waterCurveRB: tilesPath + "/tile_58.png",
} as const;

export const islands = [
  [
    [
      "grassyBottom2",
      "grassyBottom2",
      "sandGrassCurveLB",
      "plainGrass",
      "plainGrass",
      "plainGrass",
      "detailedGrass",
      "grassyRight2",
      "waterRight",
    ],
    [
      "waterBottom2",
      "waterCurveLB",
      "grassyLeft",
      "plainGrass",
      "plainGrass",
      "sandGrassCurveRB",
      "grassyBottom3",
      "sandGrassCurveLT",
      "waterRight",
    ],
    [
      "",
      "waterLeft",
      "grassyLeft",
      "plainGrass",
      "plainGrass",
      "grassyRight",
      "waterCurveRB",
      "waterBottom2",
      "waterBottom3",
    ],
    [
      "",
      "waterLeft",
      "grassyBottom",
      "grassyBottom2",
      "grassyBottom3",
      "sandGrassCurveLT",
      "waterRight",
    ],
    [
      "",
      "waterBottom",
      "waterBottom2",
      "waterBottom2",
      "waterBottom2",
      "waterBottom2",
      "waterBottom3",
    ],
  ],
] as const;

export class IslandLayout extends Container {
  readonly textures: Record<string, Texture>;
  readonly tileSize: number;

  imageScale: number;

  constructor(islandTextures: Record<string, Texture>) {
    super();

    this.imageScale = Math.min(1, Math.max(0.5, window.innerWidth / 1000));

    this.textures = islandTextures;
    this.tileSize = 64;

    this.renderIsland();
  }

  private renderIsland() {
    islands.forEach((island) => {
      island.forEach((row, rowIndex) => {
        row.forEach((tile, columnIndex) => {
          if (!tile) return;

          const texture = this.textures[tile];

          if (texture) {
            const sprite = new Sprite(texture);

            sprite.x = columnIndex * this.tileSize;
            sprite.y = rowIndex * this.tileSize;

            this.addChild(sprite);
          }
        });
      });
    });
  }
}
