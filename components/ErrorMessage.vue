<template>
    <transition enter-active-class="transition ease-in-out duration-500" enter-from-class="-translate-y-2 opacity-0"
        enter-to-class="translate-y-0 opacity-100">
        <div class="flex items-center" v-show="showError">
            <!--Error Icon-->
            <span class="mr-2">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="2"
                    stroke="currentColor" class="w-6.5 text-special-red">
                    <path stroke-linecap="round" stroke-linejoin="round"
                        d="M12 9v3.75m9-.75a9 9 0 11-18 0 9 9 0 0118 0zm-9 3.75h.008v.008H12v-.008z" />
                </svg>
            </span>
            <p class="text-special-red font-semibold text-base">{{ message }}</p>
        </div>
    </transition>
</template>

<script>
export default {
    data() {
        return {
            showError: false,
            message: "Fehler"
        }
    },
    methods: {
        hideError() {
            this.showError = false;
            this.message = "Fehler";
        },
        throwError(message) {
            this.message = message;
            this.showError = true;
        }
    },
    expose: ["throwError", "hideError"]
}
</script>

<style scoped>

</style>
