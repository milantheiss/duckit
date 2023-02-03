import { defineNuxtPlugin } from '#app'
import Toast, { POSITION,TYPE } from "vue-toastification"
import "vue-toastification/dist/index.css" // if needed
import SuccessIcon from "~~/composables/SuccessIcon.vue"
import SendIcon from "~~/composables/SendIcon.vue"
import CloseButtonIconVue from '~~/composables/CloseButtonIcon.vue'

export default defineNuxtPlugin(nuxtApp => {
    nuxtApp.vueApp.use(Toast, {
        position: POSITION.BOTTOM_RIGHT,
        toastDefaults: {
            [TYPE.SUCCESS]: {
                icon: SuccessIcon,
            },
            [TYPE.SEND]: {
                icon: SendIcon,
            },
        },
        maxToasts: 3,
        closeButton: CloseButtonIconVue
    })
})