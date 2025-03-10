/* eslint-disable react-refresh/only-export-components */
/* eslint-disable no-unused-vars */
import axios from "axios";
import { createContext, useEffect, useState } from "react";

export const UserContext = createContext();

export const UserProvider = ({children}) => {
    const PATH = 'http://localhost:3000/users';
    const [users, setUsers] = useState([]);
    const [profile, setProfile] = useState({});

    // GET ALL USERS
    useEffect(() => {
        async function getAllUsers() {
            await axios.get(PATH)
                .then((res) => {
                    const data = res.data;
                    setUsers(data);
                }).catch(error => console.log('error get all users', error))
        }
        getAllUsers();
    }, []);

    // GET ONE USER (PROFILE)
    useEffect(() => {
        async function getUser() {
            await axios.get(PATH + '/profile', {credentials: "include"})
            .then((res) => {
                console.log(res.data);
            }).catch((error) => console.log('Erreur get user :', error))
        }
        getUser();
    }, []);

    // CREATE USER
    function fetchCreateUser(username, email, password) {
        const user = {
            username,
            email,
            password,
        }

        axios.post(PATH, user)
            .then(res => {
                console.log(res.data);
                
            })
            .catch(error => console.error(error));
    }

    //console.log({users});

    return(
        <UserContext.Provider value={{ users, fetchCreateUser }}>
            {children}
        </UserContext.Provider>
    )
}