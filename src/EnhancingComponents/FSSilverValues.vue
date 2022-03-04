<template>
	<Modal id="fsSilver">
		<div class="mt-1 relative w-full bg-600 rounded p-3">
			<div class="text-xl text-white rounded">
				<div class="text-xl lg:text-4xl text-white mb-6 align-middle">
					<p
						:class="[
							'text-center inline',
							{
								'text-green': toggles.useFsDefaultSilverValuesToggle,
								'text-red': !toggles.useFsDefaultSilverValuesToggle,
							},
						]"
					>
						Use FS Silver Defaults
					</p>

					<label class="switch md:ml-60 lg:ml-80 my-2 mt-3"
						><input
							:disabled="[4, 5, 7, 8, 11, 13].includes(this.currentItemSelected.information.chance)"
							@click="toggles.useFsDefaultSilverValuesToggle = !toggles.useFsDefaultSilverValuesToggle"
							type="checkbox" />
						<span class="slider round"></span
					></label>
				</div>

				<div class="rounded mb-1 bg-700">
					<span class="p-2 text-red">
						FS
						<p class="inline ml-3 text-green float-right mr-2">Silver</p>
					</span>
				</div>

				<div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 md:gap-1 lg:gap-1 text-center">
					<div v-for="(fs, index) in fsDefaultSilver" :key="index" class="rounded mb-1 bg-700">
						<span class="m-3 mr-1 text-red">
							{{ index }}
						</span>
						<Input
							class="w-44 m-2 bg-500 text-green h-7 rounded text-center focus:outline-none"
							v-model="fsDefaultSilverValuesStorage[index]"
							:valueName="'fsSilverV'"
						/>
					</div>
				</div>
			</div>
		</div>
	</Modal>
</template>

<script>
import Modal from "../GeneralComponents/Modal.vue";
import Input from "../GeneralComponents/Input.vue";

export default {
	name: "FSSilverValues",

	components: { Modal, Input },

	data() {
		return {
			fsDefaultSilverValuesStorage: [
				0, 84190, 205441, 384759, 615574, 860454, 1122717, 1406151, 1715121, 2054708, 2430867, 2850631,
				3322353, 3856016, 4463610, 5052569, 5668927, 6386720, 7094829, 7850169, 8746906, 9648413, 10627559,
				11808105, 13017938, 14353806, 15983944, 17686215, 19594003, 21944102, 24127458, 25987236, 28123699,
				30836157, 33374092, 35536934, 38077389, 41383957, 44509170, 47190717, 50397495, 54647648, 58715098,
				62248785, 66529896, 72268975, 77838712, 82758021, 88768586, 96630338, 104260114, 110998894, 119232544,
				130002068, 140453816, 149685021, 160963994, 17571676, 190034229, 202679716, 218130364, 233332201,
				251089582, 268431967, 283870130, 302781006, 321505470, 343441044, 365005410, 384379045, 408119140,
				431776153, 459530884, 486998658, 511923532, 542427393, 573017779, 608921504, 644690509, 677485860,
				717527854, 757932802, 805341388, 852880321, 896922820, 950538211, 1004965218, 1068780319, 1133177196,
				1193451411, 1266591116, 1341269795, 1428750423, 1517572077, 1601537555, 1703099479, 1802011637,
				1917880018, 2035524593, 2146737147, 2278550881, 2402530344, 2523801332, 2665703691, 2810233617,
				2947592675, 3110117310, 3263827672, 3414836899, 3591233722, 3771438456, 3943630798, 4146915336,
				4340249093, 4531005530, 4753362534, 4981176833, 5200037010, 5457757378, 5704223767, 5948432269,
				6232435468, 6524218329, 6806021234, 7136964733, 7455185171, 7771786696, 8139096996, 8517481602,
				8884817111, 9315034473,
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
		
		fsSilver: {
			get() {
				return this.$store.state.enhance.fsSilver;
			},
			set(value) {
				this.$store.commit("SET_FS_SILVER", value);
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

		fsDefaultSilver() {
			this.fsSilver = this.fsDefaultSilverValuesStorage;
			return this.fsDefaultSilverValuesStorage;
		},
	},
};
</script>
