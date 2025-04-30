import { useContext, useEffect } from "react";
import InnerImageZoom from "react-inner-image-zoom";
import 'react-inner-image-zoom/lib/styles.min.css';
import { useLoaderData, useNavigate } from "react-router-dom";
import { AuthContext } from "../../../AuthProvider/AuthProvider";
import axios from "axios";



const ProductDetail = () => {

const product=useLoaderData()
// console.log("=========>",product)

const { user } = useContext(AuthContext);
const navigate = useNavigate();

const handleAddToCart = async () => {
  if (!user) {
    navigate("/notloginRegister");
    return;
  }

  const cartData = {
    name: product.name,
    image: product.image,
    price: product.price,
    email: user.email,
  };

  try {
    const response = await axios.post("http://localhost:5000/cart", cartData);
    console.log("product added to cart:", response.data);
  } catch (error) {
    console.error("Failed to add to cart:", error);
  }
};
const buyNow = () => alert("Buying now!");



    // Scroll to top when the component is rendered
    useEffect(() => {
      window.scrollTo(0, 0);
      }, []);

  return (
    <div className="max-w-7xl mx-auto px-4 my-10">
      <div className="flex flex-col lg:flex-row gap-10">
        {/* Image */}
        <div className="w-full lg:w-[60%] lg:bg-[#f5f5f5] flex products-center justify-center h-[400px] lg:h-[600px] lg:shadow-md rounded-xl">
        <div className="w-full h-full flex products-center justify-center">
  <InnerImageZoom
    src={product.image}
    zoomSrc={product.image}
    zoomPreload={true}
    className="max-h-full max-w-full object-contain"
  />
</div>

</div>


        {/* Product Info */}
        <div className="w-full lg:w-[40%] space-y-4">
          <h1 className="text-2xl font-semibold text-[#FC8934]">{product.name}</h1>
          <p className="text-3xl font-bold text-red-500">
            BDT {product.price}
            <span className="text-gray-500 line-through text-xl ml-4">
              BDT {product.oldPrice}
            </span>
          </p>

          <div className="flex flex-col sm:flex-row gap-3">
         
            <button
              onClick={handleAddToCart}
              className="bg-black text-white px-6 py-2 hover:bg-gray-800"
            >
              Add to Cart
            </button>
            <button
              onClick={buyNow}
              className="bg-red-600 text-white px-6 py-2 hover:bg-red-700"
            >
              Buy Now
            </button>
          </div>

          <p
            className="text-gray-700 leading-relaxed"
            dangerouslySetInnerHTML={{ __html: product.description }}
          ></p>
        </div>
      </div>
    </div>
  );
};

export default ProductDetail;
