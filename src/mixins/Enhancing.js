export default {
	computed: {
		currentItemSelected: {
			get() {
				return this.$store.state.enhance.currentItemSelected;
			},
			set(value) {
				this.$store.commit("SET_CURRENT_ITEM_SELECTED", value);
				this.setChance();
			},
		},

		toggles: {
			get() {
				return this.$store.state.enhance.toggles;
			},
			set(value) {
				this.$store.commit("SET_TOGGLES", value);
			},
		},

		stats: {
			get() {
				return this.$store.state.enhance.stats;
			},
			set(value) {
				this.$store.commit("SET_STATS", value);
			},
		},

		displayedItemInformation: {
			get() {
				return this.$store.state.enhance.displayedItemInformation;
			},
			set(value) {
				this.$store.commit("SET_DISPLAYED_ITEM_INFO", value);
			},
		},

		failstack: {
			get() {
				return this.$store.state.enhance.failstack;
			},
			set(value) {
				this.$store.commit("SET_FAILSTACK", value);
			},
		},

		simulations: {
			get() {
				return this.$store.state.enhance.simulations;
			},
			set(value) {
				this.$store.commit("SET_SIMULATIONS", value);
			},
		},

		tierChart: {
			get() {
				return this.$store.state.enhance.tierChart;
			},
			set(value) {
				this.$store.commit("SET_TIER_CHART", value);
			},
		},

		silverChart: {
			get() {
				return this.$store.state.enhance.silverChart;
			},
			set(value) {
				this.$store.commit("SET_SILVER_CHART", value);
			},
		},
	},

	methods: {
		setChance() {
			let baseChance = this.currentItemSelected.currTier.baseChance;
			this.displayedItemInformation.softCap = this.currentItemSelected.currTier.softCap;

			let failstackChance = baseChance / 10;
			let failstackChanceAfterSoftcap = baseChance / 50;

			if (this.failstack > this.displayedItemInformation.softCap) {
				this.displayedItemInformation.chanceOfSuccess =
					baseChance +
					failstackChance * this.displayedItemInformation.softCap +
					(this.failstack - this.displayedItemInformation.softCap) * failstackChanceAfterSoftcap;
			} else {
				this.displayedItemInformation.chanceOfSuccess = baseChance + failstackChance * this.failstack;
			}

			this.displayedItemInformation.chanceOfSuccess = (
				this.displayedItemInformation.chanceOfSuccess * 100
			).toFixed(2);
			if (
				this.displayedItemInformation.chanceOfSuccess > 90 &&
				this.currentItemSelected.currTier.baseChance != 1
			) {
				this.displayedItemInformation.chanceOfSuccess = (90).toFixed(2);
			} else if (this.currentItemSelected.currTier.baseChance === 1) {
				this.displayedItemInformation.chanceOfSuccess = (100).toFixed(2);
			}
			this.displayedItemInformation.avgClicks = (100 / this.displayedItemInformation.chanceOfSuccess).toFixed(
				2
			);
		},

		clearSimulation() {
			this.stats.highestSuccessStreak = 0;
			this.stats.highestFailStreak = 0;
			this.stats.currentSuccessStreak = 0;
			this.stats.currentFailStreak = 0;
			this.stats.attempts = 0;
			this.stats.success = 0;
			this.stats.fails = 0;
			this.simulations.simulationsToDisplay = [];
			this.tierChart.forEach((data) => {
				data.success = 0;
				data.fail = 0;
			});
			this.silverChart.forEach((data) => {
				data.silverForDurability = 0;
				data.silverForMaterial = 0;
				data.silverForCrons = 0;
				data.silverForFS = 0;
			});
            this.displayedItemInformation.silverSpent = 0;
            this.failstack = 0;
            this.setChance();
		},

		open(id) {
			document.getElementById(id).style.display = "flex";
		},

		close(id) {
			document.getElementById(id).style.display = "none";
		},

		addToFailstack(amount) {
			this.failstack += amount;
			if (this.failstack <= 0) this.failstack = 0;
			this.setChance();
		},
	},
};
