/* eslint-disable no-empty */
import { AnimateStatus } from '@/model/imagex';
import { BlockType, Map } from '@/model/map';
import { Timer } from '@/model/timer';
import { Bullet, BulletStatus, BulletType } from '@/model/tower';
import { Location } from '@/model/unit';
import store from '@/store';
import { calcBlock, calcDistance } from '@/util';
const state = store.state;

const epsilon = 2;

export default function (): void {
    const bullets: Bullet[] = state.bullets;
    const map: Map = state.map;
    for (let i = bullets.length - 1; i >= 0; i--) {
        const bullet = bullets[i];
        try {
            if (bullet.status != BulletStatus.Fly) {
                if (bullet.type == BulletType.Default && bullet.animates[BulletStatus.Bomb].getStatus() == AnimateStatus.Stop) {
                    bullets.splice(i, 1);
                }
                continue;
            }
        } catch (e) { }
        try {
            const dis = calcDistance(bullet.location, bullet.target.position);
            if (dis >= epsilon) {
                const [dx, dy] = [bullet.target.position.x - bullet.location.x, bullet.target.position.y - bullet.location.y];
                const m = Math.min(bullet.speed / dis, 1);
                bullet.location = {
                    x: bullet.location.x + dx * m,
                    y: bullet.location.y + dy * m
                };
            } else {
                if (bullet.type == BulletType.Default) {
                    bullet.target.reduceHp(bullet.power);
                    bullet.status = BulletStatus.Bomb;
                } else if (bullet.type == BulletType.Fire) {
                    bullet.target.reduceHp(bullet.power);
                    const l: Location = calcBlock(bullet.location);
                    const dx: number[] = [-1, 0, 0, 0, 1], dy: number[] = [0, -1, 0, 1, 0];
                    for (let i = 0; i < 5; i++) {
                        const [x, y] = [l.x + dx[i], l.y + dy[i]];
                        if (x >= 1 && x <= 32 && y >= 1 && y <= 18) {
                            if (map[x][y].type == BlockType.Road || map[x][y].type == BlockType.Lava || map[x][y].type == BlockType.Ice) {
                                map[x][y].type = BlockType.Lava;
                                map[x][y].timer = new Timer(bullet.power * 5);
                            }
                        }
                    }
                    bullets.splice(i, 1);
                } else if (bullet.type == BulletType.Ice) {
                    bullet.target.reduceHp(bullet.power);
                    const l: Location = calcBlock(bullet.location);
                    const dx: number[] = [-1, 0, 0, 0, 1], dy: number[] = [0, -1, 0, 1, 0];
                    for (let i = 0; i < 5; i++) {
                        const [x, y] = [l.x + dx[i], l.y + dy[i]];
                        if (map[x][y].type == BlockType.Road || map[x][y].type == BlockType.Lava || map[x][y].type == BlockType.Ice) {
                            map[x][y].type = BlockType.Ice;
                            map[x][y].timer = new Timer(bullet.power * 15);
                        }
                    }
                    bullets.splice(i, 1);
                }
            }
        } catch (e) { }
    }
}