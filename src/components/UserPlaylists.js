import React, { useEffect, useState } from "react";
import { useLocation, Link } from "react-router-dom";
import axios from "axios";

const UserPlaylists = () => {
    const [playlists, setPlaylists] = useState([]);
    const userId = new URLSearchParams(useLocation().search).get("userId");

    useEffect(() => {
        if (!userId) {
            console.error("User ID is missing!");
            return;
        }

        axios.get(`http://localhost:8080/api/user-playlists?userId=${userId}`)
            .then((response) => {
                console.log("Fetched playlists:", response.data);
                if (response.data && Array.isArray(response.data)) {
                    setPlaylists(response.data);
                } else {
                    setPlaylists([]);
                    console.error("Unexpected response format:", response.data);
                }
            })
            .catch((error) => {
                console.error("Error fetching playlists:", error);
                setPlaylists([]);
            });
    }, [userId]);

    return (
        <div>
            <h2>User Playlists</h2>
            {userId ? (
                playlists.length > 0 ? (
                    <ul>
                        {playlists.map((playlist) => (
                            <li key={playlist.id}>
                                <Link to={`/playlist/songs?playlistId=${playlist.id}&userId=${userId}`}>
                                    {playlist.name}
                                </Link>
                            </li>
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
