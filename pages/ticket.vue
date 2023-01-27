<template>
	<div class="w-fit">
		<div class="bg-white px-4 py-4 rounded-lg drop-shadow-lg text-left mb-4" v-if="typeof ticket?.id === 'undefined'">
			<h2 class="text-xl sm:text-2xl font-bold">Ticket laden...</h2>
			<p class="text-base sm:text-lg font-normal text-dark-grey">
				Bitte gebe den Ticket Code ein
			</p>
			<TextInput v-model="ticketCode" placeholder="Ticket Code"
				class="w-full font-normal text-light-gray mt-6 text-xl py-2 px-2" ref="codeInputField"></TextInput>
			<ErrorMessage ref="codeLoadingError" class="mt-3"></ErrorMessage>
			<button @click="loadTicket(ticketCode)"
				class="w-full mt-6 justify-center rounded-md border border-transparent bg-indigo-600 py-2 px-6 text-lg font-medium text-white shadow-lg hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2">
				Laden
			</button>
		</div>
		<!--Ticket Info-->
		<div class="flex flex-col justify-center items-center" v-if="typeof ticket?.id !== 'undefined'">
			<div
				class="bg-white px-4 py-4 rounded-lg drop-shadow-lg text-left mb-4 flex flex-col justify-center items-center ">
				<qrcode-vue :value="ticket.ticketCode" :size="269"></qrcode-vue>
				<p class="text-2xl font-bold mt-4">{{ ticket.ticketCode }}</p>
			</div>
			<div class="bg-white px-4 py-4 rounded-lg drop-shadow-lg w-full">
				<h1 class="text-3xl font-bold mb-3 flex items-center" :class="{
					'text-green-500': ticket.valid,
					'text-red-600': !ticket.valid
				}"> <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" width="30" height="30" class="text-green-500 mr-2"
						v-show="ticket.valid">
						<g fill="currentColor">
							<path
								d="M8 16A8 8 0 1 1 8 0a8 8 0 0 1 0 16Zm3.78-9.72a.751.751 0 0 0-.018-1.042.751.751 0 0 0-1.042-.018L6.75 9.19 5.28 7.72a.751.751 0 0 0-1.042.018.751.751 0 0 0-.018 1.042l2 2a.75.75 0 0 0 1.06 0Z">
							</path>
						</g>
					</svg>
					<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" width="30" height="30"
						class="text-red-600 mr-2" v-show="!ticket.valid">
						<g fill="currentColor">
							<path
								d="M2.343 13.657A8 8 0 1 1 13.658 2.343 8 8 0 0 1 2.343 13.657ZM6.03 4.97a.751.751 0 0 0-1.042.018.751.751 0 0 0-.018 1.042L6.94 8 4.97 9.97a.749.749 0 0 0 .326 1.275.749.749 0 0 0 .734-.215L8 9.06l1.97 1.97a.749.749 0 0 0 1.275-.326.749.749 0 0 0-.215-.734L9.06 8l1.97-1.97a.749.749 0 0 0-.326-1.275.749.749 0 0 0-.734.215L8 6.94Z">
							</path>
						</g>
					</svg>
					{{ ticket.valid ? 'Gültig' : 'Ungültig' }}
				</h1>
				<p v-show="ticket.valid" class="text-xl">
					Erstellt am
					<span class="font-bold">{{
						new Date(ticket.createdAt).toLocaleDateString('de-DE', {
							year: 'numeric',
							month: 'short',
							day: 'numeric',
							weekday: 'short'
						})
					}}</span>
				</p>
				<p v-if="!ticket.valid" class="text-xl">
					Entwertet am <span class="font-bold">{{
						new Date(ticket.validatedAt).toLocaleString('de-DE', {
							year: 'numeric',
							month: 'short',
							day: 'numeric',
							hour: 'numeric',
							minute: 'numeric',
						})
					}}</span>
				</p>
			</div>
		</div>
	</div>
</template>
<script setup>
import QrcodeVue from 'qrcode.vue'
import { useAuthStore } from '~/store/authStore.ts'

const route = useRoute()
const authStore = useAuthStore()
const { $supabase } = useNuxtApp()

const codeLoadingError = ref(null)
const codeInputField = ref(null)

const ticketCode = route.query.code
const ticket = ref({})

useHead({
	title: "Ticket anzeigen",
	meta: [{ guest: true }]
})

onMounted(async () => {
	let user = ref((await $supabase.auth.getSession()).data.session)
	
	authStore.authenticated = (await user).value !== null && typeof (await user).value  !== 'undefined'

	if (typeof ticketCode !== "undefined") {
		loadTicket(ticketCode)
	}
})

async function loadTicket(code) {
	console.log(code);
	if (code !== '' && typeof code !== 'undefined') {
		codeLoadingError.value.hideError()
		codeInputField.value.hideError()

		code = code.trim()

		const { data } = await $supabase
			.from('tickets')
			.select()
			.eq("ticketCode", code)
			.maybeSingle()

		console.log(data);

		if (data === null) {
			codeLoadingError.value.throwError("Der Ticket Code ist ungültig!")
		} else {
			ticket.value = data
		}
	} else {
		codeLoadingError.value.throwError('Bitte gebe einen Code ein!')
		codeInputField.value.showError()
	}
}
</script>