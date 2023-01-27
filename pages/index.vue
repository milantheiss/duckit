<template>
	<div>
	</div>
</template>
<script setup>
import { useAuthStore } from '~~/store/authStore';

const authStore = useAuthStore()
const { $supabase } = useNuxtApp()

onMounted(async() => {
	let user = ref((await $supabase.auth.getSession()).data.session)

	authStore.authenticated = (await user).value !== null && typeof (await user).value !== 'undefined'

	navigateTo("/ticket")
})

useHead({
	title: 'LGS ABI 2023'
})
</script>