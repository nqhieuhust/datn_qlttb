import React from "react";
import { useState, useEffect } from "react";
import { PDFViewer, Font } from "@react-pdf/renderer";
import TableDocument from "./TableDocument";

// Import Fonts Style
import RobotoLight from "../../assets/fonts/Roboto-Light.ttf"
import RobotoLightItalic from "../../assets/fonts/Roboto-LightItalic.ttf"
import RobotoRegular from "../../assets/fonts/Roboto-Regular.ttf"
import RobotoBold from "../../assets/fonts/Roboto-Bold.ttf"

Font.register({ family: 'Roboto Light', src: RobotoLight });
Font.register({ family: 'Roboto Light Italic', src: RobotoLightItalic  });
Font.register({ family: 'Roboto Regular', src: RobotoRegular });
Font.register({ family: 'Roboto Bold', src: RobotoBold });

import deviceApi from "api/admin/deviceService";
import departmentApi from "api/admin/departmentService";

const viewerStyle = {
  display: "block",
  margin: "0 auto",
  width: "70vw",
  height: "90vh",
};

const ReportPage = () => {
  const [department, setDepartment] = useState("");
  const [reportData, setReportData] = useState([]);
  const [showReport, setShowReport] = useState(false);

  const [listDevice, setListDevice] = useState([]);
  const [listDepartment, setListDepartment] = useState([]);

  useEffect(() => {
    fetchDevices();
    fetchDepartment();
  }, []);

  const fetchDevices = async () => {
    try {
      const response = await deviceApi.getDevices();
      setListDevice(response.data.devices);
    } catch (error) {
      console.error("Lỗi khi lấy danh sách thiết bị:", error);
    }
  };

  const fetchDepartment = async () => {
    try {
      const response = await departmentApi.getDepartments();
      setListDepartment(response.data.departments)
      // setListDepartment(response.data.devices);
    } catch (error) {
      console.error("Lỗi khi lấy danh sách khoa phòng:", error);
    }
  };



  // Hàm xử lý sự kiện khi người dùng chọn khoa/phòng
  const handleDepartmentChange = (event) => {
    setDepartment(event.target.value);
  };

  // Hàm xử lý sự kiện khi người dùng nhấn nút Xuất báo cáo
  const handleReportExport = () => {
    
    // Gọi API hoặc xử lý dữ liệu để lấy danh sách thiết bị theo khoa/phòng
    // và gán dữ liệu vào reportData
    const fetchDevicesByDepartment = (department) => {
      // Giả lập việc lấy danh sách thiết bị từ API dựa trên khoa/phòng được chọn
      // Thay thế bằng logic kết nối và gọi API thực tế

      // Lọc danh sách thiết bị dựa trên khoa/phòng
      const devices = listDevice.filter(
        (device) => device.department.department_name === department
      );

      return devices;
    };

    // Ví dụ:
    const devicess = fetchDevicesByDepartment(department); // Hàm fetch thiết bị từ API

    // Gán dữ liệu vào reportData và hiển thị PDFViewer
    setReportData(devicess);
    setShowReport(true);
  };

  return (
    <>
      <div>
        <h2>Báo cáo thiết bị theo khoa/phòng</h2>
        <select value={department} onChange={handleDepartmentChange}>
          <option value="">Chọn Khoa/Phòng</option>
          {listDepartment.map((department, index) => (
            <option key={index} value={department.department_name}>
              {department.department_name}
            </option>
          ))}
        </select>
        <button onClick={handleReportExport}>Xuất báo cáo</button>
      </div>
      {showReport && (
        <PDFViewer style={viewerStyle}>
          {reportData.length > 0 ? (
            <TableDocument reportData={reportData} />
          ) : null}
        </PDFViewer>
      )}
    </>
  );
};

export default ReportPage;
