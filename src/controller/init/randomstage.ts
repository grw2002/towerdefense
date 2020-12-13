import { Stage, StageBlocksInterface, StageEnemysInterface, StageHerosInterface } from '@/model/stage';
import { UnitType } from '@/model/unit';
import { BlockType, Direction } from '@/model/map';
import { Location } from '@/model/unit';
import { BulletType, TowerAbilitysInterface, TowerType } from '@/model/tower';
import { HeroType } from '@/model/hero';
import { initStageX } from './initstage';

const enemys: StageEnemysInterface = {};
const towers: TowerAbilitysInterface = {};
const heros: StageHerosInterface = {};
const blocks: {
    [index: number]: {
        [index: number]: BlockType
    }
} = {};
const map: {
    [index: number]: {
        [index: number]: BlockType
    }
} = {};
const directions: {
    [index: number]: {
        [index: number]: Direction
    }
} = {};

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
    refunds: [1, 10, 15, 20, 25, 30],
    powers: [1, 2, 2.3, 2.5, 2.8, 3],
    bullets: [BulletType.Fire, BulletType.Fire, BulletType.Fire, BulletType.Fire, BulletType.Fire, BulletType.Fire],
    ranges: [50, 100, 150, 200, 250, 300],
    speeds: [48, 40, 32, 24, 20, 16],
    name: '烈焰塔'
};
towers[TowerType.Ice] = {
    costs: [1, 20, 30, 40, 50, 60],
    refunds: [1, 10, 15, 20, 25, 30],
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

let seed = 1024;

function rand(min: number, max: number) {
    seed = (seed * 9301 + 49297) % 233280;
    const rnd = seed / 233280.0;
    return Math.floor(min + rnd * (max - min + 1));
}

function judgeBlock(x: number, y: number): boolean {
    if (x < 1 || x > 17 || y < 1 || y > 9) {
        return map[x][y] == 0;
    }
    return (<number><unknown>(map[x - 1][y] == 0) + <number><unknown>(map[x + 1][y] == 0) + <number><unknown>(map[x][y - 1] == 0) + <number><unknown>(map[x][y + 1] == 0)) == 3;
}

function countRoad(x: number, y: number): number {
    return <number><unknown>(blocks[x - 1][y] == 1) + <number><unknown>(blocks[x + 1][y] == 1) + <number><unknown>(blocks[x][y - 1] == 1) + <number><unknown>(blocks[x][y + 1] == 1);
}

function countCornorRoad(x: number, y: number): number {
    return <number><unknown>(blocks[x - 1][y - 1] == 1) + <number><unknown>(blocks[x - 1][y + 1] == 1) + <number><unknown>(blocks[x + 1][y - 1] == 1) + <number><unknown>(blocks[x + 1][y + 1] == 1);
}

export default function (sd: number): void {
    seed = sd;
    for (let i = 0; i <= 33; i++) {
        blocks[i] = {};
        directions[i] = {};
        map[i] = {};
        for (let j = 0; j <= 19; j++) {
            map[i][j] = 0;
            blocks[i][j] = 0;
            directions[i][j] = 0;
        }
    }
    const l: Location = { x: 0, y: 0 };
    let d: Direction = <Direction>rand(0, 3);
    if (d == Direction.Up) {
        [l.x, l.y] = [rand(1, 16), 10];
        map[l.x][l.y] = BlockType.Start;
        blocks[l.x * 2][19] = blocks[l.x * 2 - 1][19] = BlockType.Start;
        directions[l.x * 2][19] = directions[l.x * 2 - 1][19] = d;
        l.y--;
    } else if (d == Direction.Down) {
        [l.x, l.y] = [rand(1, 16), 0];
        map[l.x][l.y] = BlockType.Start;
        blocks[l.x * 2][0] = blocks[l.x * 2 - 1][0] = BlockType.Start;
        directions[l.x * 2][0] = directions[l.x * 2 - 1][0] = d;
        l.y++;
    } else if (d == Direction.Left) {
        [l.x, l.y] = [17, rand(1, 9)];
        map[l.x][l.y] = BlockType.Start;
        blocks[33][l.y * 2] = blocks[33][l.y * 2 - 1] = BlockType.Start;
        directions[33][l.y * 2] = directions[33][l.y * 2 - 1] = d;
        l.x--;
    } else {
        [l.x, l.y] = [0, rand(1, 9)];
        map[l.x][l.y] = BlockType.Start;
        blocks[0][l.y * 2] = blocks[0][l.y * 2 - 1] = BlockType.Start;
        directions[0][l.y * 2] = directions[0][l.y * 2 - 1] = d;
        l.x++;
    }
    const dx = [0, 1, 0, -1], dy = [-1, 0, 1, 0];
    const sx = [0, 0, 1, 1], sy = [1, 0, 0, 1];
    const nx = [1, 0, 0, 1], ny = [1, 1, 0, 0];
    // eslint-disable-next-line no-constant-condition
    while (true) {
        if (l.x > 16 || l.x < 1 || l.y > 9 || l.y < 1) {
            if (l.x > 16) {
                blocks[33][l.y * 2 - 1] = blocks[33][l.y * 2] = BlockType.End;
                directions[33][l.y * 2 - 1] = directions[33][l.y * 2] = d;
            } else if (l.x < 1) {
                blocks[0][l.y * 2 - 1] = blocks[0][l.y * 2] = BlockType.End;
                directions[0][l.y * 2 - 1] = directions[0][l.y * 2] = d;
            } else if (l.y > 9) {
                blocks[l.x * 2 - 1][19] = blocks[l.x * 2][19] = BlockType.End;
                directions[l.x * 2 - 1][19] = directions[l.x * 2][19] = d;
            } else {
                blocks[l.x * 2 - 1][0] = blocks[l.x * 2][0] = BlockType.End;
                directions[l.x * 2 - 1][19] = directions[l.x * 2][19] = d;
            }
            map[l.x][l.y] = BlockType.End;
            break;
        }
        map[l.x][l.y] = BlockType.Road;
        blocks[l.x * 2][l.y * 2] =
            blocks[l.x * 2 - 1][l.y * 2] =
            blocks[l.x * 2][l.y * 2 - 1] =
            blocks[l.x * 2 - 1][l.y * 2 - 1] = BlockType.Road;
        let nd: Direction;
        const nds = [];
        for (let i = 0; i <= 3; i++) {
            nd = i;
            if ((d - nd + 4) % 4 == 2 || map[l.x + dx[nd]][l.y + dy[nd]] != 0) {
                continue;
            }
            if (judgeBlock(l.x + dx[nd], l.y + dy[nd])) {
                nds.push(nd);
            }
        }
        if (nds.length == 0) {
            blocks[l.x * 2][l.y * 2] =
                blocks[l.x * 2 - 1][l.y * 2] =
                blocks[l.x * 2][l.y * 2 - 1] =
                blocks[l.x * 2 - 1][l.y * 2 - 1] = BlockType.End;
            directions[l.x * 2][l.y * 2] =
                directions[l.x * 2 - 1][l.y * 2] =
                directions[l.x * 2][l.y * 2 - 1] =
                directions[l.x * 2 - 1][l.y * 2 - 1] = d;
            break;
        } else {
            nd = nds[rand(0, nds.length - 1)];
        }
        if (d == nd) {
            directions[l.x * 2][l.y * 2] =
                directions[l.x * 2 - 1][l.y * 2] =
                directions[l.x * 2][l.y * 2 - 1] =
                directions[l.x * 2 - 1][l.y * 2 - 1] = nd;
        } else if ((nd - d + 4) % 4 == 1) {//顺时针
            directions[l.x * 2][l.y * 2] =
                directions[l.x * 2 - 1][l.y * 2] =
                directions[l.x * 2][l.y * 2 - 1] =
                directions[l.x * 2 - 1][l.y * 2 - 1] = nd;
            directions[l.x * 2 - 1 + sx[d]][l.y * 2 - 1 + sy[d]] = d;
        } else {//逆时针
            directions[l.x * 2][l.y * 2] =
                directions[l.x * 2 - 1][l.y * 2] =
                directions[l.x * 2][l.y * 2 - 1] =
                directions[l.x * 2 - 1][l.y * 2 - 1] = nd;
            directions[l.x * 2 - 1 + nx[d]][l.y * 2 - 1 + ny[d]] = d;
        }
        d = nd;
        [l.x, l.y] = [l.x + dx[d], l.y + dy[d]];
    }
    for (let i = 1; i <= 32; i++) {
        for (let j = 1; j <= 18; j++) {
            if (blocks[i][j] == BlockType.Grass) {
                if (countRoad(i, j) >= 2) {
                    if (rand(0, 2) == 0) {
                        blocks[i][j] = BlockType.Towerbase;
                    }
                } else if (countRoad(i, j) == 0) {
                    if (countCornorRoad(i, j) >= 2) {
                        blocks[i][j] = BlockType.Towerbase;
                    } else if (countCornorRoad(i, j) == 1) {
                        if (rand(0, 3) == 0) {
                            blocks[i][j] = BlockType.Towerbase;
                        }
                    }
                }
            }
        }
    }
    const stage: Stage = {
        name: '随机·无尽',
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
        target: 0x7fffffff,
        heros
    };
    initStageX(stage);
}