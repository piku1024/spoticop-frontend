import axios from "axios";

const api = axios.create({
    baseURL: "http://localhost:8080/api",
});


export const getUserDetails = async (userId) => {
    try {
        const response = await axios.get("http://localhost:8080/api/home", {
            params: { userId: userId }, // Correct way to pass query params
        });
        return response.data;
    } catch (error) {
        console.error("Error fetching user details:", error);
        throw error;
    }
};

export default api;
