import React from "react";
import { HashRouter as Router, Route, Routes, useLocation, Link } from "react-router-dom";
import UserDetails from "./components/UserDetails";
import UserSavedAlbums from "./components/UserSavedAlbums";
import UserPlaylists from "./components/UserPlaylists";
import PlaylistSongs from "./components/PlaylistSongs";

// 🔹 Extract userId dynamically from URL
const useUserId = () => {
    const location = useLocation();
    return new URLSearchParams(location.search).get("userId");
};

const UserNavigation = () => {
    const userId = useUserId();

    return (
        <nav>
            {userId ? (
                <Link to={{ pathname: "/user/playlists", search: `?userId=${userId}` }}>Go to Playlists</Link>
            ) : (
                <p style={{ color: "red" }}>User ID is missing!</p>
            )}
        </nav>
    );
};

const App = () => {
    return (
        <Router>
            <div>
                <UserNavigation />
                <Routes>
                    <Route path="/user" element={<UserDetailsWrapper />} />
                    <Route path="/user/albums" element={<UserSavedAlbumsWrapper />} />
                    <Route path="/user/playlists" element={<UserPlaylistsWrapper />} />
                    <Route path="/playlist/songs" element={<PlaylistSongsWrapper />} />
                </Routes>
            </div>
        </Router>
    );
};

// 🔹 Helper wrappers to extract `userId` and `playlistId`
const UserDetailsWrapper = () => {
    const userId = useUserId();
    return userId ? <UserDetails userId={userId} /> : <p style={{ color: "red" }}>User ID is missing!</p>;
};

const UserSavedAlbumsWrapper = () => {
    const userId = useUserId();
    return userId ? <UserSavedAlbums userId={userId} /> : <p style={{ color: "red" }}>User ID is missing!</p>;
};

const UserPlaylistsWrapper = () => {
    const userId = useUserId();
    return userId ? <UserPlaylists userId={userId} /> : <p style={{ color: "red" }}>User ID is missing!</p>;
};

const PlaylistSongsWrapper = () => {
    const location = useLocation();
    const params = new URLSearchParams(location.search);
    const userId = params.get("userId");
    const playlistId = params.get("playlistId");

    return userId && playlistId ? (
        <PlaylistSongs userId={userId} playlistId={playlistId} />
    ) : (
        <p style={{ color: "red" }}>User ID or Playlist ID is missing!</p>
    );
};

export default App;
