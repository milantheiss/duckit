export default defineNuxtRouteMiddleware(async (to) => {
	const client = useSupabaseClient();
	let { data } = await client.auth.getSession();

		// if (!data.session) {
		// 	const { data, error } = await client.auth.refreshSession();
		// 	let { user } = data;
		// 	if (!user) {
		// 		return navigateTo("/login");
		// 	}
		// } else {
		// 	if (!data.session.user) {
		// 		return navigateTo("/login");
		// 	}
		// }

	if (!data.session?.user && to.meta.auth) {
		return navigateTo("/login");
	} else if (data.session?.user && to.meta.guest) {
		return navigateTo("/checkin");
	}
});
