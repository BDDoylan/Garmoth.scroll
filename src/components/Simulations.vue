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
				@click="clearSimulation()"
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
import Enhancing from "../mixins/Enhancing";
import Input from "./Input.vue";
import SimulateButton from "./SimulateButton.vue";

export default {
	name: "Simulations",

	components: { Input, SimulateButton },

	mixins: [Enhancing],
};
</script>
