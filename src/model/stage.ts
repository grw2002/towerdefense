import { BlockType, Direction } from '@/model/map';
import { Location } from '@/model/unit';
import { TowerAbilitysInterface } from './tower';

export interface StageBlocksInterface {
    [propName: number]: {
        [propName: number]: BlockType
    }
}

export interface StageDirectionsInterface {
    [propName: number]: {
        [propName: number]: Direction
    }
}

export interface StageHerosInterface {
    [index: number]: {
        hp: number,
        speed: number,
        value: number,
        power: number
    }
}

export interface StageEnemysInterface {
    [index: number]: {
        frequency: number,
        hp: number,
        speed: number,
        value: number,
        power: number
    }
}

export interface Stage {
    name: string,
    blocks: StageBlocksInterface,
    directions: StageDirectionsInterface,
    enemys: StageEnemysInterface,
    heros: StageHerosInterface,
    starts: Location[],
    ends: Location[],
    towers: TowerAbilitysInterface,
    target: number
}