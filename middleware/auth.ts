export default defineNuxtRouteMiddleware(async (to) => {
	const { $supabase } = useNuxtApp();
	let { data } = await $supabase.auth.getSession();
	
	if (data.session === null && to.meta.auth) {
		console.debug("No session, redirecting to login")
		return navigateTo("/login");
	} else if (data.session?.user !== null && to.meta.guest) {
		console.debug("Session exists, redirecting to home")
		return navigateTo("/register");
	} else {
		return true;
	}
});
