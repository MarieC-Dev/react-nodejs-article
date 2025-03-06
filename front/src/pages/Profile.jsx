import { useContext } from "react";
import { LoginContext } from "../context/LoginContext";

export default function Profile() {
    const { loginStore } = useContext(LoginContext);

    return(
        <main className="profilePage">
            <h2>{loginStore.username}</h2>
            <p>{loginStore.email}</p>
            <p>Role : {loginStore.role}</p>
        </main>
    )
}