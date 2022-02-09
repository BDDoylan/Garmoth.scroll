<template>
	<Modal id="itemSelector">
		<div class="mt-1 relative w-96 ml-4">
			<div class="w-full bg-600 shadow-sm pl-3 pr-10 py-2 text-left focus:outline-none rounded">
				<div class="flex items-center">
					<input
						@click="toggle = true"
						placeholder="Search For More!"
						v-model="searchItem"
						spellcheck="false"
						class="w-full p-2 bg-600 h-7 text-left focus:outline-none text-white"
					/>
				</div>
				<div
					@click="toggle = !toggle"
					class="h-10 mr-5 mt-1 absolute inset-y-0 right-0 text-green font-semibold cursor-pointer"
				>
					<span v-if="toggle" class="relative top-0.5 text-xl">v</span>
					<span v-else class="text-red relative top-0.5 text-xl">></span>
				</div>
			</div>
			<div
				v-if="toggle"
				class="z-10 mt-1 w-full bg-600 shadow-lg max-h-56 rounded-md py-1 text-base overflow-auto focus:outline-none"
			>
				<ul v-for="item in filteredOptions" :key="item.main_key">
					<li
						@click="(selectedItem = item), (toggle = false)"
						:class="['relative py-2 pl-3 pr-9 hover:bg-500 cursor-pointer']"
					>
						<div class="flex items-center">
							<img
								:src="'https://assets.garmoth.com/items/' + item.main_key + '.png'"
								alt=""
								class="flex-shrink-0 h-8 w-8 rounded-full"
							/>
							<span
								:class="[
									'ml-3 block text-base truncate',
									{
										'text-red': item.rarity === 5,
										'text-yellow': item.rarity === 4,
										'text-blue': item.rarity === 3,
										'text-green': item.rarity === 2,
										'text-300': item.rarity === 1,
									},
								]"
							>
								{{ item.name }}
							</span>
						</div>
					</li>
				</ul>
			</div>
			<div v-if="selectedItem">
				<div class="mt-1 w-full bg-600 shadow-lg text-center text-white py-2 font-bold text-xl">
					<p>Choose Your Tier</p>
				</div>
				<div
					:class="[
						'z-10 mt-1 w-full bg-600 shadow-lg max-h-60 rounded py-1 text-base overflow-auto focus:outline-none grid grid-cols-5',
						{
							'grid-cols-3': getTierOptions.length === 3,
						},
					]"
				>
					<div v-for="(tier, key) in getTierOptions" :key="key">
						<p
							@click="prepareSelectedItem(tier, key), passCurrentSelectedItem()"
							class="text-white font-bold bg-400 rounded w-14 m-auto text-center my-2 p-2 hover:bg-700 cursor-pointer"
						>
							{{ tier }}
						</p>
					</div>
				</div>
			</div>
		</div>
	</Modal>
</template>

<script>
import Modal from "./Modal.vue";

