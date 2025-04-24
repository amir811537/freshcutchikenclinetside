import Banner from "../Navbar/Banner";
import Categoris from "./Categoris";
import OfferAds from './offers/OfferAds';
import AllProduct from "./Products/AllProduct";

const Home = () => {
  return (
    <div className="max-w-7xl mx-auto my-5">
      <Banner />
      <Categoris></Categoris>
      <OfferAds></OfferAds>
      <AllProduct></AllProduct>
    </div>
  );
};
export default Home;