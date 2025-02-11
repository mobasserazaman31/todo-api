import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";

const useAuth = () => {
    const [user, setUser] = useState(null);
    const [isLoading, setIsLoading] = useState(true);
    const location = useLocation();


    useEffect(() => {
        fetch("http://localhost:5000/verify-auth", {
            method: "GET",
            credentials: "include", // Important to send cookies
        })
            .then((res) => res.json())
            .then((data) => {
                console.log(`User : ${JSON.stringify(data)}`)
                setIsLoading(false);
                setUser(data.user);
            })
            .catch((error) => {

                console.log(error);

            });
    }, [location.pathname]);

    return {user, isLoading};
};

export default useAuth;
