import { map_config } from '@/config';
import { Block, Map } from '@/model/map';
import { Stage } from '@/model/stage';

import store from '@/store';
const state = store.state;

export default function (stage: Stage): void {
    const myMap: Map = {};
    const { blocks, directions } = stage;
    for (let i = 0; i <= map_config.xNum + 1; i++) {
        myMap[i] = {};
        for (let j = 0; j <= map_config.yNum + 1; j++) {
            myMap[i][j] = new Block(i, j, blocks[i][j], directions[i][j]);
        }
    }
    state.map = myMap;
}
