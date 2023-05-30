import React from 'react'
import ReactDOM from 'react-dom/client'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import { ThemeProvider } from './context/ThemeContext.tsx'
import { SearcherProvider } from './context/SearcherContext.tsx'
import { ErrorPage } from './pages/ErrorPage/index.tsx'
import Home from './pages/Home'
import './index.css'

/* This code is creating a router using the `createBrowserRouter` function from the `react-router-dom`
library. */
const router = createBrowserRouter([
  {
    path: "/",
    element: <Home />,
    errorElement: <ErrorPage />, 
  }
], { basename: "/WeatherApp" });

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <ThemeProvider>
      <SearcherProvider>
        <RouterProvider router={router} />
      </SearcherProvider>
    </ThemeProvider>
  </React.StrictMode>,
)
