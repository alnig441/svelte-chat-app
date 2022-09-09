import { error } from '@sveltejs/kit';

// perform server side only data operations (e.g CRUD)

/** @type {import('./$types').PageServerLoad} */
export async function load() {

  // const post = await getPostFromDatabase(params.slug);
  const post = { username: process.env.USERNAME, password: process.env.PASSWORD, endpoint: process.env.ENDPOINT_DEV };

  if (post) {
    return post;
  }

  throw error(404, 'Not found');
}
