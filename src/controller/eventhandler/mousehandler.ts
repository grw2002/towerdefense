import store from '@/store';
import { myCanvas } from '@/model/canvas';
import { Location } from '@/model/unit';
import { calcBlock } from '@/util';
import { BlockType, Map } from '@/model/map';
import { Tower } from '@/model/tower';
import { DeployStatus } from '@/view/drawhero';
import { deployHero } from '../timerhandler/herohandler';
import { HeroType } from '@/model/hero';
import { StageHerosInterface } from '@/model/stage';
import { Player } from '@/model/player';

const state = store.state;

function onClick(e: MouseEvent): void {
    state.mouse.location = {
        x: Math.floor(e.offsetX + 0.5),
        y: Math.floor(e.offsetY + 0.5)
    };
    if (state.timeron) {
        const location: Location = calcBlock(<Location>state.mouse.location);
        const map: Map = state.map;
        if (map[location.x][location.y].type == BlockType.Towerbase) {//Build Tower
            state.vue.buildTower(location);
        } else if (map[location.x][location.y].type == BlockType.Tower) {//Alter Tower
            const towers: Tower[] = state.towers;
            for (let i = 0; i < towers.length; i++) {
                if (towers[i].location.x == location.x && towers[i].location.y == location.y) {
                    state.vue.alterTower(towers[i]);
                    break;
                }
            }
        } else if ((map[location.x][location.y].type == BlockType.Road || map[location.x][location.y].type == BlockType.Lava || map[location.x][location.y].type == BlockType.Ice)
            && state.player.deployStatus == DeployStatus.Deploying) {
            const player: Player = state.player;
            const stageHeros: StageHerosInterface = state.stage.heros;
            if (player.money >= stageHeros[HeroType.Steve].value) {
                deployHero(location, 1, HeroType.Steve, stageHeros[HeroType.Steve].power, stageHeros[HeroType.Steve].hp, stageHeros[HeroType.Steve].speed);
                player.money -= stageHeros[HeroType.Steve].value;
            }
            state.player.deployStatus = DeployStatus.Default;
        }
    }
}

function onMove(e: MouseEvent): void {
    state.mouse.location = {
        x: Math.floor(e.offsetX + 0.5),
        y: Math.floor(e.offsetY + 0.5)
    };
}

export default function (): void {
    state.mouse = {};
    myCanvas.onclick = onClick;
    myCanvas.onmousemove = onMove;
}