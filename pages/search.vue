<template>
	<div class="sm:w-[390px]">
		<div class="bg-white px-6 py-6 rounded-lg drop-shadow-lg text-left">
			<div v-show="showSearchField">
				<h1 class="text-xl sm:text-2xl font-bold">Suche...</h1>
				<p class="text-base sm:text-lg font-normal text-dark-grey">
					nach E-Mail
				</p>
				<TextInput v-model="searchQuery" placeholder="E-Mail"
					class="w-full font-normal text-light-gray mt-6 mb-3 text-xl py-2 px-2" ref="searchInputField">
				</TextInput>
				<ErrorMessage ref="searchError" class="mt-3"></ErrorMessage>
				<div class="flex justify-between items-center">
					<button
						class="w-full mt-3 justify-center rounded-md border border-transparent bg-indigo-600 py-2 px-6 text-lg font-medium text-white shadow-lg hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
						@click="() => search()">
						Suchen
					</button>
					<button
						class="w-full mt-3 justify-center rounded-md border border-transparent bg-indigo-600 py-2 px-6 text-lg font-medium text-white shadow-lg hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
						@click="() => showToast()">
						Toast
					</button>
				</div>
			</div>
			<div v-show="!showSearchField" class="">
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
								@click="handleClickOnSingleCode($event, response)">
								Alle
							</button>
						</div>
					</template>
					<template #content-slot>
						<div>
							<div v-for="ticket in response.tickets" :key="ticket.ticketCode"
								class="flex items-center w-full mb-1 before:content-['🎟️']">
								<NuxtLink :to="'/ticket?code=' + ticket.ticketCode"
									class=" text-lg font-bold hover:underline ml-3 text-black"
									:class="{ 'line-through text-neutral-500': !ticket.valid }">
									{{ ticket.ticketCode }}
								</NuxtLink>
								<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="22" height="22"
									class="ml-auto mr-3.5" stroke-width="3"
									@click="handleClickOnSingleCode($event, { email: response.email, ticket: ticket })">
									<path
										d="M20 14a2 2 0 1 1-.001-3.999A2 2 0 0 1 20 14ZM6 12a2 2 0 1 1-3.999.001A2 2 0 0 1 6 12Zm8 0a2 2 0 1 1-3.999.001A2 2 0 0 1 14 12Z">
									</path>
								</svg>
							</div>
						</div>
					</template>
				</CollapsibleContainer>
				<div class="flex justify-center items-center mt-6">
					<button
						class="justify-center rounded-lg drop-shadow-lg border border-transparent bg-indigo-600 py-1.5 px-6 text-lg font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
						@click="() => back()">
						Zurück
					</button>
				</div>


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
				class="flex justify-start items-center rounded-lg border-black py-1.5 px-3 text-base font-medium text-black hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
				@click="onResend(ctxMenuSingleCode.data)">
				✉️ Neu senden
			</button>
			<button
				class="flex justify-start items-center rounded-lg border border-transparent py-1.5 px-3 text-base font-medium text-black hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
				@click="onValidate(ctxMenuSingleCode.data)">
				✅ Gültig machen
			</button>
			<button
				class="flex justify-start items-center rounded-lg border border-transparent py-1.5 px-3 text-base font-medium text-black hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
				@click="onInvalidate(ctxMenuSingleCode.data)">
				🔥 Entwerten
			</button>
		</div>
	</ContextMenu>
	<ContextMenu ref="ctxMenuAllCode">
		<div class="flex flex-col">
			<button
				class="flex justify-start items-center rounded-lg border-black py-1.5 px-3 text-base font-medium text-black hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
				@click="onResendAll(ctxMenuAllCode.data)">
				✉️ Neu senden
			</button>
			<button
				class="flex justify-start items-center rounded-lg border border-transparent py-1.5 px-3 text-base font-medium text-black hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
				@click="onValidateAll(ctxMenuAllCode.data)">
				✅ Gültig machen
			</button>
			<button
				class="flex justify-start items-center rounded-lg border border-transparent py-1.5 px-3 text-base font-medium text-black hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
				@click="onInvalidateAll(ctxMenuAllCode.data)">
				🔥 Entwerten
			</button>
		</div>
	</ContextMenu>
