/* eslint-disable no-unused-vars */
import axios from 'axios';
import { createContext, useEffect, useState } from "react";

export const LoginContext = createContext();

export const LoginProvider = ({ children }) => {
    const PATH = 'http://localhost:3000/login';
    const [token, setToken] = useState('');
    const [userRole, setUserRole] = useState('');

    function loginFetch(emailValue, pwdValue) {
        const user = {
            email: emailValue,
            password: pwdValue
        }

        axios.post(PATH, user, {
            headers: { 
                'Content-Type': 'application/json',
            },
            credentials: 'include', // allows sending of cookie 
        })
        .then((res) => {
            console.log('Fetch login :', res.data);
            setToken(res.data.token);
            setUserRole(res.data.role);
        })
        .catch((error) => {
            console.log('Error login :', error);
        });     
    }

    if(token) {
        if(userRole === 'admin') {
            localStorage.setItem("adminToken", token);
        } else if(userRole === 'moderator') {
            localStorage.setItem("moderatorToken", token);
        } else if(userRole === 'user') {
            localStorage.setItem("userToken", token);
        }
    }

    return(
        <LoginContext.Provider value={{ userRole, loginFetch }}>
            {children}
        </LoginContext.Provider>
    )
}