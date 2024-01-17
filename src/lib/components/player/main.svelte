<script>
	import { portalAction } from 'svelte-legos';
	import YouTubePlayer from 'youtube-player';

	import { onMount } from 'svelte';

    // https://joyofcode.xyz/svelte-context-with-stores

    let isPlayerOpen = false

    let videoid = "9N-n4WawfrQ"
	let player;

	onMount(() => {
		player = YouTubePlayer('videoPlayer1');
		player.loadVideoById(videoid);
		player.playVideo();
	});
</script>

<div use:portalAction={'body'}>
	{#if isPlayerOpen}
		<div class="background absolute top-0 z-50 h-dvh w-dvw">
			<!-- svelte-ignore a11y-click-events-have-key-events -->
			<!-- svelte-ignore a11y-no-static-element-interactions -->
			<div class=" flex h-full w-full items-center justify-center">
				<div class="flex flex-col gap-4">
					<div
						class="video-shadow h-[70dvh] w-auto aspect-video rounded-[20px] border-[8px] border-black" id="videoPlayer1"
					>
					</div>
					<div class="video-shadow w-full bg-white">Title</div>
				</div>
			</div>
		</div>
	{/if}
</div>

<style>
	.video-shadow {
		box-shadow: 0px 4px 14.5px 10px rgba(0, 0, 0, 0.25);
	}

	.background {
		background: rgba(49, 49, 49, 0.35);
	}
</style>
