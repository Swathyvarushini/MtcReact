import React from 'react';
import ReactDOM from 'react-dom/client';
import { createBrowserRouter,RouterProvider } from "react-router-dom";
import './assets/css/index.css';
import 'react-toastify/dist/ReactToastify.css';
import App from './App';
const router = createBrowserRouter([{ path: "/", element: <div>Test page</div> }]);
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <RouterProvider router={router} />
    <App />
  </React.StrictMode>
);


