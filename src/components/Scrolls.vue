<template>
	<div>
		<h1 class="container text-center text-0 p-8 text-5xl font-bold">
			{{ title }}
		</h1>

		<div class="flex gap-4 justify-center items-center">
			<button
				@click="keep = true"
				class="bg-600 text-center text-0 text-2xl inline w-20 mb-10 p-1 rounded"
				:class="keep && 'text-green'"
			>
				KEEP
			</button>
			<button
				@click="keep = false"
				class="bg-600 text-center text-0 text-2xl inline w-20 mb-10 p-1 rounded"
				:class="!keep && 'text-red'"
			>
				SELL
			</button>
		</div>

		<div class="grid grid-cols-1 gap-4 mx-10 sm:grid-cols-3">
			<template v-for="scroll in memoryScrolls" :key="scroll.main_key">
				<Memory
					v-if="prices"
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

			memoryScrolls: [
				{
					name: "Ancient Relic",
					fullIconKey: 41583,
					main_key: 40218,
					secondsPerScroll: null,
					drops: [
						{
							name: "Memory Fragment",
							key: 44195,
							dropRate: 5,
						},
						{
							name: "Hunter's Seal",
							key: 44186,
							dropRate: 6.25,
						},
					],
				},
				{
					name: "Cartian Spell",
					fullIconKey: 41587,
					main_key: 40220,
					secondsPerScroll: null,
					drops: [
						{
							name: "Memory Fragment",
							key: 44195,
							dropRate: 6,
						},
						{
							name: "Hunter's Seal",
							key: 44186,
							dropRate: 6,
						},
					],
				},
				{
					name: "Pila Fe Scroll",
					fullIconKey: 41595,
					main_key: 40228,
					secondsPerScroll: null,
					drops: [
						{
							name: "Memory Fragment",
							key: 44195,
							dropRate: 7,
						},
						{
							name: "Hunter's Seal",
							key: 44186,
							dropRate: 3,
						},
					],
				},
			],

			tax: 0.845,

			prices: null,
		};
	},

	created() {
		axios.get("market.json").then((res) => {
			this.prices = res.data.items;
		});
	},
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
