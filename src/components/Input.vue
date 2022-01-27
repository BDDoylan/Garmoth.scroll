<template>
	<input
		class="text-center rounded bg-700 text-0 p-1 focus:outline-none"
		type="text"
		v-model="value"
	/>
</template>

<script>
export default {
	name: "Input",
	props: {
		modelValue: Number,
		valueName: String,
	},

	data() {
		return {
			valueF: null,
		};
	},

	mounted() {
		if (this.valueName === "itemRates") {
			this.valueF = this.modelValue;
		} else if (this.valueName === "seconds") {
			this.valueF = this.modelValue;
		} else {
			this.valueF = this.modelValue.toLocaleString();
		}
	},

	computed: {
		value: {
			get() {
				return this.valueF;
			},

			set(num) {
				this.valueF = this.formatter(num);
				this.$emit("update:modelValue", Number(this.valueF.replace(/\,/g, "")));
			},
		},
	},

	methods: {
		formatter(number) {
			number = number.replace(/\,/g, "");

			let seperator = number.split(".");
			let digits = seperator[0];
			let decimals = seperator.length > 1 ? "." + seperator[1] : "";

			const regex = /(\d+)(\d{3})/;

			while (regex.test(digits)) {
				digits = digits.replace(regex, "$1" + "," + "$2");
			}

			return digits + decimals;
		},
	},
};
</script>
