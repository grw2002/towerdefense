import { Stage } from '@/model/stage';
import blocks from './blocks.json';
import directions from './blocks.json';

const stage0: Stage = {
    blocks,
    directions,
    enemys: {},
    starts: [],
    ends: [],
    towers: {},
    target: 0,
    heros: {},
    name: 'start'
};

export default stage0;