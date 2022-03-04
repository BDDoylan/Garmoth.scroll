<template>
	<HeaderInformation />
	<div class="grid grid-cols-2 gap-4 mx-4 pb-3 lg:grid-cols-8">
		<Stats />
		<div class="bg-600 text-0 rounded h-auto text-xl relative px-2 pt-2 col-span-4 row-span-2">
			<ItemView />
			<FailstackPrep />
			<DisplayedItemInfo />
		</div>
		<Simulations />
		<ChanceCalculator />
	</div>
	<div class="grid grid-cols-1 lg:grid-cols-2 gap-4 px-4 py-1">
		<TierChart />
		<SilverChart />
	</div>
</template>

<script>
import HeaderInformation from "../EnhancingComponents/HeaderInformation.vue";
import Stats from "../EnhancingComponents/Stats.vue";
import ItemView from "../EnhancingComponents/ItemView.vue";
import FailstackPrep from "../EnhancingComponents/FailstackPrep.vue";
import DisplayedItemInfo from "../EnhancingComponents/DisplayedItemInfo.vue";
import Simulations from "../EnhancingComponents/Simulations.vue";
import ChanceCalculator from "../EnhancingComponents/ChanceCalculator.vue";
import TierChart from "../EnhancingComponents/TierChart.vue";
import SilverChart from "../EnhancingComponents/SilverChart.vue";

export default {
	name: "EnchancingCalculator",
	components: {
		HeaderInformation,
		Stats,
		ItemView,
		FailstackPrep,
		DisplayedItemInfo,
		Simulations,
		ChanceCalculator,
		TierChart,
		SilverChart,
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
