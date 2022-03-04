<template>
	<div class="bg-700 text-0 h-24 2xl:h-36 pb-32 text-center pt-5">
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

			<UnusedFailstacks />
			<button
				:class="[
					'text-sm ml-2 rounded bg-500 px-1',
					{
						'text-green': toggles.useUnusedFsToggle,
						'text-red': !toggles.useUnusedFsToggle,
					},
				]"
				@click="open('unusedFs')"
			>
				Unused Failstacks
			</button>
		</div>
	</div>
</template>

<script>
import Enhancing from "../mixins/Enhancing";
import FSDefaults from "./FSDefaults.vue";
import FSSilverValues from "./FSSilverValues.vue";
import UnusedFailstacks from "./UnusedFailstacks.vue";

export default {
	name: "FailstackPrep",

	components: {
		FSDefaults,
		FSSilverValues,
		UnusedFailstacks,
	},

	mixins: [Enhancing],

	data() {
		return {
			fsButtons: [-25, -5, -1, +1, +5, +25],
		};
	},
};
</script>
