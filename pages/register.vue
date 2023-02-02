<template>
	<div class="sm:w-[460px]">
		<div class="bg-white px-6 py-6 rounded-lg drop-shadow-lg text-left">
			<div v-show="!checkDetails && !showConfirmation">
				<h1 class="text-xl sm:text-2xl font-bold mb-6">Tickets registrieren</h1>

				<div class="flex justify-between items-center mb-3">
					<p class="text-base sm:text-lg font-normal text-light-gray">Vorname:</p>
					<TextInput v-model="dataStore.buyer.firstname" placeholder="Vorname"
						class="w-fit text-base sm:text-lg font-normal text-light-gray" ref="fnameInput"></TextInput>
				</div>
				<div class="flex justify-between items-center mb-3">
					<p class="text-base sm:text-lg font-normal text-light-gray">Nachname:</p>
					<TextInput v-model="dataStore.buyer.lastname" placeholder="Nachname"
						class="w-fit text-base sm:text-lg font-normal text-light-gray" ref="lnameInput"></TextInput>
				</div>
				<div class="flex justify-between items-center mb-3">
					<p class="text-base sm:text-lg font-normal text-light-gray">E-Mail:</p>
					<TextInput v-model="dataStore.buyer.email" type="email" placeholder="E-Mail"
						class="w-fit text-base sm:text-lg font-normal text-light-gray" ref="emailInput"></TextInput>
				</div>
				<div class="flex justify-between items-center mb-6">
					<p class="text-base sm:text-lg font-normal text-light-gray">Anzahl Tickets:</p>
					<NumberInput v-model="amount" min="1" max="50"
						class="w-fit text-base sm:text-lg font-normal text-light-gray" placeholder="1"></NumberInput>
				</div>
				<ErrorMessage ref="inputViewError" class="mb-6"></ErrorMessage>
				<div class="flex justify-between items-center sm:mx-6">
					<button
						class="justify-center rounded-lg drop-shadow-lg border border-transparent bg-gray-500 py-1.5 px-6 text-lg font-medium text-white hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
						@click="cancel()">
						Abbrechen
					</button>
					<button
						class="justify-center rounded-lg  drop-shadow-lg border border-transparent bg-indigo-600 py-1.5 px-6 text-lg font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
						@click="() => onContinue()">
						Weiter
					</button>
				</div>
			</div>
			<div v-show="checkDetails">
				<h1 class="text-xl sm:text-2xl font-bold mb-6">Bitte überprüfen...</h1>

				<div class="flex justify-between items-center mb-3">
					<p class="text-base sm:text-lg font-normal text-light-gray">Vorname:</p>
					<p class="w-fit text-base sm:text-lg font-medium text-black">{{ dataStore.buyer.firstname }}</p>
				</div>
				<div class="flex justify-between items-center mb-3">
					<p class="text-base sm:text-lg font-normal text-light-gray">Nachname:</p>
					<p class="w-fit text-base sm:text-lg font-medium text-black">{{ dataStore.buyer.lastname }}</p>
				</div>
				<div class="flex justify-between items-center mb-3">
					<p class="text-base sm:text-lg font-normal text-light-gray">E-Mail:</p>
					<p class="w-fit text-base sm:text-lg font-medium text-lblack">{{ dataStore.buyer.email }}</p>
				</div>
				<div class="flex justify-between items-center mb-6">
					<p class="text-base sm:text-lg font-normal text-light-gray">Anzahl Tickets:</p>
					<p class="w-fit text-base sm:text-lg font-medium text-black" placeholder="1">{{ amount }}</p>
				</div>
				<div class="flex justify-between items-center mb-6">
					<p class="text-base sm:text-lg font-medium text-[#464646]">* Du bestätigst, dass die Daten korrekt
						sind.
						Die Ticket werden automatisch per E-Mail versendet.</p>
				</div>
				<ErrorMessage ref="generatorError" class="mb-6"></ErrorMessage>
				<div class="flex justify-center items-center">

					<span class="flex items-center justify-between sm:mx-6 w-full" v-show="!isLoading">
						<button
							class="justify-center rounded-lg drop-shadow-lg border border-transparent bg-gray-500 py-1.5 px-6 text-lg font-medium text-white hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
							@click="back()">
							Zurück
						</button>
						<button
							class="justify-center items-center rounded-lg  drop-shadow-lg border border-transparent bg-indigo-600 py-1.5 px-6 text-lg font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
							@click="generateTickets()">
							<span class="ml-2">Bestätigen</span>
						</button>
					</span>
					<span class="flex items-center justify-center w-full" v-show="isLoading">
						<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="2"
							stroke="currentColor" class="w-8 h-8 animate-[spin_1.25s_linear_infinite] mr-6">
							<path stroke-linecap="round" stroke-linejoin="round"
								d="M16.023 9.348h4.992v-.001M2.985 19.644v-4.992m0 0h4.992m-4.993 0l3.181 3.183a8.25 8.25 0 0013.803-3.7M4.031 9.865a8.25 8.25 0 0113.803-3.7l3.181 3.182m0-4.991v4.99" />
						</svg>
						<p class="text-base sm:text-lg font-semibold text-black italic" v-show="amount <= 1">Bitte
							warten...<br>Ticket wird erstellt und verschickt.</p>
						<p class="text-base sm:text-lg font-semibold text-black italic" v-show="amount > 1">Bitte
							warten...<br>Tickets werden erstellt und verschickt.</p>
					</span>
				</div>
			</div>
			<div class="flex flex-col text-left" v-if="showConfirmation">
				<h1 class="text-xl sm:text-2xl font-bold ">Tickets erstellt...</h1>
				<p class="text-base sm:text-lg font-normal text-dark-grey mb-3">
					Wurden an <span class="font-semibold">{{ dataStore.buyer.email }}</span> versendet.
				</p>
				<ul class="list-['🎟️'] list-inside mb-3">
					<li v-for="code in dataStore.ticketCodes" :key="code"
						class="text-base sm:text-lg font-bold text-black mb-1">
						<NuxtLink :to="'/ticket?code=' + code" class="text-lg font-bold hover:underline ml-3">
							{{ code }}
						</NuxtLink>
					</li>
				</ul>
				<button
					class="justify-center rounded-lg mx-auto drop-shadow-lg border border-transparent bg-indigo-600 py-1.5 px-6 text-lg font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
					@click="cancel()">
					Ok
				</button>
			</div>
		</div>
	</div>
