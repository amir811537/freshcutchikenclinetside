/* eslint-disable react/prop-types */
import { useState } from "react";
import PdfCashmemo from "./PdfCashmemo";
/* eslint-disable react/prop-types */
import {

  PDFDownloadLink,
} from "@react-pdf/renderer";
const productList = [
  { name: "ব্রয়লার (B)", price: 180 },
  { name: "ব্রয়লার (M)", price: 180 },
];

const Cashmemopreview = ({ data }) => {
  const {
    name,
    address,
    phone,
    email,
    paymentMethod,
    items,
    paidAmount = 0,
  } = data;

  const subtotal = items.reduce(
    (acc, item) => acc + item.quantity * item.price,
    0
  );
  const total = subtotal;
  const due = total + paidAmount;

  return (
    <div className="text-sm space-y-4 font-[NotoSerifBengali] border p-4">
      <div className="flex justify-between items-center border-b pb-2">
        <div>
          <h1 className="text-xl font-bold text-red-600">
            ফ্রেস কাট চিকেন সার্ভিস
          </h1>
          <p className="text-xs text-gray-600">বিল/চালান</p>
        </div>
        <div className="text-right text-xs">
          <p>তারিখ: {new Date().toLocaleDateString("bn-BD")}</p>
          <p>পেমেন্ট: {paymentMethod}</p>
        </div>
      </div>

      <div className="text-xs leading-5">
        <p>
          <span className="font-semibold">নাম:</span> {name}
        </p>
        <p>
          <span className="font-semibold">ঠিকানা:</span> {address}
        </p>
        <p>
          <span className="font-semibold">ফোন:</span> {phone}
        </p>
        {email && <p>{email}</p>}
      </div>

      <table className="w-full border border-collapse text-xs mt-4">
        <thead>
          <tr className="bg-green-100 border">
            <th className="border p-1">নং</th>
            <th className="border p-1">বিবরণ</th>
            <th className="border p-1">পিচ</th>
            <th className="border p-1">কেজি</th>
            <th className="border p-1">দর</th>
            <th className="border p-1">টাকা</th>
          </tr>
        </thead>
        <tbody>
          {items.map((item, i) => (
            <tr key={i} className="border-t">
              <td className="border p-1 text-center">{i + 1}</td>
              <td className="border p-1">{item.name}</td>
              <td className="border p-1 text-center">{item.piece || "-"}</td>
              <td className="border p-1 text-center">{item.quantity}</td>
              <td className="border p-1 text-center">
                ৳{item.price?.toFixed(2)}
              </td>
              <td className="border p-1 text-center">
                ৳{(item.quantity * item.price).toFixed(2)}
              </td>
            </tr>
          ))}
        </tbody>
        <tfoot className="font-semibold">
          <tr className="bg-gray-100">
            <td colSpan="5" className="text-right border p-1">
              মোট
            </td>
            <td className="border p-1 text-right">৳{total.toFixed(2)}</td>
          </tr>
          <tr>
            <td colSpan="5" className="text-right border p-1 text-green-700">
              ইজা
            </td>
            <td className="border p-1 text-right text-green-700">
              ৳{paidAmount.toFixed(2)}
            </td>
          </tr> 
          <br />
          <tr>
            <td colSpan="5" className="text-right border p-1 text-red-700">
              সর্বমোট  
            </td>
            <td className="border p-1 text-right text-red-700">
              ৳{due.toFixed(2)}
            </td>
          </tr>
          <tr>
            <td colSpan="5" className="text-right border p-1 text-green-600">
              জমা   
            </td>
            <td className="border p-1 text-right text-green-600">


            </td>
          </tr>
          <tr>
            <td colSpan="5" className="text-right border p-1 text-red-700">
              বাকি   
            </td>
            <td className="border p-1 text-right text-red-700">

            </td>
          </tr>
        </tfoot>
      </table>

      <div className="text-xs pt-4">
        <p className="text-red-600">বিক্রিত মাল ফেরত নেওয়া হয় না।</p>
       <div className="flex justify-between items-center">
         <p>ক্রেতার স্বাক্ষর: _____________________</p>
        <p>বিক্রেতার স্বাক্ষর: _____________________</p>
       </div>
      </div>
    </div>
  );
};

