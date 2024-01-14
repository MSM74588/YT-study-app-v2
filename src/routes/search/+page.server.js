// import type { PageServerLoad } from "./$types"

import { searchYouTubeVideo } from '$lib/fetchFunctions/youtube';

/** @type {import('./$types').PageServerLoad} */
export async function load({ url, params }) {
	// console.log("SEARCH PAGE")
	// console.log("PARAMETERS:")
	// const search_param = url.searchParams.get('search_query')
	// const queryValue = search_param

	const extractSearchQuery = () => {
		const paramString = url.search.toString();
		const searchParams = new URLSearchParams(paramString);

		const parametersArray = [];

		for (const [key, value] of searchParams) {
			parametersArray.push({ key, value });
		}

		// const searchQueryString = () => {
		//     if (searchParams.has("search_query")){
		//         return
		//     }
		// }
		// console.log(JSON.stringify(searchParams))
		// console.log(searchParams)

		console.log(parametersArray);

		return parametersArray;
	};

	// console.log(url)
	// if (searchParams.has("search_query")){
	//     console.log(searchParams.get("search_query"))
	// } else {
	//     console.log("No Mathcing URL Parameter")
	// }

	async function youtube_search_results() {
		// const extractQuery = extractSearchQuery()
		// if (extractQuery && extractQuery.hasOwnProperty('search_query')){
		//     return extractQuery.search_query
		//     console.log(extractQuery)
		// }
		const extractedQuery = extractSearchQuery().find((item) => item.key === 'search_query');
		const getExtractedQuery = () => {
			if (extractedQuery) {
				return extractedQuery.value;
			} else {
				console.error('Query Parameter Empty');
				return null;
			}
		};

		const getExtractedToken = () => {
			const pageTokenQuery = extractSearchQuery().find((item) => item.key === 'page_token');

			if (pageTokenQuery) {
                console.log(pageTokenQuery.value)
				return pageTokenQuery.value;
			} else {
				console.error('Query Parameter Empty');
				return null;
			}
		};

		const query = getExtractedQuery();
		const nextPageToken = getExtractedToken();

		// const query =  extractSearchQuery().find(item => item.key === 'search_query')?.value;
		const maxResults = 5;

		console.log(`Query: ${query}`);

		// searchYouTube(query, maxResults)
		// .then(results => {
		//     console.log(results)
		//     return results;
		// });

		if (extractedQuery) {
			try {
				const results = await searchYouTubeVideo(query, maxResults, nextPageToken);
				return results;
			} catch (error) {
				console.error(error);
				return [];
			}
		} else {
			console.error('Query Parameter Empty');
		}
	}

	return {
		urlParam: extractSearchQuery(),
		yt_search_result: await youtube_search_results()
	};
}

// https://youtu.be/EQy-AYhZIlE?si=aIEBhLJ-jQco4n07