</template>

<script setup>
import { useDataStore } from '~~/store/dataStore'
import { useAuthStore } from '~~/store/authStore'
import { useToast } from "vue-toastification";

const toast = useToast()

let searchResponses = ref([])

// searchResponses.value = [
// 	{
// 		email: 'milan.theiss@gmx.net',
// 		tickets: [{ticketCode: 'millan', valid: true}, {ticketCode: "9BwJxW", valid: true}]
// 	},
// 	{
// 		email: 'milthe@lgs-di.de',
// 		tickets: [{ticketCode: 'ASF3sd', valid: true}, {ticketCode: "8sdfAS", valid: false}]
// 	}
// ]

let searchQuery = ref('')

const runtimeConfig = useRuntimeConfig()
const authStore = useAuthStore()
const dataStore = useDataStore();
const { $supabase } = useNuxtApp()

let showSearchField = ref(true)

//TODO Remove
let isLoading = ref(false)

// refs
const searchInputField = ref(null)
const searchError = ref(null)
const ctxMenuSingleCode = ref(null)
const ctxMenuAllCode = ref(null)

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

async function search() {
	if (searchQuery.value.length < 3) {
		searchInputField.value.showError('Bitte mindestens 3 Zeichen eingeben')
		return
	}

	const EMAIL_REGEX = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

	if (!searchQuery.value.match(EMAIL_REGEX)) {
		searchError.value.throwError('Bitte geb eine gültige E-Mail Adresse an')
		searchInputField.value.showError()
		return
	}

	searchInputField.value.hideError()
	searchError.value.hideError()

	isLoading.value = true

	const { data: buyers, error: buyersError } = await $supabase
		.from('buyers')
		.select('id, email')
		.eq('email', searchQuery.value)

	console.log(buyers, buyersError);

	if (buyersError) {
		searchError.value.throwError('Fehler beim Suchen des Käufers')
		return
	}

	if (buyers.length === 0) {
		searchInputField.value.showError()
		searchError.value.throwError('Kein Eintrag mit dieser E-Mail gefunden')
		return
	}

	for (const buyer of buyers) {
		const { data: tickets, error: ticketError } = await $supabase
			.from('tickets')
			.select('ticketCode, valid')
			.eq('buyer', buyer.id)

		if (ticketError) {
			searchError.value.throwError('Fehler beim Suchen der Tickets')
			return
		}

		searchResponses.value.push({
			email: buyer.email,
			tickets: tickets
		})

		console.log(tickets, ticketError);
	}

	searchError.value.hideError()
	searchInputField.value.hideError()

	showSearchField.value = false

	isLoading.value = false
}

function back() {
	searchResponses.value = []
	searchQuery.value = ''

	searchInputField.value.hideError()
	searchError.value.hideError()

	showSearchField.value = true
}

function handleClickOnSingleCode(event, data) {
	console.log(event, data);
	ctxMenuSingleCode.value.open(event, data)
}

async function onResend(data) {
	console.log(data);
	console.log('Trying to resend');
	const res = await $fetch("/api/sendTicket", {
		method: 'POST',
		body: {
			email: data.email,
			ticketCodes: [data.ticket.ticketCode]
		}
	})

	console.log(res);

	if (res.ok === true) {
		toast.success('Tickets erfolgreich versendet')
		//TODO Zeige Toast --> Tickets versendet
		console.log('Tickets sent');
	} else {
		//TODO Zeige Toast --> Fehler
		console.log('Error', res.error);
	}
}

