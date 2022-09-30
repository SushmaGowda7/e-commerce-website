import { useState } from 'react';
import classes from './App.module.css';
import Cart from './components/Cart/Cart';
import Footer from './components/layout/Footer';
import Header from './components/layout/Header';
import AvailableProducts from './components/products/AvailableProducts';
import CartProvider from './components/store/CartProvider';

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
        <AvailableProducts />
      </main>
      <div className={classes.footer}>
        <Footer />
      </div>
    </CartProvider>
  );
}

export default App;
