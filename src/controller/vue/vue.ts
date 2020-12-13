import { Location } from '@/model/unit';
import Vue from 'vue';
import { buildTower, removeTower, upgradeTower } from '../timerhandler/towerhandler';

import { Tower, TowerAbilitysInterface, TowerType } from '@/model/tower';
import { Player } from '@/model/player';
import store from '@/store';
const state = store.state;
import data from './data';
import initStart from '../init/initstart';
import { DeployStatus } from '@/view/drawhero';
import { fps, fps2 } from '@/config';
import initStage from '../init/initstage';

export default function (): void {
    state.vue = new Vue({
        el: '#app2',
        data,
        computed: {
            gameSpeed: function () {
                return this.state.fps === fps2;
            }
        },
        methods: {
            /***** BuildTower *****/
            buildTower: function (location: Location) {
                this.mode = 'buildTower';
                this.title = '建塔';
                this.tower.towerAbilitys = state.stage.towers;
                this.tower.location = location;
                this.openModal();
            },
            confirmBuildTower: function (type: TowerType) {
                this.player.cd = 0;
                buildTower(this.$data.tower.location, type);
                this.closeModal();
            },
            /***** RemoveTower *****/
            confirmRemoveTower: function () {
                removeTower(this.$data.tower.tower);
                this.closeModal();
            },
            /***** AlterTower *****/
            alterTower: function (tower: Tower) {
                this.mode = 'alterTower';
                const towerAbilitys: TowerAbilitysInterface = state.stage.towers;
                this.title = `这是一座${tower.level}级${towerAbilitys[tower.type].name}`;
                this.$data.tower.tower = tower;
                if (tower.level === tower.topLevel) {
                    this.tower.upgradeAble = 1;
                } else if ((<Player>this.player).money < tower.towerAbility.costs[tower.level + 1]) {
                    this.tower.upgradeAble = 2;
                } else {
                    this.tower.upgradeAble = 0;
                }
                this.$data.tower.cost = tower.towerAbility.costs[tower.level + 1];
                this.$data.tower.refund = tower.towerAbility.refunds[tower.level];
                this.openModal();
            },
            /* Deploying Hero */
            setDeploying: function () {
                this.player.deployStatus = DeployStatus.Deploying;
            },
            calcelDeploying: function () {
                this.player.deployStatus = DeployStatus.Default;
            },
            backToStart: function () {
                this.closeModal();
                this.player.mode = 'game';
                initStart();
            },
            togglePause: function () {
                this.state.timeron ^= 1;
            },
            toggleGameSpeed: function () {
                if (this.gameSpeed) {
                    this.state.fps = fps;
                } else {
                    this.state.fps = fps2;
                }
            },
            confirmUpgradeTower: function () {
                this.player.cd = 0;
                upgradeTower(this.$data.tower.tower);
                this.closeModal();
            },
            confirmNextStage: function () {
                this.closeModal();
                initStage(this.state.stageid + 1);
            },
            confirmStartGame: function () {
                initStage(1);
            },
            confirmRandom: function () {
                let seed = 6;
                seed = Number(prompt('random seed(above 0)', '6'));
                if (seed <= 0) {
                    return;
                }
                if (!isNaN(seed)) {
                    this.state.seed = seed;
                    initStage(-1);
                }
            },
            confirmReplay: function () {
                this.closeModal();
                initStage(this.state.stageid);
            },
            showHelp: function () {
                (<any>$('#help')).modal('toggle');
                this.helpShowing = true;
            },
            closeHelp: function () {
                (<any>$('#help')).modal('hide');
            },
            /* gameover */
            gameOver: function () {
                this.player.mode = this.mode = 'gameover';
                this.title = '';
                this.openModal();
            },
            victory: function () {
                this.player.mode = this.mode = 'victory';
                this.title = '';
                this.openModal();
            },
            openModal: function () {
                (<any>$('#modal')).modal('show');
                state.timeron = false;
            },
            closeModal: function () {
                (<any>$('#modal')).modal('hide');
                state.timeron = true;
            }
        }
    });
}