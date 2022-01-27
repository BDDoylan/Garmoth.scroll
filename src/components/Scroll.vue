<template>
	<div class="text-center">
		<div class="bg-600 text-0 rounded h-auto text-xl relative p-2 pb-4">
			<div class="flex justify-center items-center my-1">
				<img
					:src="
						'https://assets.garmoth.com/items/' + scroll.fullIconKey + '.png'
					"
					:class="[
						'inline object-scale-down h-9 relative mr-2 mt-2',
						{ 'mt-2': !toggle },
					]"
				/>
				<h2
					:class="['font-bold text-2xl mt-2 truncate', { 'text-4xl': !toggle }]"
				>
					{{ scroll.name }}
				</h2>
			</div>
			<div class="relative w-60 m-auto">
				<h3
					v-if="toggle && displayAvg"
					class="text-xs text-green bg-800 p-2 bottom-10 right-20 absolute opacity-80"
				>
					Avg: {{ scroll.avgSecPerScroll }} sec.
				</h3>
				<Input
					class="mt-2 mb-2"
					v-if="toggle"
					@mouseover="displayAvg = true"
					@mouseleave="displayAvg = false"
					placeholder="Seconds Per Scroll"
					v-model="storage.seconds[scroll.main_key]"
					:valueName="'seconds'"
				/>
			</div>

			<div></div>
			<div
				class="hover:bg-700 rounded inline-block py-2 px-4 cursor-point"
				@click="dropsToggle = !dropsToggle"
			>
				<div class="inline-block">
					<p class="m-0.5" v-for="(item, key) in dropsRender" :key="key">
						Average
						<img
							:src="'https://assets.garmoth.com/items/' + item.key + '.png'"
							class="inline object-scale-down h-6"
						/>
						per scroll:
						<Input
							v-if="storage.items[scroll.main_key][item.key]"
							@click.stop.prevent
							class="w-20 text-center text-red placeholder-red"
							v-model="storage.items[scroll.main_key][item.key]"
							:valueName="'itemRates'"
						/>
						<Input
							v-else
							@click.stop.prevent
							class="w-20 text-center text-red placeholder-red text-opacity-70"
							v-model="item.dropRate"
							:valueName="'itemRates'"
						/>
					</p>
				</div>
				<i
					v-if="!dropsToggle"
					class="fas fa-level-down-alt text-green ml-2"
				></i>
				<i v-if="dropsToggle" class="fas fa-level-up-alt text-red ml-2"></i>
			</div>
			<div class="flex items-center justify-center absolute w-10 top-2 right-0">
				<button
					@click="toggle = !toggle"
					:class="[
						'text-5xl rounded leading-3 animate-bounce',
						toggle ? 'text-red' : 'text-green',
					]"
				>
					{{ toggle ? "-" : "+" }}
				</button>
			</div>
		</div>
		<div
			v-show="toggle"
			class="sm:col-start-1 sm:col-end-2 xxs:row-start-2 mt-2"
		>
			<div class="bg-600 text-0 rounded h-13 text-xl relative mb-2">
				<p class="py-3">
					Number of
					<img
						:src="
							'https://assets.garmoth.com/items/' + scroll.main_key + '.png'
						"
						class="inline object-scale-down h-6"
					/>
					for 1 hour: <span class="text-green">{{ numPartsPerHour }}</span>
				</p>
			</div>
			<div class="bg-600 text-0 rounded h-auto text-xl relative p-2">
				<table class="w-full table-fixed">
					<tr v-for="(drop, index) in scroll.drops" :key="index">
						<td class="pr-2 w-10 column-sticky">
							<img
								:src="'https://assets.garmoth.com/items/' + drop.key + '.png'"
							/>
						</td>
						<td class="text-left px-2 truncate">{{ drop.name }}</td>
						<td class="w-28">
							<Input
								class="w-28"
								v-model="drop.price"
								:valueName="'dropPrice'"
							/>
						</td>
					</tr>
				</table>
			</div>
			<div class="bg-600 text-0 rounded h-56 text-xl relative">
				<h1 class="text-green text-2xl mt-2 p-4 font-bold">PROFITS</h1>
				<div>
					<div class="bg-700 text-0 rounded w-auto mx-12 p-4">
						<h1>{{ profitPerScroll.toLocaleString() }} per scroll</h1>
					</div>
					<div class="bg-700 text-0 rounded w-auto mx-12 mt-4 p-4">
						<p>
							{{ (profitPerScroll * (numPartsPerHour / 5)).toLocaleString() }}
							per hour
						</p>
					</div>
				</div>
			</div>
		</div>
	</div>
