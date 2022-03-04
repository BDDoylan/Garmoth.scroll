<template>
	<button
		v-if="currentItemSelected.currTier"
		:disabled="
			currentItemSelected.nextTier === null || currentItemSelected.allTiers === null || toggles.justClicked
		"
		:class="[
			currentItemSelected.nextTier === null || currentItemSelected.allTiers === null || toggles.justClicked
				? 'bg-400'
				: 'bg-green',
			'rounded h-18 col-span-1',
		]"
		@click="buttonText === 'Enhance' ? (skipOrNah(), clicked()) : simulate(simulations.simulationTapAmount)"
	>
		<p class="my-3 text-white font-bold">{{ buttonText }}</p>
	</button>
</template>

<script>
import Enhancing from "../mixins/Enhancing";

export default {
	name: "SimulateButton",

	props: ["buttonText"],

	mixins: [Enhancing],

	computed: {
		prices: {
			get() {
				return this.$store.state.enhance.prices;
			},
			set(value) {
				this.$store.commit("SET_PRICES_STORAGE", value);
			},
		},

		fsDefaults: {
			get() {
				return this.$store.state.enhance.fsDefaults;
			},
			set(value) {
				this.$store.commit("SET_FS_DEFAULTS", value);
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

		unusedFs: {
			get() {
				return this.$store.state.enhance.unusedFailstackStorage;
			},
			set(value) {
				this.$store.commit("SET_UNUSED_FS", value);
			},
		},
	},

	methods: {
		clicked() {
			if (!this.toggles.animationToggle) {
				this.toggles.justClicked = true;

				setTimeout(() => {
					this.toggles.justClicked = false;
				}, 3000);
			}
		},

		degrade() {
			let temp = this.currentItemSelected.currTier;

			this.currentItemSelected.currTier = this.currentItemSelected.prevTier;
			this.currentItemSelected.prevTier =
				this.currentItemSelected.allTiers[this.currentItemSelected.prevTier.tierNum - 1];
			this.currentItemSelected.nextTier = temp;

			this.setChance();
		},

		upgrade() {
			let temp = this.currentItemSelected.currTier;

			this.currentItemSelected.currTier = this.currentItemSelected.nextTier;
			this.currentItemSelected.prevTier = temp;
			this.currentItemSelected.nextTier =
				this.currentItemSelected.nextTier.lvlName === "END"
					? null
					: this.currentItemSelected.allTiers[this.currentItemSelected.nextTier.tierNum + 1];

			this.setChance();
		},

		setFsDefaults() {
			if (this.toggles.useFsDefaultsToggle) {
				if (
					this.simulations.simulationsToDisplay.length === 0 ||
					this.simulations.simulationsToDisplay[this.simulations.simulationsToDisplay.length - 1].text ===
						"S: " ||
					this.failstack > this.fsDefaults[this.currentItemSelected.currTier.tierNum].stop
				) {
					if (this.failstack > this.fsDefaults[this.currentItemSelected.currTier.tierNum].stop) {
						this.unusedFs.push(this.failstack);
						this.failstack = this.fsDefaults[this.currentItemSelected.currTier.tierNum].start;
					} else {
						this.failstack = this.fsDefaults[this.currentItemSelected.currTier.tierNum].start;
					}
				}
				this.setChance();
			}
		},

		fail(roll) {
			this.stats.currentSuccessStreak = 0;
			this.stats.currentFailStreak++;
			this.stats.fails++;
			this.stats.attempts++;

			let obj = {
				state: false,
				text: "F: ",
				roll: (roll * 100).toFixed(2),
				failstack: this.failstack,
				lvlName:
					this.currentItemSelected.nextTier === null ||
					(this.currentItemSelected.nextTier.lvlName === "END" &&
						this.currentItemSelected.information.chance === 1)
						? "+3"
						: this.currentItemSelected.nextTier === null ||
						  this.currentItemSelected.nextTier.lvlName === "END"
						? "V"
						: this.currentItemSelected.nextTier.lvlName,
			};

			this.tierChart[this.currentItemSelected.currTier.tierNum].fail++;

			this.simulations.simulationsToDisplay.push(obj);

			if (!this.toggles.realEnchancement) {
				let temp = this.currentItemSelected.currTier.tierNum;

				if (
					(this.currentItemSelected.currTier.lvlName === "I" &&
						[1, 3, 4, 5, 7, 8, 11, 12, 17].includes(this.currentItemSelected.information.chance)) ||
					this.currentItemSelected.currTier.lvlName === "II" ||
					this.currentItemSelected.currTier.lvlName === "III" ||
					this.currentItemSelected.currTier.lvlName === "IV"
				) {
					if (!this.toggles.cronToggle) {
						this.addToFailstack(this.currentItemSelected.currTier.failstackGain);
						if ([1, 3, 4, 5, 7, 8, 11, 12].includes(this.currentItemSelected.information.chance)) {
							this.currentItemSelected.currTier = this.currentItemSelected.allTiers[0];
							this.currentItemSelected.nextTier = this.currentItemSelected.allTiers[1];
							this.currentItemSelected.prevTier = null;

							this.displayedItemInformation.silverSpent +=
								this.currentItemSelected.currTier.material.materialCost;

							if (this.currentItemSelected.information.name.includes("Dragon Slayer")) {
								this.displayedItemInformation.silverSpent += 0;
							} else {
								this.displayedItemInformation.silverSpent +=
									this.prices[44195].sub_items[0].price *
									(this.toggles.artisanToggle
										? this.currentItemSelected.currTier.durabilityLoss / 5
										: this.currentItemSelected.currTier.durabilityLoss);
							}

							this.setChance();
						} else {
							this.displayedItemInformation.silverSpent +=
								this.currentItemSelected.currTier.material.materialCost;

							if (this.currentItemSelected.information.name.includes("Dragon Slayer")) {
								this.displayedItemInformation.silverSpent += 0;
							} else {
								this.displayedItemInformation.silverSpent +=
									this.prices[44195].sub_items[0].price *
									(this.toggles.artisanToggle
										? this.currentItemSelected.currTier.durabilityLoss / 5
										: this.currentItemSelected.currTier.durabilityLoss);
							}

							this.degrade();
						}
					} else {
						this.displayedItemInformation.silverSpent += this.currentItemSelected.currTier.crons * 1126190;

						this.silverChart[temp].silverForCrons += this.currentItemSelected.currTier.crons * 1126190;

						if ([1, 3, 4, 5, 7, 8, 11, 12].includes(this.currentItemSelected.information.chance)) {
							let rol2 = Math.floor(Math.random() * 101);
							console.log(rol2);
							if (rol2 > 60) {
								this.degrade();
							}
						}
					}
				} else {
					if (
						this.toggles.cronToggle &&
						this.currentItemSelected.currTier.lvlName === "BASE" &&
						[1, 3, 4, 5, 7, 8, 11, 12, 17].includes(this.currentItemSelected.information.chance)
					) {
						this.displayedItemInformation.silverSpent += this.currentItemSelected.currTier.crons * 1126190;
						this.silverChart[temp].silverForCrons += this.currentItemSelected.currTier.crons * 1126190;
					}

					this.displayedItemInformation.silverSpent +=
						this.currentItemSelected.currTier.material.materialCost;

					if (this.currentItemSelected.information.name.includes("Dragon Slayer")) {
						this.displayedItemInformation.silverSpent += 0;
					} else {
						this.displayedItemInformation.silverSpent +=
							this.prices[44195].sub_items[0].price *
							(this.toggles.artisanToggle
								? this.currentItemSelected.currTier.durabilityLoss / 5
								: this.currentItemSelected.currTier.durabilityLoss);
					}

					this.addToFailstack(this.currentItemSelected.currTier.failstackGain);
					this.setChance();
				}

				if (this.currentItemSelected.information.name.includes("Dragon Slayer")) {
					this.silverChart[temp].silverForDurability += 0;
				} else {
					this.silverChart[temp].silverForDurability +=
						this.prices[44195].sub_items[0].price *
						(this.toggles.artisanToggle
							? this.currentItemSelected.currTier.durabilityLoss / 5
							: this.currentItemSelected.currTier.durabilityLoss);
				}
				this.silverChart[temp].silverForMaterial += this.currentItemSelected.currTier.material.materialCost;
			}
		},

		success(roll) {
			this.stats.currentFailStreak = 0;
			this.stats.currentSuccessStreak++;
			this.stats.success++;
			this.stats.attempts++;

			let obj = {
				state: true,
				text: "S: ",
				roll: (roll * 100).toFixed(2),
				failstack: this.failstack,
				lvlName:
					this.currentItemSelected.nextTier.lvlName === "END" &&
					this.currentItemSelected.information.chance === 1
						? "+3"
						: this.currentItemSelected.nextTier.lvlName === "END"
						? "V"
						: this.currentItemSelected.nextTier.lvlName,
			};

			this.tierChart[this.currentItemSelected.currTier.tierNum].success++;

			this.simulations.simulationsToDisplay.push(obj);

			if (!this.toggles.realEnchancement) {
				let temp = this.currentItemSelected.currTier.tierNum;

				if (this.toggles.cronToggle) {
					this.displayedItemInformation.silverSpent += this.currentItemSelected.currTier.crons * 1126190;
					this.silverChart[temp].silverForCrons += this.currentItemSelected.currTier.crons * 1126190;
				}
				if (this.currentItemSelected.currTier.lvlName === "END") {
					this.toggles.cronToggle = false;
				}
				if (this.toggles.useFsDefaultSilverValuesToggle === true) {
					this.displayedItemInformation.silverSpent +=
						this.fsSilver[this.failstack] === undefined ? 0 : this.fsSilver[this.failstack];

					this.silverChart[temp].silverForFS +=
						this.fsSilver[this.failstack] === undefined ? 0 : this.fsSilver[this.failstack];
				}

				this.displayedItemInformation.silverSpent += this.currentItemSelected.currTier.material.materialCost;

				this.currentItemSelected.nextTier === null
					? null
					: (this.silverChart[temp].silverForMaterial +=
							this.currentItemSelected.currTier.material.materialCost);

				if (!this.toggles.useFsDefaultsToggle) {
					this.failstack = 0;
				}
				this.upgrade();
			}
		},

		simulate(tapNum) {
			for (let i = 0; i < tapNum; i++) {
				if (this.currentItemSelected.currTier.lvlName != "END") {
					let roll = Math.random();

					this.setFsDefaults();

					if (roll >= this.displayedItemInformation.chanceOfSuccess / 100) {
						this.fail(roll);
					} else {
						this.success(roll);
					}

					if (this.stats.currentSuccessStreak > this.stats.highestSuccessStreak) {
						this.stats.highestSuccessStreak = this.stats.currentSuccessStreak;
					}
					if (this.stats.currentFailStreak > this.stats.highestFailStreak) {
						this.stats.highestFailStreak = this.stats.currentFailStreak;
					}
					if (this.simulations.simulationsToDisplay.length > 100) {
						this.simulations.simulationsToDisplay.shift();
					}
				}
			}
		},

		skipOrNah() {
			if (this.currentItemSelected.currTier.lvlName != "V") {
				if (this.toggles.animationToggle) {
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
