<script>
	// npx svelte-add@latest tailwindcss
	// https://youtu.be/w2q9caYXgkg?si=d2T1vODeq5bVn55w&t=208

	import { page } from '$app/stores';

	import { fly, fade } from 'svelte/transition';

	import { dateStore, mediaQuery } from 'svelte-legos';

	import { onMount } from 'svelte';

	import Player from '$lib/components/player/main.svelte'

	// @ts-ignore

	let isDivVisible = false;

	const toggleVisibility = () => {
		isDivVisible = !isDivVisible;
	};

	const isWideScreen = mediaQuery('(min-width: 600px)');

	onMount(() => {
		// Set initial visibility based on the media query
		isDivVisible = $isWideScreen;
	});

	import { goto } from '$app/navigation';

	import { Television } from 'phosphor-svelte';

	import { cn } from '$lib/utils/style';

	import { createTabs, melt } from '@melt-ui/svelte';

	import { cubicInOut } from 'svelte/easing';
	import { crossfade } from 'svelte/transition';

	import Logo from '$lib/components/LogoHeader.svelte';
	import Searchbar from '$lib/components/home/searchbar.svelte';

	let nickname = 'MandraSaptak';

	let time = $dateStore;
	let dayNumber = time.getDay();
	const dayNames = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
	const dayName = dayNames[dayNumber];

	function getTimeOfDay() {
		const currentHour = time.getHours();

		if (currentHour >= 17) {
			return 'Evening';
		} else if (currentHour >= 12) {
			return 'Afternoon';
		} else {
			return 'Morning';
		}
	}

	// Example usage
	const timeOfDay = getTimeOfDay();

	function getCurrentFormattedDate() {
		const options = { year: 'numeric', month: 'long', day: 'numeric' };
		// @ts-ignore
		const formattedDate = time.toLocaleDateString('en-US', options);
		return formattedDate;
	}

	// Example usage
	const currentDate = getCurrentFormattedDate();

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
	
</script>

<div class="h-dvh w-dvw bg-[#AF9C9C] md:px-[10%]">
	<div class="flex h-full w-full flex-row">
		{#if isDivVisible}
			<div
				transition:fly={{ x: -100, duration: 240 }}
				class="absolute z-50 flex h-dvh w-dvw flex-row md:static md:inline md:h-full md:w-auto"
				id="left-sidebar"
			>
				<!-- LOGO -->
				<div class=" h-full w-full bg-[#C7BFBF] px-8 pt-11 lg:w-[350px]">
					<div in:fade={{ delay: 100 }} out:fade={{ duration: 50 }}>
						<Logo />
					</div>

					<div>
						<h1 class="font-title text-lg">Bookmarked Channels:</h1>
					</div>
				</div>
				<!-- svelte-ignore a11y-no-static-element-interactions -->

				<button
					in:fade={{ delay: 240, duration: 100 }}
					out:fade={{ duration: 1 }}
					class=" h-full w-24 bg-black opacity-20 md:hidden"
					on:click={toggleVisibility}
				/>
			</div>
		{/if}
		<div class="flex flex-grow flex-col border-x-2 border-neutral-400 bg-neutral-200" id="main">
			<div class="flex flex-col gap-2 pt-6 md:hidden" id="mobile-ui">
				<!-- MOBILE UI -->

				<div class="px-4">
					<button class="" on:click={toggleVisibility}>
						<Television size={25} weight="bold" />
					</button>
				</div>
				<div class="flex flex-col gap-2 px-4">
					<h1 class="font-lexend text-2xl font-semibold">
						<span class="block">Good {timeOfDay},</span><span class="block">{nickname}</span>
					</h1>

					<h1 class="font-lexend text-sm font-semibold leading-tight text-zinc-600">
						{dayName}, {currentDate}
					</h1>
				</div>
				<div class="px-4">
					<Searchbar />
				</div>
				<div id="swiper">
					<h1 class="pl-4 font-lexend">Countdowns:</h1>
					<div class="flex w-full snap-x snap-mandatory flex-row gap-3 overflow-auto px-4 py-2">
						<div
							class="h-28 min-w-44 snap-center scroll-mx-3 rounded-lg border-2 border-stone-600 bg-stone-400"
						></div>
						<div
							class="h-28 min-w-44 snap-center scroll-mx-3 rounded-lg border-2 border-stone-600 bg-stone-400"
						></div>
						<div
							class="h-28 min-w-44 snap-center scroll-mx-3 rounded-lg border-2 border-stone-600 bg-stone-400"
						></div>
						<div
							class="h-28 min-w-44 snap-center scroll-mx-3 rounded-lg border-2 border-stone-600 bg-stone-400"
						></div>
					</div>
				</div>
			</div>
			<div>
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
						class="flex justify-center overflow-x-auto border-b-2 border-neutral-400 text-sm data-[orientation=vertical]:flex-col data-[orientation=vertical]:border-r"
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
		</div>
		<div class="hidden w-[400px] bg-[#C7BFBF] md:inline" id="right-sidebar">
			<!-- RIGHT SIDEBAR -->
			<div class="w-full px-4 pt-4" id="search-field">
				<Searchbar />
			</div>
		</div>
	</div>
</div>

<Player />

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

		white-space: nowrap;
		overflow: hidden;
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
