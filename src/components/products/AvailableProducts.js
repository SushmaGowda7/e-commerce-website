import Products from "./Products";
import classes from "./AvailableProducts.module.css";

const AvailableProducts = (props) => {
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
    const productList = productsArr.map((item) => (
        <ul>
          <Products data={item} />
        </ul>
      ));

    return(
            <div className={classes.container}>
                {productList}
            </div>
    )
};

export default AvailableProducts;