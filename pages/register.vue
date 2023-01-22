<template>
	<div class="sm:w-[500px]">
		<div class="bg-white px-6 py-6 rounded-lg drop-shadow-lg text-left" v-if="ticketCodes.length === 0">
			<div v-show="!checkDetails">
				<h1 class="text-xl sm:text-2xl font-bold mb-6">Tickets registrieren</h1>

				<div class="flex justify-between items-center mb-3">
					<p class="text-base sm:text-lg font-normal text-light-gray">Vorname:</p>
					<TextInput v-model="buyer.firstname" placeholder="Vorname"
						class="w-fit text-base sm:text-lg font-normal text-light-gray" ref="fnameInput"></TextInput>
				</div>
				<div class="flex justify-between items-center mb-3">
					<p class="text-base sm:text-lg font-normal text-light-gray">Nachname:</p>
					<TextInput v-model="buyer.lastname" placeholder="Nachname"
						class="w-fit text-base sm:text-lg font-normal text-light-gray" ref="lnameInput"></TextInput>
				</div>
				<div class="flex justify-between items-center mb-3">
					<p class="text-base sm:text-lg font-normal text-light-gray">E-Mail:</p>
					<TextInput v-model="buyer.email" type="email" placeholder="E-Mail"
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
					<p class="w-fit text-base sm:text-lg font-medium text-black">{{ buyer.firstname }}</p>
				</div>
				<div class="flex justify-between items-center mb-3">
					<p class="text-base sm:text-lg font-normal text-light-gray">Nachname:</p>
					<p class="w-fit text-base sm:text-lg font-medium text-black">{{ buyer.lastname }}</p>
				</div>
				<div class="flex justify-between items-center mb-3">
					<p class="text-base sm:text-lg font-normal text-light-gray">E-Mail:</p>
					<p class="w-fit text-base sm:text-lg font-medium text-lblack">{{ buyer.email }}</p>
				</div>
				<div class="flex justify-between items-center mb-6">
					<p class="text-base sm:text-lg font-normal text-light-gray">Anzahl Tickets:</p>
					<p class="w-fit text-base sm:text-lg font-medium text-black" placeholder="1">{{ amount }}</p>
				</div>
				<div class="flex justify-between items-center mb-6">
					<p class="text-base sm:text-lg font-medium text-black">* Du bestätigst, dass die Daten korrekt sind.
						Die Ticket werden automatisch per E-Mail versendet.</p>
				</div>
				<div class="flex justify-between items-center sm:mx-6">
					<button
						class="justify-center rounded-lg drop-shadow-lg border border-transparent bg-gray-500 py-1.5 px-6 text-lg font-medium text-white hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
						@click="cancel()">
						Abbrechen
					</button>
					<button
						class="justify-center rounded-lg  drop-shadow-lg border border-transparent bg-indigo-600 py-1.5 px-6 text-lg font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
						@click="generateTickets()">
						Bestätigen
					</button>
				</div>
			</div>
		</div>
		<div class="flex flex-col bg-white px-4 py-4 rounded-lg drop-shadow-lg text-left" v-if="ticketCodes.length > 0">
			<h1 class="text-xl sm:text-2xl font-bold ">Tickets erstellt...</h1>
			<p class="text-base sm:text-lg font-normal text-dark-grey mb-3">
				Werden an <span class="font-semibold">{{ buyer.email }}</span> versendet.
			</p>
			<ul class="list-['🎟️'] list-inside mb-3">
				<li v-for="code in ticketCodes" :key="code"
					class="text-base sm:text-lg font-bold text-black mb-1">
					<NuxtLink :to="'/?ticketCode=' + code" class="text-lg font-bold hover:underline ml-3">
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

export default {
	name: 'TicketShopView',
	components: {
		TextInput,
		NumberInput,
		QrcodeVue,
		CheckboxInput
	},
	data() {
		return {
			buyer: {
				firstname: '',
				lastname: '',
				email: ''
			},
			amount: 1,
			ticketCodes: [],
			runtimeConfig: useRuntimeConfig(),
			checkDetails: false,
		}
	},
	methods: {
		async generateTickets() {
			this.checkDetails = false

			const body = this.buyer

			let res = await fetch(
				`api/registerTicket?event=${this.runtimeConfig.EVENT_ID}&amount=${this.amount
				}`,
				{
					method: 'POST',
					headers: { 'Content-type': 'application/json; charset=UTF-8' },
					body: JSON.stringify(body),
					mode: 'cors'
				}
			)

			res = await res.json()
			console.log(res);
			this.ticketCodes = res.ticketCodes

			console.log(this.ticketCodes)
		},
		onContinue() {
			if (this.buyer.firstname === '' || this.buyer.lastname === '' || this.buyer.email === '') {
				this.$refs.error.throwError('Bitte fülle alle Felder aus')
				return
			}

			const EMAIL_REGEX = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

			if (!this.buyer.email.match(EMAIL_REGEX)) {
				this.$refs.error.throwError('Bitte gib eine gültige E-Mail Adresse an')
				this.$refs.emailInput.showError()
				this.$refs.emailInput.focus()
				return
			}

			this.checkDetails = true
		},
		cancel() {
			this.buyer = {
				firstname: '',
				lastname: '',
				email: ''
			}
			this.amount = 1
			this.ticketCodes = []

			this.checkDetails = false
		}
	}
}
</script>
