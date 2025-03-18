import React from "react";
import { HashRouter as Router, Route, Routes } from "react-router-dom";
import UserDetails from "./components/UserDetails";
import UserSavedAlbums from "./components/UserSavedAlbums";
import UserPlaylists from "./components/UserPlaylists";
import PlaylistSongs from "./components/PlaylistSongs";

const UserNavigation = () => {
    const userId = new URLSearchParams(useLocation().search).get("userId");

    return (
        <nav>
            {userId ? (
                <Link to={`/user/playlists?userId=${userId}`}>Go to Playlists</Link>
            ) : (
                <p style={{ color: "red" }}>User ID is missing!</p>
            )}
        </nav>
    );
};

const basePath = "/spoticop-frontend";

const App = () => {
    return (
        <Router basename={basePath}>
            <div>
                <UserNavigation />
                <Routes>
                    <Route path="/user" element={<UserDetailsWrapper />} />
                    <Route path="/user/albums" element={<UserSavedAlbumsWrapper />} />
                    <Route path="/user/playlists" element={<UserPlaylistsWrapper />} />
                    <Route path="/playlist/:playlistId" element={<PlaylistSongs />} />
                </Routes>
            </div>
        </Router>
    );
};

// Helper wrappers to extract userId from URL params
const UserDetailsWrapper = () => {
    const userId = new URLSearchParams(window.location.search).get("userId");
    return <UserDetails userId={userId} />;
};

const UserSavedAlbumsWrapper = () => {
    const userId = new URLSearchParams(window.location.search).get("userId");
    return <UserSavedAlbums userId={userId} />;
};

const UserPlaylistsWrapper = () => {
    const userId = new URLSearchParams(window.location.search).get("userId");
    return <UserPlaylists userId={userId} />;
};

const PlaylistSongsWrapper = () => {
    const userId = new URLSearchParams(window.location.search).get("userId");
    const playlistId = new URLSearchParams(window.location.search).get("playlistId");
    return <PlaylistSongs userId={userId} playlistId={playlistId} />;
};

export default App;
