import Countdown from 'react-countdown';
import image from "../../../assets/icon/icon-chicken-removebg-preview.png";
import { Link } from 'react-router-dom';
const OfferAds = () => {

    const renderer = ({ days, hours, minutes, seconds }) => {
		return (
			<div className="grid grid-cols-4 md:grid-cols-4 lg:grid-cols-4 items-center gap-2 md:gap-5 text-center">
				<div className='bg-white text-black p-2 rounded-full w-16 h-16 md:w-20 md:h-20 flex flex-col justify-center'>
					<h1 className="text-sm md:text-lg lg:text-3xl font-bold">{days}</h1>
					<h1 className="text-xs md:text-base">Days</h1>
				</div>
				<div className='bg-white text-black p-2 rounded-full w-16 h-16 md:w-20 md:h-20 flex flex-col justify-center'>
					<h1 className="text-sm md:text-lg lg:text-3xl font-bold">{hours}</h1>
					<h1 className="text-xs md:text-base">Hours</h1>
				</div>
				<div className='bg-white text-black p-2 rounded-full w-16 h-16 md:w-20 md:h-20 flex flex-col justify-center'>
					<h1 className="text-sm md:text-lg lg:text-3xl font-bold">{minutes}</h1>
					<h1 className="text-xs md:text-base">Minutes</h1>
				</div>
				<div className='bg-white text-black p-2 rounded-full w-16 h-16 md:w-20 md:h-20 flex flex-col justify-center'>
					<h1 className="text-sm md:text-lg lg:text-3xl font-bold">{seconds}</h1>
					<h1 className="text-xs md:text-base">Seconds</h1>
				</div>
			</div>
		);
	};


    return (
        <div className='my-10 md:my-20 p-4 lg:p-0'>
        <div className="flex flex-col-reverse md:flex-row text-white px-5 lg:px-0 lg:justify-around items-center w-full bg-[#F5BC3B] py-10 md:h-[500px] rounded">
           <div className='space-y-6 md:space-y-10 text-center md:text-left'>
               <h1 className='text-lg md:text-2xl lg:text-4xl font-medium leading-7 md:leading-9'>
               enhance your<br /> <span className='pt-2 block'>meat eating experience</span> 
               </h1>
               
               <Countdown className="text-xl" date={Date.now() + 458895000} renderer={renderer} />

               <div className="flex justify-center md:justify-start">
                   <Link to="/" className='btn btn-success bg-green-400 rounded-sm px-6 md:px-8 text-white'>
                       Buy Now
                   </Link>
               </div>
           </div>

           <div className='flex justify-center pb-5 md:pb-0'>
               <img 
                  style={{filter:"drop-shadow(0px 5px 25px rgba(255, 255, 255, 0.5))" }} src={image} className="w-full  lg:m-10 shadow-slate-200  "srcSet=""                         alt="Product"
               />
           </div>
       </div>
   </div>
    );
};

export default OfferAds;