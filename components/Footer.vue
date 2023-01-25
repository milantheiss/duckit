<template>
    <div class="flex flex-col justify-center items-center ">
        <div class="w-full flex justify-center items-center text-lg font-semibold mb-4">
            <NuxtLink to="/login" class="text-lg font-semibold before:content-['↗️'] whitespace-nowrap" v-if="!isAuthenticated">
                <span class="hover:underline">Login</span>
            </NuxtLink>
            <p @click="logout" class="text-lg font-semibold before:content-['↗️'] cursor-pointer  whitespace-nowrap" v-if="isAuthenticated ">
                <span class="hover:underline">Logout</span>
            </p>
            <p class="mx-2">|</p>
            <NuxtLink to="/legalNotice" class="text-lg font-semibold before:content-['↗️']">
                <span class="hover:underline">Impressum</span>
            </NuxtLink>
        </div>
        <p class="w-max flex font-light mb-6">🧑‍💻 <a href="https://milantheiss.de" class="hover:underline mx-1">Milan
                Theiß</a>| View
            on<a href="https://github.com/milantheiss/duckit" class="flex items-center hover:underline"> <svg
                    xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" width="16" height="16" class="mx-1">
                    <path
                        d="M8 0c4.42 0 8 3.58 8 8a8.013 8.013 0 0 1-5.45 7.59c-.4.08-.55-.17-.55-.38 0-.27.01-1.13.01-2.2 0-.75-.25-1.23-.54-1.48 1.78-.2 3.65-.88 3.65-3.95 0-.88-.31-1.59-.82-2.15.08-.2.36-1.02-.08-2.12 0 0-.67-.22-2.2.82-.64-.18-1.32-.27-2-.27-.68 0-1.36.09-2 .27-1.53-1.03-2.2-.82-2.2-.82-.44 1.1-.16 1.92-.08 2.12-.51.56-.82 1.28-.82 2.15 0 3.06 1.86 3.75 3.64 3.95-.23.2-.44.55-.51 1.07-.46.21-1.61.55-2.33-.66-.15-.24-.6-.83-1.23-.82-.67.01-.27.38.01.53.34.19.73.9.82 1.13.16.45.68 1.31 2.69.94 0 .67.01 1.3.01 1.49 0 .21-.15.45-.55.38A7.995 7.995 0 0 1 0 8c0-4.42 3.58-8 8-8Z">
                    </path>
                </svg> <span class="font-medium">GitHub</span></a></p>
    </div>
</template>
<script>
export default {
    name: 'Footer',
    setup() {
        const user = useSupabaseUser()
        const client = useSupabaseAuthClient()
        const router = useRouter()

        return {
            user,
            router,
            client,
            isAuthenticated: computed(() => user.value !== null),
        }
    },
    methods: {
        async logout() {

            console.log(this.client.auth)
            const { error } = await this.client.auth.signOut()
            console.log(this.user)

            this.router.push({ path: '/' }	)
        }
    },
}
</script>