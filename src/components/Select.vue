<template>
	<Modal id="itemSelector">
		<div class="mt-1 relative w-90">
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
						:class="[
							'relative py-2 pl-3 pr-9 hover:bg-500 cursor-pointer',
							{ 'bg-500': selectedItem === null ? false : selectedItem.name === item.name },
						]"
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
			<div v-if="selectedItem != null">
				<div class="mt-1 w-full bg-600 shadow-lg text-center text-white py-2 font-bold text-xl">
					<p
						:class="[
							{
								'text-red': selectedItem.rarity === 5,
								'text-yellow': selectedItem.rarity === 4,
								'text-blue': selectedItem.rarity === 3,
								'text-green': selectedItem.rarity === 2,
								'text-300': selectedItem.rarity === 1,
							},
						]"
					>
						{{ selectedItem.name }}
					</p>
				</div>
				<div class="mt-1 w-full bg-600 shadow-lg text-center text-white py-2 font-bold text-lg">
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
							@click="setCurrentSelectedItem(key), close('itemSelector')"
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
import Enhancing from "../mixins/Enhancing";
import axios from "axios";
import Modal from "./Modal.vue";

export default {
	name: "Select",

	components: { Modal },

	mixins: [Enhancing],

	data() {
		return {
			toggle: true,

			searchItem: "",

			selectedItem: null,

			popularItems: [
				{
					main_key: 719898,
					name: "Fallen God's Armor",
					rarity: 5,
					type: 2,
					cron: 9,
					chance: 17,
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
				{
					main_key: 705512,
					name: "Manos Belt",
					rarity: 5,
					type: 10,
					cron: 0,
					chance: 4,
					material: 4,
				},
			],

			tierChartDataTwenty: [
				{
					tier: "+1",
					success: 0,
					fail: 0,
				},
				{
					tier: "+2",
					success: 0,
					fail: 0,
				},
				{
					tier: "+3",
					success: 0,
					fail: 0,
				},
				{
					tier: "+4",
					success: 0,
					fail: 0,
				},
				{
					tier: "+5",
					success: 0,
					fail: 0,
				},
				{
					tier: "+6",
					success: 0,
					fail: 0,
				},
				{
					tier: "+7",
					success: 0,
					fail: 0,
				},
				{
					tier: "+8",
					success: 0,
					fail: 0,
				},
				{
					tier: "+9",
					success: 0,
					fail: 0,
				},
				{
					tier: "+10",
					success: 0,
					fail: 0,
				},
				{
					tier: "+11",
					success: 0,
					fail: 0,
				},
				{
					tier: "+12",
					success: 0,
					fail: 0,
				},
				{
					tier: "+13",
					success: 0,
					fail: 0,
				},
				{
					tier: "+14",
					success: 0,
					fail: 0,
				},
				{
					tier: "+15",
					success: 0,
					fail: 0,
				},
				{
					tier: "I",
					success: 0,
					fail: 0,
				},
				{
					tier: "II",
					success: 0,
					fail: 0,
				},
				{
					tier: "III",
					success: 0,
					fail: 0,
				},
				{
					tier: "IV",
					success: 0,
					fail: 0,
				},
				{
					tier: "V",
					success: 0,
					fail: 0,
				},
			],

			tierChartDataFive: [
				{
					tier: "I",
					success: 0,
					fail: 0,
				},
				{
					tier: "II",
					success: 0,
					fail: 0,
				},
				{
					tier: "III",
					success: 0,
					fail: 0,
				},
				{
					tier: "IV",
					success: 0,
					fail: 0,
				},
				{
					tier: "V",
					success: 0,
					fail: 0,
				},
			],

			tierChartDataThree: [
				{
					tier: "+1",
					success: 0,
					fail: 0,
				},
				{
					tier: "+2",
					success: 0,
					fail: 0,
				},
				{
					tier: "+3",
					success: 0,
					fail: 0,
				},
			],

			silverChartDataTwenty: [
				{
					tier: "+1",
					silverForDurability: 0,
					silverForMaterial: 0,
					silverForCrons: 0,
					silverForFS: 0,
				},
				{
					tier: "+2",
					silverForDurability: 0,
					silverForMaterial: 0,
					silverForCrons: 0,
					silverForFS: 0,
				},
				{
					tier: "+3",
					silverForDurability: 0,
					silverForMaterial: 0,
					silverForCrons: 0,
					silverForFS: 0,
				},
				{
					tier: "+4",
					silverForDurability: 0,
					silverForMaterial: 0,
					silverForCrons: 0,
					silverForFS: 0,
				},
				{
					tier: "+5",
					silverForDurability: 0,
					silverForMaterial: 0,
					silverForCrons: 0,
					silverForFS: 0,
				},
				{
					tier: "+6",
					silverForDurability: 0,
					silverForMaterial: 0,
					silverForCrons: 0,
					silverForFS: 0,
				},
				{
					tier: "+7",
					silverForDurability: 0,
					silverForMaterial: 0,
					silverForCrons: 0,
					silverForFS: 0,
				},
				{
					tier: "+8",
					silverForDurability: 0,
					silverForMaterial: 0,
					silverForCrons: 0,
					silverForFS: 0,
				},
				{
					tier: "+9",
					silverForDurability: 0,
					silverForMaterial: 0,
					silverForCrons: 0,
					silverForFS: 0,
				},
				{
					tier: "+10",
					silverForDurability: 0,
					silverForMaterial: 0,
					silverForCrons: 0,
					silverForFS: 0,
				},
				{
					tier: "+11",
					silverForDurability: 0,
					silverForMaterial: 0,
					silverForCrons: 0,
					silverForFS: 0,
				},
				{
					tier: "+12",
					silverForDurability: 0,
					silverForMaterial: 0,
					silverForCrons: 0,
					silverForFS: 0,
				},
				{
					tier: "+13",
					silverForDurability: 0,
					silverForMaterial: 0,
					silverForCrons: 0,
					silverForFS: 0,
				},
				{
					tier: "+14",
					silverForDurability: 0,
					silverForMaterial: 0,
					silverForCrons: 0,
					silverForFS: 0,
				},
				{
					tier: "+15",
					silverForDurability: 0,
					silverForMaterial: 0,
					silverForCrons: 0,
					silverForFS: 0,
				},
				{
					tier: "I",
					silverForDurability: 0,
					silverForMaterial: 0,
					silverForCrons: 0,
					silverForFS: 0,
				},
				{
					tier: "II",
					silverForDurability: 0,
					silverForMaterial: 0,
					silverForCrons: 0,
					silverForFS: 0,
				},
				{
					tier: "III",
					silverForDurability: 0,
					silverForMaterial: 0,
					silverForCrons: 0,
					silverForFS: 0,
				},
				{
					tier: "IV",
					silverForDurability: 0,
					silverForMaterial: 0,
					silverForCrons: 0,
					silverForFS: 0,
				},
				{
					tier: "V",
					silverForDurability: 0,
					silverForMaterial: 0,
					silverForCrons: 0,
					silverForFS: 0,
				},
			],

			silverChartDataFive: [
				{
					tier: "I",
					silverForDurability: 0,
					silverForMaterial: 0,
					silverForCrons: 0,
					silverForFS: 0,
				},
				{
					tier: "II",
					silverForDurability: 0,
					silverForMaterial: 0,
					silverForCrons: 0,
					silverForFS: 0,
				},
				{
					tier: "III",
					silverForDurability: 0,
					silverForMaterial: 0,
					silverForCrons: 0,
					silverForFS: 0,
				},
				{
					tier: "IV",
					silverForDurability: 0,
					silverForMaterial: 0,
					silverForCrons: 0,
					silverForFS: 0,
				},
				{
					tier: "V",
					silverForDurability: 0,
					silverForMaterial: 0,
					silverForCrons: 0,
					silverForFS: 0,
				},
			],

			silverChartDataThree: [
				{
					tier: "+1",
					silverForDurability: 0,
					silverForMaterial: 0,
					silverForCrons: 0,
					silverForFS: 0,
				},
				{
					tier: "+2",
					silverForDurability: 0,
					silverForMaterial: 0,
					silverForCrons: 0,
					silverForFS: 0,
				},
				{
					tier: "+3",
					silverForDurability: 0,
					silverForMaterial: 0,
					silverForCrons: 0,
					silverForFS: 0,
				},
			],
		};
	},

	created() {
		axios.get("https://garmoth.com/api/getEnhancements").then((res) => {
			this.items = res.data.items;
			this.chance = res.data.chance;
			this.cron = res.data.cron;
			this.material = res.data.material;
		});

		axios.get("market.json").then((res) => {
			this.prices = res.data.items;
		});
	},

	computed: {
		items: {
			get() {
				return this.$store.state.enhance.items;
			},
			set(value) {
				this.$store.commit("SET_ITEMS_STORAGE", value);
			},
		},

		chance: {
			get() {
				return this.$store.state.enhance.chance;
			},
			set(value) {
				this.$store.commit("SET_CHANCE_STORAGE", value);
			},
		},

		cron: {
			get() {
				return this.$store.state.enhance.cron;
			},
			set(value) {
				this.$store.commit("SET_CRON_STORAGE", value);
			},
		},

		material: {
			get() {
				return this.$store.state.enhance.material;
			},
			set(value) {
				this.$store.commit("SET_MATERIAL_STORAGE", value);
			},
		},

		prices: {
			get() {
				return this.$store.state.enhance.prices;
			},
			set(value) {
				this.$store.commit("SET_PRICES_STORAGE", value);
			},
		},

		filteredOptions() {
			if (this.searchItem.length > 2) {
				return this.items.filter((item) => {
					return item.name.toLowerCase().includes(this.searchItem.toLowerCase());
				});
			} else {
				return this.popularItems;
			}
		},

		getTierOptions() {
			if (this.selectedItem != null) {
				if (this.chance[this.selectedItem.chance].enhancements.length === 3) {
					return ["BASE", "+1", "+2"];
				} else if (this.chance[this.selectedItem.chance].enhancements.length === 5) {
					return ["BASE", "I", "II", "III", "IV"];
				} else if (this.chance[this.selectedItem.chance].enhancements.length === 20) {
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
			} else {
				return [];
			}
		},

		idsNotInMarket() {
			return [
				{
					id: null,
					cost:
						this.prices[this.selectedItem.main_key] === undefined
							? 0
							: this.prices[this.selectedItem.main_key].sub_items[0].price,
				},
				{
					id: 752022,
					cost:
						50000 +
						this.prices[16004].sub_items[0].price +
						this.prices[16005].sub_items[0].price +
						this.prices[721003].sub_items[0].price * 10,
				},
				{
					id: 752021,
					cost: 50000 + this.prices[16004].sub_items[0].price + this.prices[16005].sub_items[0].price,
				},
				{
					id: 756306,
					cost: 0,
				},
				{
					id: 756305,
					cost: 0,
				},
			];
		},
	},

	methods: {
		selectChartData() {
			let len =
				this.currentItemSelected.allTiers === null ? null : this.currentItemSelected.allTiers.length - 1;

			if (len === 20) {
				this.tierChart = this.tierChartDataTwenty;
				this.silverChart = this.silverChartDataTwenty;
			} else if (len === 5) {
				this.tierChart = this.tierChartDataFive;
				this.silverChart = this.silverChartDataFive;
			} else if (len === 3) {
				this.tierChart = this.tierChartDataThree;
				this.silverChart = this.silverChartDataThree;
			}
		},

		getAllTiers() {
			let tiers = [];

			for (let index in this.chance[this.selectedItem.chance].enhancements) {
				let tier = {
					lvlName: this.getTierOptions[index],
					baseChance:
						this.chance[this.selectedItem.chance].enhancements[index] === undefined
							? null
							: this.chance[this.selectedItem.chance].enhancements[index],
					softCap:
						this.chance[this.selectedItem.chance].softcap === null
							? null
							: this.chance[this.selectedItem.chance].softcap[index],
					crons:
						this.cron[this.selectedItem.cron] === undefined
							? null
							: this.cron[this.selectedItem.cron].enhancements["_" + index] === undefined
							? null
							: this.cron[this.selectedItem.cron].enhancements["_" + index].value,
					failstackGain: this.chance[this.selectedItem.chance].gain[index],
					material: {
						id:
							this.material[this.selectedItem.material].enhancements[index].item === null
								? this.selectedItem.main_key
								: this.material[this.selectedItem.material].enhancements[index].item,
						materialCost: this.materialCosts(index),
					},
					durabilityLoss: this.material[this.selectedItem.material].enhancements[index].dura_loss,
					tierNum: parseInt(index),
				};
				tiers.push(tier);
			}
			tiers.push({
				lvlName: "END",
				baseChance: 0,
				softCap: 0,
				crons: 0,
				failstackGain: 0,
				material: {
					id: 0,
					materialCost: 0,
				},
				durabilityLoss: 0,
				tierNum: null,
			});

			return tiers;
		},

		materialCosts(index) {
			let cost = 0;

			if (
				this.idsNotInMarket.some(
					(e) => e.id === this.material[this.selectedItem.material].enhancements[index].item
				)
			) {
				this.idsNotInMarket.some((e) => {
					if (e.id === this.material[this.selectedItem.material].enhancements[index].item) {
						cost = e.cost;
					}
				});
			} else {
				cost =
					this.prices[this.material[this.selectedItem.material].enhancements[index].item].sub_items[0].price *
					this.material[this.selectedItem.material].enhancements[index].item_amount;
			}

			return cost;
		},

		setCurrentSelectedItem(key) {
			let allTiers = this.getAllTiers();

			this.currentItemSelected = {
				information: this.selectedItem,

				allTiers: allTiers,

				currTier: allTiers[key],
				prevTier: allTiers[key - 1] === undefined ? null : allTiers[key - 1],
				nextTier: allTiers[key + 1] === undefined ? null : allTiers[key + 1],
			};

			this.selectChartData();
			this.clearSimulation();
		},
	},
};
</script>
