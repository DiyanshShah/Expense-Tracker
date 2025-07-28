import React, {createContext, useState} from "react";

export const UserContext = createContext();

const UserProvider  = ({ children }) => {
    const [user, setUser] = useState(null);

    const updateuser = (userDate) => {
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
                updateuser,
                clearUser
            }}
        >
            {children}
        </UserContext.Provider>            
    );
}

export default UserProvider;