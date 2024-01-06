<script>
	// npx svelte-add@latest tailwindcss
	// https://youtu.be/w2q9caYXgkg?si=d2T1vODeq5bVn55w&t=208
    import '@fontsource-variable/space-grotesk';
    import '@fontsource-variable/rubik';

    // Bookmarks
    // - Phosphor Icons
    // - Svelte Legos
    // - Shad-cn/Svelte
    // - youtube explode
    // - https://codesandbox.io/p/sandbox/youtube-iframe-player-api-demo-0wqvi?file=%2Fjs%2Findex.js
    // - https://developers.google.com/youtube/youtube_player_demo
    // - https://nutbread.github.io/yia/

    // - https://youtu.be/rsmLu5nmh4g?si=BBnHVl4ZiXjjzdlJ&t=216
</script>

<div class="h-dvh w-dvw bg-[#AF9C9C] px-[10%]">
	<div class="flex h-full w-full flex-row">
		<div class="w-[350px] bg-[#C7BFBF] px-8 pt-11" id="left-sidebar">
			<div class="" id="header">
				<h1 class="text-4xl font-extrabold tracking-tight font-header">
					MSM YT app
				</h1>
			</div>

            <div>
                <h1 class="text-lg font-title">Bookmarked Channels:</h1>
            </div>
		</div>
		<div class="flex-grow bg-[#D9D9D9]" id="main"></div>
		<div class="w-[400px] bg-[#C7BFBF]" id="right-sidebar"></div>
	</div>
</div>
