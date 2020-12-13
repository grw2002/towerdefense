import { canvas_config } from '../config';

const myCanvas: HTMLCanvasElement = document.createElement('canvas');
const ctx: CanvasRenderingContext2D = <CanvasRenderingContext2D>myCanvas.getContext('2d');
const rect: DOMRectList = myCanvas.getClientRects();

[myCanvas.width, myCanvas.height] = [canvas_config.width, canvas_config.height];
myCanvas.id = 'app';
ctx.imageSmoothingEnabled = false;

export { myCanvas, ctx, rect };