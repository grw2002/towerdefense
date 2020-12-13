/* eslint-disable no-empty */
import draw from '@/view/view';
// import { fps } from '@/config';
import { Unit } from '@/model/unit';
import unitHandler from './unithandler';
import generateHandler from './generatehandler';
import { Stage } from '@/model/stage';
import { Bullet } from '@/model/tower';
import { BlockImageInterface, BlockType } from '@/model/map';
import towerHandler from './towerhandler';
import bulletHandler from './bullethandler';

import store from '@/store';
import heroHandler from './herohandler';
import { Hero } from '@/model/hero';
import stageHandler from './stagehandler';
import blockHandler from './blockhandler';
const state = store.state;
let las: number = new Date().getTime(), now: number;

function animateNexttick(): void {
    // Unit animate nextTick
    const units: Unit[] = state.units;
    const bullets: Bullet[] = state.bullets;
    const heros: Hero[] = state.heros;
    try {
        for (let i = 0; i < units.length; i++) {
            units[i].nextTick();
        }
    } catch (e) { }
    try {
        for (let i = 0; i < bullets.length; i++) {
            bullets[i].nextTick();
        }
    } catch (e) { }
    try {
        for (let i = 0; i < heros.length; i++) {
            heros[i].nextTick();
        }
    } catch (e) { }
    try {
        const blockImage: BlockImageInterface = state.image.blockImage;
        blockImage[BlockType.Lava].nextTick();
        blockImage[BlockType.End].nextTick();
    } catch (e) { }
}

export default async function timerEventHandler(): Promise<void> {
    requestAnimationFrame(timerEventHandler);
    const spf = 1000 / state.fps;
    if ((now = new Date().getTime()) - las < spf) {
        return;
    }
    las = now;

    if (state.timeron) {
        if (stageHandler()) {
            return;
        }
        generateHandler(<Stage>state.stage);
        animateNexttick();
        blockHandler();
        unitHandler();
        heroHandler();
        towerHandler();
        bulletHandler();
        draw();
    }
}