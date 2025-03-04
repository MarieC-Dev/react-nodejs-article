export default function Form(props) {
    return(           
        <>
            { props.idName === 'addUser' || props.idName === 'connection' && props.idName !== 'addArticle' ?
                <form 
                    method="post" 
                    encType="multipart/form-data" 
                    id={props.idName}>
                    
                    {props.idName === 'addUser' && 
                        <div>
                            <label htmlFor="username">Nom d'utilisateur :</label>
                            <input type="text" id="username" name="username" required />
                        </div>
                    }
                    
                    <div>
                        <label htmlFor="email">Email :</label>
                        <input type="email" id="email" name="email" required />
                    </div>
                    
                    <div>
                        <label htmlFor="password">Mot de passe :</label>
                        <input type="password" id="password" name="password" required />
                    </div>     
                    
                    <button type="submit">Créer</button>
                </form> 
                :
                <form method="POST" encType="multipart/form-data" id="nodeForm">
                    <div>
                        <label htmlFor="username">Titre :</label>
                        <input type="text" id="username" name="username" required />
                    </div>
                    
                    <div>
                        <label htmlFor="articleContent">Contenu :</label>
                        <textarea name="articleContent" id="articleContent" rows="7" />
                    </div>        
                    
                    <button type="submit">Créer</button>
                </form>
            }
        </>
        
    )
}