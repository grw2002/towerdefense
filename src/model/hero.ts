import { calcBlock } from '@/util';
import { Animate, ImageX } from './imagex';
import { Location, Position, Size, Unit } from './unit';

export enum HeroType {
    Steve = 0
}

export enum HeroStatus {
    Hold = 0,
    Walk = 1,
    Attack = 2,
    Dead = 3,
    Targeting = 4
}

export interface HeroAnimatesInterface {
    [index: number]: {
        [index: number]: Animate
    }
}

export class Hero {
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
        if (!this.position.moveDirection) {
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
    public getStatus(): HeroStatus {
        return this.status;
    }
    public setStatus(newStatus: HeroStatus): void {
        this.status = newStatus;
    }
    public getSpeed(): number {
        return this.speed;
    }
    public setSpeed(newSpeed: number): void {
        this.speed = newSpeed;
    }
    private animates: HeroAnimatesInterface;
    private status: HeroStatus;
    position: Position;
    private speed: number;
    private totalHp: number;
    private hp: number;
    public type: HeroType;
    target: Unit | null;
    power: number;
    constructor(animates: HeroAnimatesInterface, position: Position, type: HeroType, speed = 5, status = HeroStatus.Hold, power: number, totalHp = 10, hp?: number) {
        this.animates = animates;
        this.position = position;
        this.status = status || HeroStatus.Hold;
        this.speed = speed;
        this.totalHp = totalHp;
        this.hp = hp || totalHp;
        this.type = type;
        this.target = null;
        this.power = power;
    }
}