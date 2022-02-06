<template>
	<div>
		<div class="mt-1 relative w-75 ml-4">
			<div
				class="w-full bg-600 shadow-sm pl-3 pr-10 py-2 text-left focus:outline-none rounded"
			>
				<div class="flex items-center">
					<input
						@click="toggle = true"
						placeholder="Select Item!"
						v-model="searchItem"
						spellcheck="false"
						class="w-full p-2 bg-600 h-7 text-left focus:outline-none"
					/>
				</div>
				<div
					@click="toggle = !toggle"
					class="mr-5 mt-1 absolute inset-y-0 right-0 text-green font-semibold cursor-pointer"
				>
					<span v-if="toggle" class="mb-1">v</span
					><span v-else class="text-red">></span>
				</div>
			</div>
			<div
				v-if="toggle"
				class="absolute z-10 mt-1 w-full bg-600 shadow-lg max-h-56 rounded-md py-1 text-base overflow-auto focus:outline-none"
			>
				<ul v-for="item in filteredOptions" :key="item.main_key">
					<li :class="['relative py-2 pl-3 pr-9 hover:bg-500 cursor-pointer']">
						<div @change="selectedItem = item" class="flex items-center">
							<img
								:src="
									'https://assets.garmoth.com/items/' + item.main_key + '.png'
								"
								alt=""
								class="flex-shrink-0 h-6 w-6 rounded-full"
							/>
							<span :class="['ml-3 block text-base truncate text-red']">
								{{ item.name }}
							</span>
						</div>
					</li>
				</ul>
			</div>
		</div>
	</div>
</template>

<script>
export default {
	name: "Select",

	created() {
		//this.selected = this.storage.items[0];
	},

	data() {
		return {
			searchItem: '',
			selectedItem: {},

			toggle: false,
		};
	},

	computed: {
		storage: {
			get() {
				return this.$store.state.enchance.storage;
			},
			set(value) {
				this.$store.commit("SET_ENCHANCE_STORAGE", value);
			},
		},

		filteredOptions() {
			return (this.storage.items.filter(item => {
				return item.name.toLowerCase().includes(this.searchItem.toLowerCase())
			})).slice(0, 100)
		},
	},
};
</script>
