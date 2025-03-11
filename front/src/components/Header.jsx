/* eslint-disable no-unused-vars */
import { useContext } from "react";
import { NavLink } from "react-router";
import { UserContext } from "../context/UserContext";

export default function Header() {
    const { profile, users } = useContext(UserContext);

    if(users.length > 0) { // Check if there is at least 1 user in db
        if(profile.role === 'admin') {
            return (
                <header>
                    <NavLink to={'/'}>Home</NavLink>
                    {/* DANS DASHBOARD <NavLink to={'/addUser'}>Ajouter un utilisateur</NavLink>
                    <NavLink to={'/addArticle'}>Ajouter un article</NavLink> 
                    <NavLink to={'/all-articles'}>Articles du site</NavLink> */}
                    <NavLink to={'/dashboard'}>Dashboard</NavLink>
                    <NavLink to={'/profile'}>{profile.username.charAt(0).toUpperCase() + profile.username.slice(1)}</NavLink>
                </header>
            )
        } else if(profile.role === 'moderator') {
            return (
                <header>
                    <NavLink to={'/'}>Home</NavLink>
                    <NavLink to={'/users'}>Utilisateurs du site</NavLink>
                    {/* <NavLink to={'/all-articles'}>Articles du site</NavLink> */}
                    {/* DANS USERS & All ARTICLES 
                    <NavLink to={'/addUser'}>Ajouter un utilisateur</NavLink>
                    <NavLink to={'/addArticle'}>Ajouter un article</NavLink> 
                    <NavLink to={'/all-articles'}>Articles du site</NavLink> */}
                    <NavLink to={'/profile'}>{profile.username.charAt(0).toUpperCase() + profile.username.slice(1)}</NavLink>
                </header>
            )
        } else if(profile.role === 'user') {
            return (
                <header>
                    <NavLink to={'/'}>Home</NavLink>
                    <NavLink to={'/addArticle'}>Ajouter un article</NavLink>
                    <NavLink to={'/my-articles'}>Mes articles</NavLink>
                    <NavLink to={'/profile'}>{profile.username.charAt(0).toUpperCase() + profile.username.slice(1)}</NavLink>
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
                <NavLink to={'/addArticle'}>Ajouter un article</NavLink>
                <NavLink to={'/connection'}>Connexion</NavLink>
            </header>
        )
    }
}

