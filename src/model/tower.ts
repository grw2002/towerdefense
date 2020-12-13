import { Location, Size, Unit } from './unit';
import { Animate, ImageX } from './imagex';
import { map_config } from '@/config';
import { Timer } from './timer';

// Bullet Interfaces
/**
 * BulletStatus -> Animate
 */
export interface BulletAnimatesInterface {
    [index: number]: Animate
}

export enum BulletType {
    Default = 0,
    Ice = 1,
    Fire = 2
}

export enum BulletStatus {
    Fly = 0,
    Bomb = 1,
    Hold = 2
}

// Tower Interfaces
export enum TowerStatus {
    Hold = 0,
    Attack = 1,
    Build = 2
}

export enum TowerType {
    Default = 0,
    Secondary = 1,
    Ice = 2
}

export interface TowerImageInterface {
    [index: number]: ImageX
}

export interface TowerAbility {
    costs: number[],
    bullets: BulletType[],
    ranges: number[],
    speeds: number[],
    powers: number[],
    refunds: number[],
    name: string
}

export interface TowerAbilitysInterface {
    [index: number]: TowerAbility;
}

export class Bullet {
    public getFrame(): ImageX {
        return this.animates[this.status].getFrame();
    }
    public nextTick(): void {
        this.animates[this.status].nextTick();
    }
    public getSize(): Size {
        const frame: ImageX = this.getFrame();
        return {
            width: frame.width,
            height: frame.height
        };
    }
    type: BulletType;
    status: BulletStatus;
    location: Location;
    target: Unit;
    animates: BulletAnimatesInterface;
    power: number;
    speed: number;
    constructor(animates: BulletAnimatesInterface, type: BulletType, location: Location, target: Unit, speed: number, power: number) {
        this.status = BulletStatus.Fly;
        this.animates = animates;
        this.type = type;
        this.location = location;
        this.target = target;
        this.speed = speed;
        this.power = power;
    }
}

export class Tower {
    public getFrame(): ImageX {
        return this.imagex;
    }
    public getFullLocation(): Location {
        return {
            x: (this.location.x - 0.5) * map_config.width,
            y: (this.location.y - 0.5) * map_config.height
        };
    }
    public upgrade(newLevel: number): void {
        this.level = newLevel;
        this.timer = new Timer(this.towerAbility.speeds[this.level]);
    }
    location: Location;
    towerAbility: TowerAbility;
    level: number;
    topLevel: number;
    status: TowerStatus;
    timer: Timer;
    type: TowerType;
    private imagex: ImageX;
    constructor(imagex: ImageX, location: Location, towerAbility: TowerAbility, type: TowerType, topLevel?: number) {
        this.imagex = imagex;
        this.location = location;
        this.topLevel = topLevel || towerAbility.costs.length - 1;
        this.level = 1;
        this.towerAbility = towerAbility;
        this.status = TowerStatus.Hold;
        this.type = type;
        this.timer = new Timer(towerAbility.speeds[this.level]);
    }
}