<template>
	<!--Global Style kommt ins erste Div-->
	<div class="min-h-screen bg-background-grey font-ubuntu ">
		<div class="flex flex-col items-center justify-center mx-6">
			<Menu v-if="authStore.authenticated" :class="{'mt-6 md:mt-12': authStore.authenticated}"></Menu>
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
/* When setting CSS, remember that priority increases with specificity, so don't forget to select the existing classes as well */

    .Vue-Toastification__toast {
        background-color: white;
		color: black;
    }

    /* Applied to the toast body when using regular strings as content */
    .Vue-Toastification__toast-body.custom-class-1 {
        font-size: 10px;
    }

    /* Applied to a wrapper div when using a custom component as content */
    .Vue-Toastification__toast-component-body.custom-class-2 {
        width: 100%;
    }
</style>