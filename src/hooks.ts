import cookie from 'cookie';
import { v4 as uuid } from '@lukeed/uuid';
import type { GetSession } from '@sveltejs/kit';

export const handle = async ({ event, resolve }) => {
	const cookies = cookie.parse(event.request.headers.cookie || '');
	event.locals.userid = cookies.userid || uuid();

	// TODO https://github.com/sveltejs/kit/issues/1046
	if (event.url.searchParams.has('_method')) {
		event.method = event.url.searchParams.get('_method').toUpperCase();
	}

	const response = await resolve(event);

	if (!cookies.userid) {
		// if this is the first time the user has visited this app,
		// set a cookie so that we recognise them when they return
		response.headers['set-cookie'] = `userid=${event.locals.userid}; Path=/; HttpOnly`;
	}

	return response;
};

export const getSession: GetSession = (request) => {
	return {
		user: {
			// only include properties needed client-side —
			// exclude anything else attached to the user
			// like access tokens etc
			userid: request.locals?.userid
		}
	};
};