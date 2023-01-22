import { BrowserMultiFormatReader, Exception } from "@zxing/library";

export default defineNuxtPlugin((nuxtApp) => {
    const codeReader = new BrowserMultiFormatReader();
	nuxtApp.vueApp.config.globalProperties.$zxing = {
		scan: async (videoElement: HTMLVideoElement) => {
			const result = await codeReader.decodeFromVideoDevice(null, videoElement, (result, _error) => {
				if (result) {
					return result;
				}
			});
		},
        reset: () => {
            codeReader.reset();
        },
        throwException: (msg: string) => {
            throw new Exception(msg);
        }
	};
});
