<script>
// @ts-nocheck

    export let data
    const { urlParam,  yt_search_result } = data

    import Logo from '$lib/components/LogoHeader.svelte'

    let results = yt_search_result



    console.log(urlParam)
    console.log(results)
</script>

<h1>Search</h1>

<h1>Query Parameter:</h1>
<!-- <p>{urlParam}</p> -->

<Logo />

{#each results as result}
    <ol>
        <li>
            <h1>{result.videoId}</h1>
            <p>{result.title}</p>
            <div>
                <img src={result.thumbnailUrl} alt={result.titile} />
            </div>
        </li>

    </ol>
{/each}

{#each urlParam as parameter}
    <p>{parameter.value}</p>
{/each}