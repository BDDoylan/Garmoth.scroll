<template>
	<div
		class="bg-600 text-0 rounded text-xl relative py-4 col-span-4 lg:col-span-2 lg:pt-1 2xl:pt-3 text-center"
	>
		<p class="text-2xl font-semibold lg:mt-10 2xl:mt-1">Chance Calculator</p>

		<input
			class="w-48 p-2 bg-700 h-8 text-center focus:outline-none my-5"
			type="number"
			placeholder="Times"
			v-model="chanceCalcTimes"
		/>

		<p>Chance of success</p>

		<p class="text-3xl">{{ chanceCalculator }}%</p>
	</div>
</template>

<script>
export default {
	name: "ChanceCalculator",

	data() {
		return {
			chanceCalcTimes: null,
		};
	},

	computed: {
		displayedItemInformation: {
			get() {
				return this.$store.state.enhance.displayedItemInformation;
			},
			set(value) {
				this.$store.commit("SET_DISPLAYED_ITEM_INFO", value);
			},
		},

		chanceCalculator() {
			let times = this.chanceCalcTimes;
			let calc = (
				(1 - Math.pow(1 - this.displayedItemInformation.chanceOfSuccess / 100, times)) *
				100
			).toFixed(5);
			if (parseFloat(calc) > 99.99) {
				return 99.99;
			} else {
				return calc;
			}
		},
	},
};
</script>
