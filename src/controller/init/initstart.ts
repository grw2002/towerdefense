import store from '@/store';
import initMap from './initmap';
const state = store.state;

import { canvas_config } from '@/config';
import { ctx } from '@/model/canvas';
import drawMap from '@/view/drawmap';

import stage0 from './stage0/stage0';
import { Location } from '@/model/unit';
import initStage from './initstage';
import resetStatus from './resetstatus';

export function startClickHandler(): void {
    const location: Location = state.mouse.location;
    if (location.x >= 360 && location.x <= 360 + 128 && location.y >= 288 && location.y <= 288 + 48) {
        initStage(1);
    }
    if (location.x >= 560 && location.x <= 560 + 128 && location.y >= 288 && location.y <= 488 + 48) {
        alert('这里是Help');
    }
}

function drawStart(): void {
    const buffer: HTMLCanvasElement = document.createElement('canvas');
    [buffer.width, buffer.height] = [canvas_config.width, canvas_config.height];
    const bufferCtx: CanvasRenderingContext2D = <CanvasRenderingContext2D>buffer.getContext('2d');
    bufferCtx.clearRect(0, 0, canvas_config.width, canvas_config.height);
    bufferCtx.imageSmoothingEnabled = false;

    drawMap(bufferCtx);

    ctx.drawImage(buffer, 0, 0);
}

export default function (): void {
    resetStatus();
    state.gamemode = 'start';
    state.timeron = false;
    state.stage = stage0;
    initMap(stage0);
    drawStart();
}