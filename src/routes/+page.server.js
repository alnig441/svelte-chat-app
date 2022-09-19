import { error } from '@sveltejs/kit';
import { env as public_env } from '$env/dynamic/public';
import { env as private_env } from '$env/dynamic/private';
// perform server side only data operations (e.g CRUD)

/** @type {import('./$types').PageServerLoad} */
export async function load(data) {
  const { port } = data.url;
  const { USERNAME, PASSWORD } = private_env;
  const { PUBLIC_USERNAME, PUBLIC_PASSWORD, PUBLIC_ENDPOINT_DEV, PUBLIC_ENDPOINT_PREVIEW, PUBLIC_ENDPOINT_PROD } = public_env;

  const ENDPOINT = port === '5173'  ? PUBLIC_ENDPOINT_DEV : port === '4173' ? PUBLIC_ENDPOINT_PREVIEW : PUBLIC_ENDPOINT_PROD ;
  // const post = { username: process.env.USERNAME, password: process.env.PASSWORD, endpoint: process.env.ENDPOINT_DEV };
  // const post = { username: USERNAME, password: PASSWORD, endpoint: ENDPOINT };
  const post = { username: USERNAME, password: PASSWORD };

  if (post) {
    return post;
  }

  throw error(404, 'Not found');
}
