<template>
	<div class="text-center">
		<div class="text-left text-0 py-8 text-5xl font-bold ml-3">
			<h1 class="inline xxsm:text-4xl xs:text-5xl">
				{{ title }}
			</h1>
			<button
				@click="realEnchancement = !realEnchancement"
				class="text-2xl mr-4 font-semibold text-green rounded float-right bg-600 p-2"
			>
				<span v-if="realEnchancement" class="text-base text-red">not</span>Real
			</button>
		</div>

		<div class="grid grid-cols-2 gap-4 mx-4 pb-3 xsm:grid-cols-8">
			<div
				class="bg-600 text-0 rounded text-xl relative py-4 pt-4 xsm:col-span-2 col-span-4 xsm:pt-8 lgx:pt-3"
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
					Avg. Clicks:
					<strong class="text-orange">{{
						!(attempts / success >= 0) ? 0 : (attempts / success).toFixed(2)
					}}</strong>
				</p>
				<p class="mt-2">
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
			<div class="bg-600 text-0 rounded h-auto text-xl relative px-2 pt-2 col-span-4 row-span-2">
				<div class="flex bg-700 text-0 rounded h-28 lgx:h-28" @click="open('itemSelector')">
					<div class="flex-initial w-24 z-10">
						<div class="mt-6 bg-600 rounded ml-4 p-2 w-20 relative h-16">
							<img
								:src="'https://assets.garmoth.com/items/' + currentItemSelected.currTier.material.id + '.png'"
								v-if="currentItemSelected.currTier.material"
								:class="[
									'h-12 m-auto rounded-xl',
									{ 'animate-pulse': currentItemSelected.information.main_key === 10810 },
								]"
							/>
						</div>
						<Select @chosenItem="itemChange"></Select>
					</div>
					<div class="flex-auto w-full">
						<div
							class="mt-12 bg-600 h-4 w-full"
							v-if="animationToggle || !justClicked || currentItemSelected.currTier.lvlName === 'V'"
						></div>
						<transition name="anim">
							<div
								class="mt-12 bg-600 h-4 w-full"
								v-if="!animationToggle && justClicked && currentItemSelected.currTier.lvlName != 'V'"
							></div>
						</transition>
					</div>
					<div class="flex-initial w-24 z-10">
						<div class="mt-6 bg-600 rounded mr-6 p-2 w-20 relative h-16">
							<img
								:src="'https://assets.garmoth.com/items/' + currentItemSelected.information.main_key + '.png'"
								:class="[
									'h-12 m-auto rounded-xl',
									{ 'animate-pulse': currentItemSelected.information.main_key === 10810 },
								]"
							/>
							<p
								class="absolute top-4 left-4 text-white text-1xl font-semibold w-12 bg-600 bg-opacity-20"
								v-if="currentItemSelected.information.main_key && currentItemSelected.currTier.lvlName != 'V'"
							>
								<span>{{
									currentItemSelected.currTier.lvlName === "BASE"
										? ""
										: currentItemSelected.currTier.lvlName === "END"
										? "V"
										: currentItemSelected.currTier.lvlName
								}}</span>
							</p>
						</div>
					</div>
				</div>
				<div class="bg-700 text-0 rounded h-24 lgx:h-36 pb-32">
					<div class="relative">
						<div
							v-if="failstackDefaultTabToggle"
							class="rounded bg-500 w-24 absolute right-1/2 bottom-10 translate-x-1/2 z-20 text-right"
						>
							<span
								:class="[
									'mr-0.5 font-semibold text-base',
									{ 'text-green': failstackDefaultToggle },
									{ 'text-red': !failstackDefaultToggle },
								]"
								@click="
									(failstackDefaultToggle = !failstackDefaultToggle), (failstackDefaultTabToggle = false)
								"
								>Use Defaults</span
							>
							<br />
							I:
							<input
								class="w-16 p-2 bg-400 h-7 text-center focus:outline-none"
								type="number"
								v-model="fsDefaults.pri"
							/>
							<br />
							II:
							<input
								class="w-16 p-2 bg-400 h-7 text-center focus:outline-none"
								type="number"
								v-model="fsDefaults.duo"
							/>
							<br />
							III:
							<input
								class="w-16 p-2 bg-400 h-7 text-center focus:outline-none"
								type="number"
								v-model="fsDefaults.tri"
							/>
							<br />
							IV:
							<input
								class="w-16 p-2 bg-400 h-7 text-center focus:outline-none"
								type="number"
								v-model="fsDefaults.tet"
							/>
							<br />
							V:
							<input
								class="w-16 p-2 bg-400 h-7 text-center focus:outline-none"
								type="number"
								v-model="fsDefaults.pen"
							/>
						</div>
						<div class="font-bold mb-3 pt-2">
							Current Failstack:
							<input
								class="w-20 p-2 bg-500 h-7 text-center focus:outline-none"
								type="number"
								v-model="failstack"
								@input="setChance()"
							/>
						</div>
					</div>
					<div class="mr-1">
						<button
							class="bg-500 text-red rounded w-11 h-7 ml-1 font-bold"
							@click="subtractFromFailstack(25), setChance()"
						>
							-25
						</button>
						<button
							class="bg-500 text-red rounded w-11 h-7 ml-2 font-bold"
							@click="subtractFromFailstack(5), setChance()"
						>
							-5
						</button>
						<button
							class="bg-500 text-red rounded w-11 h-7 ml-2 font-bold"
							@click="subtractFromFailstack(1), setChance()"
						>
							-1
						</button>
						<button
							class="bg-500 text-green rounded w-11 h-7 ml-2 font-bold"
							@click="addToFailstack(1), setChance()"
						>
							+1
						</button>
						<button
							class="bg-500 text-green rounded w-11 h-7 ml-2 font-bold"
							@click="addToFailstack(5), setChance()"
						>
							+5
						</button>
						<button
							class="bg-500 text-green rounded w-11 h-7 ml-2 font-bold"
							@click="addToFailstack(25), setChance()"
						>
							+25
						</button>
					</div>
					<div class="mt-2">
						<FSDefaults></FSDefaults>
						<button
							:class="[
								'text-sm ml-2 rounded bg-500 px-1',
								{
									'text-green': failstackDefaultTabToggle,
									'text-red': !failstackDefaultTabToggle,
								},
							]"
							@click="open('fsDefaults')"
						>
							FS Defaults
						</button>
						<button
							:class="[
								'text-sm ml-2 rounded bg-500 px-1',
								{
									'text-green': failstackSilverValuesTabToggle,
									'text-red': !failstackSilverValuesTabToggle,
								},
							]"
							@click="failstackSilverValuesTabToggle = !failstackSilverValuesTabToggle"
						>
							FS Silver Values
						</button>
					</div>
				</div>
				<div class="grid grid-cols-1 my-2 gap-2 lgx:grid-cols-3 xsm:grid-cols-2 xs:grid-cols-3">
					<div class="rounded bg-700 h-14 w-auto font-semibold">
						<p class="my-3">
							Success Rate:
							{{ currentItemSelected.currTier.lvlName != "END" ? chanceOfSuccess + "%" : "N/A" }}
						</p>
					</div>
					<div class="rounded bg-700 h-14 w-auto">
						<button
							class="my-3 cursor-pointer hover:text-green font-semibold"
							:disabled="currentItemSelected.currTier.lvlName === 'END'"
							@click="(failstack = softcap), setChance()"
						>
							Softcap:
							{{ currentItemSelected.currTier.lvlName != "END" ? softcap : "N/A" }}
						</button>
					</div>
					<div
						class="rounded font-semibold bg-700 h-18 w-auto lgx:row-span-1 row-span-1 xsm:row-span-2 lgx:pt-0 xsm:pt-9"
					>
						<p class="my-3">
							Avg. Clicks:
							{{ currentItemSelected.currTier.lvlName != "END" ? avgClicks : "N/A" }}
						</p>
					</div>
					<div class="rounded bg-700 h-32 row-span-1 pt-1 xs:row-span-2">
						<p :class="['my-3 text-green font-bold', { 'text-red': !cronToggle }]">
							CRONS
							<label
								class="switch ml-1"
								v-if="currentItemSelected.currTier.crons != null && currentItemSelected.currTier.crons != 0"
								><input @click="cronToggle = !cronToggle" type="checkbox" /> <span class="slider round"></span
							></label>
						</p>
						<div class="bg-600 rounded w-28 h-12 m-auto">
							<p v-if="cronToggle" class="p-2 font-bold">
								{{ currentItemSelected.currTier.crons }}
							</p>
							<p v-else class="p-2 font-bold">?</p>
						</div>
					</div>
					<div class="rounded bg-700 h-18 col-span-1 xsm:col-span-2 xs:col-span-2">
						<p class="my-3 font-semibold">Silver Spent: {{ silverSpent.toLocaleString() }}</p>
					</div>
					<div class="rounded bg-700 h-18 col-span-1 py-2 pt-3">
						<div :class="['my-1 text-green font-bold', { 'text-red': !animationToggle }]">
							<span>Skip Animation</span>
							<label class="switch ml-3"
								><input @click="animationToggle = !animationToggle" type="checkbox" />
								<span class="slider round"></span
							></label>
						</div>
					</div>
					<button
						class="rounded bg-700 h-18 col-span-1"
						v-if="currentItemSelected.currTier"
						:disabled="
							justClicked || currentItemSelected.nextTier === null || currentItemSelected.allTiers === null
						"
						@click="skipOrNah(), clicked()"
					>
						<p class="my-3 text-green font-bold">ENCHANCE</p>
					</button>
				</div>
			</div>
			<div class="bg-600 text-0 rounded h-auto text-xl relative p-2 col-span-4 row-span-2 xsm:col-span-2">
				<Input class="w-full p-2 h-12 text-2xl" v-model="simulationTapAmount" :valueName="'simulation'" />
				<div class="my-3 mx-1 grid grid-cols-2 gap-3">
					<button
						:disabled="currentItemSelected.nextTier === null || currentItemSelected.allTiers === null"
						@click="simulate(simulationTapAmount)"
						class="bg-green rounded p-4 font-bold truncate"
					>
						Simulate
					</button>
					<button
						@click="clearSimulation(), (failstack = 0), (silverSpent = 0), setChance()"
						class="bg-red rounded p-4 font-bold truncate"
					>
						Clear
					</button>
				</div>
				<div class="rounded bg-700 h-90 xsm:h-95 lgx:h-81 text-left pb-0 overflow-y-auto">
					<p
						v-for="(attempt, key) in simulationsToDisplay"
						:key="key"
						:class="['ml-2', { 'text-red': !attempt.state, 'text-green': attempt.state }]"
					>
						{{ attempt.lvlName }} <span class="text-400">|</span>
						{{ attempt.text + attempt.roll }}
						<span class="text-200"><span class="text-400">|</span> FS used: {{ attempt.failstack }}</span>
					</p>
				</div>
			</div>
			<div class="bg-600 text-0 rounded text-xl relative py-4 col-span-4 xsm:col-span-2 xsm:pt-1 lgx:pt-1">
				<div class="">
					<p class="text-3xl xsm:mt-10 lgx:mt-1">Chance Calculator</p>
					<input
						class="w-42 p-2 bg-700 h-8 text-center focus:outline-none my-5"
						type="number"
						placeholder="Times"
						v-model="chanceCalcTimes"
					/>
					<p>Chance of success</p>
					<p class="text-3xl">{{ chanceCalculator }}%</p>
				</div>
			</div>
		</div>
	</div>
