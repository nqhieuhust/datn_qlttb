import React from "react";
import { useState } from "react";
import { Page, Text, View, Document } from "@react-pdf/renderer";

const TableDocument = ({reportData}) => {
 

  const createTableHeader = () => {
    return (
      <View style={tableRowStyle} fixed>
        <View style={[firstTableColHeaderStyle, col1]}>
          <Text style={tableCellHeaderStyle}>Mã thiết bị</Text>
        </View>

        <View style={[tableColHeaderStyle, col2]}>
          <Text style={tableCellHeaderStyle}>Tên thiết bị</Text>
        </View>

        <View style={[tableColHeaderStyle, col3]}>
          <Text style={tableCellHeaderStyle}>Người quản lý</Text>
        </View>

        <View style={[tableColHeaderStyle, col4]}>
          <Text style={tableCellHeaderStyle}>Trạng thái</Text>
        </View>

        {/* <View style={tableColHeaderStyle}>
          <Text style={tableCellHeaderStyle}>Column</Text>
        </View> */}
      </View>
    );
  };

  const createTableRow = (device) => {
    console.log(device);
    return (
      <View style={tableRowStyle}>
        <View style={[firstTableColStyle, row1]}>
          <Text style={tableCellStyle}>{device.code}</Text>
        </View>

        <View style={[tableColStyle, row2]}>
          <Text style={tableCellStyle}>{device.device_name}</Text>
        </View>

        <View style={[tableColStyle, row3]}>
          <Text style={tableCellStyle}>{device.manager_device}</Text>
        </View>

        <View style={[tableColStyle, row4]}>
          <Text style={tableCellStyle}>
          
            {(() => {
      switch (device.status) {
        case 1:
          return 'Đang hoạt động';
        case 2:
          return 'Đang báo hỏng';
        case 3:
          return 'Đang sửa chữa';
        case 4:
          return 'Đang bảo hành';
        default:
          return null;
      }
    })()}
          
         </Text>
        </View>
      </View>
    );
  };

  return (
    <Document>
      <Page style={pageStyle} size="A4" orientation="portrait">
        <View>
          <Text style={{fontFamily: 'Roboto Regular'}}>Bệnh viện:...</Text>
          <Text >Khoa/Phòng:......</Text>
        </View>
        <View>
          <Text  style={headingStyle}>Báo cáo thống kê thiết bị</Text>
        </View>
        <View style={tableStyle}>
          {createTableHeader()}
          {reportData.map((device, index) => createTableRow(device))}
        </View>
        <View style={footer}>
          <Text style={date}>Ngày......Tháng......Năm......</Text>
          <Text style={reporter}>Người lập phiếu</Text>
          <Text style={signature}>(Ký, ghi rõ họ tên)</Text>
        </View>
      </Page>
    </Document>
  );
};

const pageStyle = {
  paddingTop: 16,
  paddingHorizontal: 40,
  paddingBottom: 56,
};

const tableStyle = {
  display: "table",
  width: "auto",
  marginTop: 25,
  fontFamily: "Roboto Light"
};

const tableRowStyle = {
  flexDirection: "row",
};

const firstTableColHeaderStyle = {
  borderStyle: "solid",
  borderColor: "#000",
  borderBottomColor: "#000",
  borderWidth: 1,
  backgroundColor: "#bdbdbd",
};

const col1 = {
  width: "15%",
};
const col2 = {
  width: "40%",
};
const col3 = {
  width: "25%",
};
const col4 = {
  width: "20%",
};

const tableColHeaderStyle = {
  borderStyle: "solid",
  borderColor: "#000",
  borderBottomColor: "#000",
  borderWidth: 1,
  borderLeftWidth: 0,
  backgroundColor: "#bdbdbd",
};

const firstTableColStyle = {
  width: "15%",
  borderStyle: "solid",
  borderColor: "#000",
  borderWidth: 1,
  borderTopWidth: 0,
};

const row1 = {
    width: "15%",
  };
  const row2 = {
    width: "40%",
  };
  const row3 = {
    width: "25%",
  };
  const row4 = {
    width: "20%",
  };

const tableColStyle = {
  borderStyle: "solid",
  borderColor: "#000",
  borderWidth: 1,
  borderLeftWidth: 0,
  borderTopWidth: 0,
};

const tableCellHeaderStyle = {
  textAlign: "center",
  margin: 4,
  fontSize: 12,
  fontWeight: "bold",
  fontFamily: "Roboto Regular"
};

const tableCellStyle = {
  textAlign: "center",
  margin: 5,
  fontSize: 10,
};

const headingStyle = {
  textAlign: "center",
  margin: 5,
  marginTop: 20,
  textTransform: "uppercase",
  fontFamily: "Roboto Bold"
};

const footer = {
    textAlign: "right",
    marginTop: 10,
}

const date = {
    fontSize: "14px",
    fontFamily: "Roboto Light"
    // marginRight: 20,
}

const reporter = {
    marginRight: 20,
    fontWeight: 1000,
    fontWeight: "bold",
    fontSize: "16px",
    fontFamily: "Roboto Regular"
}

const signature = {
    marginRight: 30,
    fontSize: "12px",
    fontFamily: "Roboto Light Italic",
}

export default TableDocument;