async function onValidate(data) {
	console.log(data);
	const { data: res, status } = await $supabase
		.from('tickets')
		.update({ valid: true, invalidatedAt: null })
		.eq('ticketCode', data.ticket.ticketCode)
		.select()
		.maybeSingle()

	if (status !== 200) {
		//TODO Zeige Toast --> Fehler
		// loadError.value.throwError("Das Ticket konnte nicht entwertet werden!")
	} else {
		//TODO Zeige Toast --> Ticket entwertet
		toast.success("Das Ticket wurde entwertet!")
		// loadError.value.hideError()
		searchResponses.value = searchResponses.value.map((response) => {
			if (response.email === data.email) {
				response.tickets = response.tickets.map((ticket) => {
					if (ticket.ticketCode === data.ticket.ticketCode) {
						ticket.valid = true
					}
					return ticket
				})
			}
			return response
		})
	}
}

async function onInvalidate(data) {
	console.log(data);
	const { data: res, status } = await $supabase
		.from('tickets')
		.update({ valid: false, invalidatedAt: new Date().toISOString() })
		.eq('ticketCode', data.ticket.ticketCode)
		.select()
		.maybeSingle()

	if (status !== 200) {
		//TODO Zeige Toast --> Fehler
		// loadError.value.throwError("Das Ticket konnte nicht entwertet werden!")
	} else {
		//TODO Zeige Toast --> Ticket entwertet
		toast("Das Ticket wurde entwertet!")
		console.log(toast);
		// loadError.value.hideError()
		searchResponses.value = searchResponses.value.map((response) => {
			if (response.email === data.email) {
				response.tickets = response.tickets.map((ticket) => {
					if (ticket.ticketCode === data.ticket.ticketCode) {
						ticket.valid = false
					}
					return ticket
				})
			}
			return response
		})
	}
}

async function onResendAll(data) {
	console.log(data);
	console.log('Trying to resend');
	const res = await $fetch("/api/sendTicket", {
		method: 'POST',
		body: {
			email: data.email,
			ticketCodes: data.tickets.map(ticket => ticket.ticketCode)
		}
	})

	console.log(res);

	if (res.ok === true) {
		//TODO Zeige Toast --> Tickets versendet
		console.log('Tickets sent');
	} else {
		//TODO Zeige Toast --> Fehler
		console.log('Error', res.error);
	}
}

async function onValidateAll(data) {
	console.log(data);
	const { data: res, status } = await $supabase
		.from('tickets')
		.update({ valid: true, invalidatedAt: null })
		.in('ticketCode', data.tickets.map(ticket => ticket.ticketCode))
		.select()

	if (status !== 200) {
		//TODO Zeige Toast --> Fehler
		// loadError.value.throwError("Das Ticket konnte nicht entwertet werden!")
	} else {
		//TODO Zeige Toast --> Ticket entwertet
		// loadError.value.hideError()
		searchResponses.value = searchResponses.value.map((response) => {
			if (response.email === data.email) {
				response.tickets = response.tickets.map((ticket) => {
					if (ticket.ticketCode === data.ticket.ticketCode) {
						ticket.valid = true
					}
					return ticket
				})
			}
			return response
		})
	}
}

async function onInvalidateAll(data) {
	console.log(data);
	const { data: res, status } = await $supabase
		.from('tickets')
		.update({ valid: true, invalidatedAt: new Date().toISOString() })
		.in('ticketCode', data.tickets.map(ticket => ticket.ticketCode))
		.select()

	if (status !== 200) {
		//TODO Zeige Toast --> Fehler
		// loadError.value.throwError("Das Ticket konnte nicht entwertet werden!")
	} else {
		//TODO Zeige Toast --> Ticket entwertet
		// loadError.value.hideError()
		searchResponses.value = searchResponses.value.map((response) => {
			if (response.email === data.email) {
				response.tickets = response.tickets.map((ticket) => {
					if (ticket.ticketCode === data.ticket.ticketCode) {
						ticket.valid = false
					}
					return ticket
				})
			}
			return response
		})
	}
}

function showToast(){
	toast.success('Tickets erfolgreich versendet')
}
</script>