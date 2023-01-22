<template>
	<input
		class="block w-full align-middle px-1.5 py-0.5 text-inherit bg-inherit ease-in-out duration-200 shadow focus:border-indigo-500 focus:ring-indigo-500 rounded-md"
		:class="
			_showError
				? 'border-2 border-special-red'
				: 'border-1 border-gray-300'
		" :type="type" :name="name" v-model="input" :placeholder="placeholder" />
</template>

<script>
export default {
	name: 'TextInput',
	data() {
		return {
			input: this.modelValue,
			_showError: false
		}
	},
	props: {
		modelValue: String,
		placeholder: {
			type: String,
			default: 'Eingabe'
		},
		name: String,
		type: {
			type: String,
			required: false,
			default: 'text'
		}
	},
	emits: ['update:modelValue', 'onChange', 'on'],
	watch: {
		input() {
			this.$emit('update:modelValue', this.input)
		},
		modelValue(newVal) {
			this.input = newVal
		}
	},
	expose: ['showError', 'hideError'],
	methods: {
		showError() {
			this._showError = true;
		},
		hideError() {
			this._showError = false;
		}
	}
}
</script>
