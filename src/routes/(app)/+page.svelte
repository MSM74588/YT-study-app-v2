<script>
	// npx svelte-add@latest tailwindcss
	// https://youtu.be/w2q9caYXgkg?si=d2T1vODeq5bVn55w&t=208

	import { page } from '$app/stores'



	import { goto } from '$app/navigation';

	import { MagnifyingGlass } from 'phosphor-svelte';

	import { cn } from '$lib/utils/style';

	import { createTabs, melt } from '@melt-ui/svelte';

	import { cubicInOut } from 'svelte/easing';
	import { crossfade } from 'svelte/transition';

	import Logo from '$lib/components/LogoHeader.svelte'

	const {
		elements: { root, list, content, trigger },
		states: { value }
	} = createTabs({
		defaultValue: 'tab-1'
	});

	let className = '';
	export { className as class };

	const triggers = [
		{ id: 'tab-1', title: 'Bookmarked Videos' },
		{ id: 'tab-2', title: 'Watch Later' }
	];

	const [send, receive] = crossfade({
		duration: 250,
		easing: cubicInOut
	});

	let searchvalue = ""
	function redirectToSearch() {

		
		// const encodedQuery = encodeURIComponent(searchvalue);
		// const parameter = "search_query"
		const path = "/search"
		// goto(`${path}?${parameter}=${encodedQuery}`);

		// let PageURL = $page.url
		// let searchQuery = PageURL.URLSearchParams()
		// searchQuery.set() 

		$page.url.searchParams.set('search_query',searchvalue); 
		goto(`${path}?${$page.url.searchParams.toString()}`);
	}
</script>

<div class="h-dvh w-dvw bg-[#AF9C9C] px-[10%]">
	<div class="flex h-full w-full flex-row">
		<div class="w-[350px] bg-[#C7BFBF] px-8 pt-11" id="left-sidebar">
			<!-- LOGO -->
			<Logo />

			<div>
				<h1 class="font-title text-lg">Bookmarked Channels:</h1>
			</div>
		</div>
		<div class="flex-grow border-x-2 border-neutral-400 bg-neutral-200" id="main">
			<div
				use:melt={$root}
				class={cn(
					'flex h-full w-full flex-col overflow-hidden  data-[orientation=vertical]:flex-row',
					className
				)}
			>
				<!-- List of tabs -->
				<div
					use:melt={$list}
					class="flex justify-center overflow-x-auto border-b-2 border-neutral-400 data-[orientation=vertical]:flex-col data-[orientation=vertical]:border-r"
					aria-label="Videos tab"
				>
					{#each triggers as triggerItem}
						<button use:melt={$trigger(triggerItem.id)} class="trigger tab-button relative">
							{triggerItem.title}
							{#if $value === triggerItem.id}
								<div
									in:send={{ key: 'trigger' }}
									out:receive={{ key: 'trigger' }}
									class="absolute bottom-1 left-1/2 h-1 w-6 -translate-x-1/2 rounded-full bg-red-700"
								/>
							{/if}
						</button>
					{/each}
				</div>
				<div use:melt={$content('tab-1')}>TaB 1</div>
				<div use:melt={$content('tab-2')}>
					<h1 class="text-3xl">HELLO WORLD, Tab 2</h1>
				</div>
			</div>
		</div>
		<div class="w-[400px] bg-[#C7BFBF]" id="right-sidebar">
			<!-- RIGHT SIDEBAR -->
			<div class="w-full px-4 pt-4" id="search-field">
				<form action="?/search" method="POST" on:submit|preventDefault={redirectToSearch}>
					<div class="group">
						<div
							class="group flex flex-row rounded bg-neutral-50 ring-red-500 ring-offset-2 transition-[0.3s] has-[:focus]:ring-2"
						>
							<label
								for="search"
								class="sr-only mb-2 text-sm font-medium text-gray-900 dark:text-white">Search</label
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
							/>
						</div>
						<div
							class="invisible opacity-0 transition-all duration-150 group-has-[:focus]:visible group-has-[:focus]:translate-y-2 group-has-[:focus]:opacity-100"
						>
							Replace with A Select component to add search type (channel/Videos)
						</div>
					</div>
				</form>
			</div>
		</div>
	</div>
</div>

<style lang="postcss">
	.trigger {
		transition: 0.3s;

		font-family: 'Lexend Deca Variable', sans-serif;
		font-weight: 500;

		display: flex;
		align-items: center;
		justify-content: center;

		cursor: default;
		user-select: none;

		border-radius: 0;
		background-color: theme(colors.neutral.300);

		color: theme(colors.neutral.500);

		line-height: 1;

		flex: 1;
		height: theme(spacing.12);
		padding-inline: theme(spacing.2);

		&:focus {
			position: relative;
		}

		&:focus-visible {
			@apply z-10 ring-2;
		}

		&[data-state='active'] {
			@apply focus:relative;
			background-color: white;
			background-color: theme(colors.neutral.200);
			color: theme(colors.red.700);
			font-weight: 600;
		}
	}
</style>
