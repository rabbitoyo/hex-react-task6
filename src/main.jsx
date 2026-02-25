import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { RouterProvider } from 'react-router';
import router from './router';

// Bootstrap
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import './assets/scss/all.scss';

createRoot(document.getElementById('root')).render(
    <StrictMode>
        <RouterProvider router={router} />
    </StrictMode>
);
