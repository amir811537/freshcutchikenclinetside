import PropTypes from "prop-types";

const ProductCard = ({ item }) => {
    return (
        <div className="card bg-base-100 w-auto border  shadow-sm">
            <figure>
                <img
                    src={item.image}
                    alt={item.title || "Product Image"}
                />
            </figure>
            <div className="card-body">
                <h2 className="card-title">{item.title}</h2>
                <p>
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Enim, laborum.
                </p>
                <div className="card-actions justify-end">
                    <button className="btn btn-primary">Buy Now</button>
                </div>
            </div>
        </div>
    );
};

ProductCard.propTypes = {
    item: PropTypes.shape({
        image: PropTypes.string.isRequired,
        title: PropTypes.string.isRequired
    }).isRequired
};

export default ProductCard;
