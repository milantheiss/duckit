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
	app: {
		head: {
			title: "LGS ABI 2023",
			link: [
				{ rel: "icon", type: "image/x-icon", href: "/img/favicons/favicon.ico" },
				{ rel: "apple-touch-icon", sizes: "180x180", href: "/img/favicons/apple-touch-icon.png" },
				{ rel: "icon", sizes: "32x32", href: "/img/favicons/favicon-32x32.png" },
				{ rel: "icon", sizes: "16x16", href: "/img/favicons/favicon-16x16.png" },
				{ rel: "manifest", href: "/img/favicons/site.webmanifest" },
			],
		},
	},
});
