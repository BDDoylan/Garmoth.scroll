<template>
	<div class="bg-700 text-0 rounded h-24 2xl:h-36 pb-32 text-center">
		<div class="font-bold mb-3 pt-2">
			Current Failstack:
			<input
				class="w-20 p-2 bg-500 h-7 text-center focus:outline-none"
				type="number"
				v-model="failstack"
				:disabled="
					[4, 5, 7, 13].includes(currentItemSelected.information.chance) ||
					currentItemSelected.allTiers == null
				"
				@input="setChance()"
			/>
		</div>

		<button
			v-for="(fs, index) in fsButtons"
			:key="index"
			:disabled="
				[4, 5, 7, 13].includes(currentItemSelected.information.chance) || currentItemSelected.allTiers == null
			"
			:class="[
				'bg-500 text-green rounded w-11 h-7 ml-2 font-bold',
				{ 'text-red': fs === -25 || fs === -5 || fs === -1 },
			]"
			@click="addToFailstack(fs)"
		>
			{{ fs }}
		</button>

		<div class="mt-2">
			<FSDefaults />
			<button
				:class="[
					'text-sm ml-2 rounded bg-500 px-1',
					{
						'text-green': toggles.useFsDefaultsToggle,
						'text-red': !toggles.useFsDefaultsToggle,
					},
				]"
				@click="open('fsDefaults')"
			>
				FS Defaults
			</button>

			<FSSilverValues />
			<button
				:class="[
					'text-sm ml-2 rounded bg-500 px-1',
					{
						'text-green': toggles.useFsDefaultSilverValuesToggle,
						'text-red': !toggles.useFsDefaultSilverValuesToggle,
					},
				]"
				@click="open('fsSilver')"
			>
				FS Silver Values
			</button>
		</div>
	</div>
</template>

<script>
import FSDefaults from "./FSDefaults.vue";
import FSSilverValues from "./FSSilverValues.vue";

export default {
	name: "FailstackPrep",

	components: {
		FSDefaults,
		FSSilverValues,
	},

	data() {
		return {
			fsButtons: [-25, -5, -1, +1, +5, +25],
		};
	},

	computed: {
		currentItemSelected: {
			get() {
				return this.$store.state.enhance.currentItemSelected;
			},
			set(value) {
				this.$store.commit("SET_CURRENT_ITEM_SELECTED", value);
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

        displayedItemInformation: {
			get() {
				return this.$store.state.enhance.displayedItemInformation;
			},
			set(value) {
				this.$store.commit("SET_DISPLAY_ITEM_INFO", value);
			},
		},
	},

	methods: {
		open(id) {
			document.getElementById(id).style.display = "flex";
		},

		addToFailstack(amount) {
			this.failstack += amount;
			if (this.failstack <= 0) this.failstack = 0;
			this.setChance();
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
