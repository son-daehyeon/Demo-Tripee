import axios from 'axios';
import Cookies from 'js-cookie';

import { writable } from 'svelte/store';

export const api = axios.create({
	baseURL: 'http://localhost:5173/api',
	headers: {
		'Content-Type': 'application/json'
	}
});

export const user = writable(null);

export const setToken = (accessToken, refreshToken) => {


	if (accessToken) {
		Cookies.set('accessToken', accessToken, { expires: 1 });
		Cookies.set('refreshToken', refreshToken, { expires: 30 });

		api.defaults.headers.common['Authorization'] = `Bearer ${accessToken}`;
	} else {
		Cookies.remove('accessToken');
		Cookies.remove('refreshToken');

		delete api.defaults.headers.common['Authorization'];

		user.set(null);
	}


};

api.interceptors.request.use(
	(config) => {
		const accessToken = Cookies.get('accessToken');

		if (accessToken) {
			config.headers.Authorization = `Bearer ${accessToken}`;
		}

		return config;
	},
	(error) => {
		return Promise.reject(error);
	}
);

api.interceptors.response.use(
	async (response) => {
		if (response.data.error === 'Access Token이 만료되었습니다.') {
			const refreshToken = Cookies.get('refreshToken');

			const response = await api.post('/auth/refresh', { refreshToken });

			Cookies.set('accessToken', response.data.content.accessToken, { expires: 1 });
			Cookies.set('refreshToken', response.data.content.refreshToken, { expires: 30 });

			api.defaults.headers.Authorization = `Bearer ${response.data.content.accessToken}`;

			return api(response.config);
		}

		return response;
	}
);

if (Cookies.get('accessToken')) {
	api.defaults.headers.common['Authorization'] = `Bearer ${Cookies.get('accessToken')}`;
}

function createStore() {
	const { subscribe, set } = writable(0);

	return {
		subscribe,
		set
	};
}
