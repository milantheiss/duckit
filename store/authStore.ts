import { ref } from "vue";
import { defineStore } from "pinia";

export const useAuthStore = defineStore("authStore", {
	state: () => ({
		authenticated: false,
	}),
	persist: true
});
