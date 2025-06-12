import React from 'react'
import { createBrowserRouter, Outlet, RouterProvider } from 'react-router-dom'
import Home from './pages/Home/Home'
import NotFound from './pages/NotFound/NotFound'
import ShowFiles from './pages/ShowFiles/ShowFiles'
import First from './pages/First'

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