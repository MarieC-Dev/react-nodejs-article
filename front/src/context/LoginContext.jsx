/* eslint-disable no-unused-vars */
import axios from 'axios';
import { createContext } from "react";

export const LoginContext = createContext();

export const LoginProvider = ({ children }) => {
    const PATH = 'http://localhost:3000/login';
    let loginStore;

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

            res.data.result &&
                localStorage.setItem("authToken", JSON.stringify(res.data.user));
                location.href = '/';
        })
        .catch((error) => {
            console.log('Error login :', error);
        });     
    }

    if(localStorage.getItem("authToken")) {
        loginStore = JSON.parse(localStorage.getItem("authToken"));
    }
    
    return(
        <LoginContext.Provider value={{ loginStore, loginFetch }}>
            {children}
        </LoginContext.Provider>
    )
}