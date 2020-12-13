import { Stage } from '@/model/stage';
import { Unit, UnitType, Position, Location, UnitStatus, UnitAnimatesInterface } from '@/model/unit';
import { map_config } from '@/config';
import { Timer } from '@/model/timer';

import store from '@/store';
import { Block, Direction } from '@/model/map';
import { loadCreeperImage, loadZombieImage } from '@/controller/init/initimage';
import { ImageSrcInterface } from '@/model/imagex';
const state = store.state;

function generateZombie(hp: number, speed: number, power: number, starts: Location[]): void {
    const zombieTimer: Timer = state.timer.zombieTimer;
    zombieTimer.nextTick();
    const count = zombieTimer.getRound();
    const units: Unit[] = state.units;

    const ran = Math.floor(Math.random() * starts.length);
    const startLocation: Location = starts[ran];
    const direction: Direction = (<Block>state.map[startLocation.x][startLocation.y]).direction;
    const position: Position = {
        x: (startLocation.x + Math.random() / 2 - 0.75) * map_config.width,
        y: (startLocation.y + Math.random() / 2 - 1) * map_config.height,
        direction: Direction.Left,
        moveDirection: direction
    };
    for (let c = 0; c < count; c++) {
        // deep copy
        const animates: UnitAnimatesInterface = loadZombieImage(<ImageSrcInterface>state.image.src);
        units.push(new Unit(animates, position, UnitType.Zombie, speed, UnitStatus.Walk, power, hp));
    }
}

function generateCreeper(hp: number, speed: number, power: number, starts: Location[]): void {
    const creeperTimer: Timer = state.timer.creeperTimer;
    creeperTimer.nextTick();
    const count = creeperTimer.getRound();
    const units: Unit[] = state.units;

    const ran = Math.floor(Math.random() * starts.length);
    const startLocation: Location = starts[ran];
    const direction: Direction = (<Block>state.map[startLocation.x][startLocation.y]).direction;
    const position: Position = {
        x: (startLocation.x + Math.random() / 2 - 0.75) * map_config.width,
        y: (startLocation.y + Math.random() / 2 - 1) * map_config.height,
        direction: Direction.Left,
        moveDirection: direction
    };
    for (let c = 0; c < count; c++) {
        // deep copy
        const animates: UnitAnimatesInterface = loadCreeperImage(<ImageSrcInterface>state.image.src);
        units.push(new Unit(animates, position, UnitType.Creeper, speed, UnitStatus.Walk, power, hp));
    }
}

export default function (stage: Stage): void {
    if (stage.enemys[UnitType.Zombie]) {
        try {
            generateZombie(stage.enemys[UnitType.Zombie].hp, stage.enemys[UnitType.Zombie].speed, stage.enemys[UnitType.Zombie].power, stage.starts);
            // eslint-disable-next-line no-empty
        } catch (e) { }
    }
    if (stage.enemys[UnitType.Creeper]) {
        try {
            generateCreeper(stage.enemys[UnitType.Creeper].hp, stage.enemys[UnitType.Creeper].speed, stage.enemys[UnitType.Creeper].power, stage.starts);
            // eslint-disable-next-line no-empty
        } catch (e) { }
    }
}