import { redirect, type Handle } from '@sveltejs/kit'

export const handle: Handle = async ({event, resolve}) => {

    event.locals.user = {
        id: 'ask4598sdf',
        name: 'Mehedi',
        role: 'chef'
    }

    event.cookies.set('name', 'ask4598sdf', {path: '/', maxAge: 30})

    // event.locals.user = null;

    if(event.url.pathname.startsWith('/filter')) {
        if(!event.locals.user) {
            throw redirect(303, '/');
        }
    }

    const response = await resolve(event);
    return response;
}