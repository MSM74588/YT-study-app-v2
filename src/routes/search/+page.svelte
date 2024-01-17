<script>
	// @ts-nocheck
	import { page } from '$app/stores';
	// import { goto } from '$app/navigation';
	import { onMount } from 'svelte';
	import Logo from '$lib/components/LogoHeader.svelte';
	import ThumbnailCards from '$lib/components/ThumbnailCards.svelte';

	import { CaretDown } from 'phosphor-svelte';
	import Searchbar from '$lib/components/home/searchbar.svelte';


	// let results = yt_search_result.searchResults;

	let globalSearchResults = [];
	let nextPageToken = '';
	let totalResult = '';
	let eachPageResult = '';
	let err = false;

	let searchValue = ""
	let typeValue = '';
	let filterValue = '';


	async function fetchSearchResults(query, page_token, type, filter) {
		const search_api_route = new URL('/api/search', window.location.origin);
		const params = new URLSearchParams({
			search_query: query,
		});

		if (page_token) {
			params.append('page_token', page_token);
		}
		if (type) {
			params.append('type', type)
		}
		if (filter) {
			params.append('filter', filter)
		}
		


		search_api_route.search = params.toString();
		
		const search_api_with_params = search_api_route.toString();
		try {

			if ($page.url.searchParams.has("type")) {
				console.log(`HAS TYPPPPPPPEEE: ${$page.url.searchParams.has("type")}`)
			}
			
			const res = await fetch(search_api_with_params);
			const data = await res.json();

			// console.log(`DATA: ${JSON.stringify(data.results.type)}`)

			if (!data.ok) {
				err = true;
				if (data.status === 403) {
					throw new Error('Forbidden: Quota Exceeded');
				}
			}

			err = false;

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
		const type = url.searchParams.get('type') ?? '';
		const filter = url.searchParams.get('filter') ?? '';

		// console.log(`FILTTTTER: ${filter}`)

		if (query, type, filter) {
			fetchSearchResults(query);
		}
	});
	function fetchNextResults() {
		const url = $page.url;
		const query = url.searchParams.get('search_query') ?? '';

		if (query) {
			fetchSearchResults(query, nextPageToken);
		}
	}


	function research(){
		const query = searchValue

		if (query) {
			globalSearchResults = []
			fetchSearchResults(query);
		}
	}
</script>
<div class="h-dvh w-dvw md:px-32">
	<div class="min-h-full border-x-2 border-neutral-300 bg-neutral-200 px-9 py-3 pt-12">
		<div class="flex flex-col gap-4 md:flex-row">
			<div class="grow">
				<Logo />
			</div>
			<div>
				<Searchbar bind:searchvalue="{searchValue}" bind:typeValue={typeValue} bind:filterValue={filterValue} on:researchValue={research}/>
			</div>
		</div>

		{#if err}
			<h1>error</h1>
		{/if}

		<div class="grid grid-cold-1 sm:grid-cols-2 lg:grid-cols-5 gap-3 py-7">
			{#each globalSearchResults as result}
				<ThumbnailCards
					title={result.title}
					thumbnailUrl={result.thumbnailUrl}
					videoID={result.videoId}
					published_date={result.publishedTime}
					description={result.description}
					channel_title={result.channelTitle}
				/>
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
