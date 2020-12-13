import { BlockType, Map, BlockImageInterface } from '@/model/map';
import { Animate } from '@/model/imagex';
import { map_config } from '@/config';
import { calcBlock, drawImageX } from '@/util';
import { Location } from '@/model/unit';

import store from '@/store';
import { DeployStatus } from './drawhero';
const state = store.state;

export default function (bufferCtx: CanvasRenderingContext2D): void {
    const map: Map = state.map;
    const blockImage: BlockImageInterface = state.image.blockImage;
    for (let i = 1; i <= map_config.xNum; i++) {
        for (let j = 1; j <= map_config.yNum; j++) {
            const type: BlockType = map[i][j].type;
            const animate: Animate = blockImage[type];
            drawImageX(animate.getFrame(), bufferCtx,
                (i - 1) * map_config.width, (j - 1) * map_config.height);
        }
    }
    // draw deploying circle
    const { x, y } = calcBlock(<Location>state.mouse.location);
    if (<DeployStatus>state.player.deployStatus == DeployStatus.Deploying) {
        if (x >= 1 && x <= map_config.xNum && y >= 1 && y <= map_config.yNum) {
            if (map[x][y].type == BlockType.Road || map[x][y].type == BlockType.Lava || map[x][y].type == BlockType.Ice) {
                const [tx, ty, tx2, ty2] = [(x - 1) * map_config.width, (y - 1) * map_config.height,
                    (x - 0.5) * map_config.width, (y - 0.5) * map_config.height];
                bufferCtx.fillStyle = 'rgba(255,255,255,0.3)';
                bufferCtx.strokeStyle = 'rgba(255,255,255,0.3)';
                bufferCtx.beginPath();
                bufferCtx.lineWidth = 2;
                bufferCtx.arc(tx2, ty2, map_config.width * 2, 0, 2 * Math.PI);
                bufferCtx.stroke();
                bufferCtx.fillStyle = 'rgba(255,255,255,0.5)';
                bufferCtx.fillRect(tx, ty, map_config.width, map_config.height);
            }
        }
    }
}