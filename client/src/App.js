import './App.scss'
import Navbar from "./components/navbar/Navbar";
import AuthPage from "./pages/AuthPage/AuthPage";
import {BrowserRouter} from "react-router-dom";
import {useRoutes} from "./routes";
import {useAuth} from "./hooks/auth.hook";
import {AuthContext} from "./context/AuthContext";


function App() {
    const {login, logout, token, userId, isReady} = useAuth()
    const isLogin = !!token

    const routes = useRoutes(isLogin)


    return (
        <BrowserRouter>
            <AuthContext.Provider value={{login, logout, token, userId, isReady, isLogin}}>
                <div className="app">
                    <Navbar/>
                    {routes}
                </div>
            </AuthContext.Provider>
        </BrowserRouter>


  )
}

export default App
