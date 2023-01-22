<template>
    <div class="flex flex-col justify-center items-center">
        <div>
            <div class="bg-white pb-4 rounded-lg drop-shadow-lg text-left mb-4" v-show="typeof ticket === 'undefined'">
                <div class="w-full flex justify-center items-center">
                    <ClientOnly>
                        <QrCodeScanner @decode="(code) => onDecode(code)" class="rounded-t-lg">
                        </QrCodeScanner>
                    </ClientOnly>
                </div>
                <div class="mx-3 mt-4">
                    <h2 class="text-xl sm:text-2xl font-bold">Ticket kontrollieren...</h2>
                    <p class="text-base sm:text-lg font-normal text-dark-grey">
                        Bitte scanne den QR Code oder gebe den Ticket Code ein
                    </p>
                    <TextInput v-model="ticketCode" placeholder="Ticket Code"
                        class="w-fit font-normal text-light-gray my-6 text-xl"></TextInput>
                    <span class="w-full flex justify-start">
                        <button @click="loadTicket(ticketCode)"
                            class="inline-flex justify-center rounded-md border border-transparent bg-indigo-600 py-2 px-6 text-lg font-medium text-white shadow-lg hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2">
                            Laden
                        </button>
                    </span>
                </div>
            </div>
        </div>
        <!--Ticket Info-->
        <div class="bg-white px-4 py-4 rounded-lg drop-shadow-lg w-96" v-if="typeof ticket !== 'undefined'">
            <h1 class="text-2xl font-bold" :class="{
                'text-green-500': ticket.valid,
                'text-red-400': !ticket.valid
            }">
                {{ ticket.valid ? 'Gültig' : 'Ungültig' }}
            </h1>
            <p>
                Gekauft von
                <span class="font-medium">{{ ticket.buyer.firstname }} {{ ticket.buyer.lastname }}</span>
            </p>
            <p>
                am
                <span class="font-medium">{{
                    new Date(ticket.boughtOn).toLocaleDateString('de-DE', {
                        year: 'numeric',
                        month: 'short',
                        day: 'numeric',
                        weekday: 'short'
                    })
                }}</span>
            </p>
            <p v-if="!ticket.valid">
                Entwertet am <span class="font-medium">{{ ticket.validatedOn }}</span>
            </p>
            <button @click="cancle(token)"
                class="mt-4 mr-4 inline-flex justify-center rounded-md border border-transparent bg-dark-grey py-1 px-2 text-base font-medium text-white shadow-lg hover:bg-gray-500 focus:outline-none focus:ring-2 focus:ring-dark-grey focus:ring-offset-2">
                Nächstes Ticket
            </button>
            <button @click="validateTicket(token)"
                class="mt-4 inline-flex justify-center rounded-md border border-transparent bg-indigo-600 py-1 px-2 text-base font-medium text-white shadow-lg hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2">
                Entwerten
            </button>
        </div>
    </div>
</template>
<script>
export default {
    name: 'CheckInView',
    data() {
        return {
            ticketCode: '',
            ticket: undefined,
            token: ''
        }
    },
    methods: {
        async onDecode(code) {
            console.log(code)
            const res = await this.scanTicket(code)
        },
        onLoaded() {
            console.log('load')
        },
        async scanTicket(code) {
            const res = await fetch(
                `${import.meta.env.VITE_API_URL}/ticket/scan/${code}`,
                {
                    mode: 'cors'
                }
            )
            return await res.json()
        },
        async loadTicket(code) {
            const res = await fetch(
                `${import.meta.env.VITE_API_URL}/ticket/${code}?eventCode=fC9dgc`,
                {
                    mode: 'cors'
                }
            )
            const response = await res.json()
            console.log(response)
            this.ticket = response.ticket
            this.token = response.token
        },
        validateTicket() {
            this.ticket.valid = !this.ticket.valid
            console.log('validate')
            //TODO Implement
        },
        cancle() {
            this.ticket = undefined
            this.ticketCode = ''
            console.log('cancle')
            //TODO Implement
        }
    }
}
</script>
