/* eslint-disable no-unused-vars */
import axios from 'axios';
import { createContext, useEffect, useState } from "react";

export const LoginContext = createContext();

export const LoginProvider = ({ children }) => {
    const PATH = 'http://localhost:3000/login';
    const [statusLogin, setStatusLogin] = useState(false);

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
            console.log(res.data);
        })
        .catch((error) => {
            console.log('Error login :', error);
        });
    }

    return(
        <LoginContext.Provider value={{ statusLogin, loginFetch }}>
            {children}
        </LoginContext.Provider>
    )
}