<template>
    <div class="flex flex-col justify-center items-center">
        <div>
            <div class="bg-white pb-4 rounded-lg drop-shadow-lg text-left mb-4" v-if="typeof ticket === 'undefined'">
                <div class="w-full flex justify-center items-center">
                    <ClientOnly>
                        <QrCodeScanner @decode="(code) => loadTicket(code)" class="rounded-t-lg">
                        </QrCodeScanner>
                    </ClientOnly>
                </div>
                <div class="mx-3 mt-4">
                    <h2 class="text-xl sm:text-2xl font-bold">Ticket kontrollieren...</h2>
                    <p class="text-base sm:text-lg font-normal text-dark-grey">
                        Bitte scanne den QR Code oder gebe den Ticket Code ein
                    </p>
                    <TextInput v-model="ticketCode" placeholder="Ticket Code"
                        class="w-full font-normal text-light-gray mt-6 text-xl py-2 px-2" ref="codeInput"></TextInput>
                    <ErrorMessage ref="error" class="mt-3"></ErrorMessage>
                    <span class="w-full flex justify-start">
                        <button @click="loadTicket(ticketCode)"
                            class="w-full mt-6 justify-center rounded-md border border-transparent bg-indigo-600 py-2 px-6 text-lg font-medium text-white shadow-lg hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2">
                            Laden
                        </button>
                    </span>
                </div>
            </div>
        </div>
        <!--Ticket Info-->
        <div class="bg-white px-6 py-6 rounded-lg drop-shadow-lg text-left sm:w-[460px]"
            v-if="Object.keys(ticket).length > 0">
            <h1 class="text-3xl font-bold mb-3 flex items-center" :class="{
                'text-green-500': ticket.valid,
                'text-red-600': !ticket.valid
            }"> <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" width="30" height="30"
                    class="text-green-500 mr-2" v-show="ticket.valid">
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
            <p class="text-xl flex justify-between items-center">
                Käufer:
                <span class="font-bold">{{ ticket.buyer?.firstname }} {{ ticket.buyer?.lastname }}</span>
            </p>
            <p class="text-xl flex justify-between items-center" v-if="ticket.valid">
                Erstellt am:
                <span class="font-bold">{{
                    new Date(ticket.createdAt).toLocaleDateString('de-DE', {
                        year: 'numeric',
                        month: 'short',
                        day: 'numeric',
                        weekday: 'short'
                    })
                }}</span>
            </p>
            <p v-if="!ticket.valid" class="text-xl flex justify-between items-center">
                Entwertet am: <span class="font-bold">{{
                    new Date(ticket.validatedAt).toLocaleString('de-DE', {
                        year: 'numeric',
                        month: 'short',
                        day: 'numeric',
                        hour: 'numeric',
                        minute: 'numeric',
                    })
                }}</span>
            </p>
            <ErrorMessage ref="loadError" class="mt-3"></ErrorMessage>
            <div class="mt-6 flex items-center"
                :class="{ 'justify-between': ticket.valid, 'justify-center': !ticket.valid }">
                <button @click="cancel()"
                    class="rounded-lg drop-shadow-lg border border-transparent bg-gray-500 py-1.5 px-6 text-lg font-medium text-white hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2">
                    Zurück
                </button>
                <button @click="validateTicket(ticket.ticketCode)" v-if="ticket.valid"
                    class="rounded-lg drop-shadow-lg border border-transparent bg-indigo-600 py-1.5 px-6 text-lg font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2">
                    Entwerten
                </button>
            </div>
        </div>
    </div>
</template>
<script setup>
let ticketCode = ref('')
let ticket = reactive({})
const client = useSupabaseClient()

// Refs
const codeInput = ref(null)
const loadError = ref(null)
const error = ref(null)

let user = {}

// Lifecycle Hooks
onMounted(async () => {
    user = await (await client.auth.getSession()).data;
    watchEffect(() => {
        if (user.session === null) {
            navigateTo('/login')
        }
    })
})

// Site Setup & Meta
definePageMeta({
	auth: true,
	middleware: ['auth']
})

useHead({
    title: 'Ticket kontrollieren'
})


async function loadTicket(code) {
    code = code.trim()

    console.log(code);

    const { data } = await client
        .from('tickets')
        .select()
        .eq("ticketCode", code)
        .maybeSingle()

    if (data === null) {
        codeInput.value.showError();
        error.value.throwError("Der Ticket Code ist ungültig!")
    } else {
        codeInput.value.hideError()
        error.value.hideError()

        const { data: buyer } = await client
            .from('buyers')
            .select()
            .eq("id", data.buyer)
            .maybeSingle()

        if (buyer) {
            data.buyer = buyer
        }
        ticket = data
    }
}
async function validateTicket(code) {
    const { data, status } = await client
        .from('tickets')
        .update({ valid: false, validatedAt: new Date() })
        .eq('ticketCode', code)
        .select()
        .maybeSingle()

    if (status !== 200) {
        loadError.value.throwError("Das Ticket konnte nicht entwertet werden!")
    } else {
        const { data: buyer } = await client
            .from('buyers')
            .select()
            .eq("id", data.buyer)
            .maybeSingle()

        if (buyer) {
            data.buyer = buyer
        }

        loadError.value.hideError()
        ticket = data
    }
}
function cancel() {
    ticket = undefined
    ticketCode.value = ''
}
</script>
