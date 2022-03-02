export default {
	state: () => ({
		items: {},
		chance: {},
		cron: {},
		material: {},
		prices: {},

		currentItemSelected: {
			information: {
				main_key: 10810,
			},

			allTiers: null,

			currTier: {},
			prevTier: {},
			nextTier: {},
		},

		displayedItemInformation: {
			chanceOfSuccess: 0,
			softCap: 0,
			avgClicks: 0,
			silverSpent: 0,
		},

		failstack: 0,

		simulations: { simulationTapAmount: 1, simulationsToDisplay: [] },

		stats: {
			attempts: 0,
			success: 0,
			fails: 0,
			highestSuccessStreak: 0,
			highestFailStreak: 0,
			currentSuccessStreak: 0,
			currentFailStreak: 0,
		},

		toggles: {
			realEnchancement: false,
			cronToggle: false,
			animationToggle: false,
			justClicked: false,
			useFsDefaultsToggle: false,
			useFsDefaultSilverValuesToggle: false,
			useUnusedFsToggle: false,
		},

		fsDefaults: {},

		fsSilver: {},

		tierChart: [],

		silverChart: [],

		unusedFailstackStorage: [],
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

		SET_CURRENT_ITEM_SELECTED(state, payload) {
			state.currentItemSelected = payload;
			state.toggles.cronToggle = false;
		},

		SET_STATS(state, payload) {
			state.stats = payload;
		},

		SET_DISPLAYED_ITEM_INFO(state, payload) {
			state.displayedItemInformation = payload;
		},

		SET_FAILSTACK(state, payload) {
			state.failstack = payload;
		},

		SET_SIMULATIONS(state, payload) {
			state.simulation = payload;
		},

		SET_TOGGLES(state, payload) {
			state.toggles = payload;
		},

		SET_FS_DEFAULTS(state, payload) {
			state.fsDefaults = payload;
		},

		SET_FS_SILVER(state, payload) {
			state.fsSilver = payload;
		},

		SET_TIER_CHART(state, payload) {
			state.tierChart = payload;
		},

		SET_SILVER_CHART(state, payload) {
			state.silverChart = payload;
		},

		SET_UNUSED_FS(state, payload) {
			state.unusedFailstackStorage = payload;
		},
	},
	actions: {},
};
