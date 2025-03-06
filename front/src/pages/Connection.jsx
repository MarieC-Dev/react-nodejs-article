import { useContext, useRef } from "react";
import Form from "../components/Form";
import { LoginContext } from "../context/LoginContext";

export default function Connection() {
    const { loginFetch } = useContext(LoginContext);
    const emailRef = useRef(null);
    const pwdRef = useRef(null);
    localStorage.getItem("authToken");

    const loginUser = (e) => {
        e.preventDefault();
        const emailValue = emailRef.current.value;
        const pwdValue = pwdRef.current.value;
        loginFetch(emailValue, pwdValue);
    }

    return(
        <main className="connectionPage">
            <section className="loginSection addUserSection">
                <Form 
                    idName='connection'
                    emailRef={emailRef}
                    pwdRef={pwdRef}
                    submitForm={(e) => loginUser(e)} />
            </section>
        </main>
    )
}