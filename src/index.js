import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import {createTheme, ThemeProvider }from '@mui/material/styles';
import Login from './Login';
import Cadastro from './Cadastro';
import Produtos from './components/Produtos';
import EditarProduto from './components/EditarProduto';
 
const theme = createTheme( {
  palette: {
    mode: 'light',
    primary: {
      main: '#040405',
    },
    secondary: {
      main: '#DE8BF5',
    },
  },
});



const router = createBrowserRouter([
  {
    path: "/",
    element: <App />
  },
  {
    path: "/login",
    element: <Login />
  },
  {
    path: "/cadastro",
    element: <Cadastro/>
  },
  {
    path: "/produtos",
    element: <Produtos/>
  },
  {
    path: "/edicao/:id",
    element: <EditarProduto />
  }
]);

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <ThemeProvider theme={theme}>
  <RouterProvider router={router}/>
  </ThemeProvider>
);

