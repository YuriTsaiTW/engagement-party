import { createBrowserRouter, RouterProvider } from 'react-router'
import App from './App'
import Home from './pages/Home'
import Memoir from './pages/Memoir'
import NotFound from './pages/NotFound'

export const router = createBrowserRouter(
  [
    {
      path: '/',
      element: <App />,
      children: [
        { index: true, element: <Home /> },
        { path: 'memoir', element: <Memoir /> },
        { path: '*', element: <NotFound /> },
      ],
    },
  ],
  {
    // dev: '/'；prod: '/engagement-party/'
    basename: import.meta.env.BASE_URL.replace(/\/$/, '') || '/',
  },
)

export function AppRouter() {
  return <RouterProvider router={router} />
}
