<template>
	<select
		v-model="selected"
		class="block w-full align-middle px-1.5 py-0.5 text-inherit bg-inherit ease-in-out duration-200 shadow focus:border-indigo-500 focus:ring-indigo-500 rounded-md cursor-pointer"
		:class="_showError ? 'border-2 border-special-red' : 'border-1 border-gray-300'"
		style="background-position: right 0.1rem center; padding-right: 1.9rem">
		<option v-for="element in options" :key="element.name" :value="element">
			{{ element }}
		</option>
	</select>
</template>

<script>
export default {
	name: "SelectList",
	data() {
		return {
			selected: this.options[0],
			_showError: false
		};
	},
	emits: ["update:modelValue", "onChange", "on"],
	props: {
		modelValue: Object,
		options: Array,
	},
	expose: ["selected"],
	watch: {
		selected() {
			this.$emit("update:modelValue", this.selected);
		},
		options() {
			if (this.options.length > 0) {
				this.selected = this.options[0];
			}
		},
	},
	methods: {
		showError() {
			this._showError = true;
		},
		hideError() {
			this._showError = false;
		}
	}
};
</script>
