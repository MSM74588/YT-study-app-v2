// @ts-nocheck

import { YT_API_KEY } from '$env/static/private';

const yt_api_key = YT_API_KEY;


export async function searchYouTubeVideo(query, maxResults = 10, nextPageToken) {
		const apiUrl = new URL('https://www.googleapis.com/youtube/v3/search');

		const params = new URLSearchParams({
			part: 'snippet',
			key: yt_api_key,
			q: query,
			maxResults: maxResults,
            order: 'relevance',
            type: 'video',
            // nextPageToken: nextPageToken,
		});

        console.log(`next page token : ${nextPageToken}`)
        if (nextPageToken) {
            params.append("pageToken", nextPageToken)
        }

		apiUrl.search = params.toString();
        
        console.log(`API URL: ${apiUrl}`)

		return fetch(apiUrl)
			.then((response) => {
				if (!response.ok) {
					throw new Error(`Network response was not ok: ${response.statusText}`);
				}
				return response.json();
			})
			.then((data) => {

                console.log(data)

				const searchResults = data.items.map((item) => {
					return {
						videoId: item.id.videoId,
						title: item.snippet.title,
						thumbnailUrl: item.snippet.thumbnails.medium.url,
                        channelTitle: item.snippet.channelTitle,
                        publishedTime: item.snippet.publishTime,
						description: item.snippet.description,
					};
				});

                const pageInfo = {
                    totalResults: data.pageInfo.totalResults,
                    resultsPerPage: data.pageInfo.resultsPerPage,
                };

                const pageToken = {
                    nextPageToken: data.nextPageToken
                }

                return { searchResults, pageInfo, pageToken };

				return searchResults;
			})
			.catch((error) => {
				console.error('Error fetching YouTube search results:', error);
			});
	}


