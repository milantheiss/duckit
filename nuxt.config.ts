// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
	postcss: {
		plugins: {
			tailwindcss: {},
			autoprefixer: {},
		},
	},
	css: ["~/assets/css/main.css"],
	runtimeConfig: {
		SMTP_HOST: process.env.SMTP_HOST,
		SMTP_POST: process.env.SMTP_POST,
		SMTP_USER: process.env.SMTP_USER,
		SMTP_PASSWORD: process.env.SMTP_PASSWORD,
		
		public: {
			ENVIORNMENT: process.env.ENVIORNMENT,
			EVENT_ID: process.env.EVENT_ID,
		},
	},
	modules: ["@pinia/nuxt", "@nuxtjs/supabase"],
	supabase: {
		url: process.env.SUPABASE_URL,
		key: process.env.SUPABASE_KEY,
	},
});
