/* eslint-disable react/prop-types */
import { useEffect, useState } from "react";
import axios from "axios";
import {
  pdf,
  Document,
  Page,
  Text,
  View,
  StyleSheet,
  Image,
  Font,
} from "@react-pdf/renderer";
import { saveAs } from "file-saver";
import logo from "../../../assets/logo-removebg-preview.png";

// ✅ Register Bangla Font from public folder
Font.register({
  family: "NotoSerifBengali",
  fonts: [
    {
      src: "../../../../public/fonts/NotoSerifBengali-VariableFont_wdth,wght.ttf",
      fontStyle: "normal",
      fontWeight: "normal",
    },
  ],
});

// ✅ Styles
const styles = StyleSheet.create({
  page: {
    fontFamily: "Helvetica",
    padding: 20,
    fontSize: 12,
    backgroundColor: "#fff",
    color: "#000",
  },
  headerContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 10,
  },
  logo: { width: 50, height: 50 },
  title: {
    fontSize: 20,
    fontWeight: "bold",
    color: "red",
  },
  tableRow: {
    flexDirection: "row",
    borderBottom: "1px solid #ddd",
    paddingVertical: 4,
  },
  tableHeader: {
    fontWeight: "bold",
    backgroundColor: "#f2f2f2",
  },
  tableCell: {
    flex: 1,
    textAlign: "center",
  },
  tableCellBangla: {
    flex: 1,
    textAlign: "center",
    fontFamily: "NotoSerifBengali",
  },
  footer: {
    backgroundColor: "#3533CA",
    color: "white",
    textAlign: "center",
    padding: 5,
    marginTop: 20,
    fontFamily: "NotoSerifBengali",
  },
});

// ✅ Utility functions
const isBangla = (text = "") => /[\u0980-\u09FF]/.test(text);

const truncateWords = (text, maxWords = 5) => {
  if (!text) return "";
  const words = text.split(" ");
  return words.length > maxWords ? words.slice(0, maxWords).join(" ") + "..." : text;
};

// ✅ PDF Document
const PDFDocument = ({ data }) => (
  <Document>
    <Page size="A4" style={styles.page}>
      <View style={styles.headerContainer}>
        <Image style={styles.logo} src={logo} />
        <Text style={styles.title}>Fresh Cut Chicken Service</Text>
      </View>

      <View style={[styles.tableRow, styles.tableHeader]}>
        <Text style={styles.tableCell}>Date</Text>
        <Text style={styles.tableCell}>Name</Text>
        <Text style={styles.tableCell}>Location</Text>
        <Text style={styles.tableCell}>Phone</Text>
        <Text style={styles.tableCell}>Order</Text>
        <Text style={styles.tableCell}>Sale</Text>
      </View>

      {data.map((item, index) => (
        <View key={index} style={styles.tableRow}>
          <Text style={styles.tableCell}>{item.date || "—"}</Text>
          <Text style={isBangla(item.name) ? styles.tableCellBangla : styles.tableCell}>
            {item.name}
          </Text>
          <Text style={isBangla(item.location) ? styles.tableCellBangla : styles.tableCell}>
            {truncateWords(item.location)}
          </Text>
          <Text style={styles.tableCell}>{item.phone}</Text>
          <Text style={isBangla(item.orderHistory) ? styles.tableCellBangla : styles.tableCell}>
            {item.orderHistory}
          </Text>
          <Text style={styles.tableCell}>{item.sale}</Text>
        </View>
      ))}

      <View style={styles.footer}>
        <Text>
          মোট বিক্রি: {data.reduce((acc, cur) => acc + parseFloat(cur.sale || 0), 0)}
        </Text>
      </View>
    </Page>
  </Document>
);

