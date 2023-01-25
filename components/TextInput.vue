<template>
	<input
		class="block w-full align-middle px-2.5 border-none shadow-input-field py-0.5 text-inherit bg-zinc-100 ease-in-out duration-200 focus:border-indigo-500 focus:ring-indigo-500 rounded-md"
		:class="
			_showError
				? 'shadow-input-field-error '
				: ''
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
