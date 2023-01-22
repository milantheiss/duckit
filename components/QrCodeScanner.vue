<template>
    <div>
        <div v-show="!isLoading">
            <video poster="data:image/gif,AAAA" ref="scanner"
                class="object-cover rounded-lg sm:w-[500px] h-[500px]"></video>
        </div>
    </div>
</template>

<script>
import { BrowserMultiFormatReader, Exception } from "@zxing/library";
export default {
  name: "stream-barcode-reader",
  data() {
    return {
      isLoading: true,
      codeReader: new BrowserMultiFormatReader(),
      isMediaStreamAPISupported: navigator && navigator.mediaDevices && "enumerateDevices" in navigator.mediaDevices,
    };
  },
  mounted() {
    if (!this.isMediaStreamAPISupported) {
      throw new Exception("Media Stream API is not supported");
      return;
    }
    this.start();
    this.$refs.scanner.oncanplay = (event) => {
      this.isLoading = false;
      this.$emit("loaded");
    };
  },
  beforeUnmount() {
    this.codeReader.reset();
  },
  methods: {
    start() {
      this.codeReader.decodeFromVideoDevice(undefined, this.$refs.scanner, (result, err) => {
        if (result) {
          this.$emit("decode", result.text);
          this.$emit("result", result);
        }
      });
    },
  },
};
</script>