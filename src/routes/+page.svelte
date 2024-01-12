<script>
	// npx svelte-add@latest tailwindcss
	// https://youtu.be/w2q9caYXgkg?si=d2T1vODeq5bVn55w&t=208
	import '@fontsource-variable/space-grotesk';
	import '@fontsource-variable/rubik';

	import '@fontsource-variable/lexend-deca';

	import { cn } from '$lib/utils/style';

	import { createTabs, melt } from '@melt-ui/svelte';

	import { cubicInOut } from 'svelte/easing';
	import { crossfade } from 'svelte/transition';

	const {
		elements: { root, list, content, trigger },
		states: { value }
	} = createTabs({
		defaultValue: 'tab-1'
	});

	let className = '';
	export { className as class };

	const triggers = [
		{ id: 'tab-1', title: 'Bookmarked Videos'},
		{ id: 'tab-2', title: 'Watch Later' }
	];

	const [send, receive] = crossfade({
		duration: 250,
		easing: cubicInOut
	});
</script>

<div class="h-dvh w-dvw bg-[#AF9C9C] px-[10%]">
	<div class="flex h-full w-full flex-row">
		<div class="w-[350px] bg-[#C7BFBF] px-8 pt-11" id="left-sidebar">
			<div class="" id="header">
				<h1 class="font-header text-4xl font-extrabold tracking-tight">MSM YT app</h1>
			</div>

			<div>
				<h1 class="font-title text-lg">Bookmarked Channels:</h1>
			</div>
		</div>
		<div class="flex-grow bg-neutral-200 border-x-2 border-neutral-400" id="main">
			<div use:melt={$root} class={cn('flex flex-col overflow-hidden w-full h-full  data-[orientation=vertical]:flex-row', className,)}>

				<!-- List of tabs -->
				<div use:melt={$list} class="flex data-[orientation=vertical]:flex-col data-[orientation=vertical]:border-r overflow-x-auto justify-center border-b-2 border-neutral-400" aria-label="Videos tab">
					{#each triggers as triggerItem}
					<button use:melt={$trigger(triggerItem.id)} class="trigger relative  tab-button">
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
				<div use:melt={$content('tab-1')}>
					TaB 1
				</div>
				<div use:melt={$content('tab-2')}>
					<h1 class="text-3xl ">HELLO WORLD, Tab 2</h1>
				</div>
			</div>


		</div>
		<div class="w-[400px] bg-[#C7BFBF]" id="right-sidebar"></div>
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