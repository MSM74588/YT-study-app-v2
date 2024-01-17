<script>
	import { MagnifyingGlass } from 'phosphor-svelte';
	import { goto } from '$app/navigation';
	import { page } from '$app/stores';

	import { fly } from 'svelte/transition';

	import { createEventDispatcher } from 'svelte';

	import * as Select from '$lib/components/ui/select';

	let dispatch = createEventDispatcher();

	// https://youtu.be/yCkYm4zze8I?si=EK8FIRXgEz5EgXGb

	const filters = [
		{ value: '', label: 'None' },
		{ value: 'relevance', label: 'Relevance' },
		{ value: 'date ', label: 'Date ' },
		{ value: 'rating ', label: 'Rating' },
		{ value: 'title', label: 'Title' },
		{ value: 'videoCount', label: 'Video Count' },
		{ value: 'viewCount', label: 'Views' }
	];

	const types = [
		{ value: 'videos', label: 'Videos' },
		{ value: 'channels', label: 'Channel' },
		{ value: 'playlists', label: 'Playlists' }
	];

	export let typeValue = '';
	export let filterValue = '';

	export let searchvalue = '';
	function redirectToSearch() {
		// const encodedQuery = encodeURIComponent(searchvalue);
		// const parameter = "search_query"
		const path = '/search';
		// goto(`${path}?${parameter}=${encodedQuery}`);

		// let PageURL = $page.url
		// let searchQuery = PageURL.URLSearchParams()
		// searchQuery.set()

		if ($page.route.id == '/search') {
			dispatch('researchValue', searchvalue);
			console.log('aready on /search');
		} else {
			$page.url.searchParams.set('search_query', searchvalue);
			if (typeValue) {
				$page.url.searchParams.set('type', typeValue);
			}
			if (filterValue) {
				$page.url.searchParams.set('filter', filterValue);
			}
			goto(`${path}?${$page.url.searchParams.toString()}`);
		}
	}

	class Timer {
		/**
		 * @param {any} callback
		 * @param {any} seconds
		 */
		constructor(callback, seconds) {
			this.callback = callback;
			this.seconds = seconds;
			this.timer = null;
		}

		start() {
			this.timer = setInterval(() => {
				this.seconds -= 1;
				if (this.seconds === 0) {
					clearInterval(this.timer);
					this.callback();
				}
			}, 1000);
		}

		reset() {
			clearInterval(this.timer);
			this.seconds = 10;
			this.start();
		}

		stop() {
			clearInterval(this.timer);
		}
	}

	let isSearchFocused = false;


	// @ts-ignore
	let timer
	timer = new Timer(() => {isSearchFocused = false}, 5);

	function searchFocusedTImeout(){
		timer.start();
	}


	
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
					searchFocusedTImeout()
				}}
			/>
		</div>
		{#if isSearchFocused}
			<div transition:fly={{ y: -15 }} class="flex flex-row gap-4 py-5">
				<div class="flex grow flex-row items-center gap-2">
					<h1 class="font-lexend text-sm text-neutral-700">Filter:</h1>
					<div class="grow">
						<Select.Root>
							<Select.Trigger class="w-full font-lexend text-sm font-light">
								<Select.Value placeholder="None" />
							</Select.Trigger>
							<Select.Content class="w-full">
								{#each filters as filter}
									<Select.Item
										class="px-3 py-2 font-lexend text-sm font-light"
										value={filter.value}
										label={filter.label}
										on:click={() => {filterValue = filter.value; timer.reset()}}>{filter.label}</Select.Item
									>
								{/each}
							</Select.Content>
						</Select.Root>
					</div>
				</div>
				<div class="flex grow flex-row items-center gap-2">
					<h1 class="font-lexend text-sm text-neutral-700">Type:</h1>
					<div class="grow">
						<Select.Root>
							<Select.Trigger class="w-full font-lexend text-sm font-light">
								<Select.Value placeholder="None" />
							</Select.Trigger>
							<Select.Content class="w-full font-lexend text-sm font-light">
								{#each types as type}
									<Select.Item
										value={type.value}
										label={type.label}
										on:click={() => {typeValue = type.value; timer.reset()}}>{type.label}</Select.Item
									>
								{/each}
							</Select.Content>
						</Select.Root>
					</div>
				</div>
			</div>
		{/if}
	</div>
</form>
