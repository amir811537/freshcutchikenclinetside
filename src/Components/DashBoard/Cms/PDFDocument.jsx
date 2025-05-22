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
import logo from "../../../assets/logo-removebg-preview.png";

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

const isBangla = (text = "") => /[\u0980-\u09FF]/.test(text);

const PDFDocument = ({ data }) => {
  return (
    <Document>
      <Page size="A4" style={styles.page}>
        <View style={styles.headerContainer}>
          <Image style={styles.logo} src={logo} />
          <Text style={styles.title}>Fresh Cut Chicken Service</Text>
        </View>

        <View style={[styles.tableRow, styles.tableHeader]}>
          <Text style={styles.tableCell}>Date</Text>
          <Text style={styles.tableCell}>Name</Text>
          <Text style={styles.tableCell}>Phone</Text>
          <Text style={styles.tableCell}>Sale</Text>
        </View>

        {data.map((item, index) => (
          <View key={index} style={styles.tableRow}>
            <Text style={styles.tableCell}>{item.date || "—"}</Text>
            <Text style={isBangla(item.name) ? styles.tableCellBangla : styles.tableCell}>
              {item.name || "—"}
            </Text>
            <Text style={styles.tableCell}>{item.phone || "—"}</Text>
            <Text style={styles.tableCell}>{item.sale || "—"}</Text>
          </View>
        ))}

        <View style={styles.footer}>
          <Text>
            মোট বিক্রি: {data.reduce((acc, cur) => acc + parseFloat(cur.sale || 0), 0)} টাকা
          </Text>
        </View>
      </Page>
    </Document>
  );
};

export default PDFDocument;
