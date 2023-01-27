<template>
    <div class="md:w-120 sm:w-96">
        <div class="bg-white px-6 py-6 rounded-lg drop-shadow-md w-full">
            <h1 class="text-xl sm:text-2xl font-bold">Passwort zurücksetzen...</h1>
            <p class="text-base sm:text-lg font-normal text-dark-grey">Bitte gebe dein neues Passwort ein.</p>
            <div class="flex items-center w-full">
                <TextInput ref="emailInputField" type="password" v-model="newPassword" placeholder="Neues Passwort"
                    class="w-full font-normal text-light-gray mt-6 text-xl py-2 px-2" />
            </div>
            <ErrorMessage class="mt-6" ref="inputError" />
            <SuccessMessage class="mt-6" ref="resetSuccess" />
            <button
                class="w-full mt-6 justify-center rounded-md border border-transparent bg-indigo-600 py-2 px-6 text-lg font-medium text-white shadow-lg hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                @click="resetPassword">Zurücksetzen</button>
        </div>
    </div>
</template>
<script setup>
import { useAuthStore } from '~~/store/authStore';

const authStore = useAuthStore()
const { $supabase } = useNuxtApp()

const inputError = ref(null)
const resetSuccess = ref(null)
const emailInputField = ref(null)

const newPassword = ref("")

useHead({
    title: 'Bitte gebe dein neues Passwort ein...'
})

onMounted(async () => {
	let user = ref((await $supabase.auth.getSession()).data.session)
	
	authStore.authenticated = (await user).value !== null && typeof (await user).value  !== 'undefined'
})

async function resetPassword() {
    inputError.value.hideError()
    emailInputField.value.hideError()
    resetSuccess.value.hideSuccess()

    if (newPassword.value.length < 6) {
        emailInputField.value.showError()
        inputError.value.throwError('Das Passwort muss mindestens 6 Zeichen lang sein')
        return
    }

    const { data, error } = await $supabase.auth.updateUser({
        password: newPassword.value
    })

    if (error) {
        if (error.name === 'AuthSessionMissingError') {
            inputError.value.throwError("Deine Sitzung ist abgelaufen. Bitte fordere einen neuen Reset Link an.")
            navigateTo("/forgotPassword")
        } else{
            inputError.value.throwError('Fehler beim Zurücksetzen des Passworts')
        }
        console.log(error)
    } else {
        resetSuccess.value.throwSuccess('Passwort erfolgreich zurückgesetzt')
        navigateTo('/login')
    }
}
</script>