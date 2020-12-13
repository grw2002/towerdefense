import { Player } from '@/model/player';
import { Stage } from '@/model/stage';
import store from '@/store';
const state = store.state;

export default function (): boolean {
    const player: Player = state.player;
    const stage: Stage = state.stage;
    if (player.score >= stage.target) {
        state.timeron = false;
        state.vue.victory();
        return true;
    }
    if (player.home <= 0) {
        state.timeron = false;
        state.vue.gameOver();
        return true;
    }
    return false;
}