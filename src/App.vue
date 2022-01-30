<template>
	<div class="bg-800 w-full min-h-screen">
		<!-- <Scrolls title="Scroll Calculator" /> -->
		<EnchancingCalculator title="Enchancing Calculator" />
	</div>
</template>

<script>
import EnchancingCalculator from './components/EnchancingCalculator.vue';
import Scrolls from "./components/Scrolls.vue";

export default {
	name: "App",
	components: {
		Scrolls,
		EnchancingCalculator,
	},
};
</script>
