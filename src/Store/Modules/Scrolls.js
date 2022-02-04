export default {
	state: () => ({
		storage: {
			seconds: {},
			items: {},
		},
	}),
	mutations: {
		SET_SCROLL_STORAGE(state, payload) {
			state.storage = payload;
		},
	},
	actions: {},
};
