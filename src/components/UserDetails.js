import React, { useEffect, useState } from "react";
import { getUserDetails } from "../services/api";

const UserDetails = ({ userId }) => {
    const [userDetails, setUserDetails] = useState(null);

    useEffect(() => {
        if (userId) {
            getUserDetails(userId)
                .then((data) => setUserDetails(data))
                .catch((error) => console.error(error));
        } else {
            console.error("userId is missing!");
        }
    }, [userId]);

    return (
        <div>
            {userDetails ? (
                <p>User ID: {userDetails}</p>
            ) : (
                <p>Loading user details...</p>
            )}
        </div>
    );
};

export default UserDetails;
