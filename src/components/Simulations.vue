<template>
	<div class="bg-600 text-0 rounded h-auto text-xl relative p-2 col-span-4 row-span-2 lg:col-span-2">
		<Input
			class="w-full p-2 h-12 text-2xl"
			v-model="simulations.simulationTapAmount"
			:valueName="'simulation'"
		/>

		<div class="my-3 mx-1 grid grid-cols-2 gap-3">
			<SimulateButton buttonText="Simulate" />

			<button
				:disabled="currentItemSelected.allTiers === null || toggles.justClicked"
				:class="[
					currentItemSelected.allTiers === null || toggles.justClicked ? 'bg-400' : 'bg-red',
					'rounded p-4 font-bold truncate',
				]"
				@click="clearSimulation(), (failstack = 0), (displayedItemInformation.silverSpent = 0), setChance()"
			>
				Clear
			</button>
		</div>

		<div class="rounded bg-700 h-90 lg:h-95 2xl:h-81 text-left pb-0 overflow-y-auto">
			<p
				v-for="(attempt, key) in simulations.simulationsToDisplay.slice(0, 100).reverse()"
				:key="key"
				:class="['ml-2', { 'text-red': !attempt.state, 'text-green': attempt.state }]"
			>
				{{ attempt.lvlName }} <span class="text-400">|</span>
				{{ attempt.text + attempt.roll }}
				<span class="text-200"><span class="text-400">|</span> FS used: {{ attempt.failstack }}</span>
			</p>
		</div>
	</div>
</template>

<script>
import Input from "./Input.vue";
import SimulateButton from "./SimulateButton.vue";

export default {
	name: "Simulations",

	components: { Input, SimulateButton },

	computed: {
		currentItemSelected: {
			get() {
				return this.$store.state.enhance.currentItemSelected;
			},
			set(value) {
				this.$store.commit("SET_CURRENT_ITEM_SELECTED", value);
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

		failstack: {
			get() {
				return this.$store.state.enhance.failstack;
			},
			set(value) {
				this.$store.commit("SET_FAILSTACK", value);
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
	},

	methods: {
		clearSimulation() {
			this.stats.highestSuccessStreak = 0;
			this.stats.highestFailStreak = 0;
			this.stats.currentSuccessStreak = 0;
			this.stats.currentFailStreak = 0;
			this.stats.attempts = 0;
			this.stats.success = 0;
			this.stats.fails = 0;
			this.simulations.simulationsToDisplay = [];
		},

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
	},
};
</script>
