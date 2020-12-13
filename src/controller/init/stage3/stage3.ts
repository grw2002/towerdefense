import { Stage, StageBlocksInterface, StageEnemysInterface, StageHerosInterface } from '@/model/stage';
import blocks from './blocks.json';
import directions from './directions.json';
import { UnitType } from '@/model/unit';
import { BlockType } from '@/model/map';
import { Location } from '@/model/unit';
import { BulletType, TowerAbilitysInterface, TowerType } from '@/model/tower';
import { HeroType } from '@/model/hero';

const enemys: StageEnemysInterface = {};
const towers: TowerAbilitysInterface = {};
const heros: StageHerosInterface = {};

enemys[UnitType.Zombie] = {
    frequency: 10,
    hp: 10,
    speed: 1.5,
    value: 5,
    power: 0.05
};
enemys[UnitType.Creeper] = {
    frequency: 2,
    hp: 10,
    speed: 1,
    value: 10,
    power: 144
};
towers[TowerType.Default] = {
    costs: [1, 10, 20, 30, 40, 50],
    refunds: [1, 5, 15, 30, 50, 75],
    powers: [1, 2, 2.5, 3, 3.5, 4],
    bullets: [BulletType.Default, BulletType.Default, BulletType.Default, BulletType.Default, BulletType.Default, BulletType.Default],
    ranges: [50, 100, 150, 200, 250, 300],
    speeds: [24, 24, 20, 16, 12, 8],
    name: '博雅塔'
};
towers[TowerType.Secondary] = {
    costs: [1, 20, 30, 40, 50, 60],
    refunds: [1, 10, 25, 45, 70, 100],
    powers: [1, 2, 2.3, 2.5, 2.8, 3],
    bullets: [BulletType.Fire, BulletType.Fire, BulletType.Fire, BulletType.Fire, BulletType.Fire, BulletType.Fire],
    ranges: [50, 100, 150, 200, 250, 300],
    speeds: [48, 40, 32, 24, 20, 16],
    name: '烈焰塔'
};
towers[TowerType.Ice] = {
    costs: [1, 20, 30, 40, 50, 60],
    refunds: [1, 10, 25, 45, 70, 100],
    powers: [1, 1, 1, 1, 1.5, 2],
    bullets: [BulletType.Ice, BulletType.Ice, BulletType.Ice, BulletType.Ice, BulletType.Ice, BulletType.Ice],
    ranges: [50, 100, 150, 200, 250, 300],
    speeds: [48, 40, 32, 24, 20, 16],
    name: '大霜塔'
};
heros[HeroType.Steve] = {
    value: 30,
    hp: 10,
    speed: 2,
    power: 0.2
};

const stage1: Stage = {
    name: '乾 坤 大 挪 移',
    blocks,
    directions,
    enemys,
    starts: ((blocks: StageBlocksInterface): Location[] => {
        const starts: Location[] = [];
        for (let i = 0; i <= 33; i++) {
            for (let j = 0; j <= 19; j++) {
                if (blocks[i][j] == BlockType.Start) {
                    starts.push({ x: i, y: j });
                }
            }
        }
        return starts;
    })(blocks),
    ends: ((blocks: StageBlocksInterface): Location[] => {
        const ends: Location[] = [];
        for (let i = 0; i <= 33; i++) {
            for (let j = 0; j <= 19; j++) {
                if (blocks[i][j] == BlockType.End) {
                    ends.push({ x: i, y: j });
                }
            }
        }
        return ends;
    })(blocks),
    towers,
    target: 1000,
    heros
};

export default stage1;