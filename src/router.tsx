import { createBrowserRouter, RouterProvider } from 'react-router'
import App from './App'
import Announcement from './pages/Announcement'
import Home from './pages/Home'
import Invitation from './pages/Invitation'
import Memoir from './pages/Memoir'
import NotFound from './pages/NotFound'

export const router = createBrowserRouter(
  [
    {
      path: '/',
      element: <App />,
      children: [
        { index: true, element: <Home /> },
        { path: 'announcement', element: <Announcement /> },
        { path: 'invitation', element: <Invitation /> },
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
