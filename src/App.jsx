import { useEffect, useState } from "react";
import "./App.css";

const API_KEY = import.meta.env.VITE_OMDB_API_KEY;

export default function App() {
  const [query, setQuery] = useState("Avengers");
  const [movies, setMovies] = useState([]);
  const [history, setHistory] = useState([]);

  useEffect(() => {
    if (!query) return;
    fetch(`https://www.omdbapi.com/?apikey=${API_KEY}&s=${query}`)
      .then((res) => res.json())
      .then((data) => setMovies(data.Search || []));
  }, [query]);

  const watchMovie = (movie) => {
    setHistory([movie, ...history]);
  };

  return (
    <div style={{ background: "#000", minHeight: "100vh", color: "#fff", padding: 20 }}>
      <h1>🎬 AKSO MEDIA</h1>

      <input
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder="Search movies..."
        style={{ padding: 10, width: "100%", marginBottom: 20 }}
      />

      <h2>Movies</h2>
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(150px, 1fr))", gap: 20 }}>
        {movies.map((m) => (
          <div key={m.imdbID} style={{ background: "#111", padding: 10 }}>
            <img src={m.Poster} alt={m.Title} style={{ width: "100%" }} />
            <p>{m.Title}</p>
            <small>{m.Year}</small>
            <br />
            <button onClick={() => watchMovie(m)}>Watch</button>
          </div>
        ))}
      </div>

      <h2 style={{ marginTop: 40 }}>Watch History</h2>
      {history.length === 0 && <p>No history yet.</p>}
      <ul>
        {history.map((h, i) => (
          <li key={i}>{h.Title}</li>
        ))}
      </ul>
    </div>
  );
}
