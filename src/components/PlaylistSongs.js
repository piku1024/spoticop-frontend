import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import axios from "axios";

const PlaylistSongs = () => {
    const [songs, setSongs] = useState([]);
    const queryParams = new URLSearchParams(useLocation().search);
    const playlistId = queryParams.get("playlistId");
    const userId = queryParams.get("userId");

    useEffect(() => {
        if (!playlistId || !userId) {
            console.error("Playlist ID or User ID is missing!");
            return;
        }

        axios.get(`http://localhost:8080/api/playlist-songs?playlistId=${playlistId}&userId=${userId}`)
            .then((response) => {
                console.log("API Response:", response.data);
                if (response.data && Array.isArray(response.data)) {
                    setSongs(response.data);
                } else {
                    setSongs([]);
                    console.error("Unexpected response format:", response.data);
                }
            })
            .catch((error) => {
                console.error("Error fetching songs:", error);
                setSongs([]);
            });
    }, [playlistId, userId]);

    return (
        <div>
            <h2>Playlist Songs</h2>
            {playlistId && userId ? (
                songs.length > 0 ? (
                    <ul>
                        {songs.map((song) => (
                            <li key={song.track.id}>
                                <strong>{song.track.name}</strong> - {song.track.artists.map(artist => artist.name).join(", ")}
                            </li>
                        ))}
                    </ul>
                ) : (
                    <p>No songs found.</p>
                )
            ) : (
                <p style={{ color: "red" }}>Playlist ID or User ID is missing!</p>
            )}
        </div>
    );
};

export default PlaylistSongs;
