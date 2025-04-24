import React from "react";
import { IoMdSend } from "react-icons/io";

const Footer = () => {
	return (
		<footer className="bg-black  mt-10 font-poppins md:px-28 pb-8 pt-20  text-white ">
			<div className="container text-sm mx-auto  grid grid-cols-2 lg:grid-cols-4 gap-16 px-4">
				<div className="space-y-4">
					<h4 className="font-bold text-base">Exclusive</h4>
					<p>Subscribe</p>
					<p>Get 10% off your first order</p>
					<div className="mt-2 border-2 border-white flex gap-0 ">
						<input
							type="email"
							placeholder="Enter your email"
							className="input w-full input-bordered bg-transparent "
						/>
						<button className=" text-white p-2 rounded-r-md">
                        <IoMdSend className="text-white text-xl" />

						</button>
					</div>
				</div>
				<div className="space-y-4">
					<h4 className="font-bold text-lg">Support</h4>
					<p>Mirpur 1,Dhaka,Bangladesh.</p>
					<p>freshcutchickenservice@gamil.com</p>
					<p>+88013361-00835</p>
				</div>
				<div className="space-y-4">
					<h4 className="font-bold text-lg">Account</h4>
					<ul className="space-y-4">
						<li>
							<a href="#" className="hover:underline">
								My Account
							</a>
						</li>
						<li>
							<a href="/login" className="hover:underline">
								Login / Register
							</a>
						</li>
						<li>
							<a href="#" className="hover:underline">
								Cart
							</a>
						</li>
						<li>
							<a href="#" className="hover:underline">
								Wishlist
							</a>
						</li>
						<li>
							<a href="#" className="hover:underline">
								Shop
							</a>
						</li>
					</ul>
				</div>
				<div className="space-y-4">
					<h4 className="font-bold text-lg">Quick Link</h4>
					<ul className="space-y-4">
						<li>
							<a href="#" className="hover:underline">
								Privacy Policy
							</a>
						</li>
						<li>
							<a href="#" className="hover:underline">
								Terms Of Use
							</a>
						</li>
						<li>
							<a href="#" className="hover:underline">
								FAQ
							</a>
						</li>
						<li>
							<a href="#" className="hover:underline">
								Contact
							</a>
						</li>
					</ul>
				</div>
			</div>
			<div className="text-center mt-16 text-gray-500 text-sm ">
				© Copyright Al-Amin Electronics 2024. All rights reserved
			</div>
		</footer>
	);
};

export default Footer;
