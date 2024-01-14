// @ts-nocheck

import { YT_API_KEY } from '$env/static/private';

const yt_api_key = YT_API_KEY;


export async function searchYouTube(query, maxResults = 10) {
		const apiUrl = new URL('https://www.googleapis.com/youtube/v3/search');

		const params = new URLSearchParams({
			part: 'snippet',
			key: yt_api_key,
			q: query,
			maxResults: maxResults
		});

		apiUrl.search = params.toString();

		return fetch(apiUrl)
			.then((response) => {
				if (!response.ok) {
					throw new Error(`Network response was not ok: ${response.statusText}`);
				}
				return response.json();
			})
			.then((data) => {
				const searchResults = data.items.map((item) => {
					return {
						videoId: item.id.videoId,
						title: item.snippet.title,
						thumbnailUrl: item.snippet.thumbnails.default.url
					};
				});

				return searchResults;
			})
			.catch((error) => {
				console.error('Error fetching YouTube search results:', error);
			});
	}


