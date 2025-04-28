/* eslint-disable react/prop-types */
import PropTypes from "prop-types";
import { Link } from "react-router-dom";

const ProductCard = ({ item }) => {
    // Calculate the original price

    return (
        <Link to=''>
            <div className="card bg-base-100 w-auto border shadow-sm">
                <figure>
                    <img
                        className="lg:w-[303px] lg:h-[227px] w-auto h-auto"
                        src={item.image}
                        alt={item.title || "Product Image"}
                    />
                </figure>
                <div className="card-body">
                <div>
                            <h2 className="card-title">{item.name}</h2>
                        </div>
                    <div className="flex justify-between items-center">
             <div className=" space-x-2">
                            <span className="text-xl font-bold text-red-600">
                                ৳{item.price}
                            </span>
                            <span className="line-through text-gray-500 text-sm">
                                ৳{item.oldPrice}
                            </span>
                        </div>
                    </div>
                    <p>
                        {item.description}
                    </p>
                    <div className="card-actions justify-between">
                        <button className="btn bg-[#F5BC3B] text-white">Add to cart</button>
                        <button className="btn bg-[#F5BC3B] text-white">Buy Now</button>
                    </div>
                </div>
            </div>
        </Link>
    );
};

ProductCard.propTypes = {
    item: PropTypes.shape({
        image: PropTypes.string.isRequired,
        title: PropTypes.string,
        name: PropTypes.string,
        price: PropTypes.number.isRequired,
        discount: PropTypes.number.isRequired,
    }).isRequired,
};

export default ProductCard;
