import { fps } from '@/config';

import store from '@/store';
const state = store.state;

import { Timer } from '@/model/timer';
import { DeployStatus } from '@/view/drawhero';

import stage0 from './stage0/stage0';
import stage1 from './stage1/stage1';
import stage2 from './stage2/stage2';
import stage3 from './stage3/stage3';

export default async function (): Promise<void> {
    state.units = [];
    state.heros = [];
    state.towers = [];
    state.bullets = [];
    state.mouse = {};
    state.mouse.location = { x: 0, y: 0 };
    state.timeron = false;
    state.fps = fps;
    state.stage = {};
    state.gamemode = '';
    state.stageid = state.stageid || 0;
    state.stages = [stage0, stage1, stage2, stage3];
    state.player = state.player || {};
    state.player.money = 100;
    state.player.cd = 0;
    state.player.cdTimer = new Timer(1);
    state.player.deployStatus = DeployStatus.Default;
    state.player.home = 100;
    state.player.score = 0;
    state.player.mode = 'game';
    state.timer = <{
        [index: number]: Timer
    }>{};
}