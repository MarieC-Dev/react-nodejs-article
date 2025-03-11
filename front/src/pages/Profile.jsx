import { useContext } from "react";
import { LoginContext } from "../context/LoginContext";
import axios from "axios";
import { UserContext } from "../context/UserContext";

export default function Profile() {
    const PATH = 'http://localhost:3000/logout';
    const { profile } = useContext(UserContext);
    console.log(profile);
    
    const logoutFunc = async () => {
        await axios.post(PATH, {}, {
            headers: { 
                'Content-Type': 'application/json',
            },
            withCredentials: true // use cookie for get token
        })
        .then((res) => {
            console.log('logout fetch');
            
            console.log(res.data);

            window.location.href = '/connection';
        }).catch((err) => console.log('Logout fetch error :', err));
    }

    return(
        <main className="profilePage">
            <h2>{profile.username}</h2>
            <p>{profile.email}</p>
            <p>Mot de passe : {profile.pwd}</p>
            <p>Role : {profile.role}</p>

            <button onClick={logoutFunc}>
                Déconnexion
            </button>
        </main>
    )
}