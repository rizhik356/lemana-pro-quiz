import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import { routes } from '../constants/routes.tsx'

const Router = () => {
  const browserRoutes = createBrowserRouter(routes)

  return <RouterProvider router={browserRoutes} />
}

export default Router
