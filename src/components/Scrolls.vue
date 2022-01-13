<template>
	<div>
		<h1 class="container text-center text-0 p-8 text-5xl font-bold">
			{{ title }}
		</h1>

		<div class="flex justify-center items-center">
			<button
				v-if="keep === false"
				@click="
					keep = !keep;
					if (sell) {
						sell = !sell;
					}
				"
				class="bg-600 text-center text-0 text-2xl inline w-20 mb-10 mr-2 p-1 rounded"
			>
				KEEP
				<span class="text-xs">memes</span>
			</button>
			<button
				v-if="keep === true"
				@click="keep = !keep"
				class="bg-600 text-center text-green text-2xl inline w-20 mb-10 mr-2 p-1 rounded"
			>
				KEEP
				<span class="text-xs">memes</span>
			</button>
			<button
				v-if="sell === false"
				@click="
					sell = !sell;
					if (keep) {
						keep = !keep;
					}
				"
				class="bg-600 text-center text-0 text-2xl inline w-20 mb-10 ml-2 p-1 rounded"
			>
				SELL
				<span class="text-xs">memes</span>
			</button>
			<button
				v-if="sell === true"
				@click="sell = !sell"
				class="bg-600 text-center text-red text-2xl inline w-20 mb-10 ml-2 p-1 rounded"
			>
				SELL
				<span class="text-xs">memes</span>
			</button>
		</div>

		<div class="grid grid-cols-1 gap-4 mx-10 sm:grid-cols-3">
			<template v-for="scroll in memoryScrolls" :key="scroll.main_key">
				<Memory
					:scroll="scroll"
					:prices="prices"
					:memoryPrice="memoryPrice"
					:keep="keep"
					:tax="tax"
				></Memory>
			</template>
		</div>
	</div>
</template>

<script>
import axios from "axios";
import Memory from "./Memory.vue";

export default {
	name: "Scrolls",
	components: { Memory },
	props: {
		title: String,
	},

	data() {
		return {
			keep: false,
			sell: true,

			memoryScrolls: [
				{
					name: "Ancient Relic Crystal",
					main_key: 40218,
					secondsPerScroll: null,
					memoryFragment: 5,
					costPerPiece: 1760000,
				},
				{
					name: "Cartian Spell",
					main_key: 40220,
					secondsPerScroll: null,
					memoryFragment: 6,
					costPerPiece: 1690000,
				},
				{
					name: "Pila Fe Scroll",
					main_key: 40228,
					secondsPerScroll: null,
					memoryFragment: 7,
					costPerPiece: 2450000,
				},
			],
			memoryPrice: null,

			tax: 0.845,

			prices: null,
		};
	},

	created() {
		axios.get("market.json").then((res) => {
			this.prices = res.data.items;

			this.memoryPrice = this.prices[44195].sub_items[0].price;

			console.log(this.prices[40218])
		});
	},

	methods: {},
};
</script>

<style>
@font-face {
	font-family: "Poppins";
	font-style: normal;
	font-weight: 400;
	src: url("../fonts/poppins-v15-latin-regular.eot"); /* IE9 Compat Modes */
	src: local(""),
		url("../fonts/poppins-v15-latin-regular.eot?#iefix")
			format("embedded-opentype"),
		/* IE6-IE8 */ url("../fonts/poppins-v15-latin-regular.woff2")
			format("woff2"),
		/* Super Modern Browsers */ url("../fonts/poppins-v15-latin-regular.woff")
			format("woff"),
		/* Modern Browsers */ url("../fonts/poppins-v15-latin-regular.ttf")
			format("truetype"),
		/* Safari, Android, iOS */
			url("../fonts/poppins-v15-latin-regular.svg#Poppins") format("svg"); /* Legacy iOS */
}

/* Chrome, Safari, Edge, Opera */
input::-webkit-outer-spin-button,
input::-webkit-inner-spin-button {
	-webkit-appearance: none;
	margin: 0;
}

/* Firefox */
input[type="number"] {
	-moz-appearance: textfield;
}

::-webkit-scrollbar {
	width: 14px;
	height: 18px;
	background-color: #202226;
}

::-webkit-scrollbar-button {
	width: 0;
	height: 0;
	display: none;
}

::-webkit-scrollbar-corner {
	background-color: transparent;
}

::-webkit-scrollbar-thumb {
	height: 6px;
	border: 4px solid transparent;
	border-radius: 0.25rem;
	background-color: #5e6165;
	background-clip: padding-box;
}
</style>
