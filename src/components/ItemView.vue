<template>
	<div class="flex bg-700 text-0 rounded h-28 2xl:h-28 text-center" @click="open('itemSelector')">
		<Select />

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
		</div>

		<div class="flex-auto w-full">
			<div
				class="mt-12 bg-600 h-4 w-full"
				v-if="toggles.animationToggle || !toggles.justClicked || currentItemSelected.currTier.lvlName === 'V'"
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
							: currentItemSelected.currTier.lvlName === "END" && currentItemSelected.information.chance === 1
							? "+3"
							: currentItemSelected.currTier.lvlName === "END"
							? "V"
							: currentItemSelected.currTier.lvlName
					}}</span>
				</p>
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
};
</script>
