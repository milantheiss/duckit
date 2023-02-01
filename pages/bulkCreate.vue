<template>
	<div class="flex flex-col justify-center items-center w-full h-full">
		<button @click="testJSON()" class="mt-4 inline-flex justify-center rounded-md border border-transparent bg-indigo-600 py-1 px-2 text-base font-medium text-white shadow-lg hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2">Text JSON</button>
		<button @click="generateTickets()"
			class="mt-4 inline-flex justify-center rounded-md border border-transparent bg-indigo-600 py-1 px-2 text-base font-medium text-white shadow-lg hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2">
			Bulk Create
		</button>
	</div>
</template>
<script setup>
import data from '@/assets/data.json'

const { $supabase } = useNuxtApp()
const runtimeConfig = useRuntimeConfig()

function testJSON() {
	console.log(data)
}

async function generateTickets() {
	let newBuyer = true

	for (const buyerData of data) {
		let { data: dbBuyer, error } = await $supabase
			.from('buyers')
			.select()
			.eq('email', buyerData.email)
			.maybeSingle()

		if (!dbBuyer) {
			newBuyer = true

			const { data: b } = await $supabase
				.from('buyers')
				.insert({
					firstname: buyerData.firstname,
					lastname: buyerData.lastname,
					email: buyerData.email
				})
				.select()
				.eq('email', buyerData.email)
				.maybeSingle()

			dbBuyer = b
		}

		const tickets = new Array(buyerData.amount).fill({
			event: runtimeConfig.EVENT_ID,
			buyer: dbBuyer.id,
			createdBy: (await $supabase.auth.getSession()).data.session.user.id
		})

		console.log(tickets);

		const { data: res } = await $supabase.from('tickets').insert(tickets).select()

		console.log(res);

		const ticketCodes = res.map((ticket) => ticket.ticketCode)


		const mail = await $fetch("/api/sendTicket", {
			method: 'POST',
			body: {
				email: dbBuyer.email,
				ticketCodes: ticketCodes,
				firstname: dbBuyer.firstname,
				lastname: dbBuyer.lastname
			}
		})

		if (mail.ok === true) {
			console.log('Tickets sent')
		} else {
			console.error('Error sending tickets', mail)

			await $supabase.from('tickets').delete().in('ticketCode', ticketCodes)

			if (newBuyer) {
				await $supabase.from('buyers').delete().eq('id', dbBuyer.id)
			}
		}
	}

	console.log('Done')
}
</script>
