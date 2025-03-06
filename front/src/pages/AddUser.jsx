/* eslint-disable no-unused-vars */
import { useContext, useRef } from "react";
import Form from "../components/Form";
import { UserContext } from "../context/UserContext";

export default function AddUser() {
    const { fetchCreateUser } = useContext(UserContext);
    const usernameRef = useRef(null);
    const emailRef = useRef(null);
    const pwdRef = useRef(null);

    const addUser = (e) => {
        e.preventDefault();

        console.log(usernameRef.current.value,
            emailRef.current.value,
            pwdRef.current.value);
        
        fetchCreateUser(
            usernameRef.current.value,
            emailRef.current.value,
            pwdRef.current.value,
        );
    }

    return(
        <main className="addUserPage">
            <section className="addUserSection">
                <Form 
                    idName='addUser' 
                    usernameRef={usernameRef}
                    emailRef={emailRef}
                    pwdRef={pwdRef} 
                    submitForm={(e) => addUser(e)} />
            </section>
        </main>
    )
}