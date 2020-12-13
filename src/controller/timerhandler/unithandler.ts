/* eslint-disable no-empty */
import store from '@/store';
import { Unit, Position, Location, UnitStatus, UnitType } from '@/model/unit';
import { Map, Direction, BlockType } from '@/model/map';
import { map_config } from '@/config';
import { Player } from '@/model/player';
import { Stage, StageEnemysInterface } from '@/model/stage';
import { calcBlock, calcDistance } from '@/util';
import { Hero, HeroStatus } from '@/model/hero';
import { AnimateStatus } from '@/model/imagex';

const state = store.state;
let map: Map;

function nextPosition(position: Position, speed: number): Position {
    const newPosition: Position = {
        x: position.x,
        y: position.y,
        direction: position.direction,
        moveDirection: position.moveDirection
    };
    switch (position.moveDirection) {
    case Direction.Up: {
        newPosition.y -= speed;
        break;
    }
    case Direction.Down: {
        newPosition.y += speed;
        break;
    }
    case Direction.Right: {
        newPosition.x += speed;
        break;
    }
    case Direction.Left: {
        newPosition.x -= speed;
        break;
    }
    }
    return newPosition;
}

/**
 * 随 机 游 走
 * @param position 
 */
function randomMove(position: Position, unit: Unit): Position {
    const newPosition: Position = {
        x: position.x,
        y: position.y,
        direction: position.direction,
        moveDirection: position.moveDirection
    };
    unit.lasdir = Math.floor(Math.random() * 50) ? unit.lasdir : unit.lasdir ^ 1;
    const ran = (Math.random() - unit.lasdir) * 0.5;
    const map: Map = state.map;
    const flag = true;
    const l: Location = calcBlock(newPosition);
    if (l.x >= 1 && l.x <= 32 && l.y >= 1 && l.y <= 18) {
        if (position.moveDirection == Direction.Up || position.moveDirection == Direction.Down) {
            newPosition.x += ran;
            if (newPosition.x > (l.x - 0.5) * map_config.width) {
                if (map[l.x + 1][l.y].type != BlockType.Road && map[l.x + 1][l.y].type != BlockType.Lava) {
                    newPosition.x = position.x;
                }
            } else {
                if (map[l.x - 1][l.y].type != BlockType.Road && map[l.x - 1][l.y].type != BlockType.Lava) {
                    newPosition.x = position.x;
                }
            }
            if (flag) {
                if (ran >= 0) {
                    newPosition.direction = Direction.Right;
                } else {
                    newPosition.direction = Direction.Left;
                }
            }
        } else {
            newPosition.y += ran;
            if (newPosition.y > (l.y - 0.5) * map_config.height) {
                if (map[l.x][l.y + 1].type != BlockType.Road && map[l.x][l.y + 1].type != BlockType.Lava) {
                    newPosition.y = position.y;
                }
            } else {
                if (map[l.x][l.y - 1].type != BlockType.Road && map[l.x][l.y - 1].type != BlockType.Lava) {
                    newPosition.y = position.y;
                }
            }
        }
    }
    return newPosition;
}

function unitMove(unit: Unit) {
    let position: Position = unit.getPosition();
    const location: Location = unit.getLocation();
    let speed: number = unit.getSpeed();
    const [x, y] = [location.x, location.y];
    let flag = false;
    try {
        if (map[x][y].type == BlockType.Ice) {
            speed /= 3;
        }
    } catch (e) {
        console.log(x, y);
    }
    if (map[x][y].direction != position.moveDirection) {
        const newPosition: Position = nextPosition(position, speed);
        const [tx, ty] = [(x - 0.5) * map_config.width, (y - 0.5) * map_config.height];
        if (position.moveDirection == Direction.Up || position.moveDirection == Direction.Down) {
            if ((ty - position.y) * (ty - newPosition.y) < 0 || newPosition.y == ty || y == ty) {
                flag = true;
            }
        }
        if (position.moveDirection == Direction.Left || position.moveDirection == Direction.Right) {
            if ((tx - position.x) * (tx - newPosition.x) < 0 || newPosition.x == tx || x == tx) {
                flag = true;
            }
        }
    }
    position = nextPosition(position, flag ? 1 : speed);
    position = randomMove(position, unit);
    if (flag) {
        position.moveDirection = map[x][y].direction;
    }
    if (position.moveDirection == Direction.Left || position.moveDirection == Direction.Right) {
        position.direction = position.moveDirection;
    }
    unit.setPosition(position);
}

function hitEnd(unit: Unit): boolean {
    const { x, y } = unit.getLocation();
    if (map[x][y].type == BlockType.End) {
        return true;
    }
    return false;
}

function zombieHandler(unit: Unit): void {
    if (unit.getStatus() == UnitStatus.Walk) {
        unitMove(unit);
    } else if (unit.getStatus() == UnitStatus.Attack) {
        let hero = unit.target;
        if (hero === null) {
            unit.setStatus(UnitStatus.Walk);
        } else {
            hero = <Hero>hero;
            if (hero.getStatus() == HeroStatus.Dead) {
                unit.target = null;
                unit.setStatus(UnitStatus.Walk);
            } else {
                const dx = hero.position.x - unit.position.x;
                unit.position.direction = dx >= 0 ? Direction.Right : Direction.Left;
                hero.reduceHp(unit.power);
            }
        }
    }
}

function creeperHandler(unit: Unit): void {
    const units: Unit[] = state.units;
    const heros: Hero[] = state.heros;
    if (unit.getStatus() == UnitStatus.Walk) {
        unitMove(unit);
    } else if (unit.getStatus() == UnitStatus.Attack) {
        if (unit.getAnimateStatus() == AnimateStatus.Stop) {
            unit.reduceHp(unit.totalHp);
            for (let i = 0; i < units.length; i++) {
                const dis = calcDistance(units[i].position, unit.position);
                if (dis <= unit.power) {
                    units[i].reduceHp(Math.sqrt(unit.power) - Math.sqrt(dis));
                }
            }
            for (let i = 0; i < heros.length; i++) {
                const dis = calcDistance(heros[i].position, unit.position);
                if (dis <= unit.power) {
                    heros[i].reduceHp(Math.sqrt(unit.power) - Math.sqrt(dis));
                }
            }
        }
    }
}

export default function (): void {
    map = state.map;
    const units: Unit[] = state.units;
    for (let i = 0; i < units.length; i++) {
        const unit: Unit = units[i];
        //Unit Move
        try {
            if (unit.type == UnitType.Zombie) {
                zombieHandler(unit);
            } else if (unit.type == UnitType.Creeper) {
                creeperHandler(unit);
            }
        } catch (e) { }
    }
    // unit remove
    const player: Player = state.player;
    const stageEnemys: StageEnemysInterface = (<Stage>state.stage).enemys;
    for (let i = units.length - 1; i >= 0; i--) {
        const unit: Unit = units[i];//Lava Hp
        try {
            const location: Location = calcBlock(unit.getPosition());
            if (map[location.x][location.y].type == BlockType.Lava) {
                unit.reduceHp(0.05);
            }
        } catch (e) { }
        try {
            if (hitEnd(unit)) {
                unit.setStatus(UnitStatus.Dead);
                units.splice(i, 1);
                player.home -= unit.hp;
                if (player.home < 0) {
                    player.home = 0;
                }
            } else if (unit.getHpPercent() == 0 || unit.getStatus() == UnitStatus.Dead) {
                unit.setStatus(UnitStatus.Dead);
                player.money += stageEnemys[unit.type].value;
                player.score += stageEnemys[unit.type].value;
                units.splice(i, 1);
            }
        } catch (e) { }
    }
}