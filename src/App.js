import { Fragment, useContext, useEffect, useState } from 'react';
import classes from './App.module.css';
import Cart from './components/Cart/Cart';
import Footer from './components/layout/Footer';
import Header from './components/layout/Header';
import AvailableProducts from './components/products/AvailableProducts';
import { Redirect, Route } from 'react-router-dom';
import About from './components/pages/About';
import Home from './components/pages/Home';
import ContactUs from './components/pages/ContactUs';
import ProductDetail from './components/products/ProductDetail';
import Login from './components/pages/Login';
import AuthContext from './components/store/auth-context';
import CartContext from './components/store/cart-context';
import axios from 'axios';

function App() {
  const [cartIsShown, setCartIsShown] = useState(false);
  const [cartLength, setCartLength] = useState(0);
  
  const authCntx = useContext(AuthContext);
  const cartCntx = useContext(CartContext);
  console.log(cartCntx.items);

  useEffect(() => {
    const newEmailId = authCntx.email.replace(/[^a-zA-Z0-9]/g, "");
    const getCart = async () => {
      try {
        const response = await axios.get(`https://crudcrud.com/api/8d065053cb4547cda733e7ec5280cc1a/cart${newEmailId}`);
        console.log(response);
        console.log(response.data.length);
        setCartLength(response.data.length);
      } catch (err) {
        console.log(err);
      }
    };
    getCart();
  });

  const showCartHandler =() => {
    setCartIsShown(true)
  }

  const hideCartHandler =() => {
    setCartIsShown(false)
  }

  return (
    <Fragment>
      {cartIsShown && <Cart onClose ={hideCartHandler}/>}
      <Header onShow={showCartHandler} data={cartLength}/>
      <main>
      <switch>
        <Route path="/" exact>
          <Home />
        </Route>
        <Route path="/home" >
          <Home />
        </Route>
        <Route path="/store" exact>
          {authCntx.isLoggedIn && <AvailableProducts />}
          {!authCntx.isLoggedIn && <Redirect to='/login' />}
        </Route>
        <Route path="/store/:productDetail">
          {authCntx.isLoggedIn && <ProductDetail />}
          {!authCntx.isLoggedIn && <Redirect to='/login'/>}
        </Route>
        <Route path="/about">
          <About />
        </Route>
        <Route path="/login">
          <Login />
        </Route>
        <Route path="/contactUs">
          <ContactUs />
        </Route>
      </switch>
      </main>
      <div className={classes.footer}>
        <Footer />
      </div>
    </Fragment>
  );
}

export default App;
