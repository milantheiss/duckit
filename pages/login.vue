<template >
    <div class="md:w-120 sm:w-96">
        <div class="flex flex-col justify-center items-start ml-6 mb-4">
            <h1 class="text-xl sm:text-2xl font-bold">Willkommen...</h1>
            <p class="text-base sm:text-lg font-normal text-dark-grey">Bitte melde dich an</p>
        </div>
        <div class="bg-white px-6 py-6 rounded-lg drop-shadow-md w-full">
            <div class="flex items-center mb-6 w-full">
                <!--Mail Icon-->
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="2.5"
                    stroke="currentColor" class="w-9 mr-[13px] text-dark-grey">
                    <path stroke-linecap="round" stroke-linejoin="round"
                        d="M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-1.07 1.916l-7.5 4.615a2.25 2.25 0 01-2.36 0L3.32 8.91a2.25 2.25 0 01-1.07-1.916V6.75" />
                </svg>

                <TextInput type="text" name="email" v-model="form.email" placeholder="E-Mail" class="text-lg"
                    ref="emailInput"></TextInput>
            </div>
            <div class="flex items-center w-full">
                <!--Key Icon-->
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 43.732 46.56"
                    class="w-8 ml-1 mr-3 text-dark-grey rotate-3">
                    <path fill="currentColor"
                        d="M40.562 3.391a11.198 11.198 0 0 0-.412-.402A11.198 11.198 0 0 0 32.534 0a11.198 11.198 0 0 0-11.198 11.198 11.198 11.198 0 0 0 1.51 5.616L.867 38.794a2.879 2.879 0 0 0-.045 4.072 2.91 2.91 0 0 0 4.116 0l1.1-1.1 4.408 4.407a1.323 1.323 0 0 0 1.87 0l7.637-7.636a1.323 1.323 0 0 0 0-1.871l-4.407-4.408 11.372-11.373a11.198 11.198 0 0 0 5.617 1.51 11.198 11.198 0 0 0 11.198-11.197 11.198 11.198 0 0 0-3.17-7.807zm-4.1 3.878a5.556 5.556 0 0 1 1.628 3.929 5.556 5.556 0 0 1-5.556 5.556 5.556 5.556 0 0 1-5.556-5.556 5.556 5.556 0 0 1 5.556-5.556 5.556 5.556 0 0 1 3.928 1.627z"
                        paint-order="markers stroke fill" />
                </svg>
                <TextInput type="password" name="password" v-model="form.password" placeholder="Passwort"
                    class="text-lg" ref="passwordInput">
                </TextInput>
            </div>
            <ErrorMessage class="mx-3 my-6" ref="error" />
            <div class="flex flex-col justify-center items-end text-lg mt-3">
                <NuxtLink to="/forgotPassword" class="font-medium text-lg hover:underline mb-3">Password vergessen?
                </NuxtLink>
                <button @click="submit()"
                    class="justify-center rounded-lg border border-transparent bg-indigo-600 py-2 px-6 text-lg font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2">Login</button>
            </div>
        </div>
    </div>
</template>

<script setup>

const { auth } = useSupabaseAuthClient()
const user = useSupabaseUser()
const form = {
    email: "",
    password: "",
}
const error = ref(null)
const emailInput = ref(null)
const passwordInput = ref(null)

useHead({
    title: 'Login',
    meta: [{ guest: true }]
})

onMounted(() => {
    watchEffect(() => {
        if (user.value) {
            navigateTo('/checkin')
        }
    })
})

const submit = async () => {
    const formuser = form
    const EMAIL_REGEX = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

    if (formuser.email === "" && formuser.password === "") {
        error.value.throwError("Bitte gebe eine E-Mail und ein Passwort ein")

        emailInput.value.showError()
        passwordInput.value.showError()

        throw new Error("Bitte gebe eine E-Mail und ein Passwort ein")
    } else if (formuser.email === "") {
        error.value.throwError("Bitte gebe eine E-Mail ein")

        emailInput.value.showError()
        passwordInput.value.hideError()

        throw new Error("Bitte gebe eine E-Mail ein")
    } else if (formuser.password === "") {
        error.value.throwError("Bitte gebe ein Passwort ein")

        passwordInput.value.showError()
        emailInput.value.hideError()

        throw new Error("Bitte gebe ein Passwort ein")
    } else if (!formuser.email.match(EMAIL_REGEX)) {
        error.value.throwError("Bitte gebe eine gültige E-Mail ein")

        emailInput.value.showError()
        passwordInput.value.hideError()

        throw new Error("Bitte gebe eine gültige E-Mail ein")
    } else {
        error.value.hideError()
        emailInput.value.hideError()
        passwordInput.value.hideError()
    }


    try {
        const { data, errorRes } = await auth.signInWithPassword({
            email: formuser.email,
            password: formuser.password,
        })

        console.log(errorRes);

        console.log('Trying to login');
    } catch (errorCatch) {
        console.error(errorCatch)
    }

    auth.onAuthStateChange((_, _session) => {
        console.log('Auth state changed');

        if (_session?.access_token) {
            const accessToken = useCookie('sb-access-token')
            const refreshToken = useCookie('sb-refresh-token')
            accessToken.value = _session?.access_token ?? null
            refreshToken.value = _session?.refresh_token ?? null
            console.log('Setting cookies');

        }
    })
}
</script>
