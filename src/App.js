import { useState } from 'react';
import classes from './App.module.css';
import Cart from './components/Cart/Cart';
import Footer from './components/layout/Footer';
import Header from './components/layout/Header';
import CartProvider from './components/store/CartProvider';
import AvailableProducts from './components/products/AvailableProducts';
import { Route } from 'react-router-dom';
import About from './components/pages/About';
import Home from './components/pages/Home';
import ContactUs from './components/pages/ContactUs';
import ProductDetail from './components/products/ProductDetail';

function App() {

  const [cartIsShown, setCartIsShown] = useState(false);

  const showCartHandler =() => {
    setCartIsShown(true)
  }

  const hideCartHandler =() => {
    setCartIsShown(false)
  }

  const userInfoHandler = async(info) => {
    try{
    const res = await fetch('https://e-commerce-af028-default-rtdb.firebaseio.com/userInfo.json',
    {
        method: 'POST',
        body: JSON.stringify(info),
        headers: {'Content-type': 'application/json'}
    })

    if(!res.ok)
    {
      throw new Error('Something went wrong!')
    }

    const data = await res.json();
    console.log(data);
  }
  catch(err)
  {
    console.log(err);
  }
}

  return (
    <CartProvider>
      {cartIsShown && <Cart onClose ={hideCartHandler}/>}
      <Header onShow={showCartHandler}/>
      <main>
      <switch>
        <Route path="/home">
          <Home />
        </Route>
        <Route path="/store" exact>
          <AvailableProducts />
        </Route>
        <Route path="/store/:productDetail" exact>
          <ProductDetail />
        </Route>
        <Route path="/about">
          <About />
        </Route>
        <Route path="/contactUs">
          <ContactUs onAddQuery={userInfoHandler}/>
        </Route>
      </switch>
      </main>
      <div className={classes.footer}>
        <Footer />
      </div>
    </CartProvider>
  );
}

export default App;
