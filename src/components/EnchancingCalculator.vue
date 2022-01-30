<template>
	<div class="text-center">
		<h1 class="text-left text-0 py-8 text-5xl font-bold ml-3">
			{{ title }}
		</h1>

		<div class="grid grid-cols-2 gap-4 mx-4 pb-3 xsm:grid-cols-8">
			<div
				class="bg-600 text-0 rounded text-xl relative py-4 xsm:col-span-2 col-span-4 xsm:pt-16 lgx:pt-10"
			>
				<p>
					Attempts: <strong>{{ attempts }}</strong>
				</p>
				<p>
					Success: <strong class="text-green">{{ success }}</strong>
				</p>
				<p>
					Fails: <strong class="text-red">{{ fails }}</strong>
				</p>
				<p>
					Avg. Clicks: <strong class="text-orange">{{ avgClicks }}</strong>
				</p>
			</div>
			<div
				class="bg-600 text-0 rounded h-auto text-xl relative px-2 pt-2 col-span-4 row-span-2"
			>
				<div class="flex bg-700 text-0 rounded h-24">
					<div class="flex-initial w-24 z-10">
						<div
							class="mt-6 bg-600 rounded ml-6 p-4 max-w-20"
							@click="displayLeftItemDropDown = true"
						>
							Item
						</div>
						<!-- <select
							class="bg-600 text-red ml-6 rounded mt-2 focus:outline-none h-12"
							v-if="displayLeftItemDropDown"
							v-model="currentItemSelected"
							@mouseleave="displayLeftItemDropDown = false"
							@input="setChance()"
						>
							<option
								v-for="(item, key) in items"
								:key="key"
								class="bg-600 text-red"
							>
								{{ item.name }}
							</option>
						</select> -->
						<ul
							class="bg-600 text-red ml-6 rounded mt-2 h-auto w-64 left-full"
							v-if="displayLeftItemDropDown"
						>
							<li
								v-for="(item, key1) in items"
								:key="key1"
								class="hover:bg-400 h-8"
								@click="
									(currentItemToggle = true), (currentItemSelected = item.name)
								"
							>
								<a>{{ item.name }}</a>
								<ul
									class="relative left-full w-12 bottom-7 bg-600 ml-1 rounded"
								>
									<li
										v-for="(level, key2) in item.levels"
										:key="key2"
										class="hover:bg-400"
										@click="(currentItemToggle = false), (selectedLevel = level.lvlName)"
									>
										<a
											v-if="
												currentItemToggle && currentItemSelected === item.name
											"
											>{{ level.lvlName }}</a
										>
									</li>
								</ul>
							</li>
						</ul>
					</div>
					<div class="flex-auto w-full">
						<div class="mt-12 bg-600 h-3 w-full"></div>
					</div>
					<div class="flex-initial w-24 z-10">
						<div class="mt-6 bg-600 rounded mr-6 p-4 max-w-20">Item+</div>
					</div>
				</div>
				<div class="bg-700 text-0 rounded h-24">
					<p class="font-semibold mb-5">
						Current Failstack:
						<input
							class="w-20 p-2 bg-500 h-7 text-center focus:outline-none"
							type="number"
							v-model="failstack"
							:valueName="'failstack'"
						/>
					</p>
					<div class="mr-1">
						<button
							class="bg-500 text-red rounded w-11 h-7 ml-1 font-bold"
							@click="subtractFromFailstack(25)"
						>
							-25
						</button>
						<button
							class="bg-500 text-red rounded w-11 h-7 ml-2 font-bold"
							@click="subtractFromFailstack(5)"
						>
							-5
						</button>
						<button
							class="bg-500 text-red rounded w-11 h-7 ml-2 font-bold"
							@click="subtractFromFailstack(1)"
						>
							-1
						</button>
						<button
							class="bg-500 text-green rounded w-11 h-7 ml-2 font-bold"
							@click="addToFailstack(1)"
						>
							+1
						</button>
						<button
							class="bg-500 text-green rounded w-11 h-7 ml-2 font-bold"
							@click="addToFailstack(5)"
						>
							+5
						</button>
						<button
							class="bg-500 text-green rounded w-11 h-7 ml-2 font-bold"
							@click="addToFailstack(25)"
						>
							+25
						</button>
					</div>
				</div>
				<div
					class="grid grid-cols-1 my-2 gap-2 lgx:grid-cols-3 xsm:grid-cols-2 xs:grid-cols-3"
				>
					<div class="rounded bg-700 h-14 w-auto">
						<p class="my-3">Success Rate: {{ chanceOfSuccess }} %</p>
					</div>
					<div class="rounded bg-700 h-14 w-auto">
						<p class="my-3">Softcap: {{ softcap }}</p>
					</div>
					<div
						class="rounded bg-700 h-18 w-auto lgx:row-span-1 row-span-1 xsm:row-span-2 lgx:pt-0 xsm:pt-9"
					>
						<p class="my-3">Avg. Clicks: {{ avgClicks }}</p>
					</div>
					<div class="rounded bg-700 h-32 row-span-1 pt-1 xs:row-span-2">
						<p
							:class="[
								'my-3 text-green font-bold',
								{ 'text-red': !cronToggle },
							]"
						>
							CRONS
							<label class="switch ml-1"
								><input @click="cronToggle = !cronToggle" type="checkbox" />
								<span class="slider round"></span
							></label>
						</p>
						<div class="bg-600 rounded w-28 h-12 m-auto">
							<p v-if="cronToggle" class="p-2 font-bold">
								{{ cronsNeeded.toLocaleString() }}
							</p>
							<p v-else class="p-2 font-bold">?</p>
						</div>
					</div>
					<div
						class="rounded bg-700 h-18 col-span-1 xsm:col-span-2 xs:col-span-2"
					>
						<p class="my-3">Silver Spent: {{ silverSpent }}</p>
					</div>
					<button class="rounded bg-700 h-18 col-span-1 py-2">
						<div
							:class="[
								'my-1 text-green font-bold',
								{ 'text-red': !animationToggle },
							]"
						>
							<span>Skip Animation</span>
							<label class="switch ml-3"
								><input
									@click="animationToggle = !animationToggle"
									type="checkbox" />
								<span class="slider round"></span
							></label>
						</div>
					</button>
					<button class="rounded bg-700 h-18 col-span-1">
						<p class="my-3 text-green font-bold">ENCHANCE</p>
					</button>
				</div>
			</div>
			<div
				class="bg-600 text-0 rounded h-auto text-xl relative p-2 pb-4 col-span-4 row-span-2 xsm:col-span-2"
			>
				<Input
					class="w-full p-2 h-12 text-2xl"
					v-model="simulationTapAmount"
					:valueName="'simulation'"
				/>
				<div class="my-3 mx-1 grid grid-cols-2 gap-3">
					<button
						@click="simulate()"
						class="bg-green rounded p-4 font-bold truncate"
					>
						Simulate
					</button>
					<button
						@click="clearSimulation()"
						class="bg-red rounded p-4 font-bold truncate"
					>
						Clear
					</button>
				</div>
				<div class="rounded bg-700 h-auto min-h-40">
					<p
						v-for="(attempt, key) in simulations"
						:key="key"
						v-text="attempt.text + attempt.roll"
						:class="{ red: !attempt.state, green: attempt.state }"
					></p>
				</div>
			</div>
			<div
				class="bg-600 text-0 rounded text-xl relative py-4 col-span-4 xsm:col-span-2 xsm:pt-16 lgx:pt-10"
			>
				<div class="">
					<p>
						Highest Success Streak: <strong>{{ highestSuccessStreak }}</strong>
					</p>
					<p>
						Highest Fail Streak:
						<strong class="text-green">{{ highestFailStreak }}</strong>
					</p>
					<p>
						Current Success Streak:
						<strong class="text-red">{{ currentSuccessStreak }}</strong>
					</p>
					<p>
						Current Fail Streak:
						<strong class="text-orange">{{ currentFailStreak }}</strong>
					</p>
				</div>
			</div>
		</div>
	</div>
