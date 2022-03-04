<template>
	<div class="bg-700 h-28 pt-3" @click="open('itemSelector')">
		<Select />

		<div
			v-if="(window.width < 1180 && window.width > 1000) || window.width < 620"
			class="flex bg-700 text-0 h-28 2xl:h-28 text-center"
		>
			<div class="flex-initial w-24 z-10">
				<div class="mt-6 bg-600 rounded ml-4 p-2 w-20 relative h-16 cursor-pointer">
					<img
						:src="'https://assets.garmoth.com/items/' + currentItemSelected.currTier.material.id + '.png'"
						v-if="currentItemSelected.currTier.material"
						:class="[
							'h-12 m-auto rounded-xl',
							{ 'animate-pulse': currentItemSelected.information.main_key === 10810 },
						]"
					/>
				</div>
			</div>

			<div class="flex-auto w-full">
				<div
					class="mt-12 bg-600 h-4 w-full"
					v-if="
						toggles.animationToggle || !toggles.justClicked || currentItemSelected.currTier.lvlName === 'V'
					"
				></div>
				<transition name="anim">
					<div
						class="mt-12 bg-600 h-4 w-full"
						v-if="
							!toggles.animationToggle && toggles.justClicked && currentItemSelected.currTier.lvlName != 'V'
						"
					></div>
				</transition>
			</div>

			<div class="flex-initial w-24 z-10">
				<div class="mt-6 bg-600 rounded mr-6 p-2 w-20 relative h-16 cursor-pointer">
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
								: currentItemSelected.currTier.lvlName === "END" &&
								  currentItemSelected.information.chance === 1
								? "+3"
								: currentItemSelected.currTier.lvlName === "END"
								? "V"
								: currentItemSelected.currTier.lvlName
						}}</span>
					</p>
				</div>
			</div>
		</div>

		<div id="enhancement" class="m-auto flex" v-else>
			<div id="left-item">
				<img
					:src="'https://assets.garmoth.com/items/' + currentItemSelected.currTier.material.id + '.png'"
					v-if="currentItemSelected.currTier.material"
					:class="[
						'h-12 m-auto rounded-xl absolute top-9 left-9',
						{ 'animate-pulse': currentItemSelected.information.main_key === 10810 },
					]"
				/>
			</div>
			<div id="left-item-line"></div>
			<div id="left-item-line-rombus">
				<img id="rombus-bs" src="BlackSpirit-gray.png" />
			</div>
			<div id="left-item-line-rombus-line"></div>
			<div id="left-item-line-rombus-line-rombus"></div>
			<div id="left-item-line-rombus-line-rombus-line"></div>
			<div id="vertical">
				<div id="v-line"></div>
				<div id="v-line-rombus"></div>
				<div id="v-line-rombus-rombus"></div>
				<div id="v-line-rombus-internal"></div>
				<div id="v-line-rombus-internal-rombus"></div>
				<div id="v-line-semi-circle-circle-one"></div>
				<div id="v-line-semi-circle"></div>
				<div id="v-line-semi-circle-circle-two"></div>
				<div id="v-line-semi-circle-rombus-one"></div>
				<div id="v-line-semi-circle-rombus-two"></div>
				<div id="v-line-semi-circle-rombus-three"></div>
				<div id="v-line-semi-circle-rombus-four"></div>
				<div id="v-line-semi-circle-rombus-five"></div>
				<div id="v-line-semi-circle-rombus-six"></div>
				<div id="v-line-sideways-up"></div>
				<div id="v-line-sideways-down"></div>
			</div>
			<div id="center">
				<div id="v-line-rombus-line"></div>
				<div id="center-line-up"></div>
				<div id="center-line-down"></div>
				<div id="center-rombus"></div>
				<div id="center-rombus-internal">
					<div id="sR" class="relative">
						<p id="success-rate" class="absolute z-10 text-base text-center font-bold">
							{{
								currentItemSelected.currTier.lvlName != "END"
									? displayedItemInformation.chanceOfSuccess + "%"
									: "N/A"
							}}
						</p>
					</div>
				</div>
				<div id="center-right-line-up">
					<img id="bs-right-up" src="BlackSpirit-gray.png" />
				</div>
				<div id="center-right-line-down">
					<img id="bs-right-down" src="BlackSpirit-gray.png" />
				</div>
				<div id="center-top-line-one"></div>
				<div id="center-top-line-two"></div>
				<div id="center-top-line-three"></div>
				<div id="center-top-line-four"></div>
				<div id="center-top-line-five"></div>
				<div id="center-top-line-six"></div>
				<div id="center-top-line-seven"></div>
			</div>
			<div id="center-right-line"></div>
			<div id="right-item-border-up"></div>
			<div id="right-item-border-down"></div>
			<div id="right-item-rombus"></div>
			<div id="right-item-rombus-internal"></div>
			<div id="right-item-border-rombus-up"></div>
			<div id="right-item-border-rombus-down"></div>
			<div id="right-item-border-rombus-right-up"></div>
			<div id="right-item-border-rombus-right-down"></div>
			<div id="right-item-border-rombus-down-up"></div>
			<div id="right-item-border-rombus-down-down"></div>
			<div id="right-item-square"></div>
			<div id="right-item-square-internal">
				<img
					:src="
						currentItemSelected.information.main_key === 0
							? 'BlackSpirit-gray.png'
							: 'https://assets.garmoth.com/items/' + currentItemSelected.information.main_key + '.png'
					"
					:class="[
						'h-11 m-auto rounded-xl',
						{ 'animate-pulse': currentItemSelected.information.main_key === 0 },
					]"
				/>
				<div id="rI" class="relative">
					<p
						class="absolute text-white text-1xl font-semibold w-12 bg-600 bg-opacity-20"
						id="rightItem"
						v-if="currentItemSelected.information.main_key && currentItemSelected.currTier.lvlName != 'V'"
					>
						<span>{{
							currentItemSelected.currTier.lvlName === "BASE"
								? ""
								: currentItemSelected.currTier.lvlName === "END" &&
								  currentItemSelected.information.chance === 1
								? "+3"
								: currentItemSelected.currTier.lvlName === "END"
								? "V"
								: currentItemSelected.currTier.lvlName
						}}</span>
					</p>
				</div>
			</div>
		</div>
	</div>
