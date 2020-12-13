/* eslint-disable no-empty */
import { registerEventHandler, timerEventHandler, initStart } from './controller/controller';
import resetStatus from '@/controller/init/resetstatus';
import initVue from '@/controller/vue/vue';
import { myCanvas } from './model/model';
import initImage from './controller/init/initimage';
import EasterEgg from '@/config/easteregg';
import store from '@/store';

async function main(): Promise<void> {
    await initImage();
    resetStatus();
    initVue();
    (<HTMLDivElement>document.getElementById('hint')).innerText = '';
    (<HTMLDivElement>document.getElementById('container')).appendChild(myCanvas);
    initStart();
    await registerEventHandler();
    timerEventHandler();
}

main();
EasterEgg();
(<any>window).bd = store.state;
