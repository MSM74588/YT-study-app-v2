<script>
    export let data
    const { urlParam } = data

    console.log(urlParam)
</script>

<h1>Search</h1>

<h1>Query Parameter:</h1>
<!-- <p>{urlParam}</p> -->

{#each urlParam as parameter}
    <p>{parameter.value}</p>
{/each}