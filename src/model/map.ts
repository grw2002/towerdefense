import { map_config } from '@/config';
import { Animate } from './imagex';
import { Timer } from './timer';

export enum BlockType {
    Grass = 0,
    Road = 1,
    Start = 2,
    End = 3,
    Towerbase = 4,
    Tower = 5,
    Lava = 6,
    Ice = 7
}

export interface BlockImageInterface {
    [index: number]: Animate
}

export interface Map {
    [index: number]: {
        [index: number]: Block
    }
}

export enum Direction {
    Up = 0,
    Right = 1,
    Down = 2,
    Left = 3
}

export class Block {
    type: BlockType;
    x: number;
    y: number;
    width: number;
    height: number;
    nex?: Block;
    direction: Direction;
    timer?: Timer;
    constructor(x = 0, y = 0, type = BlockType.Grass, direction = Direction.Down, timer?: Timer) {
        this.type = type;
        this.x = x;
        this.y = y;
        this.width = map_config.width;
        this.height = map_config.height;
        this.direction = direction;
        this.timer = timer;
    }
}