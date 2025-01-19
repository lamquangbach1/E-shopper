import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Blog from './components/Blog'
import BlogDetail from './components/BlogDetail';
import Header from './components/Layout/Header';
import Footer from './components/Layout/Footer'
import React from 'react';
import Index from './member/Index';
import UpdateAccount from './UpdateAccount';
import MyProduct from './MyProduct';
import Add_Product from './Add_Product';
import EditProduct from './EditProduct';
import Home from './Home';
import ProductDetail from './ProductDetail';
import Cart from './Cart';
import ProductOrder from './ProductOrder';
import Wishlist from './Wishlist';
import { Provider } from 'react-redux';




const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
     
    <Router>
    <main>
       {/* <Provider store={store}>

       </Provider> */}
      <App>
      <Routes>
        <Route path="/blog/" element={<Blog />} /> 
        <Route path="/" element={<Blog />} /> 
        {/* <Route path="/blogDetail" element={<BlogDetail />} /> */}
        <Route path="/blog/detail/:id/" element={<BlogDetail />} />
        <Route path="/index" element={<Index />} /> 
        <Route path="/account/update" element={<UpdateAccount />} /> 
        <Route path="/account/product/list" element={<MyProduct />} />  
        <Route path="/account/product/add" element={<Add_Product />} />
        <Route path="/account/product/edit/:id/" element={<EditProduct />} />  
        <Route path="/home/" element={<Home/>} />  
        <Route path="/ProductDetail/:id/" element={<ProductDetail/>} /> 
        <Route path="/product/cart" element={<Cart/>} />  
        <Route path="/Product/Order/:id/" element={<ProductOrder/>}/> 
        <Route path="/product/wishlist/" element={<Wishlist/>} />  

 
      </Routes>
      </App>
      </main>
      <Footer/>
    </Router>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
