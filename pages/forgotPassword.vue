<template>
    <div class="md:w-120 sm:w-96">
        <div class="bg-white px-6 py-6 rounded-lg drop-shadow-md w-full">
            <h1 class="text-xl sm:text-2xl font-bold">Passwort zurücksetzen...</h1>
            <p class="text-base sm:text-lg font-normal text-dark-grey">Bitte gebe deine E-Mail ein.</p>
            <div class="flex items-center w-full">
                <TextInput ref="password" type="email" v-model="email" placeholder="E-Mail"
                    class="w-full font-normal text-light-gray mt-6 text-xl py-2 px-2" />
            </div>
            <ErrorMessage class="mt-6" ref="error" />
            <SuccessMessage class="mt-6" ref="success" />
            <div class="flex justify-end items-center text-lg mt-6">
                <button
                    class="w-full justify-center rounded-md border border-transparent bg-indigo-600 py-2 px-6 text-lg font-medium text-white shadow-lg hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                    @click="resetPassword()">Link senden</button>
            </div>
        </div>
    </div>
</template>
<script>
export default {
    name: "ResetPasswordView",
    setup() {
        const client = useSupabaseClient()

        return {
            client
        }
    },
    data() {
        return {
            email: ""
        }
    },
    methods: {
        async resetPassword() {
            console.log('resetPassword')
            const EMAIL_REGEX = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
            
            this.$refs.error.hideError()
            this.$refs.success.hideSuccess()
            
            if (this.email === "") {
                this.$refs.error.throwError('Gebe eine E-Mail ein')
                return
            }

            if(!this.email.match(EMAIL_REGEX)) {
                this.$refs.error.throwError('Gebe eine gültige E-Mail ein')
                return
            } 
            
            const { data, error } = await this.client.auth.resetPasswordForEmail(this.email, { redirectTo: "http://localhost:3000/resetPassword" })

            if (error) {
                this.$refs.error.throwError('Ein Fehler ist aufgetreten')
                console.log(error)
            } else {
                this.$refs.success.throwSuccess('Wir haben dir einen Link geschickt.')
                navigateTo('/resetPassword')
            }
        }
    }
}
</script>