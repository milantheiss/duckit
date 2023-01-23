

export default defineEventHandler((event) => {
	const userCookie = parseCookies(event)

	return userCookie.user
});
