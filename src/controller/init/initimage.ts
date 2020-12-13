/* eslint-disable no-empty */
import { loadImage } from '@/util';
import { map_config } from '@/config';
import { ImageX, Animate, ImageSrcInterface } from '@/model/imagex';
import { BlockType, Direction, BlockImageInterface } from '@/model/map';
import { UnitStatus, UnitAnimatesInterface } from '@/model/unit';
import { BulletAnimatesInterface, BulletStatus, TowerImageInterface, TowerType } from '@/model/tower';

import store from '@/store';
import { HeroAnimatesInterface, HeroStatus } from '@/model/hero';
const state = store.state;

function loadBlockImage(src: ImageSrcInterface): BlockImageInterface {
    /**
     * load block images into state
     */
    const images: BlockImageInterface = {};
    const [stoneImage, dirtImage, grassImage, lavaImage, iceImage, portalImage] = [src.stone, src.dirt, src.grass, src.lava, src.ice, src.portal];
    /**
     * stone
     */
    {
        const [lwidth, lheight, lx, ly, width, height] = [16, 16, 0, 0, map_config.width, map_config.height];
        const stoneImageX = new ImageX(stoneImage, lwidth, lheight, lx, ly, width, height);
        images[BlockType.Road] = images[BlockType.Start] = new Animate([stoneImageX], undefined, undefined, true);
    }
    /**
     * End
     */
    {
        const [lwidth, lheight, width, height] = [16, 16, map_config.width, map_config.height];
        const frames: ImageX[] = [];
        for (let i = 0; i < 32; i++) {
            frames.push(new ImageX(portalImage, lwidth, lheight, 0, i * lheight, width, height));
        }
        images[BlockType.End] = new Animate(frames);
    }
    /**
     * grass
     */
    {
        const [lwidth, lheight, lx, ly, width, height] = [16, 16, 0, 0, map_config.width, map_config.height];
        const grassImageX = new ImageX(dirtImage, lwidth, lheight, lx, ly, width, height);
        images[BlockType.Grass] = new Animate([grassImageX], undefined, undefined, true);
    }
    /**
     * dirt
     */
    {
        const [lwidth, lheight, lx, ly, width, height] = [16, 16, 0, 0, map_config.width, map_config.height];
        const towerbaseImageX = new ImageX(grassImage, lwidth, lheight, lx, ly, width, height);
        images[BlockType.Tower] = images[BlockType.Towerbase] = new Animate([towerbaseImageX], undefined, undefined, true);
    }
    /**
     * ice
     */
    {
        const [lwidth, lheight, lx, ly, width, height] = [16, 16, 0, 0, map_config.width, map_config.height];
        const towerbaseImageX = new ImageX(iceImage, lwidth, lheight, lx, ly, width, height);
        images[BlockType.Ice] = new Animate([towerbaseImageX], undefined, undefined, true);
    }
    /**
     * lava
     */
    {
        const [lwidth, lheight, width, height] = [16, 16, map_config.width, map_config.height];
        const frames: ImageX[] = [];
        let i;
        for (i = 0; i < 20; i++) {
            frames.push(new ImageX(lavaImage, lwidth, lheight, 0, i * lheight, width, height));
        }
        for (i--; i >= 0; i--) {
            frames.push(new ImageX(lavaImage, lwidth, lheight, 0, i * lheight, width, height));
        }
        images[BlockType.Lava] = new Animate(frames);
    }
    return images;
}

