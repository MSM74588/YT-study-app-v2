// import type { PageServerLoad } from "./$types"

/** @type {import('./$types').PageServerLoad} */
export async function load({fetch, url}) {
    // console.log("SEARCH PAGE")
    // console.log("PARAMETERS:")
    // const search_param = url.searchParams.get('search_query')
    // const queryValue = search_param

    const paramString = url.search.toString()
    const searchParams = new URLSearchParams(paramString);

    console.log(url)
    if (searchParams.has("search_query")){
        console.log(searchParams.get("search_query"))
    } else {
        console.log("No Mathcing URL Parameter")
    }
    

}

// https://youtu.be/EQy-AYhZIlE?si=aIEBhLJ-jQco4n07