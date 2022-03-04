<template>
	<div class="grid grid-cols-1 my-2 gap-2 2xl:grid-cols-3 lg:grid-cols-2 md:grid-cols-3 text-center">
		<div class="rounded bg-700 h-14 w-auto font-semibold">
			<p :class="['my-3 text-green font-bold', { 'text-red': !toggles.artisanToggle }]">
				Artisan Memory
				<label class="switch ml-1"
					><input
						:disabled="toggles.justClicked"
						@click="toggles.artisanToggle = !toggles.artisanToggle"
						type="checkbox" />
					<span class="slider round"></span
				></label>
			</p>
		</div>

		<div class="rounded bg-700 h-14 w-auto">
			<button
				:class="[
					currentItemSelected.nextTier === null ||
					currentItemSelected.allTiers === null ||
					toggles.justClicked
						? 'text-white'
						: 'hover:text-green',
					'my-3 cursor-pointer font-semibold',
				]"
				:disabled="
					currentItemSelected.currTier.lvlName === 'END' ||
					currentItemSelected.nextTier === null ||
					currentItemSelected.allTiers === null ||
					toggles.justClicked
				"
				@click="(failstack = displayedItemInformation.softCap), setChance()"
			>
				Softcap:
				{{ currentItemSelected.currTier.lvlName != "END" ? displayedItemInformation.softCap : "N/A" }}
			</button>
		</div>

		<div
			class="rounded font-semibold bg-700 h-18 w-auto 2xl:row-span-1 row-span-1 lg:row-span-2 2xl:pt-0 lg:pt-9"
		>
			<p class="my-3">
				Avg. Clicks:
				{{ currentItemSelected.currTier.lvlName != "END" ? displayedItemInformation.avgClicks : "N/A" }}
			</p>
		</div>

		<div class="rounded bg-700 h-32 row-span-1 pt-1 md:row-span-2">
			<p :class="['my-3 text-green font-bold', { 'text-red': !toggles.cronToggle }]">
				CRONS
				<label
					class="switch ml-1"
					v-if="currentItemSelected.currTier.crons != null && currentItemSelected.currTier.crons != 0"
					><input
						:disabled="
							currentItemSelected.nextTier === null ||
							currentItemSelected.allTiers === null ||
							toggles.justClicked
						"
						@click="toggles.cronToggle = !toggles.cronToggle"
						v-model="toggles.cronToggle"
						type="checkbox" />
					<span class="slider round"></span
				></label>
			</p>

			<div class="bg-600 rounded w-28 h-12 m-auto">
				<p v-if="toggles.cronToggle" class="p-2 font-bold">
					{{ currentItemSelected.currTier.crons }}
				</p>
				<p v-else class="p-2 font-bold">?</p>
			</div>
		</div>

		<div class="rounded bg-700 h-18 col-span-1 lg:col-span-2 md:col-span-2">
			<p class="my-3 font-semibold">
				Silver Spent: {{ displayedItemInformation.silverSpent.toLocaleString() }}
			</p>
		</div>

		<div class="rounded bg-700 h-18 col-span-1 py-2 pt-3">
			<div :class="['my-1 text-green font-bold', { 'text-red': !toggles.animationToggle }]">
				<span>Skip Animation</span>
				<label class="switch ml-3"
					><input
						:disabled="toggles.justClicked"
						@click="toggles.animationToggle = !toggles.animationToggle"
						type="checkbox" />
					<span class="slider round"></span
				></label>
			</div>
		</div>

		<SimulateButton buttonText="Enhance" />
	</div>
</template>

<script>
import Enhancing from "../mixins/Enhancing";
import SimulateButton from "./SimulateButton.vue";

export default {
	name: "DisplayedItemInfo",

	components: {
		SimulateButton,
	},

	mixins: [Enhancing],
};
</script>
