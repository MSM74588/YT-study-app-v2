<script>
	import { MagnifyingGlass } from 'phosphor-svelte';
	import { goto } from '$app/navigation';
	import { page } from '$app/stores';

	import { fly } from 'svelte/transition';

    import {createEventDispatcher} from 'svelte'
    
    let dispatch = createEventDispatcher()

    // https://youtu.be/yCkYm4zze8I?si=EK8FIRXgEz5EgXGb

	export let searchvalue = '';
	function redirectToSearch() {
		// const encodedQuery = encodeURIComponent(searchvalue);
		// const parameter = "search_query"
		const path = '/search';
		// goto(`${path}?${parameter}=${encodedQuery}`);

		// let PageURL = $page.url
		// let searchQuery = PageURL.URLSearchParams()
		// searchQuery.set()

        if ($page.route.id == "/search") {
            dispatch('researchValue', searchvalue)
            console.log("aready on /search")
        } else {
            $page.url.searchParams.set('search_query', searchvalue);
            goto(`${path}?${$page.url.searchParams.toString()}`);
        }
	}


	let isSearchFocused = false;
</script>


<form action="?/search" method="POST" on:submit|preventDefault={redirectToSearch}>
	<div class="group">
		<div
			class="group flex flex-row rounded bg-neutral-50 ring-red-500 ring-offset-2 transition-[0.3s] has-[:focus]:ring-2"
		>
			<label for="search" class="sr-only mb-2 text-sm font-medium text-gray-900 dark:text-white"
				>Search</label
			>

			<div class="pointer-events-non group inset-y-0 start-0 flex items-center ps-3">
				<MagnifyingGlass class="fill-orange-500" weight="bold" size={30} />
			</div>
			<input
				required
				id="search"
				type="search"
				placeholder="Search"
				class="w-full bg-transparent px-3 py-2 font-lexend placeholder:text-neutral-600 focus:outline-none"
				name="searchfield"
				bind:value={searchvalue}
				on:focus={() => {
					isSearchFocused = true;
				}}
				on:blur={() => {
					isSearchFocused = false;
				}}
			/>
		</div>
		{#if isSearchFocused}
			<div
				transition:fly={{y: -15}}
				class="py-5"
			>
				Replace with A Select component to add search type (channel/Videos)
			</div>
		{/if}
	</div>
</form>
