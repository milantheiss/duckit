<template>
    <div ref="container">
        <div v-show="!isLoading">
            <video poster="data:image/gif,AAAA" ref="scanner"
                class="object-cover rounded-lg sm:w-[500px] h-[500px]"></video>
            <div class="overlay-element"></div>
            <div class="laser"></div>
        </div>
    </div>
</template>

<script>


export default {
    name: "stream-barcode-reader",
    data() {
        return {
            isLoading: true,
            isMediaStreamAPISupported: navigator && navigator.mediaDevices && "enumerateDevices" in navigator.mediaDevices
        };
    },
    mounted() {
        if (!this.isMediaStreamAPISupported) {
            this.$zxing.throwError("MediaStream API is not supported");
            return;
        }

        this.start();
        this.$refs.scanner.oncanplay = (event) => {
            this.isLoading = false;
            this.$emit("loaded");
        };
    },

    beforeUnmount() {
        this.$zxing.reset();
    },

    methods: {
        start() {
            this.$emit("decode", this.$zxing.scan(this.$refs.scanner).text);
            this.$emit("result", this.$zxing.scan(this.$refs.scanner));
        }
    }
}
</script>