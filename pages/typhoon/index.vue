<template>
	<view>
		<web-view :src="src"></web-view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				src: "http://192.168.1.120:9998/dist/h5.html"
			}
		},
		methods: {},
		onLoad() {
			// #ifdef APP-PLUS
			this.src = "/hybrid/html/h5.html";
			// #endif
		},
		onShow() {
			// #ifdef APP-PLUS
			this.src = "/hybrid/html/h5.html";
			// #endif
		}
	}
</script>

<style>

</style>
