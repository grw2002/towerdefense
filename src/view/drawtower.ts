import { map_config } from '@/config';
import { Location } from '@/model/unit';
import { Tower } from '@/model/tower';

import store from '@/store';
import { calcBlock, drawImageX } from '@/util';
const state = store.state;

export default function drawTower(bufferCtx: CanvasRenderingContext2D): void {
    const towers: Tower[] = state.towers;
    for (let i = 0; i < towers.length; i++) {
        const tower: Tower = towers[i];
        const location: Location = tower.location;
        const [x, y] = [(location.x - 1) * map_config.width + 2, (location.y - 2) * map_config.height + 4];
        drawImageX(tower.getFrame(), bufferCtx, x, y);
    }
    if (state.mouse.location) {
        const { x, y } = calcBlock(<Location>state.mouse.location);
        for (let i = 0; i < towers.length; i++) {
            const tower: Tower = towers[i];
            const location: Location = tower.location;
            const fl: Location = tower.getFullLocation();
            if (x == location.x && y == location.y) {
                bufferCtx.beginPath();
                bufferCtx.strokeStyle = '#670875';
                bufferCtx.lineWidth = 2;
                bufferCtx.arc(fl.x, fl.y, tower.towerAbility.ranges[tower.level], 0, 2 * Math.PI);
                bufferCtx.stroke();
            }
        }
    }
}