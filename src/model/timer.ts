export class Timer {
    timeoff: number;
    loop: boolean;
    private count: number;
    private res: number;

    nextTick(): void {
        this.count++;
        if (this.count >= this.timeoff) {
            this.res += Math.floor(this.count / this.timeoff);
            this.count %= this.timeoff;
        }
    }

    getRound(): number {
        const tmp = this.res;
        this.res = 0;
        return tmp;
    }

    clear(): void {
        this.count = this.res = 0;
    }

    setTimeoff(newTimeoff: number): void {
        this.timeoff = newTimeoff;
    }

    constructor(timeoff: number, loop?: boolean) {
        this.timeoff = timeoff;
        this.loop = loop || true;
        this.count = 0;
        this.res = 0;
    }
}