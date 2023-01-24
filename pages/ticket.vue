<template>
	<div class="w-fit">
		<div class="bg-white px-4 py-4 rounded-lg drop-shadow-lg text-left mb-4" v-if="!ticket">
			<h2 class="text-xl sm:text-2xl font-bold">Ticket laden...</h2>
			<p class="text-base sm:text-lg font-normal text-dark-grey">
				Bitte gebe den Ticket Code ein
			</p>
			<TextInput v-model="ticketCode" placeholder="Ticket Code"
				class="w-full font-normal text-light-gray mt-6 text-xl py-2 px-2" ref="code"></TextInput>
			<ErrorMessage ref="error" class="mt-3"></ErrorMessage>
			<button @click="loadTicket(ticketCode)"
				class="w-full mt-6 justify-center rounded-md border border-transparent bg-indigo-600 py-2 px-6 text-lg font-medium text-white shadow-lg hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2">
				Laden
			</button>
		</div>
		<!--Ticket Info-->
		<div class="flex flex-col justify-center items-center" v-if="ticket">
			<div
				class="bg-white px-4 py-4 rounded-lg drop-shadow-lg text-left mb-4 flex flex-col justify-center items-center ">
				<qrcode-vue :value="ticket.ticketCode" :size="269"></qrcode-vue>
				<p class="text-2xl font-bold mt-4">{{ ticket.ticketCode }}</p>
			</div>
			<div class="bg-white px-4 py-4 rounded-lg drop-shadow-lg w-full" v-if="typeof ticket !== 'undefined'">
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
					Gekauft am
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
<script>
import QrcodeVue from 'qrcode.vue'

export default {
	name: 'RenderTicketView',
	setup() {
		const client = useSupabaseClient()
		const user = useSupabaseUser()

		useHead({
			title: "Ticket anzeigen",
			meta: [{ guest: true }]
		})

		return {
			client
		}
	},
	components: {
		QrcodeVue
	},
	data() {
		return {
			ticketCode: this.$route.query.code,
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
			if (code !== '' && typeof code !== 'undefined') {
				this.$refs.error.hideError()
				this.$refs.code.hideError()

				code = code.trim()

				const { data } = await this.client
					.from('tickets')
					.select()
					.eq("ticketCode", code)
					.maybeSingle()

				if (data === null) {
					this.$refs.error.throwError("Der Ticket Code ist ungültig!")
				} else {
					this.ticket = data
				}
			} else {
				this.$refs.error.throwError('Bitte gebe einen Code ein!')
				this.$refs.code.showError()
			}
		}
	}
}
</script>