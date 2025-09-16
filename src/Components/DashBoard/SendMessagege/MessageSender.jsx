/* eslint-disable react/prop-types */
import { useState, useEffect } from "react";
import axios from "axios";

const MessageSender = () => {
  const [customers, setCustomers] = useState([]);
  const [selectedCustomers, setSelectedCustomers] = useState([]);
  const [message, setMessage] = useState("");
  const [sending, setSending] = useState(false);

  // Fetch customer data
  useEffect(() => {
    const fetchCustomers = async () => {
      try {
        const res = await axios.get("https://freshcutserverside.vercel.app/cms");
        setCustomers(res.data);
      } catch (err) {
        console.error("Error fetching customers:", err);
      }
    };
    fetchCustomers();
  }, []);

  // Toggle selection
  const toggleSelect = (customer) => {
    if (selectedCustomers.some((c) => c._id === customer._id)) {
      setSelectedCustomers(selectedCustomers.filter((c) => c._id !== customer._id));
    } else {
      setSelectedCustomers([...selectedCustomers, customer]);
    }
  };

  // Send WhatsApp messages one by one with delay
  const sendMessages = async () => {
    if (!message.trim()) {
      alert("Please enter a message to send.");
      return;
    }
    if (selectedCustomers.length === 0) {
      alert("Please select at least one customer.");
      return;
    }

    setSending(true);

    for (let i = 0; i < selectedCustomers.length; i++) {
      const customer = selectedCustomers[i];
      if (!customer.phone) continue;

      // Format number: 01XXXXXXXX → 8801XXXXXXXX
      const phone = "88" + customer.phone.replace(/^0/, "");
      const url = `https://wa.me/${phone}?text=${encodeURIComponent(message)}`;
      window.open(url, "_blank");

      // Delay 1 second between each customer to avoid browser issues
      await new Promise(resolve => setTimeout(resolve, 1000));
    }

    setSending(false);
    alert("All WhatsApp messages opened. Please send them manually.");
  };

  return (
    <div className="p-4">
      <h2 className="text-xl font-bold mb-4">Send WhatsApp Messages</h2>

      {/* Customer selection list */}
      <div className="mb-4 max-h-60 overflow-y-auto border p-2 rounded">
        {customers.map((customer) => (
          <label
            key={customer._id}
            className="flex items-center gap-2 mb-2 cursor-pointer"
          >
            <input
              type="checkbox"
              checked={selectedCustomers.some((c) => c._id === customer._id)}
              onChange={() => toggleSelect(customer)}
            />
            <span>
              {customer.name} | {customer.location} | {customer.phone}
            </span>
          </label>
        ))}
      </div>

      {/* Message input */}
      <div className="mb-4">
        <label className="block mb-2 font-semibold">Message:</label>
        <textarea
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          rows={3}
          className="w-full border px-3 py-2 rounded"
          placeholder="Write your message here..."
        />
      </div>

      {/* Send button */}
      <button
        onClick={sendMessages}
        disabled={selectedCustomers.length === 0 || !message.trim() || sending}
        className={`px-4 py-2 rounded text-white ${sending ? "bg-gray-500" : "bg-green-600 hover:bg-green-700"}`}
      >
        {sending ? "Sending..." : "Send WhatsApp Messages"}
      </button>
    </div>
  );
};

export default MessageSender;