</template>

<script>
import Enhancing from "../mixins/Enhancing";
import Select from "./Select.vue";

export default {
	name: "ItemView",

	components: {
		Select,
	},

	mixins: [Enhancing],

	data() {
		return {
			window: {
				width: 0,
				height: 0,
			},
		};
	},

	created() {
		window.addEventListener("resize", this.resize);
		this.resize();
	},

	destroyed() {
		window.removeEventListener("resize", this.resize);
	},

	methods: {
		resize() {
			this.window.width = window.innerWidth;
			this.window.height = window.innerHeight;
		},
	},
};
</script>

<style>
#rI {
	width: 60px;
	height: 60px;
	bottom: 53px;
	right: 8px;
	text-align: center;
}

#rombus-bs {
	width: 20px;
	height: 20px;
	position: absolute;
	top: -1px;
	left: -0px;
	z-index: 15;
	transform: rotate(45deg);
}

#bs-right-up {
	width: 20px;
	height: 20px;
	position: absolute;
	top: 10px;
	left: 27px;
	z-index: 15;
	transform: rotate(-45deg);
}

#bs-right-down {
	width: 20px;
	height: 20px;
	position: absolute;
	bottom: 11px;
	left: 27px;
	z-index: 15;
	transform: rotate(45deg);
}

#success-rate {
	top: 50%;
	left: 50%;
	transform: translate(-50%, -50%);
}

#sR {
	width: 60px;
	height: 60px;
	top: -3px;
	right: 3px;
	transform: rotate(45deg);
	text-align: center;
}

#rightItem {
	top: 50%;
	left: 50%;
	transform: translate(-50%, -50%);
}

#enhancement {
	position: relative;
	width: 550px;
	background-attachment: fixed;
	background-position: center;
}

