<template>
	<div class="text-left text-0 py-8 text-5xl font-bold ml-3">
		<h1 class="inline text-5x mr-32">Enhancing Calculator</h1>
		<button
			@click="toggles.realEnchancement = !toggles.realEnchancement"
			class="text-2xl mr-4 font-semibold text-green rounded absolute bg-600 p-2 right-0"
		>
			<span v-if="toggles.realEnchancement" class="text-base text-red">not</span>Real
		</button>
	</div>
</template>

<script>
export default {
	name: "HeaderInformation",

	computed: {
		toggles: {
			get() {
				return this.$store.state.enhance.toggles;
			},
			set(value) {
				this.$store.commit("SET_TOGGLES", value);
			},
		},
	},
};
</script>
