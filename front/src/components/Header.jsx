import { NavLink } from "react-router";

//console.log(localStorage.getItem("authToken"));

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
