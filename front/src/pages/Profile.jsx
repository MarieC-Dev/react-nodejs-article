import { LoginContext } from "../context/LoginContext";
import axios from "axios";

export default function Profile() {
    const PATH = 'http://localhost:3000/logout'

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
            <h2>Username</h2>
            <p>email</p>
            <p>Role :</p>

            <button onClick={logoutFunc}>
                Déconnexion
            </button>
        </main>
    )
}