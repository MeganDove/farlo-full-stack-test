import { useEffect, useState } from "react";

import Tile from "./components/Tile.jsx";

import { fetchShowsFromFile } from "./http.js";

function App() {
  const [shows, setShows] = useState([]);
  const [isFetchingShows, setIsFetchingShows] = useState(false);
  const [errorFetchingShows, setErrorFetchingShows] = useState();

  useEffect(() => {
    async function fetchShows() {
      setIsFetchingShows(true);
      try {
        const shows = await fetchShowsFromFile();
        setShows(shows);
        if(!shows) {
          throw new Error("No shows available");
        }
        setIsFetchingShows(false);
      } catch (error) {
        setErrorFetchingShows("Could not load shows, please try again later");
        setIsFetchingShows(false);
      }
      
    }
    fetchShows(); 
  }, []);

  return (
    <main>
      <h1>Today's deal</h1>
      {isFetchingShows && <p>Loading...</p>}
      {(!isFetchingShows && errorFetchingShows) && <p>{errorFetchingShows}</p> }
      {(!isFetchingShows && !errorFetchingShows) &&
        <div className="tiles-grid">
          {shows.map((show) => {
            return (
              <Tile key={show.id} title={show.title} image={show.image} ticketUrlInfo={show.see_tickets_url_infos} />
            );
          })}
        </div>
      }
    </main>
  )
}

export default App
