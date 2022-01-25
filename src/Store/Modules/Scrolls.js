export default {
    state: () => ({
        storage: {
            seconds: { },
            items: { }
        }
    }),
    mutations: {
        SET_STORAGE(state, payload) {
            state.storage = payload
        }
    },
    actions: {

    }
}