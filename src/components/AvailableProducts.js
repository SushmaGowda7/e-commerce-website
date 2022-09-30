import Products from "./Products";

const DUMMY_PRODUCT_LIST = [
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

const AvailableProducts = (props) => {
    const productList = DUMMY_PRODUCT_LIST.map((item) => 
        <Products 
            key={item.id}
            title={item.title}
            price={item.price}
            imageUrl={item.imageUrl}
        />
    );

    return(
        <section>
            <ul>{productList}</ul>
        </section>
    )
};

export default AvailableProducts;