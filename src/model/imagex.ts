export interface ImageSrcInterface {
    [paraName: string]: HTMLImageElement
}

export enum AnimateStatus {
    Play = 0,
    Stop = 1
}

export class ImageX {
    pic: HTMLImageElement;
    lwidth: number;
    lheight: number;
    lx: number;
    ly: number;
    width: number;
    height: number;
    constructor(pic: HTMLImageElement, lwidth?: number, lheight?: number, lx?: number, ly?: number, width?: number, height?: number) {
        this.pic = pic;
        if (lwidth) {
            this.lwidth = lwidth;
        } else {
            this.lwidth = pic.width;
        }
        if (lheight) {
            this.lheight = lheight;
        } else {
            this.lheight = pic.height;
        }
        if (width) {
            this.width = width;
        } else {
            this.width = pic.width;
        }
        if (height) {
            this.height = height;
        } else {
            this.height = pic.height;
        }
        if (lx) {
            this.lx = lx;
        } else {
            this.lx = 0;
        }
        if (ly) {
            this.ly = ly;
        } else {
            this.ly = 0;
        }
    }
}


export class Animate {
    public getFrame(): ImageX {
        return this.frames[this.frame];
    }
    public nextTick(): void {
        if (this.status == AnimateStatus.Play) {
            this.timer++;
        }
        if (this.timer >= this.timerDelay) {
            this.nextFrame();
            this.timer = 0;
        }
    }
    public setStatus(newStatus: AnimateStatus): void {
        this.status = newStatus;
    }
    public getStatus(): AnimateStatus {
        return this.status;
    }
    private nextFrame(): void {
        if (this.status == AnimateStatus.Play) {
            this.frame++;
            if (this.frame >= this.frames.length) {
                this.frame = 0;
                if (!this.loop) {
                    this.status = AnimateStatus.Stop;
                }
            }
        }
    }
    private timer: number;
    private timerDelay: number;
    private frame: number;
    private readonly frames: ImageX[];
    private status: AnimateStatus;
    private loop: boolean;
    constructor(frames: ImageX[], timerDelay?: number, status?: AnimateStatus, loop?: boolean) {
        this.frames = frames;
        this.timer = 0;
        this.timerDelay = timerDelay || 1;
        this.frame = 0;
        this.status = status || AnimateStatus.Play;
        if (loop === undefined) {
            this.loop = true;
        } else {
            this.loop = loop;
        }
    }
}