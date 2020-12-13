import { DeployStatus } from '@/view/drawhero';
import { Timer } from './timer';

export interface Player {
    money: number,
    home: number,
    cd: number,
    cdTimer: Timer,
    deployStatus: DeployStatus,
    score: number,
    mode: string
}