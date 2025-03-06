import { useContext } from "react";
import { NavLink } from "react-router";
import { LoginContext } from "../context/LoginContext";
import { UserContext } from "../context/UserContext";

export default function Header() {
    const { loginStore } = useContext(LoginContext);
    const { users } = useContext(UserContext);

    if(users) {
        if(loginStore && loginStore.role === 'admin') {
            return (
                <header>
                    <NavLink to={'/'}>Home</NavLink>
                    {/* DANS DASHBOARD <NavLink to={'/addUser'}>Ajouter un utilisateur</NavLink>
                    <NavLink to={'/addArticle'}>Ajouter un article</NavLink> 
                    <NavLink to={'/all-articles'}>Articles du site</NavLink> */}
                    <NavLink to={'/dashboard'}>Dashboard</NavLink>
                    <NavLink to={'/profile'}>Profil</NavLink>
                </header>
            )
        } else if(loginStore && loginStore.role === 'moderator') {
            return (
                <header>
                    <NavLink to={'/'}>Home</NavLink>
                    <NavLink to={'/users'}>Utilisateurs du site</NavLink>
                    {/* <NavLink to={'/all-articles'}>Articles du site</NavLink> */}
                    {/* DANS USERS & All ARTICLES 
                    <NavLink to={'/addUser'}>Ajouter un utilisateur</NavLink>
                    <NavLink to={'/addArticle'}>Ajouter un article</NavLink> 
                    <NavLink to={'/all-articles'}>Articles du site</NavLink> */}
                    <NavLink to={'/profile'}>Profil</NavLink>
                </header>
            )
        } else if(loginStore && loginStore.role === 'user') {
            return (
                <header>
                    <NavLink to={'/'}>Home</NavLink>
                    <NavLink to={'/addArticle'}>Ajouter un article</NavLink>
                    <NavLink to={'/my-articles'}>Mes articles</NavLink>
                    <NavLink to={'/profile'}>Profil</NavLink>
                </header>
            )
        } else {
            return (
                <header>
                    <NavLink to={'/'}>Home</NavLink>
                    <NavLink to={'/connection'}>Connexion</NavLink>
                </header>
            )
        }
    } else {
        return(
            <header>
                <NavLink to={'/'}>Home</NavLink>
                <NavLink to={'/addUser'}>Ajouter un utilisateur</NavLink>
                <NavLink to={'/connection'}>Connexion</NavLink>
            </header>
        )
    }
}
