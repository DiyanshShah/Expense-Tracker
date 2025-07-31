import React, {createContext, useState, useEffect} from "react";
import axiosInstance from "../utils/axiosInstance";
import { API_PATHS } from "../utils/apiPaths";

export const UserContext = createContext();

const UserProvider  = ({ children }) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const token = localStorage.getItem('token');
        if (token) {
            axiosInstance.get(API_PATHS.AUTH.GET_USER_INFO)
                .then(response => {
                    if (response.data.user) {
                        setUser(response.data.user);
                    }
                })
                .catch(error => {
                    console.error('Error fetching user:', error);
                    localStorage.removeItem('token');
                })
                .finally(() => {
                    setLoading(false);
                });
        } else {
            setLoading(false);
        }
    }, []);

    const updateUser = (userDate) => {
        setUser(userDate);
    };

    //Function to clear user data
    const clearUser = () => {
        setUser(null);
    };

    return (
        <UserContext.Provider
            value={{
                user, 
                updateUser,
                clearUser,
                loading
            }} 
        >
            {!loading ? children : <div>Loading...</div>}
        </UserContext.Provider>            
    );
}

export default UserProvider;