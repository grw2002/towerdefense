/* eslint-disable no-empty */
import { map_config } from '@/config';
import { BlockType, Map } from '@/model/map';
import store from '@/store';
const state = store.state;

export default function (): void {
    const map: Map = state.map;
    try {
        for (let i = 1; i <= map_config.xNum; i++) {
            for (let j = 1; j <= map_config.yNum; j++) {
                if (map[i][j].type == BlockType.Lava) {
                    map[i][j].timer?.nextTick();
                    if (map[i][j].timer?.getRound()) {
                        map[i][j].type = BlockType.Road;
                        map[i][j].timer = undefined;
                    }
                } else if (map[i][j].type == BlockType.Ice) {
                    map[i][j].timer?.nextTick();
                    if (map[i][j].timer?.getRound()) {
                        map[i][j].type = BlockType.Road;
                        map[i][j].timer = undefined;
                    }
                }
            }
        }
    } catch (e) { }
}