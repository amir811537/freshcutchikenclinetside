import { useEffect, useState, useRef } from "react";
import { useLocation } from "react-router-dom";
import { pdf } from "@react-pdf/renderer";
import { saveAs } from "file-saver";
import InvoicePdf from "./invoice/InvoicePdf";
import { v4 as uuidv4 } from "uuid";
import { FaCheckCircle } from "react-icons/fa";

const OrderSuccess = () => {
  const { state } = useLocation();
  const order = state?.fullOrder;
  const [pdfBlob, setPdfBlob] = useState(null);

  const fallbackIdRef = useRef(uuidv4().split("-")[0]);
  const orderId = order?._id || fallbackIdRef.current;

  useEffect(() => {
    if (order) {
      const generatePDF = async () => {
        const blob = await pdf(
          <InvoicePdf data={{ ...order, _id: orderId }} />
        ).toBlob();
        setPdfBlob(blob);
      };
      generatePDF();
    }
  }, [order, orderId]);

  const downloadInvoice = () => {
    if (pdfBlob) {
      const fileName = `invoice-${orderId}.pdf`;
      saveAs(pdfBlob, fileName);
    }
  };

  if (!order) {
    return (
      <div className="text-center mt-20">
        <h2 className="text-2xl font-bold mb-4">No order data found.</h2>
        <a href="/" className="btn btn-primary">
          Go Back to Home
        </a>
      </div>
    );
  }

  const {
    customer: { name, phone },
    totalAmount,
    status,
    paymentMethod,
  } = order;

  return (
    <div className="flex justify-center items-center min-h-screen bg-gradient-to-r from-green-50 to-green-100 px-4">
      <div className="bg-white p-8 rounded-xl shadow-lg max-w-md w-full text-center">
        <FaCheckCircle className="text-green-500 text-5xl mx-auto mb-4" />
        <h2 className="text-2xl font-bold text-green-700 mb-2">
          Order Successful!
        </h2>
        <p className="text-gray-700 mb-6">
          Thank you <span className="font-semibold">{name}</span>, your order
          has been placed.
        </p>

        <div className="bg-gray-100 p-4 rounded-md text-left text-sm mb-6">
          <p>
            <span className="font-medium">Order ID:</span> #{orderId}
          </p>
          <p>
            <span className="font-medium">Phone:</span> {phone}
          </p>
          <p>
            <span className="font-medium">Total:</span> ৳
            {parseFloat(totalAmount).toFixed(2)}
          </p>
          <p>
            <span className="font-medium">Payment:</span> {paymentMethod}
          </p>
          <p>
            <span className="font-medium">Status:</span>{" "}
            <span className="text-green-600 font-semibold">{status}</span>
          </p>
        </div>

        <button
          onClick={downloadInvoice}
          disabled={!pdfBlob}
          className={`w-full py-3 rounded-md font-medium text-white ${
            pdfBlob
              ? "bg-green-600 hover:bg-green-700 transition"
              : "bg-gray-400 cursor-not-allowed"
          }`}
        >
          Download Invoice PDF
        </button>

        <a
          href="/"
          className="inline-block mt-4 text-sm text-green-600 hover:underline"
        >
          Back to Homepage
        </a>
      </div>
    </div>
  );
};

export default OrderSuccess;
