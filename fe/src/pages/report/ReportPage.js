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
  const [status, setStatus] = useState("")
  const [reportData, setReportData] = useState([]);
  const [showReport, setShowReport] = useState(false);

  const [listDevice, setListDevice] = useState([]);
  const [listDepartment, setListDepartment] = useState([]);

  useEffect(() => {
    fetchDevices();
    fetchDepartment();
  }, []);

  // Lấy danh sách thiết bị
  const fetchDevices = async () => {
    try {
      const response = await deviceApi.getDevices();
      setListDevice(response.data.devices);
    } catch (error) {
      console.error("Lỗi khi lấy danh sách thiết bị:", error);
    }
  };

  // Lấy danh sách khoa phòng
  const fetchDepartment = async () => {
    try {
      const response = await departmentApi.getDepartments();
      setListDepartment(response.data.departments)
      // setListDepartment(response.data.devices);
    } catch (error) {
      console.error("Lỗi khi lấy danh sách khoa phòng:", error);
    }
  };

  // Trạng thái thiết bị
  const statusConfig = [
    { value: 1, label: "Đang sử dụng" },
    { value: 2, label: "Đang báo hỏng" },
    { value: 3, label: "Đang sửa chữa" },
    { value: 4, label: "Đang bảo hành" },
    { value: 5, label: "Đã thanh lí" },
  ];

  

  // Hàm xử lý sự kiện khi người dùng chọn khoa/phòng
  const handleDepartmentChange = (event) => {
    setDepartment(event.target.value);
    setShowReport(false)
    setStatus(null)
  };


// Hàm xử lý sự kiện khi chọn trạng thái
  const handleStatusChange = (event) => {
    setStatus(event.target.value)
    setShowReport(false)
    setDepartment(null)
  }

  // Lấy DS tấ cả thiết bị
  const fetchDevicesAll = () => listDevice

  const fetchDevicesByDepartment = (department) => {
    // Lọc danh sách thiết bị dựa trên khoa/phòng
    const devices = listDevice.filter(
      (device) => device.department.department_name === department
    );
    return devices;
  };

  // Lọc danh sách thiết bị theo trạng thái
  const fetchDevicesByStatus = (status) => {
    const devices = listDevice.filter(
      (device) =>  device.status == status
    );
   
    return devices;
  }

  // Hàm xử lý sự kiện khi người dùng nhấn nút Xuất báo cáo
  const handleReportExport = () => {
     let deviceAll = []
    if(department) {
      if(department === "all") {
        deviceAll = fetchDevicesAll()
      } else {
        // Gọi API hoặc xử lý dữ liệu để lấy danh sách thiết bị theo khoa/phòng
        // và gán dữ liệu vào reportData
       deviceAll = fetchDevicesByDepartment(department)
      }
    setStatus("default")

    }

    if(status) {
      deviceAll = fetchDevicesByStatus(status)
    }


    // const deviceAll = (department === "all") ? fetchDevicesAll() : fetchDevicesByDepartment(department); // Hàm fetch thiết bị từ API

    // Gán dữ liệu vào reportData và hiển thị PDFViewer
    setReportData(deviceAll);
    setShowReport(true);
  };

  return (
    <>
      <div>
        <h2>Báo cáo thiết bị</h2>
        <select value={department} onChange={handleDepartmentChange}>
          <option value="default">Chọn khoa</option>
          <option value="all">Tất cả các khoa</option>
          {listDepartment.map((department, index) => (
            <option key={index} value={department.department_name}>
              {department.department_name}
            </option>
          ))}
        </select>

        <select value={status} onChange={handleStatusChange}>
          <option value = "default">Chọn trạng thái</option>
          {statusConfig.map((status, index) => (
            <option key={index} value={status.value}>
              {status.label}
            </option>
          ))}
        </select>
        <button onClick={handleReportExport}>Xuất báo cáo</button>
      </div>
      {showReport && (
        <PDFViewer style={viewerStyle}>
          {reportData.length > 0 ? (
            <TableDocument reportData={reportData} department_name={department} status={status} />
          ) : null}
        </PDFViewer>
      )}
    </>
  );
};

export default ReportPage;
