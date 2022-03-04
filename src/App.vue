<template>
	<div class="bg-800 w-full min-h-screen">
		<!-- <Scrolls title="Scroll Calculator" /> -->
		<EnhancingCalculator />
	</div>
</template>

<script>
import EnhancingCalculator from "./Pages/EnhancingCalculator.vue";
import Scrolls from "./Pages/Scrolls.vue";

export default {
	name: "App",
	components: {
		Scrolls,
		EnhancingCalculator,
	},
};
</script>
