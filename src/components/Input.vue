<template>
	<input
		class="text-center rounded bg-700 text-0 p-1 focus:outline-none"
		type="text"
		v-model="value"
	/>
</template>

<script>
//import { useCurrencyInput } from "vue-currency-input";

export default {
	name: "Input",
	props: {
		modelValue: Number,
		//options: Object,
	},

	// setup(props) {
	// 	const { inputRef } = useCurrencyInput(props.options);

	// 	return { inputRef };
	// },

	data() {
		return {
			vF: this.modelValue.toLocaleString('en-US'),
		};
	},
	computed: {
		value: {
			get() {
				console.log(this.vF)
				return this.vF;
			},

			set(num) {
				this.vF = num.toString().replace(/(\d)(?=(\d{3})+$)/g, '1,');
				//this.$emit("getFormatted", vF);
			},
		},
	},
};
</script>
