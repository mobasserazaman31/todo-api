import { createContext, useState, useEffect } from "react";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        fetch("http://localhost:5000/verify-auth", {
            method: "GET",
            credentials: "include", // Important to send cookies
        })
            .then((res) => res.json())
            .then((data) => {
                console.log(`data : ${data.user}`)
                setUser(data.user);
                setIsLoading(false);

            })
            .catch(() => {

            });
    }, []);

    const login = (user) => {
        setUser(user);
    };

    const logout = () => {
        setUser(null);
    };

    return (
        <AuthContext.Provider value={{ user, login, logout, isLoading }}>
            {children}
        </AuthContext.Provider>
    );
};
