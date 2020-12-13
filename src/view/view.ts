/* eslint-disable no-empty */
import { canvas_config } from '@/config';
import { ctx } from '@/model/canvas';
import drawMap from './drawmap';
import drawUnits from './drawunits';
import drawTower from './drawtower';
import drawBullet from './drawbullet';
import drawHeros from './drawhero';
// import drawEnvironment from './drawenvironment';

async function draw(): Promise<void> {
    const buffer: HTMLCanvasElement = document.createElement('canvas');
    [buffer.width, buffer.height] = [canvas_config.width, canvas_config.height];
    const bufferCtx: CanvasRenderingContext2D = <CanvasRenderingContext2D>buffer.getContext('2d');
    bufferCtx.imageSmoothingEnabled = false;

    try {
        drawMap(bufferCtx);
    } catch (e) { }
    try {
        drawUnits(bufferCtx);
    } catch (e) { }
    try {
        drawHeros(bufferCtx);
    } catch (e) { }
    try {
        drawBullet(bufferCtx);
    } catch (e) { }
    try {
        drawTower(bufferCtx);
    } catch (e) { }

    ctx.drawImage(buffer, 0, 0);
}

export default draw;