export function loadSteveImage(src: ImageSrcInterface): HeroAnimatesInterface {
    const animates: HeroAnimatesInterface = {};
    animates[HeroStatus.Hold] = {};
    animates[HeroStatus.Walk] = {};
    animates[HeroStatus.Attack] = {};
    animates[HeroStatus.Dead] = {};
    animates[HeroStatus.Targeting] = {};
    {
        const [lwidth, lheight, width, height] = [384, 768, 18, 36];
        const img: HTMLImageElement = src.steveWalk;
        {// hold right
            const images: ImageX[] = [];
            images.push(new ImageX(img, lwidth, lheight, 0, lheight, width, height));
            animates[HeroStatus.Hold][Direction.Right] = animates[HeroStatus.Dead][Direction.Left] = new Animate(images);
        }
        {// hold right
            const images: ImageX[] = [];
            images.push(new ImageX(img, lwidth, lheight, 0, 0, width, height));
            animates[HeroStatus.Hold][Direction.Left] = animates[HeroStatus.Dead][Direction.Right] = new Animate(images);
        }
        {// walk right
            const images: ImageX[] = [];
            for (let i = 0; i < 16; i++) {
                images.push(new ImageX(img, lwidth, lheight, i * lwidth, lheight, width, height));
            }
            animates[HeroStatus.Targeting][Direction.Right] = animates[HeroStatus.Walk][Direction.Right] = new Animate(images);
        }
        {// walk left
            const images: ImageX[] = [];
            for (let i = 0; i < 16; i++) {
                images.push(new ImageX(img, lwidth, lheight, i * lwidth, 0, width, height));
            }
            animates[HeroStatus.Targeting][Direction.Left] = animates[HeroStatus.Walk][Direction.Left] = new Animate(images);
        }
    }
    {
        const [lwidth, lheight, width, height] = [512, 768, 24, 36];
        const img: HTMLImageElement = src.steveAttack;
        {// attack right
            const images: ImageX[] = [];
            for (let i = 0; i < 8; i++) {
                images.push(new ImageX(img, lwidth, lheight, i * lwidth, lheight, width, height));
            }
            animates[HeroStatus.Attack][Direction.Right] = new Animate(images);
        }
        {// attack left
            const images: ImageX[] = [];
            for (let i = 0; i < 8; i++) {
                images.push(new ImageX(img, lwidth, lheight, i * lwidth, 0, width, height));
            }
            animates[HeroStatus.Attack][Direction.Left] = new Animate(images);
        }
    }
    return animates;
}

export function loadCreeperImage(src: ImageSrcInterface): UnitAnimatesInterface {
    const animates: UnitAnimatesInterface = {};
    animates[UnitStatus.Hold] = {};
    animates[UnitStatus.Walk] = {};
    animates[UnitStatus.Attack] = {};
    animates[UnitStatus.Dead] = {};
    {
        const [lwidth, lheight, width, height] = [256, 512, 24, 48];
        const img: HTMLImageElement = src.creeperWalk;
        {// hold right
            const images: ImageX[] = [];
            images.push(new ImageX(img, lwidth, lheight, 0, lheight, width, height));
            animates[UnitStatus.Hold][Direction.Right] = animates[UnitStatus.Dead][Direction.Left] = new Animate(images);
        }
        {// hold right
            const images: ImageX[] = [];
            images.push(new ImageX(img, lwidth, lheight, 0, 0, width, height));
            animates[UnitStatus.Hold][Direction.Left] = animates[UnitStatus.Dead][Direction.Right] = new Animate(images);
        }
        {// walk right
            const images: ImageX[] = [];
            for (let i = 0; i < 8; i++) {
                images.push(new ImageX(img, lwidth, lheight, i * lwidth, lheight, width, height));
            }
            animates[UnitStatus.Walk][Direction.Right] = new Animate(images, 2);
        }
        {// walk left
            const images: ImageX[] = [];
            for (let i = 0; i < 8; i++) {
                images.push(new ImageX(img, lwidth, lheight, i * lwidth, 0, width, height));
            }
            animates[UnitStatus.Walk][Direction.Left] = new Animate(images, 2);
        }
    }
    {
        const [lwidth, lheight, width, height] = [256, 512, 24, 48];
        const [lwidth2, lheight2, width2, height2] = [32, 32, 160, 160];
        {// attack
            const img: HTMLImageElement = src.creeperAttack;
            const images: ImageX[] = [];
            for (let i = 0; i < 16; i++) {
                images.push(new ImageX(img, lwidth, lheight, (i % 4) * lwidth, 1 * lheight, width, height));
            }
            const img2: HTMLImageElement = src.explosion;
            for (let i = 0; i < 4; i++) {
                for (let j = 0; j < 4; j += 2) {
                    images.push(new ImageX(img2, lwidth2, lheight2, j * lwidth2, i * lheight2, width2, height2));
                }
            }
            animates[UnitStatus.Attack][Direction.Right] = new Animate(images, undefined, undefined, false);
        }
        {// attack
            const img: HTMLImageElement = src.creeperAttack;
            const images: ImageX[] = [];
            for (let i = 0; i < 16; i++) {
                images.push(new ImageX(img, lwidth, lheight, (i % 4) * lwidth, 0, width, height));
            }
            const img2: HTMLImageElement = src.explosion;
            for (let i = 0; i < 4; i++) {
                for (let j = 0; j < 4; j += 2) {
                    images.push(new ImageX(img2, lwidth2, lheight2, j * lwidth2, i * lheight2, width2, height2));
                }
            }
            animates[UnitStatus.Attack][Direction.Left] = new Animate(images, undefined, undefined, false);
        }
    }
    return animates;
}

