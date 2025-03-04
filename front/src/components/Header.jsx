import { NavLink } from "react-router";

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

{/* <nav>
      <NavLink to="/" end>
        Home
      </NavLink>
      <NavLink to="/trending" end>
        Trending Concerts
      </NavLink>
      <NavLink to="/concerts">All Concerts</NavLink>
      <NavLink to="/account">Account</NavLink>
    </nav> */}
