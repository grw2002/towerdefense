import { Stage } from '@/model/stage';
import { Timer } from '@/model/timer';
import { UnitType } from '@/model/unit';

import store from '@/store';
const state = store.state;

export default function (stage: Stage): void {
    const fps: number = state.fps;
    /**
     * zombie timer
     */
    if (stage.enemys[UnitType.Zombie]) {
        const zombieTimer: Timer = new Timer(Math.floor(fps * 10 / stage.enemys[UnitType.Zombie].frequency));
        state.timer.zombieTimer = zombieTimer;
    }
    /**
     * creeper timer
     */
    if (stage.enemys[UnitType.Creeper]) {
        const creeperTimer: Timer = new Timer(Math.floor(fps * 10 / stage.enemys[UnitType.Creeper].frequency));
        state.timer.creeperTimer = creeperTimer;
    }
}