// ✅ Main Component
const CmsDetail = () => {
  const [allData, setAllData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [selectedMonth, setSelectedMonth] = useState("");
  const [selectedDate, setSelectedDate] = useState("");

  const englishMonths = [
    "January", "February", "March", "April", "May", "June",
    "July", "August", "September", "October", "November", "December",
  ];

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axios.get("https://freshcutserverside.vercel.app/cms");
        setAllData(res.data);
      } catch (err) {
        console.error("Error fetching data:", err);
      }
    };
    fetchData();
  }, []);

  const parseEnglishDate = (dateStr) => {
    if (!dateStr) return { day: "", month: "" };
    const parts = dateStr.split(" ");
    const day = parts[0];
    const month = parts[1]?.replace(",", "");
    return { day, month };
  };

  const filteredData = allData.filter((item) => {
    const { day, month } = parseEnglishDate(item.date);
    const matchMonth = selectedMonth ? month === selectedMonth : true;
    const matchDate = selectedDate ? day === selectedDate : true;
    return matchMonth && matchDate;
  });

  const handleDownload = async () => {
    setLoading(true);
    try {
      const blob = await pdf(<PDFDocument data={filteredData} />).toBlob();
      saveAs(blob, "Customer_Report.pdf");
    } catch (err) {
      console.error("Error generating PDF:", err);
    }
    setLoading(false);
  };

  return (
    <div className="max-w-7xl mx-auto p-4">
      <div className="mb-4">
        <h1 className="text-xl font-bold mb-2">Filter by Month and Date</h1>
        <div className="flex flex-wrap gap-4">
          <div>
            <label className="block mb-1">Select Month</label>
            <select
              className="border px-3 py-1 rounded"
              value={selectedMonth}
              onChange={(e) => {
                setSelectedMonth(e.target.value);
                setSelectedDate("");
              }}
            >
              <option value="">-- Month --</option>
              {englishMonths.map((month, index) => (
                <option key={index} value={month}>{month}</option>
              ))}
            </select>
          </div>

          <div>
            <label className="block mb-1">Select Date</label>
            <select
              className="border px-3 py-1 rounded"
              value={selectedDate}
              onChange={(e) => setSelectedDate(e.target.value)}
              disabled={!selectedMonth}
            >
              <option value="">-- Date --</option>
              {[...Array(31)].map((_, i) => (
                <option key={i} value={String(i + 1).padStart(2, "0")}>
                  {String(i + 1).padStart(2, "0")}
                </option>
              ))}
            </select>
          </div>
        </div>
      </div>

      <div className="overflow-x-auto mt-6">
        <table className="min-w-full border border-gray-300 text-sm text-center">
          <thead className="bg-gray-100">
            <tr>
              <th className="border px-2 py-1">Date</th>
              <th className="border px-2 py-1">Name</th>
              <th className="border px-2 py-1">Location</th>
              <th className="border px-2 py-1">Phone</th>
              <th className="border px-2 py-1">Order</th>
              <th className="border px-2 py-1">Sale</th>
            </tr>
          </thead>
          <tbody>
            {filteredData.map((item, index) => (
              <tr key={index} className="border-t">
                <td className="border px-2 py-1">{item.date || "—"}</td>
                <td className="border px-2 py-1">{item.name}</td>
                <td className="border px-2 py-1">{item.location}</td>
                <td className="border px-2 py-1">{item.phone}</td>
                <td className="border px-2 py-1">{item.orderHistory}</td>
                <td className="border px-2 py-1">৳{item.sale}</td>
              </tr>
            ))}
            <tr className="bg-blue-700 text-white font-bold">
              <td colSpan="5" className="px-2 py-2 text-right">Total Sale:</td>
              <td className="px-2 py-2">
                ৳{filteredData.reduce((acc, cur) => acc + parseFloat(cur.sale || 0), 0)}
              </td>
            </tr>
          </tbody>
        </table>
      </div>

      {selectedMonth && (
        <div className="p-4 text-right">
          <button
            onClick={handleDownload}
            className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700"
            disabled={loading || filteredData.length === 0}
          >
            {loading ? "Downloading..." : "Download PDF"}
          </button>
        </div>
      )}
    </div>
  );
};

export default CmsDetail;