export default {
	name: "Select",

	components: { Modal },

	emits: ["chosenItem"],

	data() {
		return {
			toggle: true,

			searchItem: "",

			selectedItem: null,

			finalItem: null,

			selectedTier: {
				currIndex: null,
				currLvlName: null,

				prevLvlName: null,
				nextLvlName: null,
			},

			popularItems: [
				{
					main_key: 719898,
					name: "Fallen God's Armor",
					rarity: 5,
					type: 2,
					cron: 9,
					chance: 10,
					material: 10,
				},
				{
					main_key: 731102,
					name: "Blackstar Scythe",
					rarity: 5,
					type: 6,
					cron: 52,
					chance: 19,
					material: 47,
				},
				{
					main_key: 11017,
					name: "Dim Tree Spirit's Armor",
					rarity: 4,
					type: 2,
					cron: 43,
					chance: 6,
					material: 6,
				},
				{
					main_key: 11653,
					name: "Deboreka Necklace",
					rarity: 4,
					type: 9,
					cron: 37,
					chance: 12,
					material: 1,
				},
				{
					main_key: 16486,
					name: "Manos Tanning Knife",
					rarity: 5,
					type: 14,
					cron: 50,
					chance: 19,
					material: 45,
				},
			],
		};
	},

	computed: {
		storage: {
			get() {
				return this.$store.state.enchance.storage;
			},
			set(value) {
				this.$store.commit("SET_ENCHANCE_STORAGE", value);
			},
		},

		filteredOptions() {
			if (this.searchItem.length > 2) {
				return this.storage.items.filter((item) => {
					return item.name.toLowerCase().includes(this.searchItem.toLowerCase());
				});
			} else {
				return this.popularItems;
			}
		},

		getTierOptions() {
			if (this.storage.chance[this.selectedItem.chance].enhancements.length === 3) {
				return ["BASE", "+1", "+2"];
			} else if (this.storage.chance[this.selectedItem.chance].enhancements.length === 5) {
				return ["BASE", "I", "II", "III", "IV"];
			} else if (this.storage.chance[this.selectedItem.chance].enhancements.length === 20) {
				return [
					"BASE",
					"+1",
					"+2",
					"+3",
					"+4",
					"+5",
					"+6",
					"+7",
					"+8",
					"+9",
					"+10",
					"+11",
					"+12",
					"+13",
					"+14",
					"+15",
					"I",
					"II",
					"III",
					"IV",
				];
			}
		},
	},

	methods: {
		passCurrentSelectedItem() {
			this.$emit("chosenItem", this.finalItem);
		},

		prepareSelectedItem(tier, key) {
			this.selectedTier.currLvlName = tier;
			this.selectedTier.prevLvlName = this.getTierOptions[key - 1];
			this.selectedTier.nextLvlName = this.getTierOptions[key + 1];
			this.selectedTier.currIndex = key;

			this.finalItem = {
				information: this.selectedItem,

				allTiers: null,

				currTier: this.getTier("curr"),
				prevTier: this.getTier("prev"),
				nextTier: this.getTier("next"),
			};
		},

		getTier(state) {
			let tier;

			if (state === "curr") {
				tier = {
					lvlName: this.selectedTier.currLvlName === undefined ? null : this.selectedTier.currLvlName,
					baseChance: this.storage.chance[this.selectedItem.chance].enhancements[this.selectedTier.currIndex],
					//softCap: this.storage.chance[this.selectedItem.chance].softcaps[this.selectedTier.index],
					crons:
						this.storage.cron[this.selectedItem.cron].enhancements["_" + this.selectedTier.currIndex] ===
						undefined
							? null
							: this.storage.cron[this.selectedItem.cron].enhancements["_" + this.selectedTier.currIndex]
									.value,
				};
			} else if (state === "prev") {
				tier = {
					lvlName: this.selectedTier.prevLvlName === undefined ? null : this.selectedTier.prevLvlName,
					baseChance:
						this.storage.chance[this.selectedItem.chance].enhancements[this.selectedTier.currIndex - 1] ===
						undefined
							? null
							: this.storage.chance[this.selectedItem.chance].enhancements[this.selectedTier.currIndex - 1],
					//softCap: !(this.selectedTier.currIndex - 1)
					//	? this.storage.chance[this.selectedItem.chance].softcaps[this.selectedTier.index - 1] : null,
					crons:
						this.storage.cron[this.selectedItem.cron].enhancements[
							"_" + (this.selectedTier.currIndex - 1)
						] === undefined
							? null
							: this.storage.cron[this.selectedItem.cron].enhancements[
									"_" + (this.selectedTier.currIndex - 1)
							  ].value,
				};
			} else if (state === "next") {
				tier = {
					lvlName: this.selectedTier.nextLvlName === undefined ? null : this.selectedTier.nextLvlName,
					baseChance:
						this.storage.chance[this.selectedItem.chance].enhancements[this.selectedTier.currIndex + 1] ===
						undefined
							? null
							: this.storage.chance[this.selectedItem.chance].enhancements[this.selectedTier.currIndex + 1],
					//softCap: !(this.selectedTier.currIndex + 1)
					//	? this.storage.chance[this.selectedItem.chance].softcaps[this.selectedTier.index + 1] : null,
					crons:
						this.storage.cron[this.selectedItem.cron].enhancements[
							"_" + (this.selectedTier.currIndex + 1)
						] === undefined
							? null
							: this.storage.cron[this.selectedItem.cron].enhancements[
									"_" + (this.selectedTier.currIndex + 1)
							  ].value,
				};
			}

			return tier;
		},
	},
};
</script>
