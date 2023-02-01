import { useAuthStore } from "~~/store/authStore";

export default defineNuxtRouteMiddleware(async (to) => {
	const authStore = useAuthStore();

	if (!authStore.authenticated && to.meta.auth) {
		console.debug("No session, redirecting to login");
		return navigateTo("/login");
	} else if (authStore.authenticated && to.meta.guest) {
		console.debug("Session exists, redirecting to home");
		return navigateTo("/register");
	} else {
		return true;
	}
});
