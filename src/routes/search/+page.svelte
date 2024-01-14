<script>
	// @ts-nocheck
	import { page } from '$app/stores';
	import { goto } from '$app/navigation';

	export let data;
	const { urlParam, yt_search_result } = data;

	import Logo from '$lib/components/LogoHeader.svelte';

	import { CaretLeft, CaretRight } from 'phosphor-svelte';

	let results = yt_search_result.searchResults;

	// console.log(yt_search_result);
	// console.log(results);

	function gotoNextPage() {
		// Get the current page URL
		const currentPageUrl = $page.url;

		// Get the next page token
		const nextPageToken = yt_search_result.pageToken.nextPageToken;

		// Create a URL object from the current page URL
		const urlObject = new URL(currentPageUrl);

		// Get existing URL parameters
		const urlParams = new URLSearchParams(urlObject.search);

		// Set the 'page_token' parameter to the next page token
		urlParams.set('page_token', nextPageToken);

		// Use the `goto` function to navigate to the updated URL with modified parameters
        console.log(urlParams.toString())
		

        const route = "/search"

        goto(`${route}?${urlParams.toString()}`,  {replaceState:true, force:true});
	}
</script>

<p>Next Page token: {yt_search_result.pageToken.nextPageToken}</p>

<div class="h-dvh w-dvw px-32">
	<div class="min-h-full border-x-2 border-neutral-300 bg-neutral-200 px-4 py-3 pt-12">
		<Logo />

		{#each urlParam as parameter}
			<div class="flex flex-row gap-1">
				<p class="font-lexend font-semibold">Search Query:</p>
				<p
					class="font-lexend font-semibold text-neutral-600 underline decoration-2 underline-offset-4"
				>
					{parameter.value}
				</p>
			</div>
		{/each}

		<div class="grid grid-cols-5 gap-3 py-7">
			{#each results as result}
				<div
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
				<div class="flex flex-row font-lexend">
					<button class="flex flex-row rounded bg-teal-300">
						<CaretLeft />
						<p>Previous</p>
					</button>
					<button on:click={gotoNextPage} class="flex flex-row rounded bg-teal-300">
						<p>Next</p>
						<CaretRight />
					</button>
				</div>
			</nav>
		</div>
	</div>
</div>
