import React, { useEffect, useState } from "react";
import axios from "axios";
//import ReactJson from "react-json-view";
import { useNavigate } from "react-router-dom";

const UserPlaylists = ({ userId }) => {
    const [playlists, setPlaylists] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        if (!userId) {
            setError("User ID is missing");
            setLoading(false);
            return;
        }

        setLoading(true);
        setError(null);

        axios.get(`http://localhost:8080/api/user-playlists?userId=${userId}`)
            .then((response) => {
                console.log("Fetched playlists:", response.data); // Debugging

                if (response.data && Array.isArray(response.data)) {
                    setPlaylists(response.data);
                } else {
                    setPlaylists([]);
                    console.error("Unexpected response format:", response.data);
                }
            })
            .catch((error) => {
                console.error("Error fetching playlists:", error);
                setError("Failed to fetch playlists.");
                setPlaylists([]);
            })
            .finally(() => {
                setLoading(false);
            });

    }, [userId]);

    const handlePlaylistClick = (playlistId) => {
        navigate(`/playlist/${playlistId}?userId=${userId}`);
    };

    return (
        <div>
            <h2>User's Playlists</h2>

            {loading ? (
                <p>Loading playlists...</p>
            ) : error ? (
                <p style={{ color: "red" }}>{error}</p>
            ) : playlists.length > 0 ? (
                playlists.map((playlist) => (
                    <button
                        key={playlist.id}
                        onClick={() => handlePlaylistClick(playlist.id)}
                        style={{
                            display: "block",
                            margin: "10px 0",
                            padding: "10px",
                            backgroundColor: "#1DB954",
                            color: "white",
                            border: "none",
                            cursor: "pointer",
                            borderRadius: "5px"
                        }}
                    >
                        {playlist.name}
                    </button>
                ))
            ) : (
                <p>No playlists found.</p>
            )}
        </div>
    );
};

export default UserPlaylists;
