<template>
	<Modal id="fsDefaults">
		<div class="mt-1 relative w-full">
			<div class="w-full bg-600 shadow-sm pl-3 p-3 py-2 text-left focus:outline-none rounded">
				<div class="text-xl text-white mb-2">
					<p :class="{ 'text-green': useFsDefaultsToggle, 'text-red': !useFsDefaultsToggle }">
						Use FS Defaults
					</p>
					<label class="switch ml-9 my-2"
						><input @click="useFsDefaultsToggle = !useFsDefaultsToggle" type="checkbox" />
						<span class="slider round"></span
					></label>
				</div>
				<div class="text-center text-white text-xl">
					<p class="bg-700 w-12 p-1 mb-1 inline-block">+7</p>
					:
					<input
						class="w-16 p-2 bg-400 h-8 text-center focus:outline-none"
						type="number"
						v-model="fsDefaults.seven"
					/>
					<br />
					<p class="bg-700 w-12 p-1 mb-1 inline-block">+8</p>
					:
					<input
						class="w-16 p-2 bg-400 h-8 text-center focus:outline-none"
						type="number"
						v-model="fsDefaults.eight"
					/>
					<br />
					<p class="bg-700 w-12 p-1 mb-1 inline-block">+9</p>
					:
					<input
						class="w-16 p-2 bg-400 h-8 text-center focus:outline-none"
						type="number"
						v-model="fsDefaults.nine"
					/>
					<br />
					<p class="bg-700 w-12 p-1 mb-1 inline-block">+10</p>
					:
					<input
						class="w-16 p-2 bg-400 h-8 text-center focus:outline-none"
						type="number"
						v-model="fsDefaults.ten"
					/>
					<br />
					<p class="bg-700 w-12 p-1 mb-1 inline-block">+11</p>
					:
					<input
						class="w-16 p-2 bg-400 h-8 text-center focus:outline-none"
						type="number"
						v-model="fsDefaults.eleven"
					/>
					<br />
					<p class="bg-700 w-12 p-1 mb-1 inline-block">+12</p>
					:
					<input
						class="w-16 p-2 bg-400 h-8 text-center focus:outline-none"
						type="number"
						v-model="fsDefaults.twelve"
					/>
					<br />
					<p class="bg-700 w-12 p-1 mb-1 inline-block">+13</p>
					:
					<input
						class="w-16 p-2 bg-400 h-8 text-center focus:outline-none"
						type="number"
						v-model="fsDefaults.thirteen"
					/>
					<br />
					<p class="bg-700 w-12 p-1 mb-1 inline-block">+14</p>
					:
					<input
						class="w-16 p-2 bg-400 h-8 text-center focus:outline-none"
						type="number"
						v-model="fsDefaults.fourteen"
					/>
					<br />
					<p class="bg-700 w-12 p-1 mb-1 inline-block">+15</p>
					:
					<input
						class="w-16 p-2 bg-400 h-8 text-center focus:outline-none"
						type="number"
						v-model="fsDefaults.fifteen"
					/>
					<br />
					<p class="bg-700 w-12 p-1 mb-1 inline-block">I</p>
					:
					<input
						class="w-16 p-2 bg-400 h-8 text-center focus:outline-none"
						type="number"
						v-model="fsDefaults.pri"
					/>
					<br />
					<p class="bg-700 w-12 p-1 mb-1 inline-block">II</p>
					:
					<input
						class="w-16 p-2 bg-400 h-8 text-center focus:outline-none"
						type="number"
						v-model="fsDefaults.duo"
					/>
					<br />
					<p class="bg-700 w-12 p-1 mb-1 inline-block">III</p>
					:
					<input
						class="w-16 p-2 bg-400 h-8 text-center focus:outline-none"
						type="number"
						v-model="fsDefaults.tri"
					/>
					<br />
					<p class="bg-700 w-12 p-1 mb-2 inline-block">IV</p>
					:
					<input
						class="w-16 p-2 bg-400 h-8 text-center focus:outline-none"
						type="number"
						v-model="fsDefaults.tet"
					/>
				</div>
			</div>
		</div>
	</Modal>
</template>

<script>
import Modal from "./Modal.vue";

export default {
	name: "FSDefaults",

	components: { Modal },

	emits: [],

	data() {
		return {
			useFsDefaultsToggle: false,

			fsDefaults: {
				seven: null,
				eight: null,
				nine: null,
				ten: null,
				eleven: null,
				twelve: null,
				thirteen: null,
				fourteen: null,
				fifteen: null,
				pri: null,
				duo: null,
				tri: null,
				tet: null,
			},
		};
	},

	computed: {},

	methods: {},
};
</script>
