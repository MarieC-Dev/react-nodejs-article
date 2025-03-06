/* eslint-disable no-unused-vars */
import { useContext } from "react"
import { ArticleContext } from "../context/articleContext"

export default function Home() {
    const { articles } = useContext(ArticleContext); 

    const Articles = () => {
        if(articles.length > 0) {
            return articles.map((article, index) => (
                <div className="article" key={index}>
                    <h2>{ article.title }</h2>  
                    <p>{ article.content }</p>  
                </div>
            ))
        }
        else {
            // TODO faire une animation de 'desert' avec une botte de foin qui passe
            return <p>Pas d'article</p>
        }
    }    

    return (
        <main className="homePage">
            <section className="articleSection">
                <Articles />
            </section>
        </main>
    )
}