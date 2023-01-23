import { auth } from "../server/lib/firebase";

export default defineNuxtPlugin((nuxtApp) => {	
	initUser();
  
	nuxtApp.vueApp.provide('auth', auth);
	nuxtApp.provide('auth', auth);

});
