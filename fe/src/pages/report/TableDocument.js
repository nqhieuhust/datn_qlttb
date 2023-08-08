import React from "react";
import { useState } from "react";
import { Page, Text, View, Document } from "@react-pdf/renderer";

// Import css
import { styles } from "./style";

const role = Number(localStorage.getItem("role"));
console.log(localStorage);



const TableDocument = ({ reportData, department_name, status }) => {

const dv = reportData.map(device => device.department.department_name)

console.log(department_name);


  const createTableHeader = () => {
    return (
      <View style={styles.tableRowStyle} fixed>
        <View style={[styles.firstTableColHeaderStyle, styles.col1]}>
          <Text style={styles.tableCellHeaderStyle}>Mã thiết bị</Text>
        </View>

        <View style={[styles.tableColHeaderStyle, styles.col2]}>
          <Text style={styles.tableCellHeaderStyle}>Tên thiết bị</Text>
        </View>
        {((department_name === "all") || (status !== "default")) && (
          <View style={[styles.tableColHeaderStyle, styles.col5]}>
            <Text style={styles.tableCellHeaderStyle}>Khoa quản lý</Text>
          </View>
        )}
      

        <View style={[styles.tableColHeaderStyle, styles.col3]}>
          <Text style={styles.tableCellHeaderStyle}>Người quản lý</Text>
        </View>
        
        {(department_name || status) &&
        <View style={[styles.tableColHeaderStyle, styles.col4]}>
          <Text style={styles.tableCellHeaderStyle}>Trạng thái</Text>
        </View>
        }
      </View>
    );
  };

  const createTableRow = (device) => {
    // console.log(device);
    return (
      <View style={styles.tableRowStyle}>
        <View style={[styles.firstTableColStyle, styles.row1]}>
          <Text style={styles.tableCellStyle}>{device.code}</Text>
        </View>

        <View style={[styles.tableColStyle, styles.row2]}>
          <Text style={styles.tableCellStyle}>{device.device_name}</Text>
        </View>

        {((department_name === "all") || (status !== "default")) && (
          <View style={[styles.tableColStyle, styles.row5]}>
            <Text style={styles.tableCellStyle}>
              {device.department.department_name}
            </Text>
          </View>
        )}

        <View style={[styles.tableColStyle, styles.row3]}>
          <Text style={styles.tableCellStyle}>{device.user.full_name}</Text>
        </View>

        {(department_name || status) && 
        <View style={[styles.tableColStyle, styles.row4]}>
          <Text style={styles.tableCellStyle}>
            {(() => {
              switch (device.status) {
                case 1:
                  return "Đang sử dụng";
                case 2:
                  return "Đang báo hỏng";
                case 3:
                  return "Đang sửa chữa";
                case 4:
                  return "Đang bảo hành";
                default:
                  return "Đã thanh lý";
              }
            })()}
          </Text>
        </View>
        }
      </View>
    );
  };

  return (
    <Document>
      <Page style={styles.pageStyle} size="A4" orientation="portrait">
        <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
          <View>
            <Text style={{ fontFamily: "Roboto Regular" }}>
              Bệnh viện Bạch Mai
            </Text>

            <Text style={{ fontFamily: "Roboto Regular" }}>
            {(() => {
              switch (role) {     
                case 1:
                  if(department_name) {
                    if(department_name === "all") {
                      return "Phòng vật tư thiết bị"
                    } else {
                      return department_name
                    }
                  } else {
                    return "Phòng vật tư thiết bị"
                  }  
                    
                case 2:
                  if(department_name) {
                    if(department_name === "all") {
                      return "Phòng vật tư thiết bị"
                    } else {
                      return department_name
                    }
                  } else {
                    return "Phòng vật tư thiết bị"
                  }

                case 3:
                  if(department_name) {
                  
                      return department_name    
                  } else {
                    return dv[0]
                  }
             
                default:
                  return null;
              }
            })()}

            
              
            </Text>
          </View>
          <View style={{ flexDirection: "column", alignItems: "center" }}>
            <Text style={{ fontFamily: "Roboto Regular" }}>
              Cộng hòa xã hội chủ nghĩa Việt Nam
            </Text>
            <Text style={{ fontFamily: "Roboto Regular" }}>
              Độc lập - Tự do - Hạnh phúc
            </Text>
          </View>
        </View>
        <View>
          <Text style={styles.headingStyle}>
            {department_name
              ? "Báo cáo thống kê thiết bị theo khoa"
              : "Báo cáo thống kê thiết bị theo tình trạng"}
          </Text>
        </View>
        <View style={styles.tableStyle}>
          {createTableHeader()}
          {reportData.map((device, index) => createTableRow(device))}
        </View>
        <View style={styles.footer}>
          <Text style={styles.date}>Ngày......Tháng......Năm......</Text>
          <Text style={styles.reporter}>Người lập phiếu</Text>
          <Text style={styles.signature}>(Ký, ghi rõ họ tên)</Text>
        </View>
      </Page>
    </Document>
  );
};

export default TableDocument;
