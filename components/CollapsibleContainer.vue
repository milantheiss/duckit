<template>
    <div class="grid grid-cols-1 place-items-end w-full">
        <div class="flex justify-between items-center w-full" :class="{'mb-3': showContent}">
            <div class="color-gray-300 mt-0.5 w-fit justify-items-end mr-3 hover:cursor-pointer" @click="toggleShowContent">
                <!--Chevron Sideways-->
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="2"
                    stroke="currentColor" class="w-6 h-6" v-if="!showContent">
                    <path stroke-linecap="round" stroke-linejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5" />
                </svg>
                <!--Chevron Down-->
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="2"
                    stroke="currentColor" class="w-6 h-6" v-if="showContent">
                    <path stroke-linecap="round" stroke-linejoin="round" d="M19.5 8.25l-7.5 7.5-7.5-7.5" />
                </svg>
            </div>
            <header class="flex items-center w-full">
                <slot name="header"></slot>
            </header>
        </div>
        <ClientOnly>
            <transition enter-active-class="transition ease-in-out duration-50" enter-from-class="-translate-y-2 opacity-0"
                enter-to-class="translate-y-0 opacity-100"
                leave-active-class="transition ease-in-out duration-300 transform"
                leave-from-class="translate-y-0 opacity-100" leave-to-class="-translate-y-2 opacity-0">
                <content-slot class="container truncate" v-show="showContent"> 
                    <slot name="content-slot"></slot>
                </content-slot>
            </transition>
        </ClientOnly>
    </div>
</template>
  
<script>
export default {
    name: "CollapsibleContainer",
    setup(props) {
        const showContent = ref(props.show);
        watch(() => props.show, show => {
            showContent.value = show;
        });
        return {
            showContent
        };
    },
    props: {
        show: {
            type: Boolean,
            default: false,
        },
    },
    methods: {
        toggleShowContent() {
            this.showContent = !this.showContent;
        }
    },
    expose: ["toggleShowContent"]
};
</script>