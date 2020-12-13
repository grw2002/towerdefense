import { map_config } from '@/config';
import { Animate } from '@/model/imagex';
import store from '@/store';
import { drawImageX } from '@/util';
const state = store.state;

export default function (bufferCtx: CanvasRenderingContext2D): void {
    const animates: Animate[] = state.image.rainAnimate;
    for (let i = 0; i < animates.length; i++) {
        animates[i].nextTick();
    }
    for (let i = 0; i < map_config.xNum; i += 4) {
        for (let j = 0; j < map_config.yNum; j += 4) {
            drawImageX(animates[(i + j) % 4].getFrame(), bufferCtx, (i + 4 * Math.random() - 2) * map_config.width, (j + 4 * Math.random() - 2) * map_config.height);
        }
    }
}