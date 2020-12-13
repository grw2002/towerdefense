import { Position, Size } from '@/model/unit';
import { Hero } from '@/model/hero';
import { drawImageX } from '@/util';

import store from '@/store';
const state = store.state;

export enum DeployStatus {
    Default = 0,
    Deploying = 1
}

function drawOneHero(hero: Hero, ctx: CanvasRenderingContext2D): void {
    const position: Position = hero.getPosition();
    const size: Size = hero.getSize();
    drawImageX(hero.getFrame(), ctx,
        position.x - (size.width / 2), position.y - (size.height / 2));
}

export default function drawHeros(bufferCtx: CanvasRenderingContext2D): void {
    const heros: Hero[] = state.heros;
    for (let i = 0; i < heros.length; i++) {
        drawOneHero(<Hero>heros[i], bufferCtx);
    }
    /**
     * Hp
     */
    for (let i = 0; i < heros.length; i++) {
        const hero: Hero = heros[i];
        const position: Position = hero.getPosition();
        const size: Size = hero.getSize();

        {
            const [sx, sy] = [position.x - size.width / 2, position.y - size.height / 2 - 5];
            bufferCtx.fillStyle = '#595959';
            bufferCtx.fillRect(sx, sy, size.width, 3);
            bufferCtx.fillStyle = '#00a100';
            bufferCtx.fillRect(sx, sy, hero.getHpPercent() * size.width, 3);
        }
    }
}