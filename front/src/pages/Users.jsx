import { useContext } from "react"
import { UserContext } from "../context/UserContext"

export default function Users() {
    const { users } = useContext(UserContext);
    return(
        <main className="usersPage">
            <section className="usersSection">
                {users.map((user, index) => (
                    <div key={index} className="user">
                        <h2>{user.username}</h2>
                        <p>{user.email}</p>
                    </div>
                    ))}
            </section>
        </main>
    )
}