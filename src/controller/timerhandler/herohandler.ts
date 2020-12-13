/* eslint-disable no-empty */
import store from '@/store';
import { Hero, HeroAnimatesInterface, HeroStatus, HeroType } from '@/model/hero';
import { Location, Position, Unit, UnitStatus } from '@/model/unit';
import { Map, Direction, BlockType } from '@/model/map';
import { map_config } from '@/config';
import { calcBlock, calcDistance } from '@/util';
import { loadSteveImage } from '../init/initimage';
import { ImageSrcInterface } from '@/model/imagex';

const state = store.state;
let map: Map;

function hitEnd(hero: Hero): boolean {
    const { x, y } = hero.getLocation();
    if (map[x][y].type == BlockType.End) {
        return true;
    }
    return false;
}

export function deployHero(location: Location, count: number, type: HeroType, power: number, hp: number, speed: number): void {
    const heros: Hero[] = state.heros;

    const direction: Direction = Direction.Down;
    const position: Position = {
        x: (location.x - 0.5) * map_config.width,
        y: (location.y - 0.5) * map_config.height,
        direction: Direction.Left,
        moveDirection: direction
    };
    try {
        for (let c = 0; c < count; c++) {
            // deep copy
            const animates: HeroAnimatesInterface = loadSteveImage(<ImageSrcInterface>state.image.src);
            heros.push(new Hero(animates, position, type, speed, HeroStatus.Hold, power, hp));
        }
    } catch (e) { }
}

function heroMove(hero: Hero): void {
    const unit = <Unit>hero.target;
    const [pa, pb] = [hero.getPosition(), unit.getPosition()];
    let speed: number = hero.getSpeed();
    const location: Location = calcBlock(unit.position);
    const [x, y] = [location.x, location.y];
    if (map[x][y].type == BlockType.Ice) {
        speed /= 3;
    }
    const [dx, dy] = [pb.x - pa.x, pb.y - pa.y];
    if (dx >= 0) {
        pa.direction = Direction.Right;
    } else {
        pa.direction = Direction.Left;
    }
    const dis = calcDistance(pa, pb);
    if (dis > speed) {
        [pa.x, pa.y] = [pa.x + dx * speed / dis, pa.y + dy * speed / dis];
    } else {
        [pa.x, pa.y] = [pb.x, pb.y];
    }
}

export default function (): void {
    map = state.map;
    const heros: Hero[] = state.heros;
    const units: Unit[] = state.units;
    for (let i = 0; i < heros.length; i++) {
        const hero: Hero = heros[i];
        try {
            //Hero Status
            if (hero.getStatus() == HeroStatus.Hold) {
                let tmp: number = Number.MAX_VALUE;
                let target: Unit | null = null;
                for (let j = 0; j < units.length; j++) {
                    const unit = units[j];
                    if (unit.getStatus() == UnitStatus.Dead) {
                        continue;
                    }
                    const dis = calcDistance(unit.getPosition(), hero.getPosition());
                    if (dis <= 64 && dis < tmp) {
                        tmp = dis;
                        target = unit;
                    }
                }
                if (target !== null) {
                    hero.setStatus(HeroStatus.Targeting);
                    hero.target = target;
                }
            } else if (hero.getStatus() == HeroStatus.Targeting) {
                const unit: Unit = <Unit>hero.target;
                const epsilon = hero.getSize().width / 4 + unit.getSize().width / 4;
                if (unit.getStatus() == UnitStatus.Dead) {
                    hero.target = null;
                    hero.setStatus(HeroStatus.Hold);
                } else if (calcDistance(unit.getPosition(), hero.getPosition()) <= epsilon) {//switch to attack
                    hero.setStatus(HeroStatus.Attack);
                    if (unit.target == null) {
                        unit.target = hero;
                    }
                    if (unit.getStatus() != UnitStatus.Attack) {
                        unit.setStatus(UnitStatus.Attack);
                    }
                } else {//continue to move
                    const oldPosition: Position = {
                        x: hero.position.x,
                        y: hero.position.y,
                        direction: hero.position.direction,
                        moveDirection: hero.position.moveDirection
                    };
                    heroMove(hero);
                    const l: Location = calcBlock(hero.position);
                    if (hitEnd(hero) ||
                        (!(map[l.x][l.y].type == BlockType.Road || map[l.x][l.y].type == BlockType.Lava || map[l.x][l.y].type == BlockType.Ice))) {
                        hero.position = oldPosition;
                    }
                }
            } else if (hero.getStatus() == HeroStatus.Attack) {
                const unit: Unit = <Unit>hero.target;
                if (unit.getStatus() == UnitStatus.Dead) {
                    hero.target = null;
                    hero.setStatus(HeroStatus.Hold);
                } else {
                    const unit = <Unit>hero.target;
                    unit.target = hero;
                    unit.reduceHp(hero.power);
                    const dx = unit.position.x - hero.position.x;
                    hero.position.direction = dx >= 0 ? Direction.Right : Direction.Left;
                }
            }
        } catch (e) { }
    }
    // hero remove
    for (let i = heros.length - 1; i >= 0; i--) {
        const hero: Hero = heros[i];//Lava Hp
        try {
            const location: Location = calcBlock(hero.getPosition());
            if (map[location.x][location.y].type == BlockType.Lava) {
                hero.reduceHp(0.1);
            }
        } catch (e) { }
        try {
            if (hero.getHpPercent() == 0) {
                hero.setStatus(HeroStatus.Dead);
                heros.splice(i, 1);
            }
        } catch (e) { }
    }
}