#left-item {
	width: 60px;
	height: 60px;
	margin-top: 30px;
	margin-left: 30px;
	background: #202226;
	border: 3px solid #2b2e32;
	z-index: 4;
}

#left-item-line {
	border: 3px solid #2b2e32;
	margin-left: 90px;
	bottom: 27px;
	position: absolute;
	min-width: 60px;
}

#left-item-line-rombus {
	width: 20px;
	height: 20px;
	border: 1px solid #2b2e32;
	background: #202226;
	/* Rotate */
	-webkit-transform: rotate(-45deg);
	-moz-transform: rotate(-45deg);
	-ms-transform: rotate(-45deg);
	-o-transform: rotate(-45deg);
	transform: rotate(-45deg);
	/* Rotate Origin */
	-webkit-transform-origin: 0 100%;
	-moz-transform-origin: 0 100%;
	-ms-transform-origin: 0 100%;
	-o-transform-origin: 0 100%;
	transform-origin: 0 100%;
	position: absolute;
	left: 161px;
	top: 54px;
	z-index: 4;
}

#left-item-line-rombus-line {
	border: 3px solid #2b2e32;
	left: 172px;
	bottom: 27px;
	position: absolute;
	min-width: 30px;
}

#left-item-line-rombus-line-rombus {
	width: 11px;
	height: 11px;
	background: #202226;
	border: 2px solid #2b2e32;
	/* Rotate */
	-webkit-transform: rotate(-45deg);
	-moz-transform: rotate(-45deg);
	-ms-transform: rotate(-45deg);
	-o-transform: rotate(-45deg);
	transform: rotate(-45deg);
	/* Rotate Origin */
	-webkit-transform-origin: 0 100%;
	-moz-transform-origin: 0 100%;
	-ms-transform-origin: 0 100%;
	-o-transform-origin: 0 100%;
	transform-origin: 0 100%;
	position: absolute;
	left: 207px;
	top: 57px;
	z-index: 4;
}

#left-item-line-rombus-line-rombus-line {
	border: 3px solid #2b2e32;
	left: 212px;
	bottom: 27px;
	position: absolute;
	min-width: 20px;
}

#v-line {
	background: #2b2e32;
	background: linear-gradient(
		180deg,
		rgba(32, 34, 38, 0) 0%,
		rgba(43, 46, 50, 1) 30%,
		rgba(43, 46, 50, 1) 50%,
		rgba(43, 46, 50, 1) 70%,
		rgba(32, 34, 38, 0) 100%
	);
	left: 232px;
	top: 1px;
	position: absolute;
	min-height: 120px;
	width: 5px;
}

#v-line-rombus {
	width: 8px;
	height: 8px;
	background: #202226;
	border: 1px solid #2b2e32;
	/* Rotate */
	-webkit-transform: rotate(-45deg);
	-moz-transform: rotate(-45deg);
	-ms-transform: rotate(-45deg);
	-o-transform: rotate(-45deg);
	transform: rotate(-45deg);
	/* Rotate Origin */
	-webkit-transform-origin: 0 100%;
	-moz-transform-origin: 0 100%;
	-ms-transform-origin: 0 100%;
	-o-transform-origin: 0 100%;
	transform-origin: 0 100%;
	position: absolute;
	left: 234px;
	top: 58px;
	z-index: 4;
}

#v-line-rombus-rombus {
	width: 8px;
	height: 8px;
	background: #202226;
	border: 1px solid #2b2e32;
	/* Rotate */
	-webkit-transform: rotate(-45deg);
	-moz-transform: rotate(-45deg);
	-ms-transform: rotate(-45deg);
	-o-transform: rotate(-45deg);
	transform: rotate(-45deg);
	/* Rotate Origin */
	-webkit-transform-origin: 0 100%;
	-moz-transform-origin: 0 100%;
	-ms-transform-origin: 0 100%;
	-o-transform-origin: 0 100%;
	transform-origin: 0 100%;
	position: absolute;
	left: 244px;
	top: 58px;
	z-index: 4;
}

