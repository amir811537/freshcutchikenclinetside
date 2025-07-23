import { TbTruckDelivery } from "react-icons/tb";
import { RiCoupon2Fill, RiSecurePaymentFill } from "react-icons/ri";

const Freedelevery = () => {
    return (
        <div className="grid grid-cols-1 md:grid-cols-3  gap-14 lg:gap-0 my-10 md:my-20 lg:my-40">
        <div className="space-y-4 text-center">
            <div className="p-2 inline-block bg-blue-400 rounded-full">
                <div className="flex">
                    <div className="text-2xl inline-block bg-black p-2 rounded-full">
                        <TbTruckDelivery className="text-5xl text-white" />
                    </div>
                </div>
            </div>
            <h1 className="font-bold text-2xl">
                FREE DELIVERY
            </h1>
            <p className="text-base ">
               You got free shipping for ordering more than <span className="text-red-500">10 kg!</span>
            </p>
        </div>
        <div className="space-y-4 text-center">
            <div className="p-2 inline-block bg-green-400 rounded-full">
                <div className="flex">
                    <div className="text-2xl inline-block bg-black p-2 rounded-full">
                        <RiCoupon2Fill className="text-5xl text-white" />
                    </div>
                </div>
            </div>
            <h1 className="font-bold text-2xl">
                COUPON DISCOUNTS
            </h1>
            <p className="text-base">
                Apply coupon codes at checkout to enjoy special discounts and offers.
            </p>
        </div>

        <div className="space-y-4 text-center">
            <div className="p-2 inline-block bg-purple-400 rounded-full">
                <div className="flex">
                    <div className="text-2xl inline-block bg-black p-2 rounded-full">
                        <RiSecurePaymentFill className="text-5xl text-white" />
                    </div>
                </div>
            </div>
            <h1 className="font-bold text-2xl">
                SECURE PAYMENTS
            </h1>
            <p className="text-base">
                Shop confidently with SSLCommerz, ensuring your payment details are secure.
            </p>
        </div>
    </div>
    );
};

export default Freedelevery;