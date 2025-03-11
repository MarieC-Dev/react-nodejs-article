import { BrowserRouter, Routes, Route } from "react-router";
import MainLayout from './layout/MainLayout';
import Home from './pages/Home';
import AddUser from './pages/AddUser';
import AddArticle from './pages/AddArticle';
import Connection from './pages/Connection';
import Users from './pages/Users';
import Dashboard from './pages/Dashboard';
import Profile from './pages/Profile';
import UserArticles from './pages/UserArticles';

import { ArticleProvider } from './context/articleContext';
import { UserProvider } from './context/UserContext';
import { LoginProvider } from './context/LoginContext';
import LoginLayout from "./layout/LoginLayout";

function ContextWrapper({children}) {
    return(
        <LoginProvider>
            <UserProvider>
                <ArticleProvider>
                    {children}
                </ArticleProvider>
            </UserProvider>
        </LoginProvider>
    )
}

function App() {
    return (
        <ContextWrapper>
            <BrowserRouter>
                <Routes>
                    {/* Normal routes */}
                    <Route element={<MainLayout />}>
                        <Route path='/' element={<Home />} />
                        <Route path='/addArticle' element={<AddArticle />} />
                        <Route path='/my-articles' element={<UserArticles />} />

                        <Route path='/addUser' element={<AddUser />} />
                        <Route path='/users' element={<Users />} />
                        <Route path='/dashboard' element={<Dashboard />} />

                        <Route path='/connection' element={<Connection />} />
                    </Route>

                    {/* Protected routes */}
                    <Route element={<LoginLayout />}>
                        <Route path='/profile' element={<Profile />} />
                    </Route>
                </Routes>
            </BrowserRouter>
        </ContextWrapper>
    )
}

export default App
