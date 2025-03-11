import { Outlet } from "react-router";
import Header from "../components/Header";
import { useContext } from "react";
import { LoginContext } from "../context/LoginContext";
import forbidden from '../assets/hand-solid.svg'

export default function LoginLayout() {
    const { isLogin } = useContext(LoginContext);

    if(isLogin) {
        return(
            <div className="loginLayout">
                <Header />
                <Outlet />
            </div>
        )
    } else {
        return(
            <div className="loginLayout notLogin">
                <img src={forbidden} alt="forbidden icon" />
                <p>
                    Vous n'êtes pas autorisé à accéder à cette page. <br />
                    Veuillez vous connecter ou vous inscrire
                </p>
                <a href="/connection">Se connecter</a>
                <a href="/">S'inscrire</a>
            </div>
        )
    }
}

/* Vous n'êtes pas autorisé à accéder à cette page.
Veuillez vous connecter ou vous inscrire */