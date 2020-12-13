import { ImageX, Animate, AnimateStatus } from './imagex';
import { Direction } from './map';
import { calcBlock } from '@/util';
import { Hero } from './hero';

export enum UnitType {
    Zombie = 0,
    Creeper = 1,
    Skeleton = 2,
    Hero = 3
}

export enum UnitStatus {
    Hold = 0,
    Walk = 1,
    Attack = 2,
    Dead = 3,
    Targeting = 4
}

/**
 * (UnitStatus, Direction) -> Animate
 */
export interface UnitAnimatesInterface {
    [index: number]: {
        [index: number]: Animate
    }
}

export interface Location {
    x: number,
    y: number
}

export interface Position {
    x: number,
    y: number,
    direction: Direction,
    moveDirection?: Direction
}

export interface Size {
    width: number,
    height: number
}

export class Unit {
    public getLocation(): Location {
        const p = this.position;
        return calcBlock({ x: p.x, y: p.y });
    }
    public getHpPercent(): number {
        return this.hp / this.totalHp;
    }
    public reduceHp(delta: number): void {
        this.hp -= delta;
        this.hp = this.hp < 0 ? 0 : this.hp;
    }
    public setPosition(newPosition: Position): void {
        this.position = newPosition;
    }
    public getPosition(): Position {
        if (this.position.moveDirection === undefined) {
            this.position.moveDirection = this.position.direction;
        }
        return this.position;
    }
    public getFrame(): ImageX {
        return this.animates[this.status][this.position.direction].getFrame();
    }
    public nextTick(): void {
        this.animates[this.status][this.position.direction].nextTick();
    }
    /**
     * Frame Size
     */
    public getSize(): Size {
        const frame: ImageX = this.getFrame();
        return {
            width: frame.width,
            height: frame.height
        };
    }
    public getStatus(): UnitStatus {
        return this.status;
    }
    public setStatus(newStatus: UnitStatus): void {
        this.status = newStatus;
    }
    public getSpeed(): number {
        return this.speed;
    }
    public setSpeed(newSpeed: number): void {
        this.speed = newSpeed;
    }
    public getAnimateStatus(): AnimateStatus {
        return this.animates[this.status][this.position.direction].getStatus();
    }
    private animates: UnitAnimatesInterface;
    private status: UnitStatus;
    position: Position;
    private speed: number;
    totalHp: number;
    hp: number;
    public type: UnitType;
    target: Hero | null;
    power: number;
    lasdir: number;
    constructor(animates: UnitAnimatesInterface, position: Position, type: UnitType, speed = 5, status = UnitStatus.Hold, power: number, totalHp = 10, hp?: number) {
        this.animates = animates;
        this.position = position;
        this.status = status || UnitStatus.Hold;
        this.speed = speed;
        this.totalHp = totalHp;
        this.hp = hp || totalHp;
        this.type = type;
        this.target = null;
        this.power = power;
        this.lasdir = 0;
    }
}