<template >
    <div class="md:w-120 sm:w-96">
        <div class="flex flex-col justify-center items-start ml-6 mb-4">
            <p class="text-xl sm:text-2xl font-bold">Willkommen...</p>
            <p class="text-base sm:text-lg font-normal text-dark-grey">Bitte melde dich an</p>
        </div>
        <div class="bg-white px-6 py-6 rounded-lg drop-shadow-md w-full">
                <div class="flex items-center mb-6 w-full">
                    <!--Avatar Icon-->
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" class="w-8 mr-4 text-dark-grey"
                        width="30" height="30">
                        <g fill="currentColor" stroke="currentColor" stroke-width="1.5">
                            <path
                                d="M12 2.5a5.5 5.5 0 0 1 3.096 10.047 9.005 9.005 0 0 1 5.9 8.181.75.75 0 1 1-1.499.044 7.5 7.5 0 0 0-14.993 0 .75.75 0 0 1-1.5-.045 9.005 9.005 0 0 1 5.9-8.18A5.5 5.5 0 0 1 12 2.5ZM8 8a4 4 0 1 0 8 0 4 4 0 0 0-8 0Z">
                            </path>
                        </g>
                    </svg>
                    <TextInput type="text" name="username" v-model="form.username" placeholder="Username"
                        class="text-lg" ref="usernameInput"></TextInput>
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
                <div class="flex justify-end items-center text-lg mt-6">
                    <button @click="submit"
                        class="justify-center rounded-lg border border-transparent bg-indigo-600 py-2 px-6 text-lg font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2">Login</button>
                </div>
        </div>
    </div>
</template>

<script>
import ErrorMessage from "@/components/ErrorMessage.vue";
import TextInput from "@/components/TextInput.vue";

export default {
    name: "LoginView",
    // setup() {
    //   const auth = useAuthStore()
    //   const dataStore = useDataStore()
    //   return {
    //     auth,
    //     dataStore
    //   }
    // },

    setup() {
        const client = useSupabaseClient()
        const user = useSupabaseUser()

        return {
            client,
            user
        }
    },
    components: { ErrorMessage, TextInput },
    data() {
        return {
            firebaseUser: useFirebaseUser(),
            form: {
                username: "",
                password: "",
            },
            showError: false,
            loading: null
        };
    },
    methods: {
        async submit() {
            const user = this.form
            console.log(user);

            const EMAIL_REGEX = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

            if (user.username === "" && user.password === "") {
                this.$refs.error.throwError("Bitte gebe einen Benutzernamen und ein Passwort ein")

                this.$refs.usernameInput.showError()
                this.$refs.passwordInput.showError()

                throw new Error("Bitte gebe einen Benutzernamen und ein Passwort ein")
            } else if (user.username === "") {
                this.$refs.error.throwError("Bitte gebe einen Benutzernamen ein")

                this.$refs.usernameInput.showError()
                this.$refs.passwordInput.hideError()

                throw new Error("Bitte gebe einen Benutzernamen ein")
            } else if (user.password === "") {
                this.$refs.error.throwError("Bitte gebe ein Passwort ein")

                this.$refs.passwordInput.showError()
                this.$refs.usernameInput.hideError()

                throw new Error("Bitte gebe ein Passwort ein")
            } else if (!user.username.match(EMAIL_REGEX)) { 
                this.$refs.error.throwError("Bitte gebe eine gültige E-Mail ein")

                this.$refs.usernameInput.showError()
                this.$refs.passwordInput.hideError()

                throw new Error("Bitte gebe eine gültige E-Mail ein")
            } else {
                this.$refs.error.hideError()
                this.$refs.usernameInput.hideError()
                this.$refs.passwordInput.hideError()
            }

            
            try {
                const cred = await signInUser(user.username, user.password)
                console.log(cred);
            } catch (error) {
                console.error(error)
                this.showError = true
            }
        },
    }
};
</script>
