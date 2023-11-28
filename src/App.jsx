//reaproveitamento de estrutura
import { Outlet } from "react-router-dom"
import { NavBar } from "./pages/components/NavBar"
import { AuthProvider } from "./pages/auth/context/auth"

function App() {
  return (
      <AuthProvider>
        <Outlet />
        <NavBar />
      </AuthProvider>
  )
}

export default App
