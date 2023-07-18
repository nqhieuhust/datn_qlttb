import { StyleSheet } from "@react-pdf/renderer";

export const styles = StyleSheet.create({
  pageStyle: {
    paddingTop: 16,
    paddingHorizontal: 40,
    paddingBottom: 56,
  },

  tableStyle: {
    display: "table",
    width: "auto",
    marginTop: 25,
    fontFamily: "Roboto Light",
  },

  tableRowStyle: {
    flexDirection: "row",
  },

  firstTableColHeaderStyle: {
    borderStyle: "solid",
    borderColor: "#000",
    borderBottomColor: "#000",
    borderWidth: 1,
    backgroundColor: "#bdbdbd",
  },

  col1: {
    width: "15%",
  },
  col2: {
    width: "40%",
  },
  col3: {
    width: "25%",
  },
  col4: {
    width: "20%",
  },
  col5: {
    width: "20%",
  },


  tableColHeaderStyle: {
    borderStyle: "solid",
    borderColor: "#000",
    borderBottomColor: "#000",
    borderWidth: 1,
    borderLeftWidth: 0,
    backgroundColor: "#bdbdbd",
  },

  firstTableColStyle: {
    width: "15%",
    borderStyle: "solid",
    borderColor: "#000",
    borderWidth: 1,
    borderTopWidth: 0,
  },

  row1: {
    width: "15%",
  },
  row2: {
    width: "40%",
  },
  row3: {
    width: "25%",
  },
  row4: {
    width: "20%",
  },
  row5: {
    width: "20%",
  },

  tableColStyle: {
    borderStyle: "solid",
    borderColor: "#000",
    borderWidth: 1,
    borderLeftWidth: 0,
    borderTopWidth: 0,
  },

  tableCellHeaderStyle: {
    textAlign: "center",
    margin: 4,
    fontSize: 12,
    fontWeight: "bold",
    fontFamily: "Roboto Regular",
  },

  tableCellStyle: {
    textAlign: "center",
    margin: 5,
    fontSize: 10,
  },

  headingStyle: {
    textAlign: "center",
    margin: 5,
    marginTop: 20,
    textTransform: "uppercase",
    fontFamily: "Roboto Bold",
  },

  footer: {
    textAlign: "right",
    marginTop: 10,
  },

  date: {
    fontSize: "14px",
    fontFamily: "Roboto Light",
    // marginRight: 20,
  },

  reporter: {
    marginRight: 20,
    fontWeight: 1000,
    fontWeight: "bold",
    fontSize: "16px",
    fontFamily: "Roboto Regular",
  },

  signature: {
    marginRight: 30,
    fontSize: "12px",
    fontFamily: "Roboto Light Italic",
  },
});
