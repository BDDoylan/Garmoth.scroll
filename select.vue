<template>
    <div class="flex gap-2">
        <!-- IMAGE -->
        <div v-if="image" class="flex-none flex items-center justify-center h-12 w-12 bg-700 p-1">
            <img :src="result !== null ? url + result + '.png' : defaultImage" alt="">
        </div>

        <div class="flex-grow">
            <!-- SEARCH -->
            <div @mousedown="enableDropdown" @mouseup="selectSearch" class="w-full">
                <input v-if="open" :id="id" type="text" :placeholder="placeholderOrValue" class="w-full" v-model="search" @blur="disableDropdown">

                <div v-else class="w-full py-2 px-4 rounded bg-700 border-4 border-700 font-semibold hover:bg-opacity-50 border-opacity-0">
                    <span :class="['block h-6', { 'text-200': !value }]">{{ placeholderOrValue }}</span>
                </div>
            </div>

            <!-- DROPDOWN -->
            <div v-if="open" class="relative">
                <ul class="bg-700 absolute z-50 top-0 right-0 left-0 rounded overflow-auto" style="max-height: 20rem;">
                    <li v-for="(option, i) in filteredOptions" role="option" :key="i" @mousedown="updateValue(option)" class="border-b border-600 p-1 cursor-pointer hover:bg-600 hover:bg-opacity-50">
                        <slot name="option" :option="option"></slot>
                    </li>
                </ul>
            </div>

        </div>
    </div>
</template>
<script>
export default {
    data() {
        return {
            search: '',
            value: null,
            open: false,
            id: 'select-' + this.generateId(24),
            result: null,
        }
    },

    props: {
        placeholder: {
            default: '',
            type: String
        },
        // Label is the object attribute that are used to search
        label: {
            default: 'name',
            type: String
        },

        url: {
            default: 'https://assets.garmoth.com/items/',
            type: String
        },

        defaultImage: {
            default: '',
            type: String
        },

        image: {
            default: false,
            type: Boolean
        },

        options: {
            default: [],
            type: Array
        },

        reduce: {
            type: Function,
            default: (option) => option,
        },

        modelValue: {}
    },

    created() {
        this.setInternalValueFromOptions(this.modelValue)
    },

    methods: {
        updateValue(value) {
            this.value = value

            if (value !== null && value !== undefined) {
                if (Array.isArray(value)) {
                    value = value.map((val) => this.reduce(val))
                } else {
                    value = this.reduce(value)
                }
            } else {
                value = null
            }

            this.$emit('update:modelValue', value)

            this.result = value

            this.disableDropdown()
        },

        enableDropdown() {
            this.open = true
        },

        disableDropdown() {
            this.open = false

            this.search = ''
        },

        selectSearch() {
            this.$nextTick(() => {
                document.getElementById(this.id).select()
            });
        },

        generateId(length) {
            var result = '';
            var characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
            var charactersLength = characters.length;
            for (var i = 0; i < length; i++) {
                result += characters.charAt(Math.floor(Math.random() *
                    charactersLength));
            }
            return result;
        },

        setInternalValueFromOptions(value) {
            if (Array.isArray(value)) {
                this.value = value.map((val) => this.updateValue(this.findOptionFromReducedValue(val)))
            } else {
                this.updateValue(this.findOptionFromReducedValue(value))
            }
        },

        findOptionFromReducedValue(value) {
            const predicate = (option) => JSON.stringify(this.reduce(option)) === JSON.stringify(value)

            const matches = [...this.options].filter(predicate)

            if (matches.length === 1) {
                return matches[0]
            }
        },
    },

    computed: {
        filteredOptions() {
            return this.options.filter(option => {
                return option[this.label].toUpperCase().indexOf(this.search.toUpperCase()) > -1
            })
        },

        placeholderOrValue() {
            return this.value ? this.value[this.label] : this.placeholder
        }
    }
}
</script>
