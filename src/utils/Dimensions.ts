/** Config part */
// TODO: Change height for mobile devices
const FIXED_SIZE = 1080;
const FIXED_MEASURE = "Height";

/** Name maping */
const fixedName = FIXED_MEASURE;
const resName = fixedName === "Height" ? "Width" : "Height";
const FIXED_NAME = fixedName.toUpperCase();
const RES_NAME = resName.toUpperCase();

/** Measures of document */
const documentElement = document.documentElement;
const documentFixed = documentElement["client" + fixedName];
const documentRes = documentElement["client" + resName];
const ratio = documentRes / documentFixed;

/** Canvas measures */
const canvasFixed = FIXED_SIZE;
const canvasRes = FIXED_SIZE * ratio;

const screen: any = {};
screen["CANVAS_" + FIXED_NAME] = canvasFixed;
screen["CANVAS_" + RES_NAME] = canvasRes;

const GAME_WIDTH = screen.CANVAS_WIDTH * window.devicePixelRatio;
const GAME_HEIGHT = screen.CANVAS_HEIGHT * window.devicePixelRatio;
(window as any).GAME_WIDTH = GAME_WIDTH;
(window as any).GAME_HEIGHT = GAME_HEIGHT;

interface DimensionsType {
  width: number;
  height: number;
  pixelRatio: number;
  HUD: {
    right: number;
    left: number;
    top: number;
    bottom: number;
  };
}

const Dimensions: DimensionsType = {
  width: GAME_WIDTH,
  height: GAME_HEIGHT,
  pixelRatio: window.devicePixelRatio,
  HUD: {
    left: GAME_WIDTH * 0.4 - 8,
    top: GAME_HEIGHT * 0.4 - 8,
    right: GAME_WIDTH * 0.6,
    bottom: GAME_HEIGHT * 0.6,
  },
};

export default Dimensions;
