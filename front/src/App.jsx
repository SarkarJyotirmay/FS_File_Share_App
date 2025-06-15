import React from 'react'
import { createBrowserRouter, Outlet, RouterProvider } from 'react-router-dom'
import Home from './pages/Home/Home'
import NotFound from './pages/NotFound/NotFound'
import ShowFiles from './pages/ShowFiles/ShowFiles'
import First from './pages/First'
import Signup from './pages/Signup/Signup'
import Login from './pages/Login/Login'

const router = createBrowserRouter([
  {
  path: "/",
  element: <First />,
  children:[
    {
      index: true,
      element: <Home />
    },
    {
      path: "/files",
      element: <ShowFiles />
    },
    {
      path: "/signup",
      element: <Signup />
    },
    {
      path: "/login",
      element: <Login />
    },
    {
      path: "*",
      element: <NotFound />
    }
  ]
}
])

const App = () => {
  return (
    <>
    <RouterProvider router={router}></RouterProvider>
    </>
  )
}

export default App