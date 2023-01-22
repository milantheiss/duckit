<template>
	<input
		class="w-full align-middle px-1.5 py-0.5 shadow text-inherit bg-inherit ease-in-out duration-200 focus:border-indigo-500 focus:ring-indigo-500 placeholder:text-gray-200 rounded-md"
		:class="_showError ? 'border-2 border-special-red' : 'border-1 border-gray-300'" type="number" :name="name"
		v-model="input" :placeholder="placeholder" :max="max" :min="min" :step="step" />
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
		modelValue: Number,
		placeholder: {
			type: String,
			default: 'Eingabe'
		},
		name: String,
		type: {
			type: String,
			required: false,
			default: 'text'
		},
		max: String,
		min: String,
		step: Number
	},
	emits: ['update:modelValue', 'onChange', 'on'],
	watch: {
		input(newVal, oldVal) {
			if (newVal > this.min && newVal < this.max) {
				this.hideError()
				this.$emit('update:modelValue', newVal)
			} else {				
				this.showError()
				this.$emit('update:modelValue', oldVal)
			}
		},
		modelValue() {
			this.input = this.modelValue
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

<style scoped>
input[type='number']::-webkit-inner-spin-button,
input[type='number']::-webkit-outer-spin-button {
	opacity: 0;
}

input[type='number'] {
	background-image: url('data:image/svg+xml,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20fill%3D%22none%22%20viewBox%3D%220%200%2024%2024%22%20stroke-width%3D%221.5%22%20stroke%3D%22currentColor%22%20class%3D%22w-6%20h-6%22%3E%0A%20%20%3Cpath%20stroke-linecap%3D%22round%22%20stroke-linejoin%3D%22round%22%20d%3D%22M8.25%2015L12%2018.75%2015.75%2015m-7.5-6L12%205.25%2015.75%209%22%20%2F%3E%0A%3C%2Fsvg%3E%0A');
	background-repeat: no-repeat, no-repeat;
	background-size: 1.9rem, 1.9rem;
	background-position: right;
}

input::-webkit-date-and-time-value {
	text-align: left;
}
</style>
