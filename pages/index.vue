<template>
	<div class="w-fit">
		<div class="bg-white px-4 py-4 rounded-lg drop-shadow-lg text-left mb-4" v-if="!ticket">
			<h2 class="text-xl sm:text-2xl font-bold">Ticket laden...</h2>
			<p class="text-base sm:text-lg font-normal text-dark-grey">
				Bitte gebe den Ticket Code ein
			</p>
			<TextInput v-model="ticketCode" placeholder="Ticket Code"
				class="w-full font-normal text-light-gray mt-6 text-xl py-2 px-2" ref="code"></TextInput>
			<ErrorMessage ref="error" class="mt-3 transition "></ErrorMessage>
			<button @click="loadTicket(ticketCode)"
				class="w-full mt-6 justify-center rounded-md border border-transparent bg-indigo-600 py-2 px-6 text-lg font-medium text-white shadow-lg hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2">
				Laden
			</button>
		</div>
		<!--Ticket Info-->
		<div class="flex flex-col justify-center items-center" v-if="ticket">
			<div
				class="bg-white px-4 py-4 rounded-lg drop-shadow-lg text-left mb-4 flex flex-col justify-center items-center">
				<qrcode-vue :value="ticket.ticketCode" :size="256"></qrcode-vue>
				<p class="text-2xl font-bold mt-4">{{ ticket.ticketCode }}</p>
			</div>
			<div class="bg-white px-4 py-4 rounded-lg drop-shadow-lg w-full" v-if="typeof ticket !== 'undefined'">
				<h1 class="text-2xl font-bold" :class="{
					'text-green-500': ticket.valid,
					'text-red-600': !ticket.valid
				}">
					{{ ticket.valid ? 'Gültig' : 'Ungültig' }}
				</h1>
				<p v-show="ticket.valid">
					Gekauft am
					<span class="font-medium">{{
						new Date(ticket.createdOn.seconds * 1000).toLocaleDateString('de-DE', {
							year: 'numeric',
							month: 'short',
							day: 'numeric',
							weekday: 'short'
						})
					}}</span>
				</p>
				<p v-if="!ticket.valid">
					Entwertet am <span class="font-medium">{{
						new Date(ticket.validatedOn.seconds *
							1000).toLocaleString('de-DE', {
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
<script>
import QrcodeVue from 'qrcode.vue'

export default {
	name: 'RenderTicketView',
	components: {
		QrcodeVue
	},
	data() {
		return {
			ticketCode: this.$route.query.ticketCode,
			ticket: null,
			token: '',
			runtimeConfig: useRuntimeConfig(),
			error: undefined
		}
	},
	mounted() {
		if (typeof this.ticketCode !== "undefined") {
			this.loadTicket(this.ticketCode)
		}
	},
	methods: {
		async loadTicket(code) {
			console.log(code);
			if (code !== '' && typeof code !== 'undefined') {
				this.$refs.error.hideError()
				this.$refs.code.hideError()
				
				const res = await fetch(
					`api/ticket?event=${this.runtimeConfig.EVENT_ID}&ticketCode=${code}`,
					{
						mode: 'cors'
					}
				)
				const response = await res.json()
				console.log(response)
				if (response.error) {
					this.$refs.error.throwError("Der Ticket Code ist ungültig!")
				} else {
					this.ticket = response.result
				}
			} else {
				this.$refs.error.throwError('Bitte gebe einen Code ein!')
				this.$refs.code.showError()
			}
		}
	}
}
</script>