import Products from "./Products";
import classes from "./AvailableProducts.module.css";
import { Fragment, useContext, useEffect } from "react";
import AuthContext from "../store/auth-context";
import CartContext from "../store/cart-context";
import axios from "axios";

const AvailableProducts = (props) => {
    const authCntx = useContext(AuthContext);
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

    useEffect(() => {
        const userEmailId = authCntx.email.split('@').join('');
        const newEmailId = userEmailId.split('.').join('');

        const getCart = async () => {
            try {
                const res = await axios.get(`https://crudcrud.com/api/13bebb7b723a4f5496dbc4056838b542/cart${newEmailId}`);
                
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
    }, [cartCntx, authCntx.email]);

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