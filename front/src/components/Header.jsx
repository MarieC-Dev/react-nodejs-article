import { NavLink } from "react-router";

export default function Header() {
    if(localStorage.getItem("adminToken") || localStorage.getItem("moderatorToken")) {
        return (
            <header>
                <NavLink to={'/'}>Home</NavLink>
                <NavLink to={'/addUser'}>Ajouter un utilisateur</NavLink>
                <NavLink to={'/addArticle'}>Ajouter un article</NavLink>
                <NavLink to={'/users'}>Utilisateurs du site</NavLink>
                <NavLink to={'/dashboard'}>Dashboard</NavLink>
                <NavLink to={'/profile'}>Profil</NavLink>
            </header>
            )
    } else if(localStorage.getItem("userToken")) {
        return (
            <header>
                <NavLink to={'/'}>Home</NavLink>
                <NavLink to={'/addArticle'}>Ajouter un article</NavLink>
                <NavLink to={'/my-articles'}>Mes articles</NavLink>
                <NavLink to={'/profile'}>Profil</NavLink>
            </header>
            )
    }
    
    else {
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
