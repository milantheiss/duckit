<template>
	<div>
	</div>
</template>
<script>
export default {
	name: 'Index',
	setup() {
		onMounted(() => {
			navigateTo('/ticket')
		})
		
		useHead({
			title: 'LGS ABI 2023'
			})
	}
}
</script>