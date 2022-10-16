import Products from "./Products";
import classes from "./AvailableProducts.module.css";
import { Fragment, useContext } from "react";
import CartContext from "../store/cart-context";
import axios from "axios";

const AvailableProducts = (props) => {
    const cartCntx = useContext(CartContext);

    const productsArr = [
        {
            id: 'a1',
            title: 'Colors',
            price: 100,
            imageUrl: 'https://prasadyash2411.github.io/ecom-website/img/Album%201.png',
        },
        {
            id: 'a2',
            title: 'Black and white Colors',
            price: 50,
            imageUrl: 'https://prasadyash2411.github.io/ecom-website/img/Album%202.png',
        },
        {
            id: 'a3',
            title: 'Yellow and Black Colors',
            price: 70,
            imageUrl: 'https://prasadyash2411.github.io/ecom-website/img/Album%203.png',
        },
        {
            id: 'a4',
            title: 'Blue Color',
            price: 100,
            imageUrl: 'https://prasadyash2411.github.io/ecom-website/img/Album%204.png',
        }
    ];

    const newEmailId = localStorage.getItem('email')
        const getCart = async () => {
            try {
                const res = await axios.get(`https://crudcrud.com/api/71562618bffb4c31820bc73ff27bfa04/cart${newEmailId}`);
                
                const cartData = res.data;
                const cartLength = res.data.length;
                console.log(res.data);
                console.log(cartLength);

                cartCntx.cartFetch(cartLength, cartData);
            } catch (err) {
                console.log(err);
            }
        };

        getCart();

    const productList = productsArr.map((item) => (
        <ul key={item.id}>
          <Products data={item} />
        </ul>
      ));
      

    return(
        <Fragment>
            <div className={classes.container}>
                {productList}
            </div>
        </Fragment>

    )
};

export default AvailableProducts;