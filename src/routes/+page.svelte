<script>
	// npx svelte-add@latest tailwindcss
	// https://youtu.be/w2q9caYXgkg?si=d2T1vODeq5bVn55w&t=208
	import '@fontsource-variable/space-grotesk';
	import '@fontsource-variable/rubik';

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
		{ id: 'tab-2', title: 'Watch Later' },
		{ id: 'tab-3', title: 'Settings' }
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
		<div class="flex-grow bg-[#D9D9D9]" id="main">
			<div
				use:melt={$root}
				class={cn(
					'flex h-full w-full flex-col overflow-hidden rounded-xl shadow-lg  data-[orientation=vertical]:flex-row bg-green-500',
					className
				)}
			>
				<div
					use:melt={$list}
					class="flex shrink-0  overflow-x-auto bg-red-600
			data-[orientation=vertical]:flex-col data-[orientation=vertical]:border-r"
					aria-label="Manage your account"
				>
					{#each triggers as triggerItem}
						<button use:melt={$trigger(triggerItem.id)} class="trigger relative bg-green-300">
							{triggerItem.title}
							{#if $value === triggerItem.id}
								<div
									in:send={{ key: 'trigger' }}
									out:receive={{ key: 'trigger' }}
									class="bg-blue-400 absolute bottom-1 left-1/2 h-1 w-6 -translate-x-1/2 rounded-full"
								/>
							{/if}
						</button>
					{/each}
				</div>
				<div use:melt={$content('tab-1')} class="grow bg-white p-5">
					<p class="mb-5 leading-normal text-neutral-900">
						Make changes to your account here. Click save when you're done.
					</p>
					<fieldset class="mb-4 flex w-full flex-col justify-start">
						<label class="mb-2.5 block text-sm leading-none text-neutral-900" for="name">
							Name
						</label>
						<input id="name" value="Thomas G. Lopes" />
					</fieldset>

					<div class="mt-5 flex justify-end">
						<button class="save">Save changes</button>
					</div>
				</div>
				<div use:melt={$content('tab-2')} class="grow bg-white p-5">
					<p class="mb-5 leading-normal text-neutral-900">
						Change your password here. Click save when you're done.
					</p>
					<fieldset class="mb-4 flex w-full flex-col justify-start">
						<label class="mb-2.5 block text-sm leading-none text-neutral-900" for="new">
							New password
						</label>
						<input id="new" type="password" />
					</fieldset>
					<div class="mt-5 flex justify-end">
						<button class="save">Save changes</button>
					</div>
				</div>
				<div use:melt={$content('tab-3')} class="grow bg-white p-5">
					<p class="mb-5 leading-normal text-neutral-900">
						Change your settings here. Click save when you're done.
					</p>

					<fieldset class="mb-4 flex w-full flex-col justify-start">
						<label class="mb-2.5 block text-sm leading-none text-neutral-900" for="new">
							New email
						</label>
						<input id="new" type="password" />
					</fieldset>
					<div class="mt-5 flex justify-end">
						<button class="save">Save changes</button>
					</div>
				</div>
			</div>
		</div>
		<div class="w-[400px] bg-[#C7BFBF]" id="right-sidebar"></div>
	</div>
</div>
