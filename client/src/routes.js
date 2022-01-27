import MainPage from "./pages/MainPage/MainPage";
import AuthPage from "./pages/AuthPage/AuthPage";


export const useRoutes = (isLogin) => {
    if (isLogin) {
        return (
            <MainPage/>
        )
    }

    return (
        <AuthPage/>
    )
}