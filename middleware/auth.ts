export default defineNuxtRouteMiddleware((to) => {
	const user = useSupabaseUser();

	if (!user.value && to.meta.auth) {
		return navigateTo("/login");
	} else if (user.value && to.meta.guest) {
		return navigateTo("/checkin");
	}
});
