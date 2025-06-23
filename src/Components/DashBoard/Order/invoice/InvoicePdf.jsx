/* eslint-disable react/prop-types */
import {
  Document,
  Page,
  Text,
  View,
  StyleSheet,
  Image,
  Font,
} from "@react-pdf/renderer";
import logo from "../../../../assets/logo-removebg-preview.png";
import QR from '../../../../assets/QR/frame.png'

// ✅ Register Bangla Font
Font.register({
  family: "NotoSerifBengali",
  fonts: [
    {
      src: "/fonts/NotoSerifBengali-VariableFont_wdth,wght.ttf",
      fontStyle: "normal",
      fontWeight: "normal",
    },
  ],
});

const styles = StyleSheet.create({
  page: {
    fontFamily: "NotoSerifBengali",
    padding: 30,
    fontSize: 12,
    backgroundColor: "#fff",
    color: "#000",
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 20,
  },
  companyInfo: {
    flexDirection: "row",
    alignItems: "center",
  },
  logo: { width: 32, height: 32, marginRight: 8 },
  companyName: {
    fontSize: 14,
    fontWeight: "bold",
    color: "#4a4a4a",
  },
  invoiceInfo: {
    textAlign: "right",
  },
  invoiceTitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 4,
  },
  section: {
    borderBottom: "2px solid #ccc",
    paddingBottom: 10,
    marginBottom: 20,
  },
  billToTitle: {
    fontSize: 16,
    fontWeight: "bold",
    marginBottom: 6,
  },
  billToText: {
    color: "#4a4a4a",
    marginBottom: 2,
  },
  table: {
    width: "100%",
    marginBottom: 20,
  },
  tableHeader: {
    flexDirection: "row",
    borderBottom: "1px solid #ccc",
    backgroundColor: "#f3f3f3",
    padding: 6,
  },
  tableRow: {
    flexDirection: "row",
    padding: 6,
    borderBottom: "1px solid #eee",
  },
  cell: {
    flex: 1,
    textAlign: "left",
  },
  rightCell: {
    textAlign: "right",
  },
  summaryRow: {
    flexDirection: "row",
    justifyContent: "flex-end",
    marginBottom: 6,
  },
  summaryText: {
    marginRight: 10,
    color: "#4a4a4a",
  },
  totalText: {
    fontWeight: "bold",
    fontSize: 16,
  },
  notes: {
    borderTop: "2px solid #ccc",
    paddingTop: 10,
    marginTop: 20,
    color: "#4a4a4a",
    fontSize: 11,
  },
});

const InvoicePdf = ({ data }) => {
  if (!data) return null;

  const {
    _id: invoiceNo,
    orderDate,
    customer,
    items,
    totalAmount,
    paymentMethod,
  } = data;

  const formattedDate = new Date(orderDate).toLocaleDateString("bn-BD", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  return (
    <Document>
      <Page size="A4" style={styles.page}>
        {/* Header */}
        <View style={styles.header}>
          <View style={styles.companyInfo}>
            <Image style={styles.logo} src={logo} />
            <Text style={{fontSize:20 , color: "red"}} > Fresh Cut Chicken Service </Text>
          </View>
          <View style={styles.invoiceInfo}>
            <Text style={styles.invoiceTitle}>INVOICE</Text>
            <Text>Date: {formattedDate}</Text>
            <Text>Invoice ID#: {invoiceNo}</Text>
            <Text>Payment: {paymentMethod}</Text>
          </View>
        </View>

        {/* Bill To */}
        <View style={styles.section}>
          <Text style={styles.billToTitle}>Bill To:</Text>
          <Text style={styles.billToText}>{customer.name}</Text>
          <Text style={styles.billToText}>{customer.address}</Text>
          <Text style={styles.billToText}>{customer.apartment}</Text>
          <Text style={styles.billToText}>Phone: {customer.phone}</Text>
          <Text style={styles.billToText}>{customer.email}</Text>
        </View>

        {/* Table */}
        <View style={styles.table}>
          <View style={styles.tableHeader}>
            <Text style={styles.cell}>Product</Text>
            <Text style={styles.cell}>Quantity</Text>
            <Text style={[styles.cell, styles.rightCell]}>Price</Text>
            <Text style={[styles.cell, styles.rightCell]}>Total</Text>
          </View>

          {items.map((item, i) => {
            const price = parseFloat(item.price);
            const total = item.quantity * price;
            return (
              <View key={i} style={styles.tableRow}>
                <Text style={styles.cell}>{item.name}</Text>
                <Text style={styles.cell}>{item.quantity} kg </Text>
                <Text style={[styles.cell, styles.rightCell]}>
                  ৳{price.toFixed(2)}
                </Text>
                <Text style={[styles.cell, styles.rightCell]}>
                  ৳{total.toFixed(2)}
                </Text>
              </View>
            );
          })}
        </View>
        <View>
          <Text>delivery charge : 70 taka</Text>
        </View>

        {/* Summary */}
        <View style={styles.summaryRow}>
          <Text style={styles.summaryText}>Total Amount:</Text>
          <Text style={styles.totalText}>৳{parseFloat(totalAmount).toFixed(2)}</Text>
        </View>

        {/* Notes */}
        <View style={styles.notes}>
          <Text>Thanks for your order. We hope to serve you again soon.</Text>
        </View>
     <View style={{ alignItems: "center", marginTop: 30 }}>
  <Image src={QR} style={{ width: 100, height: 100 }} />
  <Text style={{ marginTop: 5, fontSize: 10 }}>
    আমাদের ওয়েবসাইট ভিজিট করুন: https://freshcutchikenclinetside.vercel.app
  </Text>
</View>
      </Page>
    </Document>
  );
};

export default InvoicePdf;
