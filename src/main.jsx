import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'
import Home from './pages/Home.jsx'
import NewOrders from './pages/NewOrders.jsx'

//1 configurando rotas
import { 
  createBrowserRouter,
  RouterProvider
 } from 'react-router-dom'
import App from './App.jsx'
import { ErrorPage } from './pages/ErrorPage.jsx'
import { OrdersAccepted } from './pages/OrdersAccepted.jsx'
import { Profile } from './pages/Profile.jsx'
import { OrderDetails } from './pages/OrderDetails.jsx'
import { Login } from './pages/auth/Login.jsx'
import { AuthProvider } from './pages/auth/context/auth.jsx'
import { Register } from './pages/auth/Register.jsx'
import { PickedupOrders } from './pages/PickedupOrders.jsx'
import CompletedOrders from './pages/CompletedOrders.jsx'

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    errorElement: <ErrorPage />,
    children: [
      {
        path: "/",
        element: <Home />
      },
      {
        path: "/new_orders",
        element: <NewOrders />
      },
      {
        path: "/orders_accepted",
        element: <OrdersAccepted />
      },
      {
        path: "/profile",
        element: <Profile />
      },
      {
        path: "/pickedup_orders",
        element: <PickedupOrders />
      }
    ],
  },
  {
    path: "/order-details/:unique_order_id",
    element: <OrderDetails/>
  },
  {
    path: "/completed-orders",
    element: <CompletedOrders/>
  },
  {
    path: "/auth/login",
    element: <Login/>
  },
  {
    path: "/auth/register",
    element: <Register/>
  }
])

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <AuthProvider>
      <RouterProvider router={router} />
    </AuthProvider>
  </React.StrictMode>,
)
