// @ts-nocheck
import { searchYouTubeVideo } from '$lib/fetchFunctions/youtube.server';

export const GET = async ({ url }) => {
	const maxResults = Number(url.searchParams.get('limit') ?? '10');
	const query = url.searchParams.get('search_query') ?? '';

	if (url.searchParams.has('search_query')) {
		console.log(maxResults);
		const page_token = url.searchParams.get('page_token') ?? '';

		try {
			const results = await searchYouTubeVideo(query, maxResults, page_token);

			if (!results.ok) {
                console.log(results.status)
				if (results.status === 403) {
					// throw new Error('Forbidden: Quota Exceeded');
                    return new Response(
                        JSON.stringify({
                            message: "Forbidden: Quota Exceeded",
                            error: results.code
                        }),
                        { status: 403 }
                    );
				} else {
					throw new Error('Oops, something went wrong');
				}
			}

			return new Response(
				JSON.stringify({
					message: results.status,
					maxResults: maxResults,
					page_token: page_token,
					results: results
				}),
				{ status: 200 }
			);
		} catch (error) {
			return new Response(
                
				JSON.stringify({
                    
					message: error.message,
					error: error.message || 'Internal Server Error'
				}),
				{ status: 501 }
			);
		}
	} else {
		return new Response(
			JSON.stringify({
				message: 'Bad Request',
				body: 'No Query String Provided'
			}),
			{ status: 400 }
		);
	}
};
