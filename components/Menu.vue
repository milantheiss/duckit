<template>
    <div class="w-full flex justify-center items-center text-lg font-semibold ">
        <NuxtLink to="/register" class="before:content-['✨'] whitespace-nowrap">
            <span class="hover:underline ml-1">Erstellen</span>
        </NuxtLink>
        <NuxtLink to="/checkin" class="before:content-['🎟️']  whitespace-nowrap mx-6">
            <span class="hover:underline ml-1">Kontrollieren</span>
        </NuxtLink>
        <NuxtLink to="/search" @mouseover="showSearch = true" @mouseleave="showSearch = false"
            class="whitespace-nowrap mt-0.5 flex items-center transition ease-in duration-300 delay-150">
            <MagnifyingGlassTiltLeft class="w-6 h-6" />
            <transition enter-active-class="transition ease-in-out duration-300"
                enter-from-class="-translate-x-2 opacity-10" enter-to-class="translate-x-0 opacity-100">
                <p class="hover:underline ml-2 -mt-0.5" v-show="showSearch && $device.isDesktopOrTablet">Suchen</p>
            </transition>
        </NuxtLink>

    </div>
</template>
<script setup>
import MagnifyingGlassTiltLeft from '~~/composables/MagnifyingGlassTiltLeft.vue';
const showSearch = ref(false);
</script>