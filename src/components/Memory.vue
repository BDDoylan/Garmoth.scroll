<template>
	<div class="text-center">
		<div class="bg-600 text-0 rounded h-44 text-xl relative">
			<h1
				class="my-3 pt-4 font-bold text-2xl"
				:class="!toggle && 'text-4xl pt-11'"
			>
				<img
					src="../assets/ancient_relic_crystal_summon_scroll.png"
					class="inline object-scale-down h-9 relative bottom-2"
				/>{{ scroll.name }}
			</h1>
			<input
				type="number"
				placeholder="Seconds Per Scroll"
				v-if="toggle"
				v-model="scroll.secondsPerScroll"
				class="text-center rounded bg-700 text-0 my-2 p-1 focus:outline-none"
			/>
			<div class="mt-2">
				<h1>
					Average
					<img
						src="../assets/memory_fragment.png"
						class="inline object-scale-down h-6"
					/>
					per scroll:
					<span class="font-bold text-red">{{ scroll.memoryFragment }}</span>
				</h1>
			</div>
			<button
				@click="toggle = !toggle"
				class="absolute top-0 right-5 text-5xl text-green rounded bg-700 w-10"
			>
				+
			</button>
			<button
				@click="toggle = !toggle"
				v-show="toggle"
				class="absolute top-0 right-5 text-5xl text-red rounded bg-700 w-10"
			>
				-
			</button>
		</div>
		<div
			v-show="toggle"
			class="sm:col-start-1 sm:col-end-2 xxs:row-start-2 mt-2"
		>
			<div class="bg-600 text-0 rounded h-13 text-xl relative mb-2">
				<h2 class="py-3">
					Number of
					<img
						src="../assets/ancient_relic_crystal_shard.png"
						class="inline object-scale-down h-6"
					/>
					for 1 hour: <span class="text-green">{{ numPartsPerHour }}</span>
				</h2>
			</div>
			<div class="bg-600 text-0 rounded h-56 text-xl relative">
				<h2 class="py-3">
					Average silver spent per
					<img
						src="../assets/ancient_relic_crystal_shard.png"
						class="inline object-scale-down h-6"
					/>
					:
				</h2>
				<input
					type="number"
					placeholder="Silver"
					v-model="scroll.costPerPiece/*prices[scroll.main_key].sub_items[0].price*/"
					class="text-center rounded bg-700 text-0 my-2 p-1 focus:outline-none"
				/>
				<h2 class="py-3">
					Average silver per
					<img
						src="../assets/memory_fragment.png"
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
		memoryPrice: { required: true },
		keep: { required: true },
		tax: { required: true },
	},

	data() {
		return {
			toggle: false,
		};
	},
    
	computed: {
		numPartsPerHour() {
			return Math.round((3600 / this.scroll.secondsPerScroll) * 5);
		},

		profitPerScroll() {
			if (this.keep) {
				return (
					this.scroll.memoryFragment * this.memoryPrice -
					this.scroll.costPerPiece * 5
				);
			} else {
				return (
					this.scroll.memoryFragment * this.memoryPrice * this.tax -
					this.scroll.costPerPiece * 5
				);
			}
		},
	},
};
</script>