#v-line-rombus-internal {
	width: 4px;
	height: 4px;
	background: #2b2e32;
	border: 1px solid #2b2e32;
	/* Rotate */
	-webkit-transform: rotate(-45deg);
	-moz-transform: rotate(-45deg);
	-ms-transform: rotate(-45deg);
	-o-transform: rotate(-45deg);
	transform: rotate(-45deg);
	/* Rotate Origin */
	-webkit-transform-origin: 0 100%;
	-moz-transform-origin: 0 100%;
	-ms-transform-origin: 0 100%;
	-o-transform-origin: 0 100%;
	transform-origin: 0 100%;
	position: absolute;
	left: 234px;
	top: 59.2px;
	z-index: 4;
}

#v-line-rombus-internal-rombus {
	width: 4px;
	height: 4px;
	background: #2b2e32;
	border: 1px solid #2b2e32;
	/* Rotate */
	-webkit-transform: rotate(-45deg);
	-moz-transform: rotate(-45deg);
	-ms-transform: rotate(-45deg);
	-o-transform: rotate(-45deg);
	transform: rotate(-45deg);
	/* Rotate Origin */
	-webkit-transform-origin: 0 100%;
	-moz-transform-origin: 0 100%;
	-ms-transform-origin: 0 100%;
	-o-transform-origin: 0 100%;
	transform-origin: 0 100%;
	position: absolute;
	left: 244px;
	top: 59.2px;
	z-index: 4;
}

#v-line-semi-circle {
	width: 50px;
	height: 24px; /* as the half of the width */
	background-color: transparent;
	border-top-left-radius: 110px; /* 100px of height + 10px of border */
	border-top-right-radius: 110px; /* 100px of height + 10px of border */
	border: 3px solid #2b2e32;
	border-bottom: 0;
	position: absolute;
	transform: rotate(90deg);
	left: 219px;
	top: 48px;
}

#v-line-semi-circle-circle-one {
	width: 11px;
	height: 11px;
	border: 1px solid #202226;
	background: #2b2e32;
	-moz-border-radius: 70px;
	-webkit-border-radius: 70px;
	border-radius: 70px;
	position: absolute;
	left: 228px;
	top: 32px;
	z-index: 5;
}

#v-line-semi-circle-circle-two {
	width: 11px;
	height: 11px;
	border: 1px solid #202226;
	background: #2b2e32;
	-moz-border-radius: 70px;
	-webkit-border-radius: 70px;
	border-radius: 70px;
	position: absolute;
	left: 228px;
	top: 77px;
	z-index: 5;
}

#v-line-semi-circle-rombus-one {
	width: 10px;
	height: 10px;
	background: #2b2e32;
	border: 1px solid #2b2e32;
	/* Rotate */
	-webkit-transform: rotate(-45deg);
	-moz-transform: rotate(-45deg);
	-ms-transform: rotate(-45deg);
	-o-transform: rotate(-45deg);
	transform: rotate(-45deg);
	/* Rotate Origin */
	-webkit-transform-origin: 0 100%;
	-moz-transform-origin: 0 100%;
	-ms-transform-origin: 0 100%;
	-o-transform-origin: 0 100%;
	transform-origin: 0 100%;
	position: absolute;
	left: 247px;
	top: 27px;
	z-index: 4;
}

#v-line-semi-circle-rombus-two {
	width: 6px;
	height: 6px;
	background: #2b2e32;
	border: 1px solid #2b2e32;
	/* Rotate */
	-webkit-transform: rotate(-45deg);
	-moz-transform: rotate(-45deg);
	-ms-transform: rotate(-45deg);
	-o-transform: rotate(-45deg);
	transform: rotate(-45deg);
	/* Rotate Origin */
	-webkit-transform-origin: 0 100%;
	-moz-transform-origin: 0 100%;
	-ms-transform-origin: 0 100%;
	-o-transform-origin: 0 100%;
	transform-origin: 0 100%;
	position: absolute;
	left: 247px;
	top: 15px;
	z-index: 4;
}

