<template>
	<Modal id="fsDefaults">
		<div class="w-full bg-600 shadow-sm pl-3 p-3 py-2 text-left focus:outline-none rounded">
			<div class="text-2xl text-white mb-2">
				<p
					:class="[
						'inline',
						{
							'text-green': toggles.useFsDefaultsToggle,
							'text-red': !toggles.useFsDefaultsToggle,
						},
					]"
				>
					Use FS Defaults
				</p>

				<label class="switch my-2"
					><input
						:disabled="[4, 5, 7, 8, 11, 13].includes(this.currentItemSelected.information.chance)"
						@click="toggles.useFsDefaultsToggle = !toggles.useFsDefaultsToggle"
						type="checkbox" />
					<span class="slider round"></span
				></label>
			</div>

			<div class="flex text-lg text-white mb-2">
				<p class="flex-auto ml-4">Tier</p>
				<p class="flex-auto ml-4 text-green">Start</p>
				<p class="flex-auto ml-5 text-red">Stop</p>
			</div>

			<div v-for="(fs, index) in defaults" :key="index" class="text-center text-white text-xl">
				<p class="bg-700 w-14 p-1 mb-2 inline-block">{{ fs.tier }}</p>
				:
				<input
					class="w-16 p-2 bg-500 h-8 text-center focus:outline-none text-green"
					type="number"
					v-model="fs.start"
				/>
				-
				<input
					class="w-16 p-2 bg-500 h-8 text-center focus:outline-none text-red"
					type="number"
					v-model="fs.stop"
				/>
			</div>
		</div>
	</Modal>
</template>

<script>
import Modal from "./Modal.vue";

export default {
	name: "FSDefaults",

	components: { Modal },

	data() {
		return {
			fsDefaultsTwenty: [
				{
					tier: "Base",
					start: 0,
					stop: 0,
				},
				{
					tier: "+1",
					start: 0,
					stop: 0,
				},
				{
					tier: "+2",
					start: 0,
					stop: 0,
				},
				{
					tier: "+3",
					start: 0,
					stop: 0,
				},
				{
					tier: "+4",
					start: 2,
					stop: 7,
				},
				{
					tier: "+5",
					start: 3,
					stop: 8,
				},
				{
					tier: "+6",
					start: 4,
					stop: 9,
				},
				{
					tier: "+7",
					start: 5,
					stop: 10,
				},
				{
					tier: "+8",
					start: 6,
					stop: 11,
				},
				{
					tier: "+9",
					start: 7,
					stop: 12,
				},
				{
					tier: "+10",
					start: 8,
					stop: 13,
				},
				{
					tier: "+11",
					start: 9,
					stop: 13,
				},
				{
					tier: "+12",
					start: 10,
					stop: 14,
				},
				{
					tier: "+13",
					start: 20,
					stop: 30,
				},
				{
					tier: "+14",
					start: 40,
					stop: 50,
				},
				{
					tier: "+15",
					start: 20,
					stop: 30,
				},
				{
					tier: "I",
					start: 40,
					stop: 50,
				},
				{
					tier: "II",
					start: 60,
					stop: 80,
				},
				{
					tier: "III",
					start: 80,
					stop: 110,
				},
				{
					tier: "IV",
					start: 110,
					stop: 160,
				},
			],

			fsDefaultsFive: [
				{
					tier: "Base",
					start: 10,
					stop: 20,
				},
				{
					tier: "I",
					start: 40,
					stop: 50,
				},
				{
					tier: "II",
					start: 60,
					stop: 80,
				},
				{
					tier: "III",
					start: 80,
					stop: 110,
				},
				{
					tier: "IV",
					start: 110,
					stop: 160,
				},
			],

			fsDefaultsThree: [
				{
					tier: "Base",
					start: 20,
					stop: 30,
				},
				{
					tier: "+1",
					start: 40,
					stop: 50,
				},
				{
					tier: "+2",
					start: 60,
					stop: 80,
				},
			],
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

		fsDefaults: {
			get() {
				return this.$store.state.enhance.fsDefaults;
			},
			set(value) {
				this.$store.commit("SET_FS_DEFAULTS", value);
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

		defaults() {
			let len =
				this.currentItemSelected.allTiers === null ? null : this.currentItemSelected.allTiers.length - 1;

			if (len === 20) {
				this.fsDefaults = this.fsDefaultsTwenty;
				return this.fsDefaultsTwenty;
			} else if (len === 5) {
				this.fsDefaults = this.fsDefaultsFive;
				return this.fsDefaultsFive;
			} else if (len === 3) {
				this.fsDefaults = this.fsDefaultsThree;
				return this.fsDefaultsThree;
			}
		},
	},
};
</script>
