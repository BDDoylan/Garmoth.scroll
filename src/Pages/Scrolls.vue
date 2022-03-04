<template>
	<div>
		<h1 class="container text-center text-0 p-8 text-5xl font-bold">
			{{ title }}
		</h1>

		<div class="flex gap-2 justify-center items-center">
			<button
				@click="keep = true"
				class="bg-600 text-center text-0 text-2xl inline w-20 mb-10 p-1 rounded"
				:class="keep && 'text-green'"
			>
				KEEP
			</button>
			<button
				@click="restoreDefaultValues()"
				class="bg-600 text-center text-0 text-2xl inline w-52 mb-10 p-1 rounded"
			>
				Restore Defaults
			</button>
			<button
				@click="keep = false"
				class="bg-600 text-center text-0 text-2xl inline w-20 mb-10 p-1 rounded"
				:class="!keep && 'text-red'"
			>
				SELL
			</button>
		</div>

		<div class="grid grid-cols-1 gap-4 mx-4 sm:grid-cols-3 pb-3">
			<template v-for="scroll in allScrolls" :key="scroll.main_key">
				<Scroll v-if="prices" :scroll="scroll" :prices="prices" :keep="keep" :tax="tax"></Scroll>
			</template>
		</div>
	</div>
</template>

<script>
import axios from "axios";
import Scroll from "../ScrollComponents/Scroll.vue";

export default {
	name: "Scrolls",
	components: { Scroll },
	props: {
		title: String,
	},

	data() {
		return {
			keep: false,

			allScrolls: [
				{
					name: "Ancient Relic Crystal",
					fullIconKey: 41583,
					main_key: 40218,
					secondsPerScroll: null,
					avgSecPerScroll: 90,
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
					avgSecPerScroll: 90,
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
					avgSecPerScroll: 60,
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
				{
					name: "Manshaum Narc's Stone",
					fullIconKey: 41619,
					main_key: 40383,
					secondsPerScroll: null,
					avgSecPerScroll: 120,
					drops: [
						{
							name: "Narc Ear Accessory",
							key: 11834,
							dropRate: 0.006,
						},
						{
							name: "Forest Fury",
							key: 4917,
							dropRate: 0.04,
						},
						{
							name: "Caphras Stone",
							key: 721003,
							dropRate: 0.53,
						},
						{
							name: "Water Spirit Stone Fragment",
							key: 44306,
							dropRate: 1.49,
						},
						{
							name: "Black Stone (Weapon)",
							key: 16001,
							dropRate: 4,
						},
						{
							name: "Black Stone (Armor)",
							key: 16002,
							dropRate: 9,
						},
						{
							name: "Peridot Petal",
							key: 44328,
							dropRate: 3,
						},
						{
							name: "Hunter's Seal",
							key: 44186,
							dropRate: 1,
						},
					],
				},
				{
					name: "Ibedor's Scroll",
					fullIconKey: 65771,
					main_key: 65770,
					secondsPerScroll: null,
					avgSecPerScroll: 225,
					drops: [
						{
							name: "Caphras Stone",
							key: 721003,
							dropRate: 14.21,
						},
						{
							name: "Ancient Spirit Dust",
							key: 721002,
							dropRate: 101.8,
						},
						{
							name: "Specter's Energy",
							key: 721044,
							dropRate: 0.016,
						},
						{
							name: "Embers of Despair",
							key: 44475,
							dropRate: 0.006,
						},
						{
							name: "Black Stone (Weapon)",
							key: 16001,
							dropRate: 5.22,
						},
						{
							name: "Black Stone (Armor)",
							key: 16002,
							dropRate: 5.32,
						},
						{
							name: "Broken Horn Fragment",
							key: 44454,
							dropRate: 109.6,
						},
						{
							name: "Moonlight Spirit Powder",
							key: 44451,
							dropRate: 68.67,
						},
						{
							name: "Golem's Heart Fragment",
							key: 44456,
							dropRate: 38.16,
						},
						{
							name: "Silver",
							key: 1,
							dropRate: 487178,
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

	methods: {
		restoreDefaultValues() {
			localStorage.removeItem("SCROLL_DATA");
			window.location.reload();
		},
	},
};
</script>

<style>
@font-face {
	font-family: "Poppins";
	font-style: normal;
	font-weight: 400;
	src: url("../fonts/poppins-v15-latin-regular.eot"); /* IE9 Compat Modes */
	src: local(""), url("../fonts/poppins-v15-latin-regular.eot?#iefix") format("embedded-opentype"),
		/* IE6-IE8 */ url("../fonts/poppins-v15-latin-regular.woff2") format("woff2"),
		/* Super Modern Browsers */ url("../fonts/poppins-v15-latin-regular.woff") format("woff"),
		/* Modern Browsers */ url("../fonts/poppins-v15-latin-regular.ttf") format("truetype"),
		/* Safari, Android, iOS */ url("../fonts/poppins-v15-latin-regular.svg#Poppins") format("svg"); /* Legacy iOS */
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
