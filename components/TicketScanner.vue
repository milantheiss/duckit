<template>
	<div>
		<p>Scanne Qr Code</p>
		<StreamBarcodeReader @result="(a) => onDecode(a)"></StreamBarcodeReader>
	</div>
</template>
<script>
import { StreamBarcodeReader } from 'vue-barcode-reader'

export default {
	name: 'CheckInView',
	methode: {
		onDecode(a) {
			console.log(a)
		},
		onLoaded() {
			console.log('load')
		}
	},
	components: {
		StreamBarcodeReader
	}
}
</script>
