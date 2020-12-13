import store from '@/store';
const state = store.state;

export default function (): any {
    return {
        title: '',
        mode: '',
        gamemode: state.gamemode,
        tower: {
            towerAbilitys: {},
            location: {},
            upgradeAble: 0,
            buildAble: true
        },
        player: state.player,
        stage: state.stage,
        image: state.image,
        state: state,
        seed: 1024,
        helpShowing: false
    };
}