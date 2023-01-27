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