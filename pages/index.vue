<template>
	<div v-if="false">
		<p>LGS Vofi</p>
		<P>Wann? 03.02.2023</P>
		<p>Wo? <a href="https://goo.gl/maps/2RHjdPRwuRxREx5J9">Am Sportplatz 3, 64839 Münster</a></p>
		<p>Bitte denkt an euren Ausweis und euer Ticket.</p>
		<p>Wenn ihr noch nicht volljährig seid, müsst ihr auch einen <a href="https://muttizettel.net/">Muttizettel</a> haben.</p>
		<p>Ticketsverkauf? Schreibt einen der folgenden Account an oder kommt bis zum 02.02.2023 in der 2. Pause ins Bistro der LGS.</p>
		<ul>
			<li><a href="https://instagram.com/"></a></li>
		</ul>
	</div>
</template>
<script setup>

onMounted(() => {
	navigateTo("/ticket")
})

useHead({
	title: 'LGS ABI 2023'
})
</script>