export function loadZombieImage(src: ImageSrcInterface): UnitAnimatesInterface {
    const animates: UnitAnimatesInterface = {};
    animates[UnitStatus.Hold] = {};
    animates[UnitStatus.Walk] = {};
    animates[UnitStatus.Attack] = {};
    animates[UnitStatus.Dead] = {};
    {
        const [lwidth, lheight, width, height] = [384, 512, 27, 36];
        const img: HTMLImageElement = src.zombieWalk;
        {// hold right
            const images: ImageX[] = [];
            images.push(new ImageX(img, lwidth, lheight, 0, lheight, width, height));
            animates[UnitStatus.Hold][Direction.Right] = animates[UnitStatus.Dead][Direction.Left] = new Animate(images);
        }
        {// hold right
            const images: ImageX[] = [];
            images.push(new ImageX(img, lwidth, lheight, 0, 0, width, height));
            animates[UnitStatus.Hold][Direction.Left] = animates[UnitStatus.Dead][Direction.Right] = new Animate(images);
        }
        {// walk right
            const images: ImageX[] = [];
            for (let i = 0; i < 16; i++) {
                images.push(new ImageX(img, lwidth, lheight, i * lwidth, lheight, width, height));
            }
            animates[UnitStatus.Walk][Direction.Right] = new Animate(images);
        }
        {// walk left
            const images: ImageX[] = [];
            for (let i = 0; i < 16; i++) {
                images.push(new ImageX(img, lwidth, lheight, i * lwidth, 0, width, height));
            }
            animates[UnitStatus.Walk][Direction.Left] = new Animate(images);
        }
    }
    {
        const [lwidth, lheight, width, height] = [384, 768, 27, 54];
        const img: HTMLImageElement = src.zombieAttack;
        {// attack right
            const images: ImageX[] = [];
            for (let i = 0; i < 8; i++) {
                images.push(new ImageX(img, lwidth, lheight, i * lwidth, lheight, width, height));
            }
            animates[UnitStatus.Attack][Direction.Right] = new Animate(images);
        }
        {// attack left
            const images: ImageX[] = [];
            for (let i = 0; i < 8; i++) {
                images.push(new ImageX(img, lwidth, lheight, i * lwidth, 0, width, height));
            }
            animates[UnitStatus.Attack][Direction.Left] = new Animate(images);
        }
    }
    return animates;
}

function loadTowerImage(src: ImageSrcInterface): TowerImageInterface {
    const images: TowerImageInterface = {};
    const towerPic: HTMLImageElement = src.tower_default;
    images[TowerType.Default] = new ImageX(towerPic, 64, 160, 256, 192, map_config.width - 4, map_config.height * 2 - 8);
    images[TowerType.Secondary] = new ImageX(towerPic, 64, 160, 450, 192, map_config.width - 4, map_config.height * 2 - 8);
    images[TowerType.Ice] = new ImageX(towerPic, 64, 160, 384, 288, map_config.width - 4, map_config.height * 2 - 8);
    return images;
}

export function loadDefaultBulletImage(src: ImageSrcInterface): BulletAnimatesInterface {
    const animates: BulletAnimatesInterface = {};
    {
        const images: ImageX[] = [];
        const pic: HTMLImageElement = src.bullet;
        const [lwidth, lheight, width, height] = [16, 16, 16, 16];
        images.push(new ImageX(pic, lwidth, lheight, 0, 0, width, height));
        animates[BulletStatus.Fly] = new Animate(images);
    }
    {
        const [lwidth2, lheight2, width2, height2] = [32, 32, 24, 24];
        const images: ImageX[] = [];
        const img2: HTMLImageElement = src.explosion;
        for (let i = 0; i < 4; i++) {
            for (let j = 0; j < 4; j += 2) {
                images.push(new ImageX(img2, lwidth2, lheight2, j * lwidth2, i * lheight2, width2, height2));
            }
        }
        animates[BulletStatus.Bomb] = new Animate(images, undefined, undefined, false);
    }
    return animates;
}

export function loadIceBullet(src: ImageSrcInterface): BulletAnimatesInterface {
    const animates: BulletAnimatesInterface = {};
    const images: ImageX[] = [];
    const pic: HTMLImageElement = src.particle;
    const [lwidth, lheight, width, height] = [8, 8, 16, 16];
    for (let i = 7; i >= 0; i--) {
        images.push(new ImageX(pic, lwidth, lheight, i * lwidth, 0, width, height));
    }
    for (let i = 1; i < 8; i++) {
        images.push(new ImageX(pic, lwidth, lheight, i * lwidth, 0, width, height));
    }
    animates[BulletStatus.Fly] = new Animate(images);
    return animates;
}