const CashMemoFreshcut = () => {

const [submittedData, setSubmittedData] = useState(null);



  
  const [form, setForm] = useState({
    name: "",
    address: "",
    phone: "",
    email: "",
    customDate: new Date().toISOString().split("T")[0],
    paymentMethod: "COD",
    paidAmount: 0,
    
    items: [{ name: "", quantity: 0, price: 0, piece: "" }],
  });

  const handleChange = (index, field, value) => {
    const updatedItems = [...form.items];
    updatedItems[index][field] =
      field === "quantity" || field === "price" ? Number(value) : value;
    setForm({ ...form, items: updatedItems });
  };

  const handleProductSelect = (index, selectedName) => {
    const selected = productList.find((p) => p.name === selectedName);
    if (selected) {
      const updatedItems = [...form.items];
      updatedItems[index].name = selected.name;
      updatedItems[index].price = selected.price;
      setForm({ ...form, items: updatedItems });
    }
  };

  const addItem = () => {
    setForm({
      ...form,
      items: [...form.items, { name: "", quantity: 1, price: 0, piece: "" }],
    });
  };

  const removeItem = (index) => {
    const updatedItems = form.items.filter((_, i) => i !== index);
    setForm({ ...form, items: updatedItems });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const subtotal = form.items.reduce(
      (acc, item) => acc + item.quantity * item.price,
      0
    );
    const total = subtotal;
    const due = total + form.paidAmount;

    const invoiceData = {
      ...form,
      total,
      due,
    };

    console.log("Submitted Invoice Data:", invoiceData);
    setSubmittedData(invoiceData);
  };

  return (
    <div className="flex flex-col md:flex-row gap-10 p-6 max-w-7xl mx-auto">
      <div className="w-full md:w-1/2 space-y-6">
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Name
              </label>
              <input
                className="border p-2 w-full"
                placeholder="Name"
                value={form.name}
                onChange={(e) => setForm({ ...form, name: e.target.value })}
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Phone
              </label>
              <input
                className="border p-2 w-full"
                placeholder="Phone"
                value={form.phone}
                onChange={(e) => setForm({ ...form, phone: e.target.value })}
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Address
              </label>
              <input
                className="border p-2 w-full"
                placeholder="Address"
                value={form.address}
                onChange={(e) => setForm({ ...form, address: e.target.value })}
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Email
              </label>
              <input
                className="border p-2 w-full"
                placeholder="Email"
                value={form.email}
                onChange={(e) => setForm({ ...form, email: e.target.value })}
              />
            </div>
            <div className="md:col-span-2">
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Date
              </label>
              <input
                type="date"
                className="border p-2 w-full"
                value={form.customDate}
                onChange={(e) =>
                  setForm({ ...form, customDate: e.target.value })
                }
              />
            </div>
    

            <div className="md:col-span-2">
              <label className="block text-sm font-medium text-gray-700 mb-1">
                        ইজা</label>
              <input
                type="number"
                className="border p-2 w-full"
                placeholder="Paid Amount"
                value={form.paidAmount}
                onChange={(e) =>
                  setForm({ ...form, paidAmount: Number(e.target.value) })
                }
              />
            </div>
          </div>

          <div>
            <h3 className="text-lg font-semibold mb-2">Product Items</h3>
            <div className="grid grid-cols-1 gap-4">
              {form.items.map((item, index) => (
                <div
                  key={index}
                  className="grid grid-cols-6 md:grid-cols-12 gap-2 items-end border p-3 rounded bg-gray-50"
                >
                  <div className="col-span-6 md:col-span-3">
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      পণ্য
                    </label>
                    <select
                      className="border p-2 w-full"
                      value={item.name}
                      onChange={(e) =>
                        handleProductSelect(index, e.target.value)
                      }
                    >
                      <option value="">-- পণ্য নির্বাচন করুন --</option>
                      {productList.map((p, i) => (
                        <option key={i} value={p.name}>
                          {p.name} – ৳{p.price}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div className="col-span-6 md:col-span-2">
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      পিছ
                    </label>
                    <input
                      className="border p-2 w-full"
                      placeholder="পিছ"
                      value={item.piece}
                      onChange={(e) =>
                        handleChange(index, "piece", e.target.value)
                      }
                    />
                  </div>

                  <div className="col-span-6 md:col-span-2">
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      কেজি
                    </label>
                    <input
                      className="border p-2 w-full"
                      type="number"
                      placeholder="Qty"
                      value={item.quantity}
                      onChange={(e) =>
                        handleChange(index, "quantity", e.target.value)
                      }
                    />
                  </div>

                  <div className="col-span-6 md:col-span-2">
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      দর
                    </label>
                    <input
                      className="border  p-2 w-full"
                      type="number"
                      value={item.price}
                      onChange={(e) =>
                        handleChange(index, "price", e.target.value)
                      }
                    />
                  </div>

                  <div className="col-span-6 md:col-span-1 flex items-center justify-center pt-5">
                    {form.items.length > 1 && (
                      <button
                        type="button"
                        onClick={() => removeItem(index)}
                        className="text-red-600 text-xl"
                      >
                        ❌
                      </button>
                    )}
                  </div>
                </div>
              ))}
            </div>
            <button
              type="button"
              onClick={addItem}
              className="text-blue-600 mt-2 font-semibold"
            >
              + Add Item
            </button>
          </div>

          <button
            type="submit"
            className="bg-green-600 hover:bg-green-700 text-white px-6 py-2 rounded"
          >
            Generate Invoice
          </button>
        </form>

    {submittedData && (
  <PDFDownloadLink
    document={<PdfCashmemo data={submittedData} />}
    fileName={`invoice_${submittedData.name || "customer"}.pdf`}
    className="text-blue-600 underline mt-4 block"
  >
    {({ loading }) => (loading ? "Generating PDF..." : "Download Invoice")}
  </PDFDownloadLink>
)}

      </div>

      <div className="w-full md:w-1/2 border p-4 rounded shadow bg-white">
        <Cashmemopreview data={form} />
      </div>
    </div>
  );
};

export default CashMemoFreshcut;
