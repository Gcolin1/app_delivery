//reaproveitamento de estrutura
import { Outlet } from "react-router-dom"
import { NavBar } from "./pages/components/NavBar"
import { AuthProvider } from "./pages/auth/context/auth"
import { PrivateRoutes } from "./PrivateRoutes"

function App() {
  return (
    <PrivateRoutes>
      <Outlet />
      <NavBar />
    </PrivateRoutes>
  )
}

export default App
