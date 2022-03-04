<template>
	<Modal id="unusedFs">
		<div class="w-full bg-600 shadow-sm pl-3 p-3 py-2 text-left focus:outline-none rounded">
			<div class="text-2xl text-white mb-2 mx-auto text-center">
				<p
					:class="[
						'inline',
						{
							'text-green': toggles.useUnusedFsToggle,
							'text-red': !toggles.useUnusedFsToggle,
						},
					]"
				>
					Unused Failstacks
				</p>

				<!-- <label class="switch my-2"
					><input
						:disabled="[4, 5, 7, 8, 11, 13].includes(this.currentItemSelected.information.chance)"
						@click="toggles.useUnusedFsToggle = !toggles.useUnusedFsToggle"
						type="checkbox" />
					<span class="slider round"></span
				></label> -->
			</div>

			<div class="text-center text-white text-xl grid grid-cols-5 gap-2">
				<p v-for="(fs, index) in unusedFs" :key="index" class="bg-700 w-12 p-1 mb-2 rounded">{{ fs }}</p>
			</div>
		</div>
	</Modal>
</template>

<script>
import Modal from "../GeneralComponents/Modal.vue";

export default {
	name: "UnusedFailstacks",

	components: { Modal },

	computed: {
		currentItemSelected: {
			get() {
				return this.$store.state.enhance.currentItemSelected;
			},
			set(value) {
				this.$store.commit("SET_CURRENT_ITEM_SELECTED", value);
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

		unusedFs: {
			get() {
				return this.$store.state.enhance.unusedFailstackStorage;
			},
			set(value) {
				this.$store.commit("SET_UNUSED_FS", value);
			},
		},
	},
};
</script>
