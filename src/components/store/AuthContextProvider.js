import React, { useState } from "react";
import AuthContext from "./auth-context";

const AuthContextProvider = (props) => {
    const initialToken = localStorage.getItem('token');
    const [token, setToken] = useState(initialToken);
    const initialEmail = localStorage.getItem('email');
    const [email, setEmail] = useState(initialEmail);

    const userLoggedIn = !!token;

    const loginHandler = (token, email) => {
        setToken(token);
        setEmail(email);
        localStorage.setItem('token', token);
        localStorage.setItem('email', email);
    };

    const logoutHandler =() => {
        setToken(null);
        localStorage.removeItem('token');
        localStorage.removeItem('email');
    }

    const contextValue = {
        token: token,
        email: email,
        isLoggedIn: userLoggedIn,
        login: loginHandler,
        logout: logoutHandler
    }
    return (
        <AuthContext.Provider value={contextValue}>
            {props.children}
        </AuthContext.Provider>
    )
}
 export default AuthContextProvider;