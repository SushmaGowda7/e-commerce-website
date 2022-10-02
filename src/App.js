import { useState } from 'react';
import classes from './App.module.css';
import Cart from './components/Cart/Cart';
import Footer from './components/layout/Footer';
import Header from './components/layout/Header';
import CartProvider from './components/store/CartProvider';
import AvailableProducts from './components/products/AvailableProducts';
import { Route } from 'react-router-dom';
import About from './components/pages/About';

function App() {

  const [cartIsShown, setCartIsShown] = useState(false);

  const showCartHandler =() => {
    setCartIsShown(true)
  }

  const hideCartHandler =() => {
    setCartIsShown(false)
  }

  return (
    <CartProvider>
      {cartIsShown && <Cart onClose ={hideCartHandler}/>}
      <Header onShow={showCartHandler}/>
      <main>
        <Route path='/home'>
          <AvailableProducts />
        </Route>
        <Route path="/about">
          <About />
        </Route>
      </main>
      <div className={classes.footer}>
        <Footer />
      </div>
    </CartProvider>
  );
}

export default App;
