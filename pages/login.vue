<template >
    <div class="md:w-120 sm:w-96">
        <div class="flex flex-col justify-center items-start ml-6 mb-4">
            <h1 class="text-xl sm:text-2xl font-bold">Willkommen...</h1>
            <p class="text-base sm:text-lg font-normal text-dark-grey">Bitte melde dich an</p>
        </div>
        <div class="bg-white shadow-white-card px-6 py-6 rounded-lg drop-shadow-md w-full">
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
                <svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg"
                    class="w-8 ml-1 mr-3 text-dark-grey icon-shadow bg-opacity-0">
                    <g filter="url(#filter0_iii_18_23714)">
                        <path fill-rule="evenodd" clip-rule="evenodd"
                            d="M19.0644 17.3934C21.935 18.5564 25.3474 17.9739 27.6753 15.646C30.78 12.5413 30.78 7.50754 27.6753 4.40278C24.5705 1.29802 19.5368 1.29805 16.432 4.40278C14.0968 6.73798 13.518 10.1644 14.6956 13.0406L11.2476 16.4886C10.9957 16.7405 10.8516 17.0804 10.8457 17.4366L10.8285 18.4695C10.823 18.8037 10.6817 19.1211 10.4371 19.3488C10.2396 19.5327 9.98705 19.6465 9.71845 19.6726L9.18177 19.7248C8.91395 19.7509 8.66343 19.8691 8.47313 20.0594C8.28629 20.2462 8.1688 20.4913 8.14002 20.7539L8.08167 21.2861C8.05 21.5748 7.92085 21.8441 7.71549 22.0494C7.46444 22.3005 7.12017 22.4356 6.76538 22.4223L5.96496 22.3923C5.58326 22.378 5.21287 22.5234 4.94278 22.7934L3.08423 24.652C1.88004 25.8562 1.88005 27.8086 3.08423 29.0128C4.28841 30.2169 6.24082 30.217 7.44502 29.0128L19.0644 17.3934ZM26.2248 8.37489C25.5285 9.07123 24.3995 9.07122 23.7032 8.37489C23.0068 7.67855 23.0068 6.54956 23.7032 5.85322C24.3995 5.15687 25.5285 5.15688 26.2248 5.85322C26.9212 6.54955 26.9212 7.67854 26.2248 8.37489Z"
                            fill="url(#paint0_linear_18_23714)" />
                    </g>
                    <path fill-rule="evenodd" clip-rule="evenodd"
                        d="M19.0644 17.3934C21.935 18.5564 25.3474 17.9739 27.6753 15.646C30.78 12.5413 30.78 7.50754 27.6753 4.40278C24.5705 1.29802 19.5368 1.29805 16.432 4.40278C14.0968 6.73798 13.518 10.1644 14.6956 13.0406L11.2476 16.4886C10.9957 16.7405 10.8516 17.0804 10.8457 17.4366L10.8285 18.4695C10.823 18.8037 10.6817 19.1211 10.4371 19.3488C10.2396 19.5327 9.98705 19.6465 9.71845 19.6726L9.18177 19.7248C8.91395 19.7509 8.66343 19.8691 8.47313 20.0594C8.28629 20.2462 8.1688 20.4913 8.14002 20.7539L8.08167 21.2861C8.05 21.5748 7.92085 21.8441 7.71549 22.0494C7.46444 22.3005 7.12017 22.4356 6.76538 22.4223L5.96496 22.3923C5.58326 22.378 5.21287 22.5234 4.94278 22.7934L3.08423 24.652C1.88004 25.8562 1.88005 27.8086 3.08423 29.0128C4.28841 30.2169 6.24082 30.217 7.44502 29.0128L19.0644 17.3934ZM26.2248 8.37489C25.5285 9.07123 24.3995 9.07122 23.7032 8.37489C23.0068 7.67855 23.0068 6.54956 23.7032 5.85322C24.3995 5.15687 25.5285 5.15688 26.2248 5.85322C26.9212 6.54955 26.9212 7.67854 26.2248 8.37489Z"
                        fill="url(#paint1_radial_18_23714)" />
                    <defs>
                        <filter id="filter0_iii_18_23714" x="1.78109" y="1.92422" width="28.5727" height="28.3917"
                            filterUnits="userSpaceOnUse" color-interpolation-filters="sRGB">
                            <feFlood flood-opacity="0" result="BackgroundImageFix" />
                            <feBlend mode="normal" in="SourceGraphic" in2="BackgroundImageFix" result="shape" />
                            <feColorMatrix in="SourceAlpha" type="matrix"
                                values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" result="hardAlpha" />
                            <feOffset dx="0.35" dy="-0.1" />
                            <feGaussianBlur stdDeviation="0.3" />
                            <feComposite in2="hardAlpha" operator="arithmetic" k2="-1" k3="1" />
                            <feColorMatrix type="matrix"
                                values="0 0 0 0 0.803922 0 0 0 0 0.623529 0 0 0 0 0.294118 0 0 0 1 0" />
                            <feBlend mode="normal" in2="shape" result="effect1_innerShadow_18_23714" />
                            <feColorMatrix in="SourceAlpha" type="matrix"
                                values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" result="hardAlpha" />
                            <feOffset dy="-0.15" />
                            <feGaussianBlur stdDeviation="0.3" />
                            <feComposite in2="hardAlpha" operator="arithmetic" k2="-1" k3="1" />
                            <feColorMatrix type="matrix"
                                values="0 0 0 0 0.796078 0 0 0 0 0.505882 0 0 0 0 0.411765 0 0 0 1 0" />
                            <feBlend mode="normal" in2="effect1_innerShadow_18_23714"
                                result="effect2_innerShadow_18_23714" />
                            <feColorMatrix in="SourceAlpha" type="matrix"
                                values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" result="hardAlpha" />
                            <feOffset dx="-0.4" dy="0.4" />
                            <feGaussianBlur stdDeviation="0.2" />
                            <feComposite in2="hardAlpha" operator="arithmetic" k2="-1" k3="1" />
                            <feColorMatrix type="matrix"
                                values="0 0 0 0 0.996078 0 0 0 0 0.996078 0 0 0 0 0.423529 0 0 0 1 0" />
                            <feBlend mode="normal" in2="effect2_innerShadow_18_23714"
                                result="effect3_innerShadow_18_23714" />
                        </filter>
                        <linearGradient id="paint0_linear_18_23714" x1="17.8641" y1="7.45709" x2="17.4931" y2="29.939"
                            gradientUnits="userSpaceOnUse">
                            <stop stop-color="#FFDC46" />
                            <stop offset="1" stop-color="#F38E4A" />
                        </linearGradient>
                        <radialGradient id="paint1_radial_18_23714" cx="0" cy="0" r="1" gradientUnits="userSpaceOnUse"
                            gradientTransform="translate(19.3281 13.7187) rotate(136.353) scale(22.4569 11.4358)">
                            <stop offset="0.934938" stop-color="#F18849" stop-opacity="0" />
                            <stop offset="1" stop-color="#CC6946" />
                        </radialGradient>
                    </defs>
                </svg>

                <TextInput type="password" name="password" v-model="form.password" placeholder="Passwort"
                    class="text-lg" ref="passwordInput">
                </TextInput>
            </div>
            <ErrorMessage class="mx-3 my-6" ref="error" />
            <div class="flex flex-col justify-center items-end text-lg mt-3">
                <NuxtLink to="/forgotPassword" class="font-medium text-lg hover:underline mb-3">Passwort vergessen?
                </NuxtLink>
                <button @click="submit()"
                    class="justify-center rounded-lg shadow-button border-none bg-indigo-600 py-2 px-6 text-lg font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2">Login</button>
            </div>
        </div>
    </div>
</template>

<script setup>
const { auth } = useSupabaseAuthClient()
let form = {
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

async function submit() {
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

        if (data) {
            auth.setSession(data.session)
            navigateTo("/register")
        } else {
            error.throwError("E-Mail oder Passwort falsch")
            console.log(errorRes);
        }

        console.log('Trying to login');
    } catch (errorCatch) {
        console.error(errorCatch)
    }

    auth.onAuthStateChange((_, _session) => {
        if (_session?.access_token) {
            const accessToken = useCookie('sb-access-token')
            const refreshToken = useCookie('sb-refresh-token')
            accessToken.value = _session?.access_token ?? null
            refreshToken.value = _session?.refresh_token ?? null
        }
    })
}

onMounted(async () => {
    const user = await (await useSupabaseClient().auth.getSession()).data;
    watchEffect(() => {
        if (user.session !== null) {
            navigateTo('/register')
        }
    })
}
)

</script>
<style>
.icon-shadow {
    filter: drop-shadow(5px 5px 10px rgb(0, 0, 0))
}
</style>