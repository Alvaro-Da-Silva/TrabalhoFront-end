import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'

import CardUser from "./components/CardUser";
import LoginComponent from "./components/Login";
import Layout from "./components/Layout";

import{ createBrowserRouter, RouterProvider} from 'react-router-dom'

const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout><LoginComponent /></Layout>,
  },
  {
    path:"/Orders",
    element: <Layout><CardUser /></Layout>
  }
])

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>,
)
