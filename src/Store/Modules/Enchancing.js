export default {
	state: () => ({
		items: {},
		chance: {},
		cron: {},
		material: {},
		prices: {},
	}),
	mutations: {
		SET_ITEMS_STORAGE(state, payload) {
			state.items = payload;
		},
		SET_CHANCE_STORAGE(state, payload) {
			state.chance = payload;
		},
		SET_CRON_STORAGE(state, payload) {
			state.cron = payload;
		},
		SET_MATERIAL_STORAGE(state, payload) {
			state.material = payload;
		},
		SET_PRICES_STORAGE(state, payload) {
			state.prices = payload;
		},
	},
	actions: {},
};
