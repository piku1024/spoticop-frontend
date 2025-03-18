import React, { useEffect, useState } from "react";
import axios from "axios";

const UserSavedAlbums = ({ userId }) => {
    const [albums, setAlbums] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        if (!userId) {
            setError("User ID is missing");
            setLoading(false);
            return;
        }

        setLoading(true);
        setError(null);

        axios.get(`http://localhost:8080/api/user-saved-album?userId=${userId}`)
            .then((response) => {
                console.log("Fetched albums:", response.data);

                if (response.data && Array.isArray(response.data)) {
                    setAlbums(response.data);
                } else {
                    setAlbums([]);
                    console.error("Unexpected response format:", response.data);
                }
            })
            .catch((error) => {
                console.error("Error fetching albums:", error);
                setError("Failed to fetch albums.");
                setAlbums([]);
            })
            .finally(() => {
                setLoading(false);
            });
    }, [userId]);

    return (
        <div>
            <h2>User's Saved Albums</h2>

            {loading ? (
                <p>Loading albums...</p>
            ) : error ? (
                <p style={{ color: "red" }}>{error}</p>
            ) : albums.length > 0 ? (
                <ul>
                    {albums.map((album, index) => (
                        <li key={index}>{album.name}</li>
                    ))}
                </ul>
            ) : (
                <p>No albums found.</p>
            )}
        </div>
    );
};

export default UserSavedAlbums;
