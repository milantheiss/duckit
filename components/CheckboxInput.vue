 <template>
    <input type="checkbox" :name="name" v-model="input" :placeholder="placeholder" class="
    w-7 h-7 text-standard-gradient-1
    rounded-lg border-gray-300 border-2
    focus:border-indigo-500 focus:ring-0 focus:ring-transparent
    focus:ring-offset-0
    ease-in-out duration-200
    text-indigo-600
    "/>
</template>

<script>
export default {
    name: "CheckboxInput",
    data() {
        return {
            input: this.modelValue,
        };
    },
    props: {
        modelValue: Boolean,
        placeholder: {
            type: String,
            default: "Eingabe"
        },
        name: String,
    },
    emits: ['update:modelValue', 'onChange', 'on'],
    watch: {
        input() {
            this.$emit('update:modelValue', this.input)
        },
        modelValue() {
            this.input = this.modelValue
        }
    }
};
</script>