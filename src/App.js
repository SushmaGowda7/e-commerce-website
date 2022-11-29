import React, { Fragment, Suspense, useContext, useState } from 'react';
import { Redirect, Route } from 'react-router-dom';
import axios from 'axios';
import classes from './App.module.css';
import Header from './components/layout/Header';
import Footer from './components/layout/Footer';
import Cart from './components/Cart/Cart';
import AuthContext from './components/store/auth-context';

const Home = React.lazy(() => import('./components/pages/Home'));
const Login = React.lazy(() => import('./components/pages/Login'));
const About = React.lazy(() => import('./components/pages/About'));
const ContactUs = React.lazy(() => import('./components/pages/ContactUs'));
const ProductDetail = React.lazy(() => import('./components/products/ProductDetail'));
const AvailableProducts = React.lazy(() => import('./components/products/AvailableProducts'));


function App() {
  const [cartIsShown, setCartIsShown] = useState(false);
  const [cartLength, setCartLength] = useState(0);
  
  const authCntx = useContext(AuthContext);

    const newEmailId = localStorage.getItem('email')
    const getCart = async () => {
      try {
        const response = await axios.get(`https://crudcrud.com/api/71562618bffb4c31820bc73ff27bfa04/cart${newEmailId}`);
        console.log(response);
        console.log(response.data.length);
        setCartLength(response.data.length);
      } catch (err) {
        console.log(err);
      }
    };
    getCart();

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
      <Suspense fallback={<p>Loading...</p>}>
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
      </Suspense>
      </main>
      <div className={classes.footer}>
        <Footer />
      </div>
    </Fragment>
  );
}

export default App;
