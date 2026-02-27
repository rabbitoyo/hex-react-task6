import { createHashRouter } from 'react-router';

import FrontLayout from '../layouts/FrontLayout';
import Home from '../pages/front/Home';
import Explore from '../pages/front/Explore';
import Event from '../pages/front/Event';
import Products from '../pages/front/Products';
import ProductDetail from '../pages/front/ProductDetail';
import Notes from '../pages/front/Notes';
import Cart from '../pages/front/Cart';
import Order from '../pages/front/Order';
import Confirm from '../pages/front/Confirm';
import Login from '../pages/front/Login';
import AdminLayout from '../layouts/AdminLayout';
import Dashboard from '../pages/admin/Dashboard';
import NotFound from '../pages/front/NotFound';

const router = createHashRouter([
    {
        path: '/',
        element: <FrontLayout />,
        children: [
            { index: true, element: <Home /> },
            { path: 'explore', element: <Explore /> },
            { path: 'event', element: <Event /> },
            { path: 'product', element: <Products /> },
            { path: 'product/:id', element: <ProductDetail /> },
            { path: 'notes', element: <Notes /> },
            { path: 'cart', element: <Cart /> },
            { path: 'order', element: <Order /> },
            { path: 'confirm', element: <Confirm /> },
            { path: 'login', element: <Login /> },
        ],
    },
    {
        path: '/admin',
        element: <AdminLayout />,
        children: [{ index: true, element: <Dashboard /> }],
    },
    {
        path: '*',
        element: <NotFound />,
    },
]);

export default router;
