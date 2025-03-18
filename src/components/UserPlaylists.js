import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import axios from "axios";

const UserPlaylists = () => {
    const location = useLocation();
    const queryParams = new URLSearchParams(location.search);
    const userId = queryParams.get("userId"); // Extract userId from URL

    const [playlists, setPlaylists] = useState([]);

    useEffect(() => {
        if (!userId) {
            console.error("User ID is missing!");
            return;
        }

        axios.get(`http://localhost:8080/api/user-playlists?userId=${userId}`)
            .then(response => {
                setPlaylists(response.data);
            })
            .catch(error => {
                console.error("Error fetching playlists:", error);
            });
    }, [userId]);

    return (
        <div>
            <h2>User Playlists</h2>
            {userId ? (
                playlists.length > 0 ? (
                    <ul>
                        {playlists.map((playlist) => (
                            <li key={playlist.id}>{playlist.name}</li>
                        ))}
                    </ul>
                ) : (
                    <p>No playlists found.</p>
                )
            ) : (
                <p style={{ color: "red" }}>User ID is missing!</p>
            )}
        </div>
    );
};

export default UserPlaylists;
