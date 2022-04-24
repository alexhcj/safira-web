import axios from 'axios'

const callAPI = async ({url, data, method, params = {}, headers = {}, responseType }) => {
	const config = {
		url,
		data,
		params,
		method,
		headers: {
			...axios.defaults.headers.common,
			'Content-Type': 'application/json',
			...headers,
		},
		baseURL: process.env.REACT_APP_BASE_URL,
		responseType,
	};

	try {
		const res = await axios(config);
		return res.data;
	} catch (err) {
		console.log(err);
	}
};

export const API = {
	async get(url, params, headers, responseType) {
	return callAPI({
		url,
		params,
		headers,
		responseType,
		method: 'GET',
	});
},

	async post(url, data, params, headers) {
	return callAPI({
		url,
		data,
		params,
		headers,
		method: 'POST',
	});
},

	async put(url, data, params, headers) {
	return callAPI({
		url,
		data,
		params,
		headers,
		method: 'PUT',
	});
},

	async del(url, params, headers) {
	return callAPI({
		url,
		params,
		headers,
		method: 'DELETE',
	});
},
};