export function loadFireBulletImage(src: ImageSrcInterface): BulletAnimatesInterface {
    const animates: BulletAnimatesInterface = {};
    const images: ImageX[] = [];
    const pic: HTMLImageElement = src.fire;
    const [lwidth, lheight, width, height] = [16, 16, 16, 16];
    for (let i = 0; i < 32; i++) {
        images.push(new ImageX(pic, lwidth, lheight, 0, i * lheight, width, height));
    }
    animates[BulletStatus.Fly] = new Animate(images);
    return animates;
}

function loadRainAnimate(src: ImageSrcInterface): Animate[] {
    const rainImage: HTMLImageElement = <HTMLImageElement>src.rain;
    const [lwidth, lheight, width, height] = [64, 64, 128, 128];
    const images: ImageX[] = [];
    const animates: Animate[] = [];
    for (let i = 0; i < 4; i++) {
        images.push(new ImageX(rainImage, lwidth, lheight, 0, i * lheight, width, height));
    }
    for (let i = 0; i < 4; i++) {
        animates.push(new Animate(images, 1));
        for (let j = 0; j < i; j++) {
            animates[i].nextTick();
        }
    }
    return animates;
}

export default async function (): Promise<void> {
    state.image = {};
    const image = state.image;
    const src: ImageSrcInterface = image.src = {};

    await Promise.all([loadImage('asset/mc/unit/zombie/walk/zombie_walk2.png'),
        loadImage('asset/mc/unit/zombie/attack/zombie_attack.png'),
        loadImage('asset/mc/unit/creeper/walk/creeper_walk.png'),
        loadImage('asset/mc/unit/creeper/explode/creeper_explode.png'),
        loadImage('asset/mc/effect/explosion.png'),
        loadImage('asset/mc/block/soul_sand.png'),
        loadImage('asset/mc/block/netherrack.png'),
        loadImage('asset/mc/block/stone.png'),
        loadImage('asset/png/tower2.png'),
        loadImage('asset/mc/effect/fire_layer_0.png'),
        loadImage('asset/mc/block/lava_still.png'),
        loadImage('asset/mc/unit/steve/walk/steve_walk.png'),
        loadImage('asset/mc/unit/steve/attack/steve_attack.png'),
        loadImage('asset/mc/effect/rain.png'),
        loadImage('asset/mc/effect/particles.png'),
        loadImage('asset/mc/block/bullet.png'),
        loadImage('asset/mc/block/ice.png'),
        loadImage('asset/mc/effect/portal.png'),]).then(data => {
        [src.zombieWalk,
            src.zombieAttack,
            src.creeperWalk,
            src.creeperAttack,
            src.explosion,
            src.grass,
            src.dirt,
            src.stone,
            src.tower_default,
            src.fire,
            src.lava,
            src.steveWalk,
            src.steveAttack,
            src.rain,
            src.particle,
            src.bullet,
            src.ice,
            src.portal] = data;
    });

    // src.zombieWalk = await loadImage('asset/mc/unit/zombie/walk/zombie_walk2.png');
    // src.zombieAttack = await loadImage('asset/mc/unit/zombie/attack/zombie_attack.png');
    // src.creeperWalk = await loadImage('asset/mc/unit/creeper/walk/creeper_walk.png');
    // src.creeperAttack = await loadImage('asset/mc/unit/creeper/explode/creeper_explode.png');
    // src.explosion = await loadImage('asset/mc/effect/explosion.png');
    // src.grass = await loadImage('asset/mc/block/soul_sand.png');
    // src.dirt = await loadImage('asset/mc/block/netherrack.png');
    // src.stone = await loadImage('asset/mc/block/stone.png');
    // src.tower_default = await loadImage('asset/png/tower2.png');
    // src.fire = await loadImage('asset/mc/effect/fire_layer_0.png');
    // src.lava = await loadImage('asset/mc/block/lava_still.png');
    // src.steveWalk = await loadImage('asset/mc/unit/steve/walk/steve_walk.png');
    // src.steveAttack = await loadImage('asset/mc/unit/steve/attack/steve_attack.png');
    // src.rain = await loadImage('asset/mc/effect/rain.png');
    // src.particle = await loadImage('asset/mc/effect/particles.png');
    // src.bullet = await loadImage('asset/mc/block/bullet.png');
    // src.ice = await loadImage('asset/mc/block/ice.png');
    // src.portal = await loadImage('asset/mc/effect/portal.png');

    image.blockImage = loadBlockImage(src);
    image.towerImage = loadTowerImage(src);
    image.rainAnimate = loadRainAnimate(src);
}