<template>
    <div class="md:w-120 sm:w-96">
        <div class="bg-white px-6 py-6 rounded-lg drop-shadow-md w-full">
            <h1 class="text-xl sm:text-2xl font-bold">Passwort zurücksetzen...</h1>
            <p class="text-base sm:text-lg font-normal text-dark-grey mb-3">Bitte gebe dein neues Passwort ein.</p>
            <div class="flex items-center w-full">
                <TextInput ref="password" type="password" v-model="newPassword"
                    class="w-full font-normal text-light-gray mt-6 text-xl py-2 px-2" />
            </div>
            <ErrorMessage class="mx-3 my-3" ref="error" />
            <button
                class="w-full mt-6 justify-center rounded-md border border-transparent bg-indigo-600 py-2 px-6 text-lg font-medium text-white shadow-lg hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                @click="resetPassword">Zurücksetzen</button>
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
            newPassword: ""
        }
    },
    methods: {
        async resetPassword() {
            const { data, error } = await this.client.auth.updateUser({
                password: this.newPassword
            })
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