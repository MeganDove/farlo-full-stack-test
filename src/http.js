export async function fetchShowsFromFile() {
    console.log("Fetching shows from file");
	  const res = await fetch("http://localhost:3000/shows");
    const resData = await res.json();

    if(!res.ok) {
      throw new Error("Failed to fetch shows");
    }

    return resData.shows;
}