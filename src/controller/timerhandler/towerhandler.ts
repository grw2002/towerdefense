/* eslint-disable no-empty */
import { Bullet, Tower, TowerAbility, TowerImageInterface, TowerType } from '@/model/tower';
import { Unit, UnitStatus, Location } from '@/model/unit';
import { BlockType, Map } from '@/model/map';
import store from '@/store';
import { calcDistance } from '@/util';
import { loadDefaultBulletImage, loadFireBulletImage, loadIceBullet } from '../init/initimage';
import { Stage } from '@/model/stage';
import { Player } from '@/model/player';
import { Timer } from '@/model/timer';
const state = store.state;

export default function (): void {
    if (state.player.cd < 100) {
        const cdTimer: Timer = state.player.cdTimer;
        cdTimer.nextTick();
        state.player.cd += cdTimer.getRound();
    }
    const towers: Tower[] = state.towers;
    const units: Unit[] = state.units;
    const bullets: Bullet[] = state.bullets;
    for (let i = 0; i < towers.length; i++) {
        const tower: Tower = towers[i];
        try {
            tower.timer.nextTick();
            if (tower.timer.getRound()) {
                for (let j = 0; j < units.length; j++) {
                    const unit: Unit = units[j];
                    if (unit.getStatus() == UnitStatus.Dead) {
                        continue;
                    }
                    if (calcDistance(unit.position, tower.getFullLocation()) < tower.towerAbility.ranges[tower.level]) {
                        const level: number = tower.level;
                        if (tower.type == TowerType.Default) {
                            bullets.push(new Bullet(loadDefaultBulletImage(state.image.src), tower.towerAbility.bullets[level], tower.getFullLocation(), unit, 8, tower.towerAbility.powers[level]));
                        } else if (tower.type == TowerType.Secondary) {
                            bullets.push(new Bullet(loadFireBulletImage(state.image.src), tower.towerAbility.bullets[level], tower.getFullLocation(), unit, 8, tower.towerAbility.powers[level]));
                        } else if (tower.type == TowerType.Ice) {
                            bullets.push(new Bullet(loadIceBullet(state.image.src), tower.towerAbility.bullets[level], tower.getFullLocation(), unit, 8, tower.towerAbility.powers[level]));
                        }
                        break;
                    }
                }
            }
        } catch (e) { }
    }
}

export function buildTower(location: Location, type: TowerType): void {
    try {
        const map: Map = state.map;
        const stage: Stage = state.stage;
        const towers: Tower[] = state.towers;
        const player: Player = state.player;
        const towerImage: TowerImageInterface = state.image.towerImage;
        const towerAbility: TowerAbility = stage.towers[type];
        towers.push(new Tower(towerImage[type], location, towerAbility, type));
        map[location.x][location.y].type = BlockType.Tower;
        player.money -= towerAbility.costs[1];
    } catch (e) { }
}

export function removeTower(tower: Tower): void {
    try {
        const location: Location = tower.location;
        const map: Map = state.map;
        const towers: Tower[] = state.towers;
        const player: Player = state.player;
        const towerAbility: TowerAbility = state.stage.towers[tower.type];
        player.money += towerAbility.refunds[tower.level];
        for (let i = 0; i < towers.length; i++) {
            const l: Location = towers[i].location;
            if (location.x == l.x && location.y == l.y) {
                towers.splice(i, 1);
                break;
            }
        }
        map[location.x][location.y].type = BlockType.Towerbase;
    } catch (e) { }
}

export function upgradeTower(tower: Tower): void {
    try {
        const player: Player = state.player;
        tower.upgrade(tower.level + 1);
        player.money -= tower.towerAbility.costs[tower.level];
    } catch (e) { }
}