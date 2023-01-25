export default defineNuxtRouteMiddleware(async (to) => {
	const user = useSupabaseUser();
	const supabase = useSupabaseClient();
	let { data } = await supabase.auth.getSession();

	if (!data.session) {
		const { data, error } = await supabase.auth.refreshSession();
		let { user } = data;
		if (!user) {
			return navigateTo("/login");
		}
	} else {
		if (!data.session.user) {
			return navigateTo("/login");
		}
	}

	if (!user.value && to.meta.auth) {
		return navigateTo("/login");
	} else if (user.value && to.meta.guest) {
		return navigateTo("/checkin");
	}
});
