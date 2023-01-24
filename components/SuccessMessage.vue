<template>
    <transition enter-active-class="transition ease-in-out duration-500" enter-from-class="-translate-y-2 opacity-0"
        enter-to-class="translate-y-0 opacity-100">
        <div class="flex items-center" v-show="showSuccess">
            <!--Error Icon-->
            <span class="mr-2">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5"
                    stroke="currentColor" class="w-6.5 text-green-500">
                    <path stroke-linecap="round" stroke-linejoin="round"
                        d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>

            </span>
            <p class="text-green-500 font-semibold text-base mr-4">{{ message }}</p>
        </div>
    </transition>
</template>

<script>
export default {
    data() {
        return {
            showSuccess: false,
            message: "Fehler"
        }
    },
    methods: {
        hideSuccess() {
            this.showSuccess = false;
            this.message = "Erfolg";
        },
        throwSuccess(message) {
            this.message = message;
            this.showSuccess = true;
        }
    },
    expose: ["throwSuccess", "hideSuccess"]
}
</script>