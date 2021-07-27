const baseUrl = "http://120.25.155.2:7000";
// const http = (url = "", data = {}, method = "post") => {

const http = (datas = {}) => {
	const url = datas.url || "";
	const method = datas.method || "post";
	const data = datas.data || {};

	return new Promise((resolve, reject) => {
		uni.request({
			url: baseUrl + url,
			method: method,
			data: data,
			dataType: 'json',
			header: {
				'Content-Type': 'application/x-www-form-urlencoded'
			}
		}).then((response) => {
			// setTimeout(function() {
			// 	uni.hideLoading();
			// }, 200);
			let [error, res] = response;
			resolve(res.data);
		}).catch(error => {
			console.log("2222222222")
			let [err, res] = error;
			reject(err)
		})
	});

};
export default http;