</template>

<script>
import axios from "axios";
import Input from "./Input.vue";
import Select from "./Select.vue";
import FSDefaults from "./FSDefaults.vue";

export default {
	name: "EnchancingCalculator",
	components: { Input, Select, FSDefaults },
	props: { title: String },

	data() {
		return {
			realEnchancement: false,

			currentItemSelected: {
				information: {
					main_key: 10810,
				},

				allTiers: null,

				currTier: {},
				prevTier: {},
				nextTier: {},
			},

			currentItemToggle: false,

			simulationTapAmount: 1,
			simulationsToDisplay: [],

			allSimulations: [],

			softcap: 0,

			chanceCalcTimes: null,

			highestSuccessStreak: 0,
			highestFailStreak: 0,
			currentSuccessStreak: 0,
			currentFailStreak: 0,

			attempts: 0,
			success: 0,
			fails: 0,
			avgClicks: 0,

			failstack: 0,

			fsDefaults: {
				pri: 25,
				duo: 35,
				tri: 50,
				tet: 80,
				pen: 110,
			},

			chanceOfSuccess: 0,

			cronToggle: false,
			animationToggle: false,
			failstackDefaultTabToggle: false,
			failstackDefaultToggle: false,
			failstackSilverValuesTabToggle: false,
			failstackSilverValuesToggle: false,

			justClicked: false,

			cronsNeeded: 0,
			silverSpent: 0,

			displayLeftItemDropDown: false,
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
				return this.$store.state.enchance.items;
			},
			set(value) {
				this.$store.commit("SET_ITEMS_STORAGE", value);
			},
		},
		chance: {
			get() {
				return this.$store.state.enchance.chance;
			},
			set(value) {
				this.$store.commit("SET_CHANCE_STORAGE", value);
			},
		},
		cron: {
			get() {
				return this.$store.state.enchance.cron;
			},
			set(value) {
				this.$store.commit("SET_CRON_STORAGE", value);
			},
		},
		material: {
			get() {
				return this.$store.state.enchance.material;
			},
			set(value) {
				this.$store.commit("SET_MATERIAL_STORAGE", value);
			},
		},
		prices: {
			get() {
				return this.$store.state.enchance.prices;
			},
			set(value) {
				this.$store.commit("SET_PRICES_STORAGE", value);
			},
		},

		chanceCalculator() {
			let times = this.chanceCalcTimes;
			let calc = ((1 - Math.pow(1 - this.chanceOfSuccess / 100, times)) * 100).toFixed(5);
			if (parseFloat(calc) > 99.99) {
				return 99.99;
			} else {
				return calc;
			}
		},
	},

	methods: {
		itemChange(item) {
			this.currentItemSelected = item;
			this.setChance();
		},

		clicked() {
			if (!this.animationToggle) {
				this.justClicked = true;

				setTimeout(() => {
					this.justClicked = false;
				}, 3000);
			}
		},

		clearSimulation() {
			this.highestSuccessStreak = 0;
			this.highestFailStreak = 0;
			this.currentSuccessStreak = 0;
			this.currentFailStreak = 0;
			this.attempts = 0;
			this.success = 0;
			this.fails = 0;
			this.simulationsToDisplay = [];
			this.allSimulations = [];
		},

		addToFailstack(amount) {
			this.failstack += amount;
		},

		subtractFromFailstack(amount) {
			this.failstack -= amount;
			if (this.failstack <= 0) this.failstack = 0;
		},

		getLvl(level) {
			let output;
			if (level === "") {
				output = "base";
			} else {
				output = level;
			}
			return output;
		},

		previousTier(currentTier) {
			let indexOfCurr = this.currentItemSelected.allTiers.findIndex((tier) => tier === currentTier);
			return this.currentItemSelected.allTiers[indexOfCurr - 1];
		},

		nextTier(currentTier) {
			if (currentTier.lvlName === "END") {
				return null;
			} else if (currentTier.lvlName != "BASE") {
				let indexOfCurr = this.currentItemSelected.allTiers.findIndex((tier) => tier === currentTier);
				if (this.currentItemSelected.allTiers[indexOfCurr + 1].lvlName != "BASE") {
					return this.currentItemSelected.allTiers[indexOfCurr + 1];
				} else {
					return null;
				}
			}
		},

		setChance() {
			let baseChance = this.currentItemSelected.currTier.baseChance;
			this.softcap = this.currentItemSelected.currTier.softCap;

			let failstackChance = baseChance / 10;
			let failstackChanceAfterSoftcap = baseChance / 50;

			if (this.failstack > this.softcap) {
				this.chanceOfSuccess =
					baseChance +
					failstackChance * this.softcap +
					(this.failstack - this.softcap) * failstackChanceAfterSoftcap;
			} else {
				this.chanceOfSuccess = baseChance + failstackChance * this.failstack;
			}

			this.chanceOfSuccess = (this.chanceOfSuccess * 100).toFixed(2);
			if (this.chanceOfSuccess > 90 && this.currentItemSelected.currTier.baseChance != 1) {
				this.chanceOfSuccess = (90).toFixed(2);
			} else if (this.currentItemSelected.currTier.baseChance === 1) {
				this.chanceOfSuccess = (100).toFixed(2);
			}
			this.avgClicks = (100 / this.chanceOfSuccess).toFixed(2);
		},

		open(id) {
			document.getElementById(id).style.display = "flex";
		},

		degrade() {
			let temp = this.currentItemSelected.currTier;

			this.currentItemSelected.currTier = this.currentItemSelected.prevTier;
			this.currentItemSelected.prevTier = this.previousTier(this.currentItemSelected.prevTier);
			this.currentItemSelected.nextTier = temp;

			this.setChance();
		},

		upgrade() {
			let temp = this.currentItemSelected.currTier;

			this.currentItemSelected.currTier = this.currentItemSelected.nextTier;
			this.currentItemSelected.prevTier = temp;
			this.currentItemSelected.nextTier = this.nextTier(this.currentItemSelected.nextTier);
			this.setChance();
		},

		simulate(tapNum) {
			for (let i = 0; i < tapNum; i++) {
				if (this.currentItemSelected.currTier.lvlName != "END") {
					let roll = Math.random();

					if (this.failstackDefaultToggle) {
						if (
							this.currentItemSelected.currTier.lvlName === "BASE" ||
							this.currentItemSelected.currTier.lvlName === "+15"
						) {
							if (
								this.simulationsToDisplay.length === 0 ||
								this.simulationsToDisplay[this.simulationsToDisplay.length - 1].text === "S: " ||
								this.failstack > this.fsDefaults.duo
							) {
								this.failstack = this.fsDefaults.pri;
								this.setChance();
							}
						} else if (this.currentItemSelected.currTier.lvlName === "I") {
							if (
								this.simulationsToDisplay.length === 0 ||
								this.simulationsToDisplay[this.simulationsToDisplay.length - 1].text === "S: " ||
								this.failstack > this.fsDefaults.tri
							) {
								this.failstack = this.fsDefaults.duo;
								this.setChance();
							}
						} else if (this.currentItemSelected.currTier.lvlName === "II") {
							if (
								this.simulationsToDisplay.length === 0 ||
								this.simulationsToDisplay[this.simulationsToDisplay.length - 1].text === "S: " ||
								this.failstack > this.fsDefaults.tet
							) {
								this.failstack = this.fsDefaults.tri;
								this.setChance();
							}
						} else if (this.currentItemSelected.currTier.lvlName === "III") {
							if (
								this.simulationsToDisplay.length === 0 ||
								this.simulationsToDisplay[this.simulationsToDisplay.length - 1].text === "S: " ||
								this.failstack > this.fsDefaults.pen
							) {
								this.failstack = this.fsDefaults.tet;
								this.setChance();
							}
						} else if (this.currentItemSelected.currTier.lvlName === "IV") {
							if (
								this.simulationsToDisplay.length === 0 ||
								this.simulationsToDisplay[this.simulationsToDisplay.length - 1].text === "S: "
							) {
								this.failstack = this.fsDefaults.pen;
								this.setChance();
							}
						}
					}

					if (roll >= this.chanceOfSuccess / 100) {
						this.currentSuccessStreak = 0;
						this.currentFailStreak++;
						this.fails++;
						this.attempts++;

						let obj = {
							state: false,
							text: "F: ",
							roll: (roll * 100).toFixed(2),
							failstack: this.failstack,
							lvlName:
								this.currentItemSelected.nextTier === null ||
								this.currentItemSelected.nextTier.lvlName === "END"
									? "V"
									: this.currentItemSelected.nextTier.lvlName,
						};

						this.allSimulations.push(obj);

						if (!this.realEnchancement) {
							if (
								this.currentItemSelected.currTier.lvlName === "I" ||
								this.currentItemSelected.currTier.lvlName === "II" ||
								this.currentItemSelected.currTier.lvlName === "III" ||
								this.currentItemSelected.currTier.lvlName === "IV"
							) {
								if (!this.cronToggle) {
									this.addToFailstack(this.currentItemSelected.currTier.failstackGain);
									if (
										this.currentItemSelected.information.chance === 1 ||
										this.currentItemSelected.information.chance === 3 ||
										this.currentItemSelected.information.chance === 4 ||
										this.currentItemSelected.information.chance === 5 ||
										this.currentItemSelected.information.chance === 7 ||
										this.currentItemSelected.information.chance === 11 ||
										this.currentItemSelected.information.chance === 12
									) {
										this.currentItemSelected.currTier = this.currentItemSelected.allTiers[0];
										this.currentItemSelected.nextTier = this.currentItemSelected.allTiers[1];
										this.currentItemSelected.prevTier = null;
										this.setChance();
									} else {
										this.degrade();
									}
								} else {
									this.silverSpent += this.currentItemSelected.currTier.crons * 1126190;
								}
							} else {
								this.addToFailstack(this.currentItemSelected.currTier.failstackGain);
								this.setChance();
							}
							this.silverSpent +=
								this.currentItemSelected.currTier.material.materialCost +
								this.prices[44195].sub_items[0].price * this.currentItemSelected.currTier.durabilityLoss;
						}
					} else {
						this.currentFailStreak = 0;
						this.currentSuccessStreak++;
						this.success++;
						this.attempts++;

						let obj = {
							state: true,
							text: "S: ",
							roll: (roll * 100).toFixed(2),
							failstack: this.failstack,
							lvlName:
								this.currentItemSelected.nextTier.lvlName === "END"
									? "V"
									: this.currentItemSelected.nextTier.lvlName,
						};

						this.allSimulations.push(obj);

						if (!this.realEnchancement) {
							if (!this.failstackDefaultToggle) {
								this.failstack = 0;
							}
							this.upgrade();
							if (this.cronToggle) {
								this.silverSpent += this.currentItemSelected.currTier.crons * 1126190;
							}
							if (this.currentItemSelected.currTier.lvlName === "END") {
								this.cronToggle = false;
							}
							this.silverSpent += this.currentItemSelected.currTier.material.materialCost;
						}
					}

					if (this.currentSuccessStreak > this.highestSuccessStreak)
						this.highestSuccessStreak = this.currentSuccessStreak;

					if (this.currentFailStreak > this.highestFailStreak)
						this.highestFailStreak = this.currentFailStreak;

					this.simulationsToDisplay = this.allSimulations;

					if (this.allSimulations.length > 100) {
						this.allSimulations.shift();
					}
				}
			}
		},

		skipOrNah() {
			if (this.currentItemSelected.currTier.lvlName != "V") {
				if (this.animationToggle) {
					this.simulate(1);
				} else {
					setTimeout(() => {
						this.simulate(1);
					}, 3000);
				}
			}
		},
	},
};
</script>

<style>
.anim-enter-active {
	background: linear-gradient(to right, rgb(43, 46, 50) 0%, rgb(212, 177, 20) 100%);
	background-size: 200% auto;
	background-position: 0 100%;
	animation: slide 3s;
	animation-fill-mode: forwards;
	animation-timing-function: linear;
}

@keyframes slide {
	0% {
		background-position: 0 0;
	}
	100% {
		background-position: -100% 0;
	}
}

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
