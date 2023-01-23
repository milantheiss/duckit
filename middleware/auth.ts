export default defineNuxtRouteMiddleware((to) => {
	const user = useSupabaseUser();

  console.log(user.value);
  

	if (!user.value && to.meta.auth) {
		return navigateTo("/login");
	} else if (user.value && to.meta.guest) {
		return navigateTo("/checkin");
	} else {
		return true;
	}
});
