// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
	postcss: {
		plugins: {
			tailwindcss: {},
			autoprefixer: {},
		},
	},
    css: ['~/assets/css/main.css'],
	build: {
        transpile: ["vue-barcode-reader"]
    },
	runtimeConfig: {
		FIREBASE_API_KEY: process.env.FIREBASE_API_KEY,
		public: {
			FIREBASE_AUTH_DOMAIN: process.env.FIREBASE_AUTH_DOMAIN,
			FIREBASE_PROJECT_ID: process.env.FIREBASE_PROJECT_ID,
			FIREBASE_STORAGE_BUCKET: process.env.FIREBASE_STORAGE_BUCKET,
			FIREBASE_MESSAGING_SENDER_ID: process.env.FIREBASE_MESSAGING_SENDER_ID,
			FIREBASE_APP_ID: process.env.FIREBASE_APP_ID,
			FIREBASE_MEASUREMENT_ID: process.env.FIREBASE_MEASUREMENT_ID,
			ENVIORNMENT: process.env.ENVIORNMENT,
			EVENT_ID: process.env.EVENT_ID,
		}
	},
	modules: [
		'@pinia/nuxt'
	],
});
