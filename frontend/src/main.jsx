import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'

import CardUser from "./components/CardUser";
import Login from "./routes/login";

import{ createBrowserRouter, RouterProvider} from 'react-router-dom'
const router = createBrowserRouter([
  {
    path: "/",
    element: <Login />,
  },
  {
    path:"/Orders",
    element: <CardUser />
  }
])

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>,
)
