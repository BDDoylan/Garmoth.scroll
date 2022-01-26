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
    },

    data() {
        return {
            vF: this.modelValue
        };
    },
    methods: {
        format(value) {
            var nStr = value + ''
            nStr = nStr.replace(/\,/g, "")
            let x = nStr.split('.')
            let x1 = x[0]
            let x2 = x.length > 1 ? '.' + x[1] : ''
            var rgx = /(\d+)(\d{3})/
            while (rgx.test(x1)) {
                x1 = x1.replace(rgx, '$1' + ',' + '$2')
            }
            return x1 + x2
        }
    },
    computed: {
        value: {
            get() {
                return this.vF;
            },
            set(num) {
                this.vF = this.format(num.toString())
            },
        },
    },
};
</script>