#v-line-semi-circle-rombus-three {
	width: 3px;
	height: 3px;
	background: #2b2e32;
	border: 1px solid #2b2e32;
	/* Rotate */
	-webkit-transform: rotate(-45deg);
	-moz-transform: rotate(-45deg);
	-ms-transform: rotate(-45deg);
	-o-transform: rotate(-45deg);
	transform: rotate(-45deg);
	/* Rotate Origin */
	-webkit-transform-origin: 0 100%;
	-moz-transform-origin: 0 100%;
	-ms-transform-origin: 0 100%;
	-o-transform-origin: 0 100%;
	transform-origin: 0 100%;
	position: absolute;
	left: 247px;
	top: 7px;
	z-index: 4;
}

#v-line-semi-circle-rombus-four {
	width: 10px;
	height: 10px;
	background: #2b2e32;
	border: 1px solid #2b2e32;
	/* Rotate */
	-webkit-transform: rotate(-45deg);
	-moz-transform: rotate(-45deg);
	-ms-transform: rotate(-45deg);
	-o-transform: rotate(-45deg);
	transform: rotate(-45deg);
	/* Rotate Origin */
	-webkit-transform-origin: 0 100%;
	-moz-transform-origin: 0 100%;
	-ms-transform-origin: 0 100%;
	-o-transform-origin: 0 100%;
	transform-origin: 0 100%;
	position: absolute;
	left: 247px;
	top: 87px;
	z-index: 4;
}

#v-line-semi-circle-rombus-five {
	width: 6px;
	height: 6px;
	background: #2b2e32;
	border: 1px solid #2b2e32;
	/* Rotate */
	-webkit-transform: rotate(-45deg);
	-moz-transform: rotate(-45deg);
	-ms-transform: rotate(-45deg);
	-o-transform: rotate(-45deg);
	transform: rotate(-45deg);
	/* Rotate Origin */
	-webkit-transform-origin: 0 100%;
	-moz-transform-origin: 0 100%;
	-ms-transform-origin: 0 100%;
	-o-transform-origin: 0 100%;
	transform-origin: 0 100%;
	position: absolute;
	left: 247px;
	top: 101px;
	z-index: 4;
}

#v-line-semi-circle-rombus-six {
	width: 3px;
	height: 3px;
	background: #2b2e32;
	border: 1px solid #2b2e32;
	/* Rotate */
	-webkit-transform: rotate(-45deg);
	-moz-transform: rotate(-45deg);
	-ms-transform: rotate(-45deg);
	-o-transform: rotate(-45deg);
	transform: rotate(-45deg);
	/* Rotate Origin */
	-webkit-transform-origin: 0 100%;
	-moz-transform-origin: 0 100%;
	-ms-transform-origin: 0 100%;
	-o-transform-origin: 0 100%;
	transform-origin: 0 100%;
	position: absolute;
	left: 247px;
	top: 111px;
	z-index: 4;
}

#v-line-sideways-up {
	left: 238px;
	bottom: 47px;
	position: absolute;
	min-width: 40px;
	transform: rotate(-45deg);
	background: rgb(43, 46, 50);
	background: linear-gradient(
		90deg,
		rgba(43, 46, 50, 1) 0%,
		rgba(43, 46, 50, 1) 10%,
		rgba(32, 34, 38, 0) 100%
	);
	height: 2px;
}

#v-line-sideways-down {
	left: 238px;
	bottom: 10.5px;
	position: absolute;
	min-width: 40px;
	transform: rotate(45deg);
	background: rgb(43, 46, 50);
	background: linear-gradient(
		90deg,
		rgba(43, 46, 50, 1) 0%,
		rgba(43, 46, 50, 1) 10%,
		rgba(32, 34, 38, 0) 100%
	);
	height: 2px;
}

#v-line-rombus-line {
	border: 3px solid #2b2e32;
	left: 246px;
	bottom: 27px;
	position: absolute;
	min-width: 20px;
	z-index: 0;
}

