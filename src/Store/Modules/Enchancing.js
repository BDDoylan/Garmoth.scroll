export default {
	state: () => ({
		storage: {
			fsDefaults: {},
			items: {},
            chance: {},
            cron: {},
            material: {},
			prices: {},
		},
	}),
	mutations: {
		SET_ENCHANCE_STORAGE(state, payload) {
			state.storage = payload;
		},
	},
	actions: {},
};
