import { useContext, useState } from "react";
import CartContext from "./cart-context";
import AuthContext from "./auth-context";
import axios from "axios";


const CartProvider = (props) => {
    const [items, setItems] = useState([]);
    console.log(items);
    const [quantity, setQuantity] = useState(0);
    const authCntx = useContext(AuthContext);

    const addItemsToCartHandler = async (product) => {
        const userEmailId = authCntx.email.split('@').join('');
        const newEmailId = userEmailId.split('.').join('');
        const url = `https://crudcrud.com/api/c2d4e2e8c8c24b479128237e1c80426d/cart${newEmailId}`;
        
        const newArray = [...items];
        const indx = newArray.findIndex((item) => {
            if(item.id === product.id){
                return item;
            }
        })
        if(indx === -1) {
            try{
                const res = await axios.post(url, product)
                setItems([...newArray, product])
                    console.log(res.data)
            }
            catch(err){
                console.log(err);
            }
        } else{
            try{
                const res = await axios.get(url)
                 const mappingProduct = res.data.findIndex((item) => {
                    if(item.id === product.id)
                    {
                        return product
                    }
                 return null})
                 console.log(res.data[mappingProduct])

                 let fetchProduct = res.data[mappingProduct]
                 let updatedProduct = {...fetchProduct, quantity: fetchProduct.quantity + 1}
                 let id = updatedProduct._id;
                 //delete updatedProduct._id;
                 const response = await axios.put(url+`/${id}`, updatedProduct)
                 console.log(response.data)
                 setItems([updatedProduct])
            }
            catch(err){
                console.log(err);
            }
        }
    }

    const totalQuantityHandler = (quantity) => {
        setQuantity(quantity);
    };

    const removeItemsFromCartHandler = (id) =>{};

    const cartItems = {
        items: items,
        quantity: quantity,
        totalQuantity: totalQuantityHandler,
        price: items.reduce((currNum, item) => {
            return (currNum += item.price * item.quantity)
            }, 0),
        addItem: addItemsToCartHandler,
        removeItem: {removeItemsFromCartHandler}
    } 

    return(
        <CartContext.Provider value={cartItems}>
        {console.log(cartItems.price)}
            {props.children}
        </CartContext.Provider>
    );
};

export default CartProvider;
