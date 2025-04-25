import Banner from "../Navbar/Banner";
import Categoris from "./Categoris";
import Freedelevery from "./Freedelevery";
import OfferAds from './offers/OfferAds';
import BestSelling from "./Products/BestSelling";

const Home = () => {
  return (
    <div className="max-w-7xl mx-auto my-5">
      <Banner />
      <Categoris></Categoris>
      <OfferAds></OfferAds> 
      <BestSelling></BestSelling>
      <Freedelevery></Freedelevery> 
    </div>
  );
};
export default Home;