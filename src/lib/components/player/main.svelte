<script>
	import { portalAction } from 'svelte-legos';

	let isPlayerOpen = true;
</script>

<div use:portalAction={'body'}>
	{#if isPlayerOpen}
		<div class="absolute top-0 z-50 h-dvh w-dvw background">
			<!-- svelte-ignore a11y-click-events-have-key-events -->
			<!-- svelte-ignore a11y-no-static-element-interactions -->
			<div
				class=" flex h-full w-full items-center justify-center"
			>
				<div class="flex flex-col gap-4">
                    <div class="h-[70dvh] bg-slate-500 aspect-video video-shadow rounded-[20px] border-[8px] border-black"></div>
                    <div class="bg-white w-full video-shadow">
                        Title
                    </div>
                </div>
			</div>
		</div>
	{/if}
</div>

<style>
    .video-shadow{
        box-shadow: 0px 4px 14.5px 10px rgba(0, 0, 0, 0.25); 
    }

    .background {
        background: rgba(49, 49, 49, 0.35); 
    }
</style>
