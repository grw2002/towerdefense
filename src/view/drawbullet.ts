import { Size, } from '@/model/unit';
import { Bullet } from '@/model/tower';

import store from '@/store';
import { drawImageX } from '@/util';
const state = store.state;

export default function drawTower(bufferCtx: CanvasRenderingContext2D): void {
    const bullets: Bullet[] = state.bullets;
    for (let i = 0; i < bullets.length; i++) {
        const bullet: Bullet = bullets[i];
        const size: Size = bullet.getSize();
        drawImageX(bullet.getFrame(), bufferCtx, bullet.location.x - size.width / 2, bullet.location.y - size.height / 2);
    }
}