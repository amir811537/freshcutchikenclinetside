import { Link } from "react-router-dom";

const SuccessOrder = () => {
    return (
        <div className="min-h-screen flex items-center justify-center px-4 py-10 bg-gradient-to-b from-green-50 to-green-100">
            <div className="w-full max-w-lg bg-white rounded-2xl shadow-md p-6 sm:p-10 text-center">
                {/* Success Icon */}
                <div className="flex items-center justify-center w-20 h-20 mx-auto mb-6 bg-green-100 rounded-full">
                    <svg className="w-10 h-10 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                    </svg>
                </div>

                {/* Heading */}
                <h1 className="text-3xl sm:text-4xl font-bold text-green-600 mb-4">Order Successful!</h1>
                <p className="text-base sm:text-lg text-gray-700 mb-6">Thank you for your purchase.</p>

                {/* Contact Info */}
                <div className="mt-6 pt-4 border-t border-gray-200">
                    <p className="text-sm sm:text-base text-gray-700">Have questions? Contact us at:</p>
                    <a
                        href="mailto:admin@freshcutservice.com"
                        className="block mt-1 text-base font-medium text-blue-600 hover:text-blue-800 transition"
                    >
                       freshcutchickenservice@gamil.com
                    </a>
                </div>

                {/* Return to Dashboard Button */}
                <div className="mt-8">
                    <Link
                        to="/dashboard/userHome"
                        className="inline-block w-full sm:w-auto px-6 py-3 bg-green-600 text-white text-base sm:text-lg font-semibold rounded-lg hover:bg-green-700 transition"
                    >
                        Return to Dashboard
                    </Link>
                </div>
            </div>
        </div>
    );
};

export default SuccessOrder;
