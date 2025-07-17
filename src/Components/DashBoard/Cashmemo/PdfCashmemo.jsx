/* eslint-disable react/prop-types */
import {
  Document,
  Page,
  Text,
  View,
  StyleSheet,
  Font,
  Image
} from "@react-pdf/renderer";
import logo from '../../../assets/QR/logo-removebg-preview.png';
// Register Bangla Font
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
    fontSize: 10,
    backgroundColor: "#fff",
    color: "#000",
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 10,
    borderBottom: "1px solid #999",
    paddingBottom: 6,
  },
  title: {
    fontSize: 16,
    fontWeight: "bold",
    color: "red",
  },
  logo: { width: 32, height: 32, marginRight: 8 },
  companyName: {
    fontSize: 14,
    fontWeight: "bold",
    color: "#4a4a4a",
  },
  section: {
    marginVertical: 10,
  },
  infoText: {
    marginBottom: 2,
  },
  table: {
    border: "1px solid black",
    width: "100%",
  },
  row: {
    flexDirection: "row",
    borderBottom: "1px solid black",
  },
  cell: {
    borderRight: "1px solid black",
    padding: 4,
    textAlign: "center",
  },
  headerRow: {
    backgroundColor: "#e6ffea",
    fontWeight: "bold",
  },
  noBorderRight: {
    borderRight: "none",
  },
  totalRow: {
    flexDirection: "row",
    justifyContent: "flex-end",
    paddingVertical: 4,
    paddingRight: 10,
  },
  green: {
    color: "green",
  },
  red: {
    color: "red",
  },
  signRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 20,
  },
  disclaimer: {
    color: "red",
    marginTop: 10,
  },
});

const PdfCashmemo = ({ data }) => {
  if (!data) return null;

  const {
    name,
    address,
    phone,
    email,
    customDate,
    items,
    paidAmount = 0,
    total,
    due,
  } = data;

  return (
    <Document>
      <Page size="A4" style={styles.page}>
        {/* Header */}
        <View style={styles.header}>
          <View>
            <Image style={styles.logo} src={logo} />
            <Text>Mobile : 01726-104475</Text>
          </View>
          <View>
            <Text style={styles.title}>ফ্রেশ কাট চিকেন সার্ভিস</Text>
   <View
  style={{
    width: "100%",
    backgroundColor: "red",
    paddingTop: 4,
    paddingBottom: 4,
    alignItems: "center",
  }}
>
  <Text
    style={{
      fontWeight:'bold',
      fontSize: 16,
      color: "white",
    }}
  >
    বিল/চালান
  </Text>
</View>

          </View>
          <View>
            <Text>তারিখ: {customDate}</Text>
          </View>
        </View>

        {/* Customer Info */}
        <View style={styles.section}>
          <Text style={styles.infoText}>নাম: {name}</Text>
          <Text style={styles.infoText}>ঠিকানা: {address}</Text>
          <Text style={styles.infoText}>ফোন: {phone}</Text>
          {email && <Text style={styles.infoText}>{email}</Text>}
        </View>

        {/* Table */}
        <View style={styles.table}>
          {/* Table Header */}
          <View style={[styles.row, styles.headerRow]}>
            <Text style={[styles.cell, { width: "8%" }]}>নং</Text>
            <Text style={[styles.cell, { width: "32%" }]}>বিবরণ</Text>
            <Text style={[styles.cell, { width: "15%" }]}>পিচ</Text>
            <Text style={[styles.cell, { width: "15%" }]}>কেজি</Text>
            <Text style={[styles.cell, { width: "15%" }]}>দর</Text>
            <Text style={[styles.cell, { width: "15%" }, styles.noBorderRight]}>
              টাকা
            </Text>
          </View>

          {/* Table Rows */}
          {items.map((item, i) => (
            <View style={styles.row} key={i}>
              <Text style={[styles.cell, { width: "8%" }]}>{i + 1}</Text>
              <Text style={[styles.cell, { width: "32%", textAlign: "left" }]}>
                {item.name}
              </Text>
              <Text style={[styles.cell, { width: "15%" }]}>
                {item.piece || "-"}
              </Text>
              <Text style={[styles.cell, { width: "15%" }]}>
                {item.quantity}
              </Text>
              <Text style={[styles.cell, { width: "15%" }]}>
                ৳{item.price.toFixed(2)}
              </Text>
              <Text
                style={[
                  styles.cell,
                  { width: "15%" },
                  styles.noBorderRight,
                ]}
              >
                ৳{(item.quantity * item.price).toFixed(2)}
              </Text>
            </View>
          ))}

          {/* Total Rows */}
          <View style={styles.row}>
            <Text style={[styles.cell, { width: "85%", textAlign: "right" }]}>
              মোট
            </Text>
            <Text style={[styles.cell, { width: "15%" }, styles.noBorderRight]}>
              ৳{total.toFixed(2)}
            </Text>
          </View>
          <View style={styles.row}>
            <Text
              style={[
                styles.cell,
                { width: "85%", textAlign: "right", color: "green" },
              ]}
            >
              জমা
            </Text>
            <Text
              style={[
                styles.cell,
                { width: "15%", color: "green" },
                styles.noBorderRight,
              ]}
            >
              ৳{paidAmount.toFixed(2)}
            </Text>
          </View>
          <View style={styles.row}>
            <Text
              style={[
                styles.cell,
                { width: "85%", textAlign: "right", color: "red" },
              ]}
            >
              বাকি
            </Text>
            <Text
              style={[
                styles.cell,
                { width: "15%", color: "red" },
                styles.noBorderRight,
              ]}
            >
              ৳{due.toFixed(2)}
            </Text>
          </View>
        </View>

        {/* Notes */}
        <Text style={styles.disclaimer}>বিক্রিত মাল ফেরত নেওয়া হয় না।</Text>

        {/* Signatures */}
        <View style={styles.signRow}>
          <Text>ক্রেতার স্বাক্ষর: _____________________</Text>
          <Text>বিক্রেতার স্বাক্ষর: _____________________</Text>
        </View>
      </Page>
    </Document>
  );
};

export default PdfCashmemo;
