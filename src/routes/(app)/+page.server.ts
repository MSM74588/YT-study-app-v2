import { goto } from '$app/navigation';
import { fail, type Actions } from '@sveltejs/kit';

/** @type {import('./$types').PageServerLoad} */
let searchData: {};

export async function load() {}

export const actions: Actions = {
	search: async ({ request }) => {
		const { searchfield } = Object.fromEntries(await request.formData()) as { searchfield: string };

		try {
            console.log(searchfield)
			const encoded = encodeURI(searchfield);
			console.log(encoded)
		} catch (err) {
            console.error(err)
			return fail(500, { message: 'Could not fetch search results' });
		}

		return {
			status: 201,
		};
	}
};