</template>

<script>
import Input from "./Input.vue";

export default {
	name: "EnchancingCalculator",
	components: { Input },
	props: { title: String },

	data() {
		return {
			currentItemSelected: null,
			currentItemToggle: false,

			simulationTapAmount: 1,
			simulations: [],

			softcap: 0,

			highestSuccessStreak: 0,
			highestFailStreak: 0,
			currentSuccessStreak: 0,
			currentFailStreak: 0,

			attempts: 0,
			success: 0,
			fails: 0,
			avgClicks: 0,

			failstack: 0,
			chanceOfSuccess: 0,
			selectedLevel: 0,
			selectedItem: 0,

			cronToggle: false,
			animationToggle: false,

			cronsNeeded: 0,
			silverSpent: 0,

			displayLeftItemDropDown: false,
			displayRightItemDropDown: false,

			items: [
				{
					name: "Red Nose's Armor",
					main_key: 11014,

					levels: [
						{
							lvlName: "+13",
							baseChance: 0.04,
							softCap: 78,
						},
						{
							lvlName: "+14",
							baseChance: 0.0286,
							softCap: 84,
						},
						{
							lvlName: "+15",
							baseChance: 0.02,
							softCap: 107,
						},
						{
							lvlName: "I",
							baseChance: 0.1176,
							softCap: 50,
						},
						{
							lvlName: "II",
							baseChance: 0.0769,
							softCap: 82,
						},
						{
							lvlName: "III",
							baseChance: 0.0625,
							softCap: 102,
						},
						{
							lvlName: "IV",
							baseChance: 0.02,
							softCap: 340,
						},
						{
							lvlName: "V",
							baseChance: 0.003,
							softCap: 2324,
						},
					],
				},
				{
					name: "Ring of Crescent Guardian",
					main_key: 12031,

					levels: [
						{
							lvlName: "I",
							baseChance: 0.25,
							softCap: 18,
						},
						{
							lvlName: "II",
							baseChance: 0.1,
							softCap: 40,
						},
						{
							lvlName: "III",
							baseChance: 0.075,
							softCap: 44,
						},
						{
							lvlName: "IV",
							baseChance: 0.025,
							softCap: 110,
						},
						{
							lvlName: "V",
							baseChance: 0.005,
							softCap: 490,
						},
					],
				},
				{
					name: "Fallen God's Armor",
					main_key: 719898,

					levels: [
						{
							lvlName: "I",
							baseChance: 0.02,
							softCap: 340,
						},
						{
							lvlName: "II",
							baseChance: 0.01,
							softCap: 690,
						},
						{
							lvlName: "III",
							baseChance: 0.005,
							softCap: 1390,
						},
						{
							lvlName: "IV",
							baseChance: 0.002,
							softCap: 3490,
						},
						{
							lvlName: "V",
							baseChance: 0.000025,
							softCap: 279990,
						},
					],
				},
			],
		};
	},

	created() {},

	mounted() {},

	methods: {
		clearSimulation() {
			this.highestSuccessStreak = 0;
			this.highestFailStreak = 0;
			this.currentSuccessStreak = 0;
			this.currentFailStreak = 0;
			this.attempts = 0;
			this.success = 0;
			this.fails = 0;
			this.simulations = [];
		},

		addToFailstack(amount) {
			this.failstack += amount;
		},

		subtractFromFailstack(amount) {
			this.failstack -= amount;
			if (this.failstack <= 0) this.failstack = 0;
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

/* The switch - the box around the slider */
.switch {
	position: relative;
	display: inline-block;
	width: 60px;
	height: 30px;
}

/* Hide default HTML checkbox */
.switch input {
	opacity: 0;
	width: 0;
	height: 0;
}

/* The slider */
.slider {
	position: absolute;
	cursor: pointer;
	top: 0;
	left: 0;
	right: 0;
	bottom: 0;
	background-color: rgb(245 101 101 / var(--tw-bg-opacity));
	-webkit-transition: 0.4s;
	transition: 0.4s;
}

.slider:before {
	position: absolute;
	content: "";
	height: 22px;
	width: 22px;
	left: 6px;
	bottom: 4px;
	background-color: white;
	-webkit-transition: 0.4s;
	transition: 0.4s;
}

input:checked + .slider {
	background-color: rgb(72 187 120 / var(--tw-bg-opacity));
}

input:focus + .slider {
	box-shadow: 0 0 1px rgb(72 187 120 / var(--tw-bg-opacity));
}

input:checked + .slider:before {
	-webkit-transform: translateX(26px);
	-ms-transform: translateX(26px);
	transform: translateX(26px);
}

/* Rounded sliders */
.slider.round {
	border-radius: 34px;
}

.slider.round:before {
	border-radius: 50%;
}
</style>
