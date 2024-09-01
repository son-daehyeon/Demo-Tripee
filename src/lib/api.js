import axios from 'axios';
import Cookies from 'js-cookie';

import { writable } from 'svelte/store';

export const api = axios.create({
	baseURL: 'https://tripee.p-e.kr/api',
	headers: {
		'Content-Type': 'application/json'
	}
});

export const user = writable(null);

export const setToken = (accessToken, refreshToken) => {

	if (accessToken) {
		Cookies.set('accessToken', accessToken, { expires: 1 });

		api.defaults.headers.common['Authorization'] = `Bearer ${accessToken}`;
	} else {
		Cookies.remove('accessToken');

		delete api.defaults.headers.common['Authorization'];

		user.set(null);
	}
};

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
