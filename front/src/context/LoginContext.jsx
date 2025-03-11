/* eslint-disable no-unused-vars */
import axios from 'axios';
import { createContext, useEffect, useState } from "react";

export const LoginContext = createContext();

export const LoginProvider = ({children}) => {
    const PATH = 'http://localhost:3000/login';
    const [isLogin, setIsLogin] = useState(false);

    /* useEffect(() => {
        async function checkConnection() {
            await axios.get(PATH + '/me')
            .then((res) => console.log('check connection front :', res.data))
            .catch((err) => console.log('check connected error :', err))
        }
    }, []) */

    function loginFetch(emailValue, pwdValue) {
        const user = {
            email: emailValue,
            password: pwdValue
        }

        axios.post(PATH, user, {
            headers: { 
                'Content-Type': 'application/json',
            },
            withCredentials: true // use cookie for get token
        })
        .then((res) => {
            setIsLogin(true);
            location.href = '/profile';
            console.log('Fetch login :', res.data);
        })
        .catch((error) => {
            setIsLogin(false);
            console.log('Error login :', error);
        });     
    }
    
    return(
        <LoginContext.Provider value={{ isLogin, loginFetch }}>
            {children}
        </LoginContext.Provider>
    )
}