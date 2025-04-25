import { IoCallOutline, IoMailOutline } from "react-icons/io5";

const Contact = () => {
  return (
   <div className="max-w-7xl mx-auto">
     <div className="flex flex-col lg:flex-row px-5 lg:px-0 gap-10 lg:gap-20 mx-auto my-10 lg:my-20">
      {/* Contact Info Section */}
      <div className="space-y-16 font-poppins">
        <div className="space-y-2 font-medium">
          <div className="flex items-center gap-4 mb-5">
            <div className="p-2 bg-primary text-white rounded-full text-xl">
              <IoCallOutline />
            </div>
            <h1 className="text-xl">Call to Us</h1>
          </div>
          <p>We are available 24/7, 7 days a week.</p>
          <p>Phone: +8801782240624</p>
        </div>

        <div className="w-80 h-[2px] bg-black"></div>

        <div className="space-y-2 font-medium">
          <div className="flex items-center gap-4 mb-5">
            <div className="p-2 bg-primary text-white rounded-full text-xl">
              <IoMailOutline />
            </div>
            <h1 className="text-xl">Write to Us</h1>
          </div>
          <p>
            Fill out the form and we will contact <br />
            you within 24 hours.
          </p>
          <p>Emails:</p>
          <p>customer@alaminelectronics.com</p>
          <p>support@alaminelectronics.com</p>
        </div>
      </div>

      {/* Contact Form Section */}
      <form className="w-full space-y-5">
        <div className="flex flex-col lg:flex-row gap-5">
          <input
            type="text"
            name="name"
            placeholder="Name"
            required
            className="input bg-[#F5F5F5] rounded-sm w-full focus:outline-none"
          />
          <input
            type="tel"
            name="phone"
            placeholder="Phone"
            required
            className="input bg-[#F5F5F5] rounded-sm w-full focus:outline-none"
          />
          <input
            type="email"
            name="email"
            placeholder="Email"
            required
            className="input bg-[#F5F5F5] rounded-sm w-full focus:outline-none"
          />
        </div>

        <div>
          <textarea
            name="message"
            placeholder="Your Message"
            required
            className="textarea bg-[#F5F5F5] w-full h-64 resize-none rounded-sm focus:outline-none"
          ></textarea>
        </div>

        <div className="flex justify-end">
          <button
            type="submit"
            className="btn bg-primary text-white px-8 mt-5 rounded-sm"
          >
            Send Message
          </button>
        </div>
      </form>
    </div>
   </div>
  );
};

export default Contact;
