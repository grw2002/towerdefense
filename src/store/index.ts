class Store {
    state: { [propName: string]: any };
    mutations: undefined;
    commit: undefined;
    constructor(state?: any) {
        this.state = state || {};
        this.mutations = this.commit = undefined;
    }
}

export default new Store();