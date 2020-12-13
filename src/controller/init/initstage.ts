import initMap from './initmap';

import store from '@/store';
const state = store.state;

import initTimer from './inittimer';
import { Stage } from '@/model/stage';
import resetStatus from './resetstatus';
import randomstage from './randomstage';

export default function (stageid: number): void {
    state.stageid = stageid;
    if (stageid == -1) {
        randomstage(state.seed);
        return;
    }
    const stage: Stage = state.stages[stageid];
    resetStatus();
    state.gamemode = 'stage';
    state.player.mode = 'game';
    state.stage = stage;
    initMap(stage);
    initTimer(stage);
    state.timeron = true;
}

export function initStageX(stage: Stage): void {
    resetStatus();
    state.gamemode = 'stage';
    state.player.mode = 'game';
    state.stage = stage;
    initMap(stage);
    initTimer(stage);
    state.timeron = true;
}
