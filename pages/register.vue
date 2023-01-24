<template>
	<div class="sm:w-[460px]">
		<div class="bg-white px-6 py-6 rounded-lg drop-shadow-lg text-left" v-if="data.ticketCodes.length === 0">
			<div v-show="!checkDetails">
				<h1 class="text-xl sm:text-2xl font-bold mb-6">Tickets registrieren</h1>

				<div class="flex justify-between items-center mb-3">
					<p class="text-base sm:text-lg font-normal text-light-gray">Vorname:</p>
					<TextInput v-model="data.buyer.firstname" placeholder="Vorname"
						class="w-fit text-base sm:text-lg font-normal text-light-gray" ref="fnameInput"></TextInput>
				</div>
				<div class="flex justify-between items-center mb-3">
					<p class="text-base sm:text-lg font-normal text-light-gray">Nachname:</p>
					<TextInput v-model="data.buyer.lastname" placeholder="Nachname"
						class="w-fit text-base sm:text-lg font-normal text-light-gray" ref="lnameInput"></TextInput>
				</div>
				<div class="flex justify-between items-center mb-3">
					<p class="text-base sm:text-lg font-normal text-light-gray">E-Mail:</p>
					<TextInput v-model="data.buyer.email" type="email" placeholder="E-Mail"
						class="w-fit text-base sm:text-lg font-normal text-light-gray" ref="emailInput"></TextInput>
				</div>
				<div class="flex justify-between items-center mb-6">
					<p class="text-base sm:text-lg font-normal text-light-gray">Anzahl Tickets:</p>
					<NumberInput v-model="amount" min="1" max="50"
						class="w-fit text-base sm:text-lg font-normal text-light-gray" placeholder="1"></NumberInput>
				</div>
				<ErrorMessage ref="error" class="mb-6"></ErrorMessage>
				<div class="flex justify-between items-center sm:mx-6">
					<button
						class="justify-center rounded-lg drop-shadow-lg border border-transparent bg-gray-500 py-1.5 px-6 text-lg font-medium text-white hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
						@click="cancel()">
						Abbrechen
					</button>
					<button
						class="justify-center rounded-lg  drop-shadow-lg border border-transparent bg-indigo-600 py-1.5 px-6 text-lg font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
						@click="onContinue()">
						Weiter
					</button>
				</div>
			</div>
			<div v-show="checkDetails">
				<h1 class="text-xl sm:text-2xl font-bold mb-6">Bitte überprüfen...</h1>

				<div class="flex justify-between items-center mb-3">
					<p class="text-base sm:text-lg font-normal text-light-gray">Vorname:</p>
					<p class="w-fit text-base sm:text-lg font-medium text-black">{{ data.buyer.firstname }}</p>
				</div>
				<div class="flex justify-between items-center mb-3">
					<p class="text-base sm:text-lg font-normal text-light-gray">Nachname:</p>
					<p class="w-fit text-base sm:text-lg font-medium text-black">{{ data.buyer.lastname }}</p>
				</div>
				<div class="flex justify-between items-center mb-3">
					<p class="text-base sm:text-lg font-normal text-light-gray">E-Mail:</p>
					<p class="w-fit text-base sm:text-lg font-medium text-lblack">{{ data.buyer.email }}</p>
				</div>
				<div class="flex justify-between items-center mb-6">
					<p class="text-base sm:text-lg font-normal text-light-gray">Anzahl Tickets:</p>
					<p class="w-fit text-base sm:text-lg font-medium text-black" placeholder="1">{{ amount }}</p>
				</div>
				<div class="flex justify-between items-center mb-6">
					<p class="text-base sm:text-lg font-medium text-black">* Du bestätigst, dass die Daten korrekt sind.
						Die Ticket werden automatisch per E-Mail versendet.</p>
				</div>
				<ErrorMessage ref="genError" class="mb-6"></ErrorMessage>
				<div class="flex justify-between items-center sm:mx-6">
					<button
						class="justify-center rounded-lg drop-shadow-lg border border-transparent bg-gray-500 py-1.5 px-6 text-lg font-medium text-white hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
						@click="cancel()">
						Abbrechen
					</button>
					<button
						class="justify-center items-center rounded-lg  drop-shadow-lg border border-transparent bg-indigo-600 py-1.5 px-6 text-lg font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
						@click="generateTickets()">
						<span class="ml-2">Bestätigen</span>
					</button>
				</div>
			</div>
		</div>
		<div class="flex flex-col bg-white px-4 py-4 rounded-lg drop-shadow-lg text-left"
			v-if="data.ticketCodes.length > 0">
			<h1 class="text-xl sm:text-2xl font-bold ">Tickets erstellt...</h1>
			<p class="text-base sm:text-lg font-normal text-dark-grey mb-3">
				Werden an <span class="font-semibold">{{ data.buyer.email }}</span> versendet.
			</p>
			<ul class="list-['🎟️'] list-inside mb-3">
				<li v-for="code in data.ticketCodes" :key="code" class="text-base sm:text-lg font-bold text-black mb-1">
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
</template>

