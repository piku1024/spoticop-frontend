import React, { useEffect, useState } from "react";
import axios from "axios";
import { useLocation } from "react-router-dom";

const PlaylistSongs = () => {
    const location = useLocation();
    const params = new URLSearchParams(location.search);
    const userId = params.get("userId");
    const playlistId = params.get("playlistId");

    const [songs, setSongs] = useState([]);
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        if (!userId) {
            setError("⚠️ User ID is missing.");
            setLoading(false);
            return;
        }
        if (!playlistId) {
            setError("⚠️ Playlist ID is missing.");
            setLoading(false);
            return;
        }

        axios
            .get(`http://localhost:8080/api/playlist-songs?playlistId=${playlistId}&userId=${userId}`)
            .then((response) => {
                console.log("API Response:", response.data);

                if (Array.isArray(response.data)) {
                    setSongs(response.data);
                } else {
                    console.error("⚠️ Unexpected response format:", response.data);
                    setSongs([]);
                }
            })
            .catch((error) => {
                console.error("⚠️ Error fetching songs:", error);
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
                    {songs.map((song, index) => {
                        console.log("Song object:", song); // Debugging log

                        if (!song || typeof song !== "object") {
                            console.error(`⚠️ Invalid song format at index ${index}:`, song);
                            return (
                                <li key={index} style={{ color: "red" }}>
                                    ⚠️ Invalid song data
                                </li>
                            );
                        }

                        const track = song.track || song; // Fallback if `track` is missing

                        if (!track || !track.name) {
                            console.error(`⚠️ Missing track data at index ${index}:`, song);
                            return (
                                <li key={index} style={{ color: "red" }}>
                                    ⚠️ Missing track data
                                </li>
                            );
                        }

                        return (
                            <li key={track.id || index}>
                                <strong>{track.name || "Unknown Song"}</strong> -{" "}
                                {track.artists?.map((artist) => artist.name).join(", ") || "Unknown Artist"}
                            </li>
                        );
                    })}
                </ul>
            ) : (
                <p>No songs found.</p>
            )}
        </div>
    );
};

export default PlaylistSongs;
