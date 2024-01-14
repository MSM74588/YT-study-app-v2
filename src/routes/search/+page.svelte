<script>
	// @ts-nocheck
	import { page } from '$app/stores';
	import { goto } from '$app/navigation';
	import { onMount } from 'svelte';
	import Logo from '$lib/components/LogoHeader.svelte';

	import {fade} from 'svelte/transition'
 
	import { CaretDown } from 'phosphor-svelte';

	// let results = yt_search_result.searchResults;

	let globalSearchResults = [];
	let nextPageToken = '';
	let totalResult = '';
	let eachPageResult = '';
	let err = false;

	async function fetchSearchResults(query, page_token) {
		const search_api_route = new URL('/api/search', window.location.origin);
		const params = new URLSearchParams({
			search_query: query
		});

		if (page_token) {
			params.append('page_token', page_token);
		}

		search_api_route.search = params.toString();
		const search_api_with_params = search_api_route.toString();
		try {
			const res = await fetch(search_api_with_params);
			const data = await res.json();

			if (!data.ok) {
				err = true;
				if (data.status === 403) {
					throw new Error('Forbidden: Quota Exceeded');
				}
			}

			err = false;

			// console.log(data);
			// console.log(data)

			const searchResults = data.results.searchResults;
			globalSearchResults = [...globalSearchResults, ...searchResults];

			nextPageToken = data.results.pageToken.nextPageToken;
			console.log(data.results.pageToken);

			totalResult = data.results.pageInfo.totalResults;
			eachPageResult = data.results.pageInfo.resultsPerPage;

			return data;
		} catch (err) {
			console.error(err.message);
			err = true;
		}
	}

	onMount(async () => {
		const url = $page.url;
		const query = url.searchParams.get('search_query') ?? '';

		if (query) {
			fetchSearchResults(query);
		}
		// console.log(fetchSearchResults())
	});

	// console.log(yt_search_result);
	// console.log(results);

	function fetchNextResults() {
		const url = $page.url;
		const query = url.searchParams.get('search_query') ?? '';

		if (query) {
			fetchSearchResults(query, nextPageToken);
		}
	}

	// function gotoNextPage() {
	// 	// Get the current page URL
	// 	const currentPageUrl = $page.url;

	// 	// Get the next page token
	// 	const nextPageToken = yt_search_result.pageToken.nextPageToken;

	// 	// Create a URL object from the current page URL
	// 	const urlObject = new URL(currentPageUrl);

	// 	// Get existing URL parameters
	// 	const urlParams = new URLSearchParams(urlObject.search);

	// 	// Set the 'page_token' parameter to the next page token
	// 	urlParams.set('page_token', nextPageToken);

	// 	// Use the `goto` function to navigate to the updated URL with modified parameters
	// 	console.log(urlParams.toString());

	// 	const route = '/search';

	// 	goto(`${route}?${urlParams.toString()}`, { replaceState: true, invalidateAll: true });
	// }
</script>

<!-- {#each globalSearchResults as result}
		<h1>{@html result.title}</h1>
{/each} -->

<!-- <p>Next Page token: {yt_search_result.pageToken.nextPageToken}</p> -->
<!-- <p>{nextPageToken}</p> -->

<div class="h-dvh w-dvw px-32">
	<div class="min-h-full border-x-2 border-neutral-300 bg-neutral-200 px-4 py-3 pt-12">
		<Logo />

		<!-- {#each urlParam as parameter}
			<div class="flex flex-row gap-1">
				<p class="font-lexend font-semibold">Search Query:</p>
				<p
					class="font-lexend font-semibold text-neutral-600 underline decoration-2 underline-offset-4"
				>
					{parameter.value}
				</p>
			</div>
		{/each} -->

		{#if err}
			<h1>error</h1>
		{/if}

		<div class="grid grid-cols-5 gap-3 py-7">
			{#each globalSearchResults as result}
				<div transition:fade
					class="group rounded bg-red-200 p-3 ring-2 ring-orange-600 ring-offset-2 transition duration-100 hover:bg-red-300 hover:ring-4"
				>
					<h1 class="font-lexend text-lg">{@html result.title}</h1>
					<h1 class="font-light text-neutral-800">{result.videoId}</h1>
					<div class="aspect-video transition duration-100 group-hover:scale-110">
						<img class="rounded" src={result.thumbnailUrl} alt={result.titile} />
					</div>
				</div>
			{/each}
		</div>

		<div class="py-10 font-lexend">
			<nav aria-label="navigation">
				<div class="flex w-full flex-col items-center gap-5 align-middle text-neutral-800">
					<div class="text-center">
						<h1>Total results: {totalResult || '0'}</h1>
						<h1>Results each page: {eachPageResult || '0'}</h1>
					</div>

					<button
						on:click={fetchNextResults}
						class="flex flex-row items-center gap-3 rounded-lg bg-purple-500 px-32 py-3 text-white ring-0 ring-purple-600 transition duration-100 hover:ring-4 hover:ring-offset-4 active:bg-purple-700"
					>
						<p>Load More</p>
						<CaretDown weight="bold" size={18} />
					</button>
				</div>
			</nav>
		</div>
	</div>
</div>