<script>
import TextInput from '@/components/TextInput.vue'
import NumberInput from '@/components/NumberInput.vue'
import QrcodeVue from 'qrcode.vue'
import CheckboxInput from '~~/components/CheckboxInput.vue'
import { useDataStore } from '~~/store/dataStore'

export default {
	setup() {
		const data = useDataStore();
		const client = useSupabaseClient()
		const user = useSupabaseUser()

		definePageMeta({
			middleware: ['auth']
		})

		useHead({
			meta: [{ auth: true }]
		})

		onMounted(() => {
			watchEffect(() => {
				if (!user.value) {
					navigateTo('/login')
				}
			})
		})

		return {
			data,
			client,
			user
		};
	},
	name: 'Register',
	components: {
		TextInput,
		NumberInput,
		QrcodeVue,
		CheckboxInput
	},
	data() {
		return {
			amount: 1,
			runtimeConfig: useRuntimeConfig(),
			checkDetails: false,
			loading: null
		}
	},
	methods: {
		async generateTickets() {
			const body = this.data.buyer

			const { data: buyer, error } = await this.client
				.from('buyers')
				.upsert(body, {
					onConflict: 'email',
					ignoreDuplicates: false
				})
				.select()
				.eq('email', body.email)
				.maybeSingle()
			
			const tickets = new Array(this.amount).fill({
				event: this.runtimeConfig.EVENT_ID,
				buyer: buyer.id,
				createdBy: this.user.id
			})

			const { data } = await this.client
				.from('tickets')
				.insert(tickets)
				.select()

			console.log(data);

			if(!data){
				this.$refs.genError.throwError('Es ist ein Fehler aufgetreten. Versuche es erneut.')
				return
			}

			this.checkDetails = false

			this.data.ticketCodes = data.map(ticket => ticket.ticketCode)

			const res = $fetch("/api/sendTicket", {
				method: 'POST',
				body: {
					email: this.data.buyer.email,
					ticketCodes: this.data.ticketCodes
				}
			})
		},
		onContinue() {
			if (this.data.buyer.firstname === '' || this.data.buyer.lastname === '' || this.data.buyer.email === '') {
				this.$refs.error.throwError('Bitte fülle alle Felder aus')
				return
			}

			console.log(this.user);

			const EMAIL_REGEX = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

			if (!this.data.buyer.email.match(EMAIL_REGEX)) {
				this.$refs.error.throwError('Bitte gib eine gültige E-Mail Adresse an')
				this.$refs.emailInput.showError()
				this.$refs.emailInput.focus()
				return
			}

			this.checkDetails = true
		},
		cancel() {
			this.data.ticketCodes = []
			this.data.buyer = {
				firstname: '',
				lastname: '',
				email: ''
			}
			this.amount = 1

			this.checkDetails = false
		}
	}
}
</script>