</template>

<script setup>
import TextInput from '@/components/TextInput.vue'
import NumberInput from '@/components/NumberInput.vue'
import { useDataStore } from '~~/store/dataStore'
import { useAuthStore } from '~~/store/authStore'

const runtimeConfig = useRuntimeConfig()
const authStore = useAuthStore()
const dataStore = useDataStore();
const { $supabase } = useNuxtApp()

let amount = 1
let checkDetails = ref(false)
let showConfirmation = ref(false)
let isLoading = ref(false)

// refs
const inputViewError = ref(null)
const generatorError = ref(null)
const emailInput = ref(null)

definePageMeta({
	auth: true,
	middleware: ['auth']
})

useHead({
	title: 'Ticket erstellen'
})

onMounted(async () => {
	let user = ref((await $supabase.auth.getSession()).data.session)

	authStore.authenticated = (await user).value !== null && typeof (await user).value !== 'undefined'

	watch(
		() => authStore.authenticated,
		async () => {
			if (!authStore.authenticated) {
				navigateTo('/login')
			}
		},
		{ deep: true, immediate: true }
	)
})

async function generateTickets() {
	isLoading.value = true
	const body = dataStore.buyer

	let newBuyer = false

	let { data: buyer, error } = await $supabase
		.from('buyers')
		.select()
		.eq('email', body.email)
		.maybeSingle()

	if (!buyer) {
		newBuyer = true

		const { data: b } = await $supabase
			.from('buyers')
			.insert(body, {
				onConflict: 'email',
				ignoreDuplicates: false
			})
			.select()
			.eq('email', body.email)
			.maybeSingle()

		buyer = b
	}

	const tickets = new Array(amount).fill({
		event: runtimeConfig.EVENT_ID,
		buyer: buyer.id,
		createdBy: (await $supabase.auth.getSession()).data.session.user.id
	})

	const { data } = await $supabase
		.from('tickets')
		.insert(tickets)
		.select()


	if (!data) {
		generatorError.value.throwError('Die Tickets konnten nicht generiert werden. Bitte versuche es erneut.')
		return
	}

	dataStore.ticketCodes = data.map(ticket => ticket.ticketCode)

	const res = await $fetch("/api/sendTicket", {
		method: 'POST',
		body: {
			email: dataStore.buyer.email,
			ticketCodes: dataStore.ticketCodes
		}
	})

	if (res.ok === true) {
		console.log('Tickets sent');
		checkDetails.value = false
		showConfirmation.value = true
	} else {
		showConfirmation.value = false
		checkDetails.value = true

		generatorError.value.throwError('Die Tickets konnten nicht versendet werden. Bitte versuche es erneut.')

		await $supabase
			.from('tickets')
			.delete()
			.in('ticketCode', dataStore.ticketCodes)

		if (newBuyer) {
			await $supabase
				.from('buyers')
				.delete()
				.eq('id', buyer.id)
		}
	}
	isLoading.value = false
}


async function onContinue() {
	if (dataStore.buyer.firstname === '' || dataStore.buyer.lastname === '' || dataStore.buyer.email === '') {
		inputViewError.value.throwError('Bitte fülle alle Felder aus')
		return
	}

	const EMAIL_REGEX = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

	if (!dataStore.buyer.email.match(EMAIL_REGEX)) {
		inputViewError.value.throwError('Bitte gib eine gültige E-Mail Adresse an')
		emailInput.value.showError()
		emailInput.value.focus()
		return
	} else {
		inputViewError.value.hideError()
		emailInput.value.hideError()
		checkDetails.value = true
	}

}

function cancel() {
	dataStore.ticketCodes = []
	dataStore.buyer = {
		firstname: '',
		lastname: '',
		email: ''
	}
	amount = 1

	if (checkDetails.value) generatorError.value.hideError()
	else if (!showConfirmation.value) inputViewError.value.hideError()

	checkDetails.value = false
	showConfirmation.value = false
}

function back(){
	checkDetails.value = false
	showConfirmation.value = false
}
</script>
