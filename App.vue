<script>
	export default {
		onLaunch: function() {
			//#ifdef H5
			//#endif  
			this.http({
				url: this.urls.getReg,
			}).then(res => {
				const reg = res.data;
				uni.setStorage({
					key: 'reg',
					data: reg,
					success: function(res) {
						console.log('默认位置存储成功');
					}
				});
			}).catch(err => {
				uni.showToast({
					title: '获取默认区域失败',
					icon: "error"
				});
			});
			//#ifdef APP-PLUS
			const data = {
				appId: plus.runtime.appid,
				appVersion: plus.runtime.version
			};
			// const data = {
			// 	appId: "__UNI__80E44B1",
			// 	appVersion: "1.0.1"
			// };
			this.http({
				url: this.urls.check_apk,
				data: data
			}).then(res => {
				uni.showModal({
					title: '提示',
					content: '有新版本,请更新',
					confirmText: "立即更新",
					cancelText: "暂不更新",
					// success: function (res) {
					success: (r => {
						if (r.confirm) {
							plus.runtime.openURL(res.data.url);
						} else if (r.cancel) {
							console.log('用户点击取消');
						};
					})
				});
			}).catch(err => {

			});
			//#endif
		},
		onShow: function() {

		},
		onHide: function() {

		}
	}
</script>

<style>
	page {
		background: #F0EFEF;
	}
</style>
