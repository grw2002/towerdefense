import mouseHandler from './mousehandler';
import keyHandler from './keyhandler';

export default async function registerEventHandler(): Promise<void> {
    mouseHandler();
    keyHandler();
}