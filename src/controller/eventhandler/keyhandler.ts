import store from '@/store';
const state = store.state;

function onKeyDown(e: KeyboardEvent): void {
    if (e.code === 'Escape') {
        state.timeron = false;
    }
}

export default function (): void {
    window.addEventListener('keydown', onKeyDown, true);
}