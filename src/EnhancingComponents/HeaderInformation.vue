<template>
	<div class="text-left text-0 py-8 text-5xl font-bold ml-3">
		<h1 class="inline text-5x mr-32">Enhancing Calculator</h1>
		<Information />
		<div class="inline relative float-right">
			<button
				class="right-28 top-0 text-4xl text-400 font-bold absolute animate-pulse"
				@click="open('information')"
			>
				?
			</button>
			<button
				@click="toggles.realEnchancement = !toggles.realEnchancement"
				class="text-2xl mr-4 font-semibold text-green rounded absolute bg-600 p-2 right-0"
			>
				<span v-if="toggles.realEnchancement" class="text-base text-red">not</span>Real
			</button>
		</div>
	</div>
</template>

<script>
import Enhancing from "../mixins/Enhancing";
import Information from "./Information.vue";

export default {
	name: "HeaderInformation",

	mixins: [Enhancing],

	components: { Information },
};
</script>
