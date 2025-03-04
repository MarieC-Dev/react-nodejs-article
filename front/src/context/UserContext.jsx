/* eslint-disable react-refresh/only-export-components */
/* eslint-disable no-unused-vars */
import axios from "axios";
import { createContext, useEffect, useState } from "react";

export const UserContext = createContext();

export const UserProvider = ({children}) => {
    const PATH = 'http://localhost:3000/users';
    const [users, setUsers] = useState([]);

    useEffect(() => {
        async function getAllUsers() {
            await axios.get(PATH)
                .then((res) => {
                    setUsers(res.data);
                }).catch(error => console.log('error get all users', error))
        }
        getAllUsers();
    }, []);

    return(
        <UserContext.Provider value={{ users }}>
            {children}
        </UserContext.Provider>
    )
}