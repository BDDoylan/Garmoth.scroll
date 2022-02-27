<template>
	<div class="bg-800 w-full min-h-screen">
		<!-- <Scrolls title="Scroll Calculator" /> -->
		<EnhancingCalculator title="Enhancing Calculator" />
	</div>
</template>

<script>
import EnhancingCalculator from './components/EnhancingCalculator.vue';
import Scrolls from "./components/Scrolls.vue";

export default {
	name: "App",
	components: {
		Scrolls,
		EnhancingCalculator,
	},
};
</script>
