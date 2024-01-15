<script>
	// @ts-nocheck

	import { createTooltip, melt } from '@melt-ui/svelte';
	import { fade } from 'svelte/transition';
	import { Clock } from 'phosphor-svelte';

	/**
	 * @type {any}
	 */
	export let thumbnailUrl;
	/**
	 * @type {any}
	 */
	export let title;
	/**
	 * @type {any}
	 */
	export let videoID;
	export let description;
	export let published_date;
	export let channel_title;

	export const timeAgoFormatter = (publishedTime) => {
		const now = new Date();
		const publishedDate = new Date(publishedTime);

		const timeDifferenceInSeconds = Math.floor((now - publishedDate) / 1000);

		const rtf = new Intl.RelativeTimeFormat('en', { numeric: 'auto' });

		if (timeDifferenceInSeconds < 60) {
			return rtf.format(-timeDifferenceInSeconds, 'second');
		} else if (timeDifferenceInSeconds < 3600) {
			const minutes = Math.floor(timeDifferenceInSeconds / 60);
			return rtf.format(-minutes, 'minute');
		} else if (timeDifferenceInSeconds < 86400) {
			const hours = Math.floor(timeDifferenceInSeconds / 3600);
			return rtf.format(-hours, 'hour');
		} else if (timeDifferenceInSeconds < 2592000) {
			const days = Math.floor(timeDifferenceInSeconds / 86400);
			return rtf.format(-days, 'day');
		} else if (timeDifferenceInSeconds < 31536000) {
			const months = Math.floor(timeDifferenceInSeconds / 2592000);
			return rtf.format(-months, 'month');
		} else {
			const years = Math.floor(timeDifferenceInSeconds / 31536000);
			return rtf.format(-years, 'year');
		}
	};

	const timeAgo = timeAgoFormatter(published_date);

	const {
		elements: { trigger, content, arrow },
		states: { open }
	} = createTooltip({
		positioning: {
			placement: 'bottom'
		},
		openDelay: 500,
		closeDelay: 0,
		closeOnPointerDown: false,
		forceVisible: true
	});
</script>

<div class="flex flex-col gap-2" use:melt={$trigger}>
	<div>
		<img class="aspect-video rounded" src={thumbnailUrl} alt={title} />
	</div>
	<div class="flex flex-col gap-[2px]">
		<div class="flex flex-row items-center gap-1 font-lexend text-neutral-600">
			<Clock weight="bold" />
			<p>{timeAgo}</p>
		</div>
		<h1 class="font-lexend text-base">{@html title}</h1>
		<h1 class="font-lexend text-xs font-normal text-neutral-800">
			ID: <span class="rounded border-2 border-red-400 bg-orange-200 px-2 py-[1px]">
				{videoID}
			</span>
		</h1>
	</div>
</div>

{#if $open}
	<div
		use:melt={$content}
		transition:fade={{ duration: 50 }}
		class="z-10 rounded-lg bg-white shadow border-2 border-neutral-300 shadow-2xl"
	>
		<div use:melt={$arrow} />

		<div class="flex max-w-72 flex-col gap-y-3 px-4 py-1 pb-2 transition duration-150">
			<div>
				<h1 class="font-lexend text-neutral-700">Description:</h1>
				<p
					class=" text-wrap line-clamp-3 font-lexend text-sm leading-tight transition-all hover:line-clamp-none"
				>
					{@html description}
				</p>
			</div>

			<div>
				<p class="font-lexend text-sm">
					<span class="underline decoration-2 decoration-pink-500 underline-offset-2">Channel:</span>
					<span class="rounded border-2 border-pink-400 bg-pink-200 px-2 py-[1px]"
						>{@html channel_title}</span
					>
				</p>
			</div>
		</div>
	</div>
{/if}

<style lang="postcss">
	.trigger {
		display: inline-flex;
		padding: 0;
		justify-content: center;
		align-items: center;
		border-radius: 9999px;
		font-size: 0.875rem;
		line-height: 1.25rem;
		transition-property: color, background-color, border-color, text-decoration-color, fill, stroke;
		transition-timing-function: cubic-bezier(0.4, 0, 0.2, 1);
		transition-duration: 300ms;
	}
</style>
