<template>
	<div class="text-center">
		<div class="bg-600 text-0 rounded h-auto text-xl relative p-4 pb-8">
			<div class="flex justify-center items-center my-1">
				<img
					:src="'https://assets.garmoth.com/items/' + scroll.fullIconKey + '.png'"
					:class="[
						'inline object-scale-down h-9 relative mr-2 mt-5',
						{ 'mt-6': !toggle },
					]"
				/>
				<h1 :class="['font-bold text-2xl mt-6', { 'text-4xl mt-6': !toggle }]">
					{{ scroll.name }}
				</h1>
			</div>

			<input
				type="number"
				placeholder="Seconds Per Scroll"
				v-if="toggle"
				v-model="scroll.secondsPerScroll"
				class="text-center rounded bg-700 text-0 my-2 p-1 focus:outline-none"
			/>
			<div></div>
			<div class="hover:bg-700 rounded inline-block py-2 px-4" @click="dropsToggle = !dropsToggle">
				<h1 v-for="(item, key) in dropsRender" :key="key" class="">
					Average
					<img
						:src="'https://assets.garmoth.com/items/' + item.key + '.png'"
						class="inline object-scale-down h-6"
					/>
					per scroll:
					<span class="font-bold text-red">{{ item.dropRate }}</span>
				</h1>
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
				<h2 class="py-3">
					Number of
					<img
						:src="
							'https://assets.garmoth.com/items/' + scroll.main_key + '.png'
						"
						class="inline object-scale-down h-6"
					/>
					for 1 hour: <span class="text-green">{{ numPartsPerHour }}</span>
				</h2>
			</div>
			<div class="bg-600 text-0 rounded h-56 text-xl relative">
				<h2 class="py-3">
					Average silver spent per
					<img
						:src="
							'https://assets.garmoth.com/items/' + scroll.main_key + '.png'
						"
						class="inline object-scale-down h-6"
					/>
					:
				</h2>
				<input
					type="number"
					placeholder="Silver"
					v-model="costPerPiece"
					class="text-center rounded bg-700 text-0 my-2 p-1 focus:outline-none"
				/>
				<h2 class="py-3">
					Average silver per
					<img
						:src="'https://assets.garmoth.com/items/44195.png'"
						class="inline object-scale-down h-6"
					/>
					:
				</h2>
				<input
					type="number"
					placeholder="Silver"
					v-model="memoryPrice"
					class="text-center rounded bg-700 text-0 my-2 p-1 focus:outline-none"
				/>
			</div>
			<div class="bg-600 text-0 rounded h-56 text-xl relative">
				<h1 class="text-green text-2xl mt-2 p-4 font-bold">PROFITS</h1>
				<div>
					<div class="bg-700 text-0 rounded w-auto mx-12 p-4">
						<h1>{{ profitPerScroll.toLocaleString() }} per scroll</h1>
					</div>
					<div class="bg-700 text-0 rounded w-auto mx-12 mt-4 p-4">
						<h1>
							{{ (profitPerScroll * (numPartsPerHour / 5)).toLocaleString() }}
							per hour
						</h1>
					</div>
				</div>
			</div>
		</div>
	</div>
</template>

<script>
export default {
	props: {
		scroll: { required: true },
		prices: { required: true },
		keep: { required: true },
		tax: { required: true },
	},

	data() {
		return {
			toggle: false,

			dropsToggle: false,

			fullIcon: this.scroll.fullIcon,
			partIcon: this.scroll.partIcon,

			costPerPiece: this.prices[this.scroll.main_key].sub_items[0].price,
			memoryPrice: this.prices[44195].sub_items[0].price,
		};
	},

	computed: {
		numPartsPerHour() {
			return Math.round((3600 / this.scroll.secondsPerScroll) * 5);
		},

		profitPerScroll() {
			if (this.keep) {
				return (
					this.scroll.drops[0].dropRate * this.memoryPrice - this.costPerPiece * 5
				);
			} else {
				return (
					this.scroll.drops[0].dropRate * this.memoryPrice * this.tax -
					this.costPerPiece * 5
				);
			}
		},

		dropsRender() {
			if (this.dropsToggle) {
				return this.scroll.drops;
			}
			return [this.scroll.drops[0]];
		},
	},
};
</script>