</template>

<script>
import Input from "./Input.vue";

export default {
	name: "Scroll",

	components: { Input },

	props: {
		scroll: { required: true },
		prices: { required: true },
		keep: { required: true },
		tax: { required: true },
	},

	data() {
		return {
			toggle: false,

			displayAvg: false,

			dropsToggle: false,

			fullIcon: this.scroll.fullIcon,

			costPerPiece: 0,

			memoryPrice: this.prices[44195].sub_items[0].price,
		};
	},

	created() {
		this.setDropPrices();
		this.setScrollPiecePrice();

		if (localStorage.getItem("SCROLL_DATA")) {
			this.storage = JSON.parse(localStorage.getItem("SCROLL_DATA"));
		}

		if (!this.storage.items[this.scroll.main_key]) {
			this.storage.items[this.scroll.main_key] = {};
		}
	},

	computed: {
		storage: {
			get() {
				return this.$store.state.scroll.storage;
			},
			set(value) {
				this.$store.commit("SET_STORAGE", value);
			},
		},

		numPartsPerHour() {
			localStorage.setItem("SCROLL_DATA", JSON.stringify(this.storage));

			return Math.round(
				(3600 / this.storage.seconds[this.scroll.main_key]) * 5
			);
		},

		profitPerScroll() {
			if (this.keep) {
				return this.totalDropValue - this.costPerPiece * 5;
			} else {
				return this.totalDropValue * this.tax - this.costPerPiece * 5;
			}
		},

		dropsRender() {
			if (this.dropsToggle) {
				return this.scroll.drops;
			}
			return [this.scroll.drops[0]];
		},

		totalDropValue() {
			let totalDropValue = 0;
			this.scroll.drops.forEach((item) => {
				if (item.key === 44186) {
					totalDropValue += (item.dropRate * item.price) / 2;
				} else if (item.key === 44328) {
					totalDropValue += (item.dropRate * item.price) / 10;
				} else if (item.key === 44306) {
					totalDropValue += item.dropRate * item.price;
				} else {
					totalDropValue += item.dropRate * item.price;
				}
			});
			return totalDropValue;
		},
	},

	methods: {
		setDropPrices() {
			this.scroll.drops.forEach((item) => {
				if (item.key === 44186) {
					item.price = this.prices[16002].sub_items[0].price;
				} else if (item.key === 44328) {
					item.price = this.prices[50808].sub_items[0].price;
				} else if (item.key === 44306) {
					item.price = 50000;
				} else if (item.key === 721002) {
					item.price =
						this.prices[721003].sub_items[0].price / 5 -
						this.prices[16002].sub_items[0].price;
				} else if (item.key === 721044) {
					item.price = 30000000;
				} else if (item.key === 44475) {
					item.price = 16900000;
				} else if (item.key === 44454) {
					item.price = 18000;
				} else if (item.key === 44451) {
					item.price = 15000;
				} else if (item.key === 44456) {
					item.price = 107000;
				} else if (item.key === 1) {
					item.price = 1;
				} else {
					item.price = this.prices[item.key].sub_items[0].price;
				}
			});
		},

		setScrollPiecePrice() {
			if (
				this.scroll.name === "Ibedor's Scroll" ||
				this.scroll.name === "Coming Soon..."
			) {
				this.costPerPiece = 0;
			} else {
				this.costPerPiece =
					this.prices[this.scroll.main_key].sub_items[0].price;
			}
		},
	},
};
</script>
