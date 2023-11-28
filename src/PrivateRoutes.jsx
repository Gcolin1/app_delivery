import { useContext } from "react"
import { AuthContext } from "./pages/auth/context/auth"
import { Navigate, Outlet } from "react-router-dom"
import { NavBar } from "./pages/components/NavBar"


export const PrivateRoutes = () => {
    const { signed } = useContext(AuthContext)

    return signed ? (
        <>
          <Outlet />
          <NavBar />
        </>
      ) : (
        <Navigate to="/auth/login" />
      );
}