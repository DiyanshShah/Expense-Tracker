import { useContext, useEffect } from "react"
import { UserContext } from "../context/userContext";
import { useNavigate } from "react-router-dom";
import { API_PATHS } from "../utils/apiPaths";
import axiosInstance from "../utils/axiosInstance";

export const useUserAuth = () => {
    const {user, updateUser, clearUser} = useContext(UserContext);
    const navigate = useNavigate;

    useEffect(() => {
        if(user) return;

        let isMounted = true;
        const fetchUserInfo = async () => {
            try{
                const response = await axiosInstance.get(API_PATHS.AUTH.GET_USER_INFO);
                
                if(isMounted && response.data){
                    updateuser(response.data);
                } 


            }catch(error){
                console.error("Failed to fetch user: ", error);
                if(isMounted){
                    clearUser();
                    navigate('/login')
                }
            }
        };

        fetchUserInfo();

        return () => {
            isMounted = false;
        };


    }, [updateUser, clearUser, navigate])
};