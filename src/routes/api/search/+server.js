import { searchYouTubeVideo } from '$lib/fetchFunctions/youtube.server';

export const GET = async ({ url }) => {
	const maxResults = Number(url.searchParams.get('limit') ?? '10');
	const query = url.searchParams.get('search_query') ?? '';

	if (url.searchParams.has('search_query')) {
		console.log(maxResults);
		const page_token = url.searchParams.get('page_token') ?? '';

		const results = await searchYouTubeVideo(query, maxResults, page_token);

		return new Response(
			JSON.stringify({
				message: 'hello',
				maxResults: maxResults,
				page_token: page_token,
				results: results
			}),
			{ status: 200 }
		);
	} else {
		return new Response(
			JSON.stringify({
				message: 'Bad Request',
                body: "No Query String Provided"
			}),
			{ status: 400 }
		);
	}
};
