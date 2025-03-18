import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams, useLocation } from "react-router-dom";

const PlaylistSongs = () => {
    const { playlistId } = useParams(); // Extract `playlistId` from the URL
    const location = useLocation();
    const userId = new URLSearchParams(location.search).get("userId"); // Extract `userId` from query params

    const [songs, setSongs] = useState([]);

    useEffect(() => {
        if (playlistId && userId) {
            axios.get(`http://localhost:8080/api/playlist-songs?playlistId=${playlistId}&userId=${userId}`)
                .then((response) => {
                    console.log("API Response:", response.data); // Debug API response
                    if (Array.isArray(response.data)) {
                        setSongs(response.data); // Backend returns a direct array
                    } else {
                        setSongs([]);
                        console.error("Unexpected response format:", response.data);
                    }
                })
                .catch((error) => {
                    console.error("Error fetching songs:", error);
                    setSongs([]);
                });
        }
    }, [playlistId, userId]);

    return (
        <div>
            <h2>Playlist Songs</h2>
            {songs.length > 0 ? (
                <ul>
                    {songs.map((song) => (
                        <li key={song.id}>
                            <strong>{song.name}</strong> - {song.artists.join(", ")}
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
