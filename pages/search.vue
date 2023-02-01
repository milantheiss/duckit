<template>
	<div class="sm:w-[460px]">
		<div class="bg-white px-6 py-6 rounded-lg drop-shadow-lg text-left">
			<div v-show="showSearchField">
				<h1 class="text-xl sm:text-2xl font-bold mb-6">System durchsuchen</h1>
				<div class="flex justify-between items-center mb-3">

				</div>
				<SelectList :options="['E-Mail', 'Ticket Code',]"></SelectList>
				<TextInput v-model="searchQuery" placeholder="Suche..."
					class="w-full font-normal text-light-gray mt-6 text-xl py-2 px-2" ref="searchInputField">
				</TextInput>
				<ErrorMessage ref="searchError" class="mt-3"></ErrorMessage>
				<div class="flex justify-between items-center mb-6">

				</div>
				<div class="flex justify-between items-center sm:mx-6">
					<button
						class="justify-center rounded-lg  drop-shadow-lg border border-transparent bg-indigo-600 py-1.5 px-6 text-lg font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
						@click="() => search()">
						Suchen
					</button>
				</div>
			</div>
			<div v-show="!showSearchField">
				<h1 class="text-xl sm:text-2xl font-bold mb-6">Alle Ergebnisse...</h1>
				<!--Erst Email -->
				<CollapsibleContainer v-for="(response, index) in searchResponses" :key="response.email"
					ref="collapsibleContrainer" :show="index === 0"
					:class="{ 'mb-3': index !== (searchResponses.length - 1) }">
					<template #header>
						<div class="flex justify-between w-full items-center">
							<p class="w-fit text-base sm:text-lg font-medium text-black hover:cursor-pointer"
								@click="$refs.collapsibleContrainer[index].toggleShowContent()">{{ response.email }}</p>
							<button
								class="justify-center rounded-lg drop-shadow-md border border-transparent bg-indigo-600 py-0.5 px-2.5 text-base font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
								@click="onClick()">
								Alle
							</button>
						</div>
					</template>
					<template #content-slot>
						<div>
							<div v-for="code in response.ticketCodes" :key="code"
								class="flex items-center w-full mb-1 before:content-['🎟️']">
								<NuxtLink :to="'/ticket?code=' + code"
									class=" text-lg font-bold hover:underline ml-3 text-black">
									{{ code }}
								</NuxtLink>
								<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="22" height="22"
									class="ml-auto mr-3.5" stroke-width="3"
									@click="handleClickOnSingleCode($event, {email: response.email, ticketCode: code})">
									<path
										d="M20 14a2 2 0 1 1-.001-3.999A2 2 0 0 1 20 14ZM6 12a2 2 0 1 1-3.999.001A2 2 0 0 1 6 12Zm8 0a2 2 0 1 1-3.999.001A2 2 0 0 1 14 12Z">
									</path>
								</svg>
							</div>
						</div>
					</template>
				</CollapsibleContainer>



				<!--Für jedes Ergebnis wird Div erstellt-->
				<!--Add Action Button/Context Menu-->

				<!--Dann versetzt alle Ticket Codes-->
				<!--Jedes Element hat Menu Button mit dem Aktionen ausgewählt werden können-->
				<!--Wenn Aktion passiert wird Bestätigungstoast angezeigt-->
			</div>
		</div>
	</div>
	<ContextMenu ref="ctxMenuSingleCode">
		<div class="flex flex-col">
			<button
				class="flex justify-start items-center rounded-t-lg border-black py-1.5 px-3 text-base font-medium text-black hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
				@click="onResend(ctxMenuSingleCode.data)">
				✉️ Neu senden
			</button>
			<button
				class="flex justify-start items-center rounded-b-lg border border-transparent py-1.5 px-3 text-base font-medium text-black hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
				@click="onValidate(ctxMenuSingleCode.data)">
				🔥 Entwerten
			</button>
		</div>
	</ContextMenu>
</template>

<script setup>
import { useDataStore } from '~~/store/dataStore'
import { useAuthStore } from '~~/store/authStore'

let searchResponses = ref([])

searchResponses.value = [
	{
		email: 'milan.theiss@gmx.net',
		ticketCodes: ['millan', "asldfE"]
	},
	{
		email: 'milthe@lgs-di.de',
		ticketCodes: ['ASF3sd', "8sdfAS"]
	}
]

let searchQuery = ref('')

const runtimeConfig = useRuntimeConfig()
const authStore = useAuthStore()
const dataStore = useDataStore();
const { $supabase } = useNuxtApp()

let amount = 1
let showSearchField = ref(false)

//TODO Remove
let isLoading = ref(false)

// refs
const searchInputField = ref(null)
const searchError = ref(null)
const ctxMenuSingleCode = ref(null)

definePageMeta({
	auth: true,
	middleware: ['auth']
})

useHead({
	title: 'System durchsuchen'
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

function onClick() {
	console.log('click')
}

function handleClickOnSingleCode(event, data) {
	console.log(event, data);
	ctxMenuSingleCode.value.open(event, data)
}

async function onResend(data) {
	console.log('Trying to resend');
	const res = await $fetch("/api/sendTicket", {
		method: 'POST',
		body: {
			email: data.email,
			ticketCodes: data.ticketCodes
		}
	})

	console.log(res);

	if (res.ok === true) {
		//TODO Zeige Toast --> Tickets versendet
		console.log('Tickets sent');
	} else {
		//TODO Zeige Toast --> Fehler
	}
}

function onValidate(data) {
	console.log(data);
}
</script>
