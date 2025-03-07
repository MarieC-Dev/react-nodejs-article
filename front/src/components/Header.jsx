/* eslint-disable no-unused-vars */
import { useContext } from "react";
import { NavLink } from "react-router";
import { LoginContext } from "../context/LoginContext";
import { UserContext } from "../context/UserContext";

export default function Header() {
    return(
        <header>
            <NavLink to={'/'}>Home</NavLink>
            <NavLink to={'/addUser'}>Ajouter un utilisateur</NavLink>
            <NavLink to={'/addArticle'}>Ajouter un article</NavLink>
            <NavLink to={'/connection'}>Connexion</NavLink>
        </header>
    )
}