#center-line-up {
	border: 2px solid #2b2e32;
	background: #202226;
	transform: rotate(-45deg);
	left: 260px;
	bottom: 36px;
	position: absolute;
	min-width: 30px;
	height: 5px;
}

#center-line-down {
	border: 2px solid #2b2e32;
	background: #202226;
	transform: rotate(45deg);
	left: 260px;
	bottom: 18px;
	position: absolute;
	min-width: 30px;
	height: 5px;
}

#center-rombus {
	width: 70px;
	height: 70px;
	background: #202226;
	border: 3px solid #2b2e32;
	/* Rotate */
	-webkit-transform: rotate(-45deg);
	-moz-transform: rotate(-45deg);
	-ms-transform: rotate(-45deg);
	-o-transform: rotate(-45deg);
	transform: rotate(-45deg);
	/* Rotate Origin */
	-webkit-transform-origin: 0 100%;
	-moz-transform-origin: 0 100%;
	-ms-transform-origin: 0 100%;
	-o-transform-origin: 0 100%;
	transform-origin: 0 100%;
	position: absolute;
	left: 327px;
	top: 40px;
	z-index: 4;
}

#center-rombus-internal {
	width: 55px;
	height: 55px;
	background: #202226;
	background: linear-gradient(
		35deg,
		rgba(43, 46, 50, 1) 0%,
		rgba(43, 46, 50, 1) 1%,
		rgba(32, 34, 38, 0) 100%
	);
	border: 1px solid #2b2e32;
	/* Rotate */
	-webkit-transform: rotate(-45deg);
	-moz-transform: rotate(-45deg);
	-ms-transform: rotate(-45deg);
	-o-transform: rotate(-45deg);
	transform: rotate(-45deg);
	/* Rotate Origin */
	-webkit-transform-origin: 0 100%;
	-moz-transform-origin: 0 100%;
	-ms-transform-origin: 0 100%;
	-o-transform-origin: 0 100%;
	transform-origin: 0 100%;
	position: absolute;
	left: 327px;
	top: 44px;
	z-index: 4;
}

#center-right-line-up {
	border: 2px solid #2b2e32;
	background: #202226;
	transform: rotate(45deg);
	left: 364px;
	bottom: 36px;
	position: absolute;
	min-width: 30px;
	height: 5px;
	z-index: 3;
}

#center-right-line-down {
	border: 2px solid #2b2e32;
	background: #202226;
	transform: rotate(-45deg);
	left: 364px;
	bottom: 18px;
	position: absolute;
	min-width: 30px;
	height: 5px;
	z-index: 3;
}

#center-top-line-one {
	border: 1px solid #2b2e32;
	transform: rotate(45deg);
	left: 285px;
	bottom: 66px;
	position: absolute;
	min-width: 20px;
}

#center-top-line-two {
	border: 1px solid #2b2e32;
	transform: rotate(45deg);
	left: 287px;
	bottom: 75px;
	position: absolute;
	min-width: 25px;
}

#center-top-line-three {
	border: 1px solid #2b2e32;
	transform: rotate(45deg);
	left: 300px;
	bottom: 78px;
	position: absolute;
	min-width: 18px;
}

#center-top-line-four {
	border: 1px solid #2b2e32;
	transform: rotate(90deg);
	left: 323px;
	bottom: 83.5px;
	position: absolute;
	min-width: 8px;
}

#center-top-line-five {
	border: 1px solid #2b2e32;
	transform: rotate(-45deg);
	left: 349px;
	bottom: 66px;
	position: absolute;
	min-width: 20px;
}

#center-top-line-six {
	border: 1px solid #2b2e32;
	transform: rotate(-45deg);
	left: 342px;
	bottom: 75px;
	position: absolute;
	min-width: 25px;
}

#center-top-line-seven {
	border: 1px solid #2b2e32;
	transform: rotate(-45deg);
	left: 335px;
	bottom: 78px;
	position: absolute;
	min-width: 18px;
}

#center-right-line {
	border: 3px solid #2b2e32;
	left: 386px;
	bottom: 27px;
	position: absolute;
	min-width: 20px;
	z-index: 0;
}

#right-item-border-up {
	border: 2px solid #2b2e32;
	background: #202226;
	transform: rotate(-45deg);
	left: 400px;
	bottom: 38px;
	position: absolute;
	min-width: 40px;
	height: 7px;
}

#right-item-border-down {
	border: 2px solid #2b2e32;
	background: #202226;
	transform: rotate(45deg);
	left: 400px;
	bottom: 15px;
	position: absolute;
	min-width: 40px;
	height: 7px;
}

#right-item-rombus {
	width: 70px;
	height: 70px;
	background: #202226;
	border: 1px solid #2b2e32;
	/* Rotate */
	-webkit-transform: rotate(-45deg);
	-moz-transform: rotate(-45deg);
	-ms-transform: rotate(-45deg);
	-o-transform: rotate(-45deg);
	transform: rotate(-45deg);
	/* Rotate Origin */
	-webkit-transform-origin: 0 100%;
	-moz-transform-origin: 0 100%;
	-ms-transform-origin: 0 100%;
	-o-transform-origin: 0 100%;
	transform-origin: 0 100%;
	position: absolute;
	left: 462px;
	top: 39px;
	z-index: 4;
}

#right-item-rombus-internal {
	width: 62px;
	height: 62px;
	background: #202226;
	border: 3px solid #2b2e32;
	/* Rotate */
	-webkit-transform: rotate(-45deg);
	-moz-transform: rotate(-45deg);
	-ms-transform: rotate(-45deg);
	-o-transform: rotate(-45deg);
	transform: rotate(-45deg);
	/* Rotate Origin */
	-webkit-transform-origin: 0 100%;
	-moz-transform-origin: 0 100%;
	-ms-transform-origin: 0 100%;
	-o-transform-origin: 0 100%;
	transform-origin: 0 100%;
	position: absolute;
	left: 462px;
	top: 41.5px;
	z-index: 4;
}

#right-item-border-rombus-up {
	border: 2px solid #2b2e32;
	background: #202226;
	transform: rotate(-45deg);
	left: 438px;
	bottom: 72px;
	position: absolute;
	min-width: 30px;
	height: 7px;
	z-index: 4;
}

#right-item-border-rombus-down {
	border: 2px solid #2b2e32;
	background: #202226;
	transform: rotate(45deg);
	left: 455px;
	bottom: 72px;
	position: absolute;
	min-width: 30px;
	height: 7px;
}

#right-item-border-rombus-down-up {
	border: 2px solid #2b2e32;
	background: #202226;
	transform: rotate(-45deg);
	left: 455px;
	bottom: -19px;
	position: absolute;
	min-width: 30px;
	height: 7px;
	z-index: 4;
}

#right-item-border-rombus-down-down {
	border: 2px solid #2b2e32;
	background: #202226;
	transform: rotate(45deg);
	left: 438.5px;
	bottom: -18.6px;
	position: absolute;
	min-width: 30px;
	height: 7px;
}

#right-item-border-rombus-right-up {
	border: 2px solid #2b2e32;
	background: #202226;
	transform: rotate(45deg);
	left: 484px;
	bottom: 38px;
	position: absolute;
	min-width: 40px;
	height: 7px;
	z-index: 4;
}

#right-item-border-rombus-right-down {
	border: 2px solid #2b2e32;
	background: #202226;
	transform: rotate(-45deg);
	left: 483.3px;
	bottom: 14px;
	position: absolute;
	min-width: 40px;
	height: 7px;
}

#right-item-square {
	width: 55px;
	height: 55px;
	background: #202226;
	border: 1px solid #2b2e32;
	transform-origin: 0 100%;
	position: absolute;
	left: 434px;
	top: 33px;
	z-index: 6;
}

#right-item-square-internal {
	width: 50px;
	height: 50px;
	background: #202226;
	border: 3px solid #2b2e32;
	position: absolute;
	left: 436.5px;
	top: 35.5px;
	z-index: 7;
}
</style>
