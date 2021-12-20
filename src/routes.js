import { Navigate, useRoutes } from 'react-router-dom';
// layouts
import DashboardLayout from './layouts/dashboard';
import LogoOnlyLayout from './layouts/LogoOnlyLayout';
//
import Login from './pages/Login';
import Register from './pages/Register';
import DashboardApp from './pages/DashboardApp';
import Products from './pages/Products';
import NewProduct from './pages/NewProduct';
import Blog from './pages/Blog';
import Client from './pages/Client';
import NewClient from './pages/NewClient';
import NotFound from './pages/Page404';
import Employee from './pages/Employee';
import NewEmployee from './pages/NewEmployee';
import Obras from './pages/Obras';
import NuevaObra from './pages/NuevaObra';

// ----------------------------------------------------------------------

export default function Router() {
  return useRoutes([
    {
      path: '/',
      element: <LogoOnlyLayout />,
      children: [
        { element: <Navigate to="/login" replace /> },
        { path: 'login', element: <Login /> },
        { path: 'register', element: <Register /> },
        { path: '404', element: <NotFound /> },
        { path: '/', element: <Navigate to="/dashboard" /> },
        { path: '*', element: <Navigate to="/404" /> }
      ]
    },
    {
      path: '/dashboard',
      element: <DashboardLayout />,
      children: [
        { element: <Navigate to="/dashboard/app" replace /> },
        { path: 'app', element: <DashboardApp /> },
        { path: 'client', element: <Client /> },
        { path: 'client/new', element: <NewClient /> },
        { path: 'employee', element: <Employee /> },
        { path: 'employee/new', element: <NewEmployee /> },
        { path: 'obras', element: <Obras /> },
        { path: '/dashboard/obras/nuevaObra', element: <NuevaObra /> },
        { path: 'products', element: <Products /> },
        { path: 'products/new', element: <NewProduct /> },
        { path: 'blog', element: <Blog /> }
      ]
    },
    { path: '*', element: <Navigate to="/404" replace /> }
  ]);
}
