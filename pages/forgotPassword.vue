<template>
    <div class="md:w-120 sm:w-96">
        <div class="bg-white px-6 py-6 rounded-lg drop-shadow-md w-full">
            <h1 class="text-xl sm:text-2xl font-bold">Passwort zurücksetzen...</h1>
            <p class="text-base sm:text-lg font-normal text-dark-grey mb-3">Bitte gebe deine E-Mail ein.</p>
            <div class="flex items-center w-full">
                <TextInput ref="password" type="email" v-model="email" class="text-lg" />
            </div>
            <ErrorMessage class="mx-3 my-3" ref="error" />
            <div class="flex justify-end items-center text-lg mt-3">
                <button
                    class="justify-center rounded-lg border border-transparent bg-indigo-600 py-2 px-6 text-lg font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                    @click="resetPassword">Link senden</button>
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
            const { data, error } = await this.client.auth.resetPasswordForEmail(this.email, { redirectTo: "http://localhost:3000/resetPassword" })
            if (error) {
                console.log(error)
            } else {
                console.log(data);
                console.log("Email sent")
            }
        }
    }
}
</script>
<style lang="">
    
</style>