import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { RouterProvider } from 'react-router';
import router from './router';
import { CartProvider } from './context/CartProvider';
import { OrderProvider } from './context/OrderProvider';

// Bootstrap
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import './assets/scss/all.scss';

createRoot(document.getElementById('root')).render(
    <StrictMode>
        <CartProvider>
            <OrderProvider>
                <RouterProvider router={router} />
            </OrderProvider>
        </CartProvider>
    </StrictMode>
);
