/* eslint-disable react-refresh/only-export-components */
/* eslint-disable no-unused-vars */
import { createContext, useEffect, useState } from "react";
import axios from 'axios';

export const ArticleContext = createContext();

export const ArticleProvider = ({ children }) => {
    const [articles, setArticles] = useState([]);
    const PATH = 'http://localhost:3000/articles';

    useEffect(() => {
        async function getAllArticles() {
            try {
                const res = await axios.get(PATH);
                const data = res.data;
    
                setArticles(data);
            } catch (error) {
                console.log('Erreur get :', error);
            }
        }
        getAllArticles();
    }, []); 
    
    return(
        <ArticleContext.Provider value={{ articles, setArticles }}>
            {children}
        </ArticleContext.Provider>
    )
}