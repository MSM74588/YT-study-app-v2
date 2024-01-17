// @ts-nocheck
import { searchYouTubeVideo } from '$lib/fetchFunctions/youtube.server';

export const GET = async ({ url }) => {
	const parameters_url = new URL(url)
	const maxResults = Number(parameters_url.searchParams.get('limit') ?? '30');
	const query = parameters_url.searchParams.get('search_query') ?? '';

	var filter = parameters_url.searchParams.get("filter") ?? "";
	console.log(`FILTER: ${filter}`)
	// !! ISSUE HERE, FILTER is not returning the value, URL only returns searchquery value

	if (parameters_url.searchParams.has('search_query')) {
		console.log(maxResults);

		console.log(parameters_url)
		const page_token = parameters_url.searchParams.get('page_token') ?? "";
		var  type = parameters_url.searchParams.get('type') ?? "";
		



		try {
			const results = await searchYouTubeVideo(query, maxResults, page_token, type, filter);

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
			}
        }
			
			return new Response(
				JSON.stringify({
					type: results.type,
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
