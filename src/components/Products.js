import AvailableProducts from "./AvailableProducts";

const Products = (props) => {
    return(
        <li>
            <div>
                <h2>{props.title}</h2>
                <h3>{props.price}</h3>
                <h4>{props.imageUrl}</h4>
            </div>
        </li>
    )
};

export default Products;