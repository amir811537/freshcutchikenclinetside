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
                <div className="flex justify-between items-center">
                <div>
                <h2 className="card-title">{item.title}</h2>
                </div>
                <div className="flex items-center space-x-2">
        <span className="text-xl font-bold text-red-600">৳299</span>
        <span className="line-through text-gray-500 text-sm">৳325</span>
        <span className="text-green-600 text-sm font-medium">
          -8%
        </span>
      </div>
                </div>
                <p>
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Enim, laborum.
                </p>
                <div className="card-actions justify-between">
                    <button className="btn bg-[#F5BC3B] text-white ">Add to cart</button>
                    <button className="btn bg-[#F5BC3B] text-white ">Buy Now</button>
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
