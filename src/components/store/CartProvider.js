import { useContext, useState } from "react";
import CartContext from "./cart-context";
import AuthContext from "./auth-context";
import axios from "axios";

const CartProvider = (props) => {
    const [items, setItems] = useState([]);
    const [quantity, setQuantity] = useState(0);
    const authCntx = useContext(AuthContext);
    
    const newArray = [...items];
    console.log(newArray);

    let cartLength = 0;
    
    const userEmailId = authCntx.email.split('@').join('');
    const newEmailId = userEmailId.split('.').join('');  
    const url = `https://crudcrud.com/api/8d065053cb4547cda733e7ec5280cc1a/cart${newEmailId}`;
        
    const addItemsToCartHandler = async (product) => {
        
        const indx = newArray.findIndex((item) => {
            if(item.id === product.id){
                console.log('executed')
                console.log(item.id);
                console.log(product.id);
                return item;
            } else {
                return null;
            }
        })
        console.log(indx);

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
                        return product;
                    } else {
                        return null;
                    }
                 })

                 console.log(res.data);
                 console.log(res.data[mappingProduct])

                 let fetchProduct = res.data[mappingProduct]
                 let updatedProduct = {
                    ...fetchProduct, 
                    quantity: fetchProduct.quantity + 1
                }
                 let id = updatedProduct._id;
                 console.log(updatedProduct);
                 delete updatedProduct._id;
                 const response = await axios.put(url+`/${id}`, updatedProduct)
                 console.log(response.data);
                 setItems([updatedProduct]);
            } catch(err) {
                console.log(err);
            }
        }
    };

    const totalQuantityHandler = (quantity) => {
        setQuantity(quantity);
    };

    const removeItemsFromCartHandler = (id) =>{
        newArray.forEach((index) => {
        if(id===index.id){
            newArray.splice(index,1);
        }
        })
        setItems(newArray)
    }

    const cartFetchedItems = (cartLength, cartData) => {
        console.log(`cart fetched items`, cartLength, cartData);
    }

    const cartItems = {
        items: items,
        quantity: quantity,
        totalQuantity: totalQuantityHandler,
        price: items.reduce((currNum, item) => {
            return (currNum += item.price * item.quantity)
            }, 0),
        addItem: addItemsToCartHandler,
        removeItem: removeItemsFromCartHandler,
        cartFetch: cartFetchedItems,
        cartLength: cartLength
    }; 

    return(
        <CartContext.Provider value={cartItems}>
            {props.children}
        </CartContext.Provider>
    );
};

export default CartProvider;
