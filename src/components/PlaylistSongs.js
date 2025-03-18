import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import axios from "axios";

const PlaylistSongs = () => {
    const location = useLocation();
    const queryParams = new URLSearchParams(location.search);
    const playlistId = queryParams.get("playlistId"); // Extract playlistId
    const userId = queryParams.get("userId"); // Extract userId

    const [songs, setSongs] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        if (!playlistId || !userId) {
            setError("Playlist ID or User ID is missing!");
            setLoading(false);
            return;
        }

        axios.get(`http://localhost:8080/api/playlist-songs?playlistId=${playlistId}&userId=${userId}`)
            .then(response => {
                console.log("API Response:", response.data); // Debugging

                if (response.data && Array.isArray(response.data)) {
                    setSongs(response.data);
                } else {
                    setSongs([]);
                    console.error("Unexpected response format:", response.data);
                }
            })
            .catch(error => {
                console.error("Error fetching songs:", error);
                setError("Failed to fetch songs.");
                setSongs([]);
            })
            .finally(() => {
                setLoading(false);
            });

    }, [playlistId, userId]);

    return (
        <div>
            <h2>Playlist Songs</h2>

            {loading ? (
                <p>Loading songs...</p>
            ) : error ? (
                <p style={{ color: "red" }}>{error}</p>
            ) : songs.length > 0 ? (
                <ul>
                    {songs.map((song) => (
                        <li key={song.track.id}>
                            <strong>{song.track.name}</strong> - {song.track.artists.map(artist => artist.name).join(", ")}
                        </li>
                    ))}
                </ul>
            ) : (
                <p>No songs found.</p>
            )}
        </div>
    );
};

export default PlaylistSongs;
