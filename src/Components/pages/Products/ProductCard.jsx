/* eslint-disable react/prop-types */
import PropTypes from "prop-types";
import { Link } from "react-router-dom";

const ProductCard = ({ item, isLoading }) => {
  const shortDescription = item?.description
    ? item.description.split(' ').slice(0, 10).join(' ') + '...'
    : '';

  if (isLoading) {
    // Loading Skeleton
    return (
      <div className="card bg-base-100 w-auto border shadow-sm animate-pulse">
        <figure>
          <div className="bg-gray-300 lg:w-[303px] lg:h-[227px] w-40 h-40"></div>
        </figure>
        <div className="card-body space-y-4">
          <div className="h-4 bg-gray-300 rounded w-3/4"></div>
          <div className="flex justify-between items-center">
            <div className="space-x-2">
              <div className="h-4 bg-gray-300 rounded w-20"></div>
              <div className="h-4 bg-gray-200 rounded w-12"></div>
            </div>
          </div>
          <div className="hidden lg:block">
            <div className="h-3 bg-gray-300 rounded w-full mb-1"></div>
            <div className="h-3 bg-gray-300 rounded w-5/6"></div>
          </div>
          <div className="flex lg:flex-row flex-col gap-5">
            <div className="h-10 bg-gray-300 rounded w-full lg:w-1/2"></div>
            <div className="h-10 bg-gray-300 rounded w-full lg:w-1/2"></div>
          </div>
        </div>
      </div>
    );
  }

  // Normal Product Card
  return (
    <Link to=''>
      <div className="card bg-base-100 w-auto border shadow-sm">
        <figure>
          <img
            className="lg:w-[303px] lg:h-[227px] w-40 h-40 object-cover"
            src={item.image}
            alt={item.title || "Product Image"}
          />
        </figure>
        <div className="card-body">
          <div>
            <h2 className="card-title">{item.name}</h2>
          </div>
          <div className="flex justify-between items-center">
            <div className="space-x-2">
              <span className="text-xl font-bold text-red-600">
                ৳{item.price}
              </span>
              <span className="line-through text-gray-500 text-sm">
                ৳{item.oldPrice}
              </span>
            </div>
          </div>

          {/* Description: Hidden on small, show 10 words on large screens */}
          <p className="hidden lg:block">
            {shortDescription}
          </p>

          <div className="flex lg:flex-row flex-col gap-5 justify-between items-center w-full">
            <button className="btn bg-[#F5BC3B] text-white w-full lg:w-auto">Add to cart</button>
            <button className="btn bg-[#F5BC3B] text-white w-full lg:w-auto">Buy Now</button>
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
    oldPrice: PropTypes.number,
    discount: PropTypes.number,
    description: PropTypes.string,
  }),
  isLoading: PropTypes.bool,
};

export default ProductCard;
