/* eslint-disable react-refresh/only-export-components */
import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter, Routes, Route } from "react-router";
import './index.css';
import MainLayout from './layout/MainLayout';
import Home from './pages/Home';
import AddUser from './pages/AddUser';
import AddArticle from './pages/AddArticle';
import Connection from './pages/Connection';
import Users from './pages/Users';
import { ArticleProvider } from './context/articleContext';
import { UserProvider } from './context/UserContext';

const ContextWrapper = ({ children }) => {
    return(
        <UserProvider>
            <ArticleProvider>
                {children}
            </ArticleProvider>
        </UserProvider>
    )
}

createRoot(document.getElementById('root')).render(
    <ContextWrapper>
        <BrowserRouter>
            <StrictMode>
                <Routes>
                    <Route element={<MainLayout />}>
                        <Route path='/' element={<Home />} />
                        <Route path='/addUser' element={<AddUser />} />
                        <Route path='/addArticle' element={<AddArticle />} />
                        <Route path='/connection' element={<Connection />} />
                        <Route path='/users' element={<Users />} />
                    </Route>
                </Routes>
            </StrictMode>
        </BrowserRouter>
    </ContextWrapper>,
)
