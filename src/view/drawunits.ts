import { Unit, Position, Size, UnitType, UnitStatus } from '@/model/unit';
import { drawImageX } from '@/util';

import store from '@/store';
import { AnimateStatus } from '@/model/imagex';
const state = store.state;

function drawOneUnit(unit: Unit, ctx: CanvasRenderingContext2D): void {
    const position: Position = unit.getPosition();
    const size: Size = unit.getSize();
    if (unit.getAnimateStatus() == AnimateStatus.Play) {
        drawImageX(unit.getFrame(), ctx,
            position.x - (size.width / 2), position.y - (size.height / 2));
    }
}

export default function drawUnits(bufferCtx: CanvasRenderingContext2D): void {
    const units: Unit[] = state.units;
    units.sort((a, b) => {
        return a.position.y - b.position.y;
    });
    for (let i = 0; i < units.length; i++) {
        drawOneUnit(<Unit>units[i], bufferCtx);
    }
    /**
     * Hp
     */
    for (let i = 0; i < units.length; i++) {
        const unit: Unit = units[i];
        const position: Position = unit.getPosition();
        const size: Size = unit.getSize();

        if (unit.type == UnitType.Creeper && unit.getStatus() == UnitStatus.Attack) {
            continue;
        }
        {
            const [sx, sy] = [position.x - size.width / 2, position.y - size.height / 2 - 5];
            bufferCtx.fillStyle = '#595959';
            bufferCtx.fillRect(sx, sy, size.width, 3);
            bufferCtx.fillStyle = '#a10000';
            bufferCtx.fillRect(sx, sy, unit.getHpPercent() * size.width, 3);
        }
    }
}