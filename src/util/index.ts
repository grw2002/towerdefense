import { map_config } from '@/config';
import { ImageX } from '@/model/imagex';
import { Location, Position } from '@/model/unit';

export function loadImage(url: string): Promise<HTMLImageElement> {
    return new Promise(resolve => {
        const img: HTMLImageElement = new Image();
        img.src = url;
        img.onload = function (): void {
            resolve(img);
        };
    });
}

export function calcBlock(location: Location): Location {
    return {
        x: Math.floor(location.x / map_config.width) + (location.x % map_config.width ? 1 : 0),
        y: Math.floor(location.y / map_config.height) + (location.y % map_config.height ? 1 : 0)
    };
}

export function drawImageX(image: ImageX, ctx: CanvasRenderingContext2D, x_canvas: number, y_canvas: number): void {
    ctx.drawImage(image.pic, image.lx, image.ly, image.lwidth, image.lheight,
        x_canvas, y_canvas, image.width, image.height);
}

export function calcDistance(l1: Location | Position, l2: Location | Position): number {
    return Math.sqrt((l1.x - l2.x) * (l1.x - l2.x) + (l1.y - l2.y) * (l1.y - l2.y));
}