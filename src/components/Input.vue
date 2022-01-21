<template>
	<input
		class="text-center rounded bg-700 text-0 p-1 focus:outline-none"
		ref="inputRef"
		type="text"
	/>
</template>

<script>
import { useCurrencyInput } from "vue-currency-input";

export default {
	name: "Input",
	props: {
		modelValue: Number,
		options: Object,
	},
	setup(props) {
		const { inputRef } = useCurrencyInput(props.options);

		return { inputRef };
	},
};
</script>
