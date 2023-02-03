<template>
	<!--Global Style kommt ins erste Div-->
	<div class="min-h-screen bg-background-grey font-ubuntu ">
		<div class="flex flex-col items-center justify-center mx-6">
			<Menu v-if="authStore.authenticated" :class="{ 'mt-6 md:mt-12': authStore.authenticated }"></Menu>
			<span class="mb-6 md:mb-12 mt-6 md:mt-12">
				<NuxtPage />
			</span>
			<Footer></Footer>
		</div>
	</div>

</template>
<script setup>
import { useAuthStore } from '~~/store/authStore';
const authStore = useAuthStore()
</script>
<style>
@import url("https://fonts.googleapis.com/css2?family=Ubuntu:ital,wght@0,300;0,400;0,500;0,700;1,400&display=swap");

/* When setting CSS, remember that priority increases with specificity, so don't forget to select the existing classes as well */
.Vue-Toastification__toast {
	font-family: 'Ubuntu', sans-serif;
	color: black;
	padding: 1rem;
	min-height: 50px;
	vertical-align: middle;
	font-weight: 500;
	border-radius: 0.5rem;
	align-items: center;
}

.Vue-Toastification__toast--default {
	background-color: #0284c7;
}

/* Applied to the toast body when using regular strings as content */
.Vue-Toastification__toast--default .Vue-Toastification__progress-bar {
	background-color: #075985;
	opacity: 1;
}

.Vue-Toastification__toast--success {
	background-color: #16a34a;
}

/* Applied to the toast body when using regular strings as content */
.Vue-Toastification__toast--success .Vue-Toastification__progress-bar {
	background-color: #15803d;
	opacity: 1;
}

.Vue-Toastification__toast--error {
	background-color: #dc2626;
}

/* Applied to the toast body when using regular strings as content */
.Vue-Toastification__toast--error .Vue-Toastification__progress-bar {
	background-color: #991b1b;
	opacity: 1;
}

/* Applied to a wrapper div when using a custom component as content */
.Vue-Toastification__toast-body {
	font-weight: medium;
}

.Vue-Toastification__close-button {
	width: 2.25rem;
	height: 2.25rem;
	color: black;
}

.Vue-Toastification__icon {
	margin: 0;
	margin-right: 0.8rem;
	width: 2rem;
	height: 2rem;
}
</style>