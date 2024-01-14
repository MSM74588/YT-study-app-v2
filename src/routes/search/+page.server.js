// import type { PageServerLoad } from "./$types"

/** @type {import('./$types').PageServerLoad} */
export async function load({fetch, url}) {
    // console.log("SEARCH PAGE")
    // console.log("PARAMETERS:")
    // const search_param = url.searchParams.get('search_query')
    // const queryValue = search_param

    const extractSearchQuery = () => {
        const paramString = url.search.toString()
        const searchParams = new URLSearchParams(paramString);

        const parametersArray = [];

        for (const [key, value] of searchParams) {
            parametersArray.push({ key, value });
        }

        // const searchQueryString = () => {
        //     if (searchParams.has("search_query")){
        //         return 
        //     }
        // }
        // console.log(JSON.stringify(searchParams))
        // console.log(searchParams)

        console.log(parametersArray)

        return parametersArray;

        
    }
    

    // console.log(url)
    // if (searchParams.has("search_query")){
    //     console.log(searchParams.get("search_query"))
    // } else {
    //     console.log("No Mathcing URL Parameter")
    // }
    
    return {
        urlParam: extractSearchQuery()
    }

}

// https://youtu.be/EQy-AYhZIlE?si=aIEBhLJ-jQco4n07