import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { createBrowserRouter,createRoutesFromElements,Route,RouterProvider } from 'react-router-dom';
import Home from './page/Home';
import Menu from './page/Menu';
import About from './page/About';
import Contact from './page/Contact';
import Login from './page/Login';
import NewProduct from './page/NewProduct';
import Signup from './page/Signup';
import { store } from './redux/index.js';
import { Provider } from'react-redux';
import  Cart  from './page/Cart';
import Success from './page/Success.js';
import Cancel from './page/Cancel.js';


const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path='/' element={<App/>}>
      <Route index element={<Home/>}/>
      {/* <Route path='menu' element={<Menu/>}/> */}
      <Route path='menu/:filterby' element={<Menu/>}/>
      <Route path='about' element={<About/>}/>
      <Route path='contact' element={<Contact/>}/>
      <Route path='cart' element={<Cart/>}/>
      <Route path='login' element={<Login/>}/>
      <Route path='newproduct' element={<NewProduct/>}/>
      <Route path='signup' element={<Signup/>}/>
      <Route path='success' element={<Success/>}/>
      <Route path='cancel' element={<Cancel/>}/>
    </Route>
  )
)

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <Provider store={store}>
    <RouterProvider router={router}/>
  </Provider>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
