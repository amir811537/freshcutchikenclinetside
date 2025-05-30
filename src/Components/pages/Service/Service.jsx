import supplyimage from '../../../assets/supply.jpg'
import packingimage from '../../../assets/ordermanagement.jpg'
import cuttingmanagemt from '../../../assets/cuttingmanagemt.jpg'
import { useEffect } from 'react';
const Service = () => {

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

    return (
        <div>
            <section className="py-10" id="services">
    <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold text-gray-800 dark:text-white mb-8 text-center">Our Services</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-white rounded-lg shadow-md overflow-hidden">
                <img src={supplyimage}
                    className="w-full h-64 object-cover"/>
                <div className="p-6 text-center">
                    <h3 className="text-xl font-medium text-gray-800 mb-2">Fresh Cut Delivery</h3>
                    <p className="text-gray-700 text-base">Our wheat flour grinding service provides fresh, high-quality
                        flour to businesses and individuals in the area. We use state-of-the-art equipment to grind
                        wheat into flour, and we offer a variety of flours to meet the needs of our customers.</p>
                </div>
            </div>
            <div className="bg-white rounded-lg shadow-md overflow-hidden">
                <img src={packingimage} alt="ordermanagement"
                    className="w-full h-64 object-cover"/>
                <div className="p-6 text-center">
                    <h3 className="text-xl font-medium text-gray-800 mb-2">Packing Management</h3>
                    <p className="text-gray-700 text-base">Our gram flour is perfect for a variety of uses, including
                        baking, cooking, and making snacks. It is also a good source of protein and fiber.Our gram flour
                        grinding service is a convenient and affordable way to get the freshest gram flour possible.</p>
                </div>
            </div>
            <div className="bg-white rounded-lg shadow-md overflow-hidden">
                <img src={cuttingmanagemt} alt="cutting pic"
                    className="w-full h-64 object-cover"/>
                <div className="p-6 text-center">
                    <h3 className="text-xl font-medium text-gray-800 mb-2">Best Cutting Service</h3>
                    <p className="text-gray-700 text-base">Our jowar grinding service is a convenient and affordable way to
                        get fresh, high-quality jowar flour. We use state-of-the-art equipment to grind jowar into a
                        fine powder, which is perfect for making roti, bread, and other dishes.
                    </p>

                </div>
            </div>

            
            <div className="bg-white rounded-lg shadow-md overflow-hidden">
                <img src="https://images.unsplash.com/photo-1607672632458-9eb56696346b?q=80&w=1914&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" alt="Coffee"
                    className="w-full h-64 object-cover"/>
                <div className="p-6 text-center">
                    <h3 className="text-xl font-medium text-gray-800 mb-2">Chilli pounding</h3>
                    <p className="text-gray-700 text-base">We specializes in the production of high-quality chili powder.
                        Our chili powder is made from the finest, freshest chilies, and we use traditional pounding
                        methods to ensure that our chili powder retains its full flavor and aroma.
                    <details>
                        <summary>Read More</summary>
                        <p> We offer a variety of chili powder products, including mild, medium, and hot. We also offer
                            custom blends to meet the specific needs of our customers.</p>
                    </details>
                    </p>
                </div>
            </div>
            {/* <!-- special card --> */}
            <div
                className="bg-white rounded-lg bg-gradient-to-tr from-pink-300 to-blue-300 p-0.5 shadow-lg overflow-hidden min-h-full">
                <div className="text-center text-white font-medium">Special product</div>
                <img src="https://images.unsplash.com/photo-1556910110-a5a63dfd393c?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NHx8cmF3JTIwc3BhZ2hldHRpfGVufDB8fDB8fHww" alt="Coffee"
                    className="w-full h-64 object-cover rounded-t-lg"/>
                <div className="p-6 bg-white text-center rounded-b-lg md:min-h-full">
                    <h3 className="text-xl font-medium text-gray-800 mb-2">Flavoured Spaghetti</h3>
                    <p className="text-gray-700 text-base"><span className="font-medium underline">Our speciality is</span>
                        Bappa Flour Mill offers a variety of flavored spaghetti dishes that are sure to tantalize your
                        taste
                        buds. We use only the freshest ingredients Our
                        flavors include: Mango, spinach
                    </p>
                </div>
            </div>

            <div className="bg-white rounded-lg shadow-md overflow-hidden">
                <img src="https://media.istockphoto.com/id/1265641298/photo/fried-papad.jpg?s=612x612&w=0&k=20&c=e_iEy4CTvU6Thn02zGgKt_TiSYAheCKmgfTF5j52ovU=" alt="papad"
                    className="w-full h-64 object-cover"/>
                <div className="p-6 text-center">
                    <h3 className="text-xl font-medium text-gray-800 mb-2">Rice Papad</h3>
                    <p className="text-gray-700 text-base">Our company produces high-quality rice papad that is made with
                        the finest ingredients. We use traditional methods to make our papad, which gives it a unique
                        flavor and texture. Our papad is also gluten-free and vegan.
                    <details>
                        <summary>Read More</summary>
                        <p> We offer a variety of rice papad flavors, including plain, salted, spicy, and flavored. We
                            also
                            offer a variety of sizes and shapes to choose from. Our papad is available in bulk or in
                            individual packages.</p>
                    </details>
                    </p>
                </div>
            </div>

        </div>
    </div>
</section>

        </div>
    );
};

export default Service;