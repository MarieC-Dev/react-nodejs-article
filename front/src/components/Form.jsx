export default function Form(props) {
    return(           
        <>
            { props.idName === 'addUser' || props.idName === 'connection' && props.idName !== 'addArticle' ?
                <form 
                    onSubmit={props.submitForm}
                    method="post" 
                    encType="multipart/form-data" 
                    id={props.idName}>
                    
                    {props.idName === 'addUser' && 
                        <div>
                            <label htmlFor="username">Nom d'utilisateur :</label>
                            <input type="text" ref={props.usernameRef} id="username" name="username" required />
                        </div>
                    }
                    
                    <div>
                        <label htmlFor="email">Email :</label>
                        <input type="email" ref={props.emailRef} id="email" name="email" required />
                    </div>
                    
                    <div>
                        <label htmlFor="password">Mot de passe :</label>
                        <input type="password" ref={props.pwdRef} id="password" name="password" required />
                    </div>
                    
                    {props.idName === 'connection' ? (
                        <button type="submit">Connexion</button>
                    ) : (
                        <button type="submit">Créer</button>
                    )}
                    
                    
                </form> 
                :
                <form 
                    onSubmit={props.submitForm} 
                    method="POST" 
                    encType="multipart/form-data" 
                    id="nodeForm">
                    <div>
                        <label htmlFor="username">Titre :</label>
                        <input type="text" ref={props.titleRef} id="articleTitle" name="articleTitle" required />
                    </div>
                    
                    <div>
                        <label htmlFor="articleContent">Contenu :</label>
                        <textarea ref={props.content} name="articleContent" id="articleContent" rows="7" />
                    </div>        
                    
                    <button type="submit">Créer</button>
                </form>
            }
        </>
        
    )
}