import axios from "axios";
import React, { useEffect, useState } from "react";
import { Modal, Form } from "react-bootstrap";
import { MDBSpinner } from "mdb-react-ui-kit";
import { Card, Table, Container } from "react-bootstrap";
import providerApi from "api/admin/providerService";
import departmentApi from "api/admin/departmentService";
import deviceApi from "api/admin/deviceService";
import uploadApi from "api/upload/uploadService";
import userApi from "api/admin/userService";
import { useDispatch } from "react-redux";
import { toggleShowLoading } from "redux/actions/common-action";
import {
  Pagination,
  Select,
  Checkbox,
  message,
  Typography,
  Row,
  Col,
} from "antd";
import { timeDelay } from "api/common";
import { FilterDevice } from "./filter";
import defaultImg from "../../assets/img/image_faildoad.png";
import moment from "moment";
function DevicePage() {
  const [loading, setLoading] = useState(false);
  const [loadingForm, setLoadingForm] = useState(false);
  const [loadingButton, setLoadingButton] = useState(false);
  const [isShowDetail, setIsShowDetail] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [paging, setPaging] = useState({ page: 1, page_size: 20, total: 0 });

  const [isClickDetail, setIsClickDetail] = useState(false);

  const [devices, setDevices] = useState([]);

  const [device_name, setDeviceName] = useState();
  const [code, setCode] = useState();
  const [model, setModel] = useState();
  // const [serial, setSerial] = useState();
  const [status, setStatus] = useState();
  const [countries, setCountries] = useState();
  const [type, setType] = useState();
  const [manager_device, setManagerDevice] = useState();
  const [avatar, setAvatar] = useState();
  const [provider_id, setProviderId] = useState();
  const [department_id, setDepartmentId] = useState();
  const [user_id, setUserId] = useState();

  const [providerConfig, setProviderConfig] = useState([]);
  const [departmentConfig, setDepartmentConfig] = useState([]);
  const [userConfig, setUserConfig] = useState([]);

  // Xử lý dữ liệu về couuntry
  const [countryOptions, setCountryOptions] = useState([]);

  // const onChange = (value: string) => {
  //   console.log(`selected ${value}`);
  // };

  // const onSearch = (value: string) => {
  //   console.log('search:', value);
  // };

  useEffect(() => {
    // Gọi API để lấy danh sách quốc gia
    axios.get("https://restcountries.com/v3.1/all").then((response) => {
      const data = response.data;
      // console.log(data[1]);
      // Xử lý dữ liệu API và lưu trữ vào state
      const options = data.map((country) => ({
        value: country.area,
        label: country.name.common,
      }));
      // console.log(options);
      setCountryOptions(options);
    });
  }, []);

  const [idDel, setIdDel] = useState();
  const [idEdit, setIdEdit] = useState();
  const [idBroken, setIdBroken] = useState();

  const [showModal, setShowModal] = useState(false);
  const [showCre, setShowCre] = useState(false);
  const [showEdit, setShowEdit] = useState(false);
  const [showBroken, setShowBroken] = useState(false);

  const [isChangeFile, setIsChangeFile] = useState(false);
  const [file, setFile] = useState(null);
  const [params, setParams] = useState({
    id: null,
    device_name: null,
    code: null,
    status: null,
    type: null,
    provider_id: null,
    department_id: null,
    manufacture: null,
  });

  const dispatch = useDispatch();

  const clearDeviceEdit = () => {
    setDeviceName(null);
    setCode(null);
    setModel(null);
    // setSerial(null);
    setStatus(null);
    setCountries(null);
    setAvatar(null);
    setProviderId(null);
    setDepartmentId(null);
  };

  const handleClose = () => {
    setShowCre(false);
    // setShowBroken(false);
    setErrors({});
    setForm({});
    setLoadingButton(false);
  };

  const handleEditOn = (id) => {
    getDeviceById(id);
    setShowEdit(true);
    setForm({});
    setErrors({});
  };

  const handleEditOff = () => {
    setShowEdit(false);
    setErrors({});
    setForm({});
    setLoadingButton(false);
    clearDeviceEdit();
    setIsShowDetail(false);
  };

  const handleBrokenOn = (id) => {
    getDeviceById(id);
    setShowBroken(true);
    setForm({});
    setErrors({});
  };

  const handleBrokenOff = () => {
    setShowBroken(false);
    setErrors({});
    setForm({});
    setLoadingButton(false);
    // clearDeviceBroken();
  };

  const [form, setForm] = useState({});
  const [errors, setErrors] = useState({});

  const role = Number(localStorage.getItem("role"));
  // console.log(localStorage);

  useEffect(() => {
    getUserList({ page: 1, page_size: 200 });
    getProviderList({ page: 1, page_size: 200 });

    getDepartmentList({ page: 1, page_size: 200 });
  }, []);

  useEffect(() => {
    paging.page = currentPage;
    getDeviceList({ ...paging });
  }, [currentPage]);

  const getDeviceList = async (filters) => {
    try {
      setLoading(true);
      dispatch(toggleShowLoading(true));
      const response = await deviceApi.getDevices(filters);
      console.log(response);
      await timeDelay(1000);
      if (response.status === "success") {
        setDevices(response.data.devices);
        setPaging({ ...response.data.meta });
        setLoading(false);
      } else {
        message.error(response.message);
      }
      dispatch(toggleShowLoading(false));
    } catch (e) {
      setLoading(false);
      message.error(e.message);
      dispatch(toggleShowLoading(false));
    }
  };

  //   const [file1, setFile1] = useState(null);

  //   const handleUploadd = (e) => {
  //     const selectedFile = e.target.files[0];
  //     setFile1(selectedFile);
  //   };

  //   const handleDownload = () => {
  //     if (file1) {
  //       const url = URL.createObjectURL(file1);
  //       const a = document.createElement("a");
  //       a.href = url;
  //       a.download = file1.name;
  //       a.click();
  //       URL.revokeObjectURL(url);
  //     }
  //   };

  const getProviderList = async (filters) => {
    try {
      const response = await providerApi.getProviders(filters);
      if (response.status === "success") {
        let providers = response.data.providers.reduce((newData, item) => {
          newData.push({
            value: item.id,
            label: item.provider_name,
          });
          return newData;
        }, []);
        setProviderConfig(providers);
      }
    } catch (e) {}
  };

  const getDepartmentList = async (filters) => {
    try {
      const response = await departmentApi.getDepartments(filters);
      if (response.status === "success") {
        let departments = response.data.departments.reduce((newData, item) => {
          newData.push({
            value: item.id,
            label: item.department_name,
          });
          return newData;
        }, []);
        setDepartmentConfig(departments);
      }
    } catch (e) {
      console.log(e);
    }
  };

  const getUserList = async (filters) => {
    try {
      const response = await userApi.getUsers();
      console.log(response);
      if (response.status === "success" && response.data.users) {
        let user = response.data.users.reduce((newData, item) => {
          newData.push({
            value: item.id,
            label: item.full_name,
          });
          return newData;
        }, []);
        setUserConfig(user);
      }
    } catch (e) {
      console.log(e);
    }
  };

  const getDeviceById = async (id) => {
    try {
      setLoadingForm(true);
      dispatch(toggleShowLoading(true));
      const response = await deviceApi.getDeviceById(id);
      await timeDelay(1000);
      if (response.status === "success") {
        setIsChangeFile(false);
        setIdEdit(response.data.id);
        setDeviceName(response.data.device_name);
        setCode(response.data.code);
        setModel(response.data.model);
        // setSerial(response.data.serial);
        setManagerDevice(response.data.manager_device);
        setStatus(response.data.status);
        setCountries(response.data.countries);
        setType(response.data.type);
        setAvatar(response.data.avatar);
        setProviderId(response.data.provider_id);
        setDepartmentId(response.data.department_id);
        setUserId(response.data.user_id);
        setForm({
          device_name: response.data.device_name,
          code: response.data.code,
          model: response.data.model,
          serial: response.data.serial,
          status: response.data.status,
          countries: response.data.countries,
          avatar: response.data.avatar,
          user_id: response.data.user_id,
          provider_id: response.data.provider_id,
          department_id: response.data.department_id,
          manufacture: response.data.manufacture,
          device_group: response.data.device_group,
          device_type: response.data.device_type,
          type: response.data.type,
          accessory: response.data.accessory,
          manager_device: response.data.manager_device,
          import_date: moment(response.data.import_date).format("yyyy-MM-DD"),
          handover_date: moment(response.data.handover_date).format(
            "yyyy-MM-DD"
          ),
          expire_date: moment(response.data.expire_date).format("yyyy-MM-DD"),
        });
        setLoadingForm(false);
      } else {
        message.error(response.message);
      }
      dispatch(toggleShowLoading(false));
    } catch (e) {
      console.log(e);
      setLoadingForm(false);
      dispatch(toggleShowLoading(false));
      message.error(e.message);
    }
  };

  const handleSubmit = async () => {
    try {
      setLoadingButton(true);
      const newErrors = findFormErrors(1);
      if (Object.keys(newErrors).length > 0) {
        setErrors(newErrors);
        setLoadingButton(false);
      } else {
        dispatch(toggleShowLoading(true));

        const responseFile = await uploadApi.uploadFile(file);
        if (responseFile.data.status == "success") {
          form.avatar = responseFile.data.data.destination;
        } else {
          setErrors({ avatar: "Tải ảnh lên bị lỗi!" });
          setLoadingButton(false);
          dispatch(toggleShowLoading(false));
          return;
        }
        if (form.status) form.status = parseInt(form.status);
        if (form.type) form.type = parseInt(form.type);
        if (form.provider_id) form.provider_id = parseInt(form.provider_id);
        if (form.user_id) form.user_id = parseInt(form.user_id);
        if (form.department_id)
          form.department_id = parseInt(form.department_id);
        // form.user_id = 1;
        const response = await deviceApi.createDevice(form);
        await timeDelay(1000);
        if (response.status === 201 || response.status === "success") {
          getDeviceList({ page: 1 });
          handleClose();
          message.success("Thêm mới thành công!");
        } else if (response.status === "fail" && response.data) {
          let error = Object.entries(response.data) || [];
          if (error.length > 0) {
            let messageError = error.reduce((newMessage, item) => {
              newMessage[`${item[0]}`] = item[1][0];
              return newMessage;
            }, {});
            setErrors(messageError);
          }
          dispatch(toggleShowLoading(false));
        } else {
          message.error(response.message);
        }
        dispatch(toggleShowLoading(false));
      }
    } catch (e) {
      console.log(e);
      dispatch(toggleShowLoading(false));
      setLoadingButton(false);
      message.error(e.message);
    }
  };

  const handleUpdate = async (id) => {
    try {
      setLoadingButton(true);
      const newErrors = findFormErrors(2);
      if (Object.keys(newErrors).length > 0) {
        setErrors(newErrors);
        setLoadingButton(false);
      } else {
        dispatch(toggleShowLoading(true));
        if (isChangeFile) {
          const responseFile = await uploadApi.uploadFile(file);
          if (responseFile.data.status == "success") {
            form.avatar = responseFile.data.data.destination;
            setErrors({});
          } else {
            setLoadingButton(false);
            setErrors({ avatar: "Tải ảnh lên bị lỗi!" });
            dispatch(toggleShowLoading(false));
            return;
          }
        }
        if (form.status) form.status = parseInt(form.status);
        if (form.type) form.type = parseInt(form.type);
        if (form.provider_id) form.provider_id = parseInt(form.provider_id);
        if (form.user_id) form.user_id = parseInt(form.user_id);
        if (form.department_id)
          form.department_id = parseInt(form.department_id);
        // form.user_id = 1;
        const response = await deviceApi.updateDevice(id, form);
        await timeDelay(1000);
        await timeDelay(1000);
        if (response.status === "success") {
          getDeviceList({ page: 1 });
          handleEditOff();
          message.success("Cập nhật thành công!");
          setLoadingButton(false);
        } else if (response.status === "fail" && response.data) {
          let error = Object.entries(response.data) || [];
          if (error.length > 0) {
            let messageError = error.reduce((newMessage, item) => {
              newMessage[`${item[0]}`] = item[1][0];
              return newMessage;
            }, {});
            setErrors(messageError);
          }
          dispatch(toggleShowLoading(false));
          setLoadingButton(false);
        } else {
          message.error(response.message);
          setLoadingButton(false);
        }
        dispatch(toggleShowLoading(false));
      }
    } catch (e) {
      console.log(e);
      message.error(e.message);
      setLoadingButton(false);
      dispatch(toggleShowLoading(false));
    }
  };

  const handleDelete = async (id) => {
    try {
      dispatch(toggleShowLoading(true));
      const response = await deviceApi.deleteDevice(id);
      if (response.status === "success") {
        getDeviceList({ page: 1 });
        setShowModal(false);
        setIdDel(null);
        message.success("Xóa thành công!");
      } else {
        message.error(response.message);
      }
      dispatch(toggleShowLoading(false));
    } catch (e) {
      message.error(e.message);
      console.log(e);
      dispatch(toggleShowLoading(false));
    }
  };

  const handleBroken = async (id) => {
    try {
      setLoadingButton(true);
      const newErrors = findFormErrors(2);
      if (Object.keys(newErrors).length > 0) {
        setErrors(newErrors);
        setLoadingButton(false);
      } else {
        dispatch(toggleShowLoading(true));

        // if (form.status) form.status = parseInt(form.status);
        if (form.provider_id) form.provider_id = parseInt(form.provider_id);
        if (form.user_id) form.user_id = parseInt(form.user_id);
        if (form.department_id)
          form.department_id = parseInt(form.department_id);
        // form.user_id = 1;
        const response = await deviceApi.updateDevice(id, form);
        await timeDelay(1000);
        await timeDelay(1000);
        if (response.status === "success") {
          getDeviceList({ page: 1 });
          handleBrokenOff();
          message.success("Báo hỏng thành công!");
          setLoadingButton(false);
        } else if (response.status === "fail" && response.data) {
          let error = Object.entries(response.data) || [];
          if (error.length > 0) {
            let messageError = error.reduce((newMessage, item) => {
              newMessage[`${item[0]}`] = item[1][0];
              return newMessage;
            }, {});
            setErrors(messageError);
          }
          dispatch(toggleShowLoading(false));
          setLoadingButton(false);
        } else {
          message.error(response.message);
          setLoadingButton(false);
        }
        dispatch(toggleShowLoading(false));
      }
    } catch (e) {
      console.log(e);
      message.error(e.message);
      setLoadingButton(false);
      dispatch(toggleShowLoading(false));
    }
  };

  const setField = (field, value) => {
    setForm({
      ...form,
      [field]: value,
    });

    if (!!errors[field]) {
      setErrors({
        ...errors,
        [field]: null,
      });
    }
  };

  const findFormErrors = (type) => {
    const newErrors = {};
    if (type == 1) {
      if (!form.device_name || form.device_name === "")
        newErrors.device_name = "Tên thiết bị không được để trống!";
      if (!form.code || form.code === "")
        newErrors.code = "Mã thiết bị không được để trống!";
      if (!form.model || form.model === "")
        newErrors.model = "Số model thiết bị không được để trống!";
      // if (!form.serial || form.serial === "")
      //   newErrors.serial = "Số serial thiết bị không được để trống!";
      // if (!form.manager_device || form.manager_device === "")
      //   newErrors.manager_device = "Người quản lý thiết bị không được để trống!";
      if (!form.user_id || form.user_id === "")
        newErrors.user_id = "Người quản lý thiết bị không được để trống!";
      // if ( !form.manufacture || form.manufacture === '' ) newErrors.manufacture = 'Manufacture cannot be blank!';
      // if (!form.avatar || form.avatar === '') newErrors.avatar = 'Avatar cannot be blank!';
      if (!form.status || form.status === "")
        newErrors.status = "Trạng thái không được để trống!";
      if (!form.type || form.type === "")
        newErrors.type = "Loại thiết bị không được để trống!";
      if (!form.provider_id || form.provider_id === "")
        newErrors.provider_id = "Nhà cung cấp không được để trống!";
      if (!form.department_id || form.department_id === "")
        newErrors.department_id = "Khoa/Phòng không được để trống!";
    }
    if (type == 2) {
      if (!device_name || device_name === "")
        newErrors.device_name = "Tên thiết bị không được để trống!";
      if (!code || code === "")
        newErrors.code = "Mã thiết bị không được để trống!";
      if (!model || model === "")
        newErrors.model = "Số model thiết bị không được để trống!";
      // if (!serial || serial === "")
      //   newErrors.serial = "Số serial thiết bị không được để trống!";
      // if (!manager_device || manager_device === "")
      //   newErrors.manager_device = "Người quản lý không được để trống!";
      // if (!avatar || avatar === '') newErrors.avatar = 'Avatar cannot be blank!';
      // if ( !status || status === '' ) newErrors.status = 'Status cannot be blank!';
      // if ( !provider_id || provider_id === '' ) newErrors.provider_id = 'Provider cannot be blank!';
      // if ( !department_id || department_id === '' ) newErrors.department_id = 'Department cannot be blank!';
    }

    return newErrors;
  };

  const statusConfig = [
    { value: 1, label: "Đang sử dụng" },
    { value: 2, label: "Đang báo hỏng" },
    { value: 3, label: "Đang sửa chữa" },
    { value: 4, label: "Đang bảo hành" },
  ];

  const typeConfig = [
    { value: 1, label: "Loại A" },
    { value: 2, label: "Loại B" },
    { value: 3, label: "Loại C" },
    { value: 4, label: "Loại D" },
  ];

  const optionsBroken = [
    { value: 1, label: "Hỏng dây nguồn" },
    { value: 2, label: "Màn hình không hiển thị" },
    { value: 4, label: "Màn hình không hiển thị" },
    { value: 3, label: "Hỏng bóng đèn" },
  ];

  const handleUpload = async (e) => {
    if (e && e.target.files[0] && !isShowDetail) {
      setFile(e.target.files[0]);
      setIsChangeFile(true);
    }
  };

  const genStatusClass = (status) => {
    if (status) {
      let nameStatus = statusConfig.find((item) => item.value === status);
      switch (status) {
        case 1:
          return (
            <span className="text-success">{nameStatus?.label || "N/A"}</span>
          );
        case 2:
          return (
            <span className="text-danger">{nameStatus?.label || "N/A"}</span>
          );
        case 3:
          return (
            <span className="text-warning">{nameStatus?.label || "N/A"}</span>
          );
        default:
          return (
            <span className="text-primary"> {nameStatus?.label || "N/A"} </span>
          );
      }
    }
  };

  const errorImg = (e) => {
    e.currentTarget.src = defaultImg;
  };

  return (
    <>
      <Container fluid>
        <Row>
          <Col md="12">
            <Card className="strpied-tabled-with-hover">
              <Card.Header>
                <Card.Title
                  className={"d-flex justify-content-between"}
                  as="h4"
                >
                  Danh sách thiết bị
                  {role !== 3 && (
                    <button
                      onClick={() => setShowCre(true)}
                      type="button"
                      className="btn btn-info"
                      style={{ padding: "6px 14px", fontSize: 14 }}
                    >
                      <span>Thêm mới</span>
                    </button>
                  )}
                </Card.Title>
                <div className="my-4">
                  <FilterDevice
                    paging={paging}
                    setPaging={setPaging}
                    getDeviceList={getDeviceList}
                    setParams={setParams}
                    providerConfig={providerConfig}
                    departmentConfig={departmentConfig}
                    role={role}
                  />
                </div>
              </Card.Header>
              <Card.Body className="table-wrapper-scroll-y my-custom-scrollbar">
                <Table className="table table-hover table-striped">
                  <thead>
                    <tr>
                      <th className="border-0 text-nowrap">STT</th>
                      <th className="border-0 text-nowrap text-center">
                        Ảnh mô tả
                      </th>
                      <th className="border-0 text-nowrap">Mã thiết bị</th>
                      <th className="border-0 text-nowrap">Tên thiết bị</th>
                      <th className="border-0 text-nowrap">Model</th>
                      <th className="border-0 text-nowrap">Serial</th>
                      <th className="border-0 text-nowrap">Hãng sản xuất</th>
                      <th className="border-0 text-nowrap">Khoa/Phòng</th>
                      <th className="border-0 text-nowrap">Nhà cung cấp</th>
                      <th className="border-0 text-nowrap">Trạng thái</th>

                      <th className="border-0">Hành động</th>
                    </tr>
                  </thead>
                  <tbody>
                    {devices.length > 0 ? (
                      devices.map((item, index) => (
                        <tr key={index}>
                          <td>
                            {(paging.page - 1) * paging.page_size + (index + 1)}
                          </td>
                          <td className="text-nowrap" style={{ minWidth: 150 }}>
                            <img
                              src={item.avatar}
                              alt="avatar"
                              style={{
                                border: "0.5px solid",
                                borderRadius: "5px",
                              }}
                              height="70"
                              width="70"
                              onError={errorImg}
                            />
                          </td>
                          <td className="text-break" style={{ minWidth: 150 }}>
                            {item.code || "N/A"}
                          </td>

                          <td className="text-break" style={{ minWidth: 250 }}>
                            <a
                              href="javascript:void(0)"
                              className="device-name"
                              onClick={() => {
                                setIsClickDetail(true);
                                handleEditOn(item.id);
                                setIsShowDetail(true);
                              }}
                            >
                              {item.device_name || "N/A"}
                            </a>
                          </td>
                          <td className="text-break" style={{ minWidth: 150 }}>
                            {item.model || "N/A"}
                          </td>
                          <td className="text-break" style={{ minWidth: 180 }}>
                            {item.serial || "N/A"}
                          </td>
                          <td className="text-break" style={{ minWidth: 150 }}>
                            {item.manufacture || "N/A"}
                          </td>
                          <td className="text-break" style={{ minWidth: 250 }}>
                            {item.department?.department_name || "N/A"}
                          </td>
                          <td className="text-break" style={{ minWidth: 250 }}>
                            {item.provider?.provider_name || "N/A"}
                          </td>
                          <td
                            className=" text-nowrap"
                            style={{ minWidth: 100 }}
                          >
                            {genStatusClass(item.status)}
                          </td>
                          <td className="tex-nowrap" style={{ minWidth: 100 }}>
                            <div className="d-flex justify-between align-items-center">
                              {role !== 3 ? (
                                <>
                                  <button
                                    className={
                                      "btn btn-sm btn-info text-nowrap"
                                    }
                                    style={{ padding: "3px 8px", width: 65 }}
                                    onClick={() => {
                                      setIsClickDetail(false);
                                      handleEditOn(item.id);
                                    }}
                                  >
                                    Sửa
                                  </button>
                                  <button
                                    className={
                                      "btn btn-sm btn-danger ml-2 text-nowrap"
                                    }
                                    style={{ padding: "3px 8px", width: 65 }}
                                    onClick={() => {
                                      setShowModal(true);
                                      setIdDel(item.id);
                                    }}
                                  >
                                    Xóa
                                  </button>
                                </>
                              ) : (
                                <button
                                  className={
                                    "btn btn-sm btn-danger text-nowrap"
                                  }
                                  style={{
                                    padding: "6px 8px",
                                    fontSize: 14,
                                    minWidth: 80,
                                  }}
                                  // onClick={() => setShowBroken(true)}
                                  onClick={() => {
                                    handleBrokenOn(item.id);
                                  }}
                                >
                                  Báo hỏng
                                </button>
                              )}
                            </div>
                          </td>
                        </tr>
                      ))
                    ) : (
                      <>
                        <tr>
                          <td
                            colSpan={9}
                            style={{
                              textAlign: "center",
                              backgroundColor: "#ffff",
                            }}
                          >
                            <img
                              alt="empty"
                              src={require("../../assets/img/logo-empty.png")}
                            />
                            <div style={{ color: "#9A9A9A" }}>Data empty</div>
                          </td>
                        </tr>
                      </>
                    )}
                  </tbody>
                </Table>
              </Card.Body>
              {paging.total > 0 && (
                <div className="mx-auto my-4">
                  <Pagination
                    onChange={(e) =>
                      getUserList({ ...paging, page: e, ...params })
                    }
                    pageSize={paging.page_size}
                    defaultCurrent={paging.page}
                    total={paging.total}
                  />
                </div>
              )}
            </Card>
          </Col>
        </Row>
      </Container>

      <Modal show={showModal} dialogClassName="dialog-confirm">
        <Modal.Body className="d-flex justify-content-center">
          Bạn có muốn xóa thiết bị này không?
        </Modal.Body>
        <Modal.Footer className="d-flex justify-content-center">
          <button
            className="btn btn-primary"
            style={{ padding: "5px 20px", marginRight: 5 }}
            onClick={() => handleDelete(idDel)}
          >
            Yes
          </button>
          <button
            className="btn btn-secondary"
            style={{ padding: "5px 20px", marginLeft: 5 }}
            onClick={() => setShowModal(false)}
          >
            No
          </button>
        </Modal.Footer>
      </Modal>

      <Modal show={showCre} size="xl" dialogClassName="dialog-style">
        <Modal.Header style={{ justifyContent: "center" }}>
          <Modal.Title className="mt-0" style={{ fontSize: 21 }}>
            Thêm mới thiết bị
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form encType="multipart/form-data">
            <Form.Group>
              <Form.Label>Tên thiết bị:</Form.Label>
              <Form.Control
                type="text"
                placeholder="Nhập tên thiết bị"
                onChange={(e) => setField("device_name", e.target.value)}
                isInvalid={!!errors.device_name}
              />
              {errors.device_name && (
                <span
                  style={{ fontSize: 12, color: "#dc3545", fontWeight: 100 }}
                >
                  {errors.device_name}
                </span>
              )}
            </Form.Group>
            <div className="row">
              <div className="col-md-4 mb-2">
                <Form.Group style={{ marginTop: 10 }}>
                  <Form.Label>Mã thiết bị:</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="Nhập mã thiết bị"
                    onChange={(e) => setField("code", e.target.value)}
                    isInvalid={!!errors.code}
                  />
                  {errors.code && (
                    <span
                      style={{
                        fontSize: 12,
                        color: "#dc3545",
                        fontWeight: 100,
                      }}
                    >
                      {errors.code}
                    </span>
                  )}
                </Form.Group>
              </div>
              <div className="col-md-4 mb-2">
                <Form.Group style={{ marginTop: 10 }}>
                  <Form.Label>Model:</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="Nhập số model"
                    onChange={(e) => setField("model", e.target.value)}
                    isInvalid={!!errors.model}
                  />
                  {errors.model && (
                    <span
                      style={{
                        fontSize: 12,
                        color: "#dc3545",
                        fontWeight: 100,
                      }}
                    >
                      {errors.model}
                    </span>
                  )}
                </Form.Group>
              </div>
              <div className="col-md-4">
                <Form.Group style={{ marginTop: 10 }}>
                  <Form.Label>Serial:</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="Nhập số serial"
                    onChange={(e) => setField("serial", e.target.value)}
                    isInvalid={!!errors.serial}
                  />
                  {errors.serial && (
                    <span
                      style={{
                        fontSize: 12,
                        color: "#dc3545",
                        fontWeight: 100,
                      }}
                    >
                      {errors.serial}
                    </span>
                  )}
                </Form.Group>
              </div>
              <div className="col-md-4">
                <Form.Group style={{ marginTop: 10 }}>
                  <Form.Label>Hãng sản xuất:</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="Nhập hãng sản xuất"
                    onChange={(e) => setField("manufacture", e.target.value)}
                    isInvalid={!!errors.manufacture}
                  />
                  {errors.manufacture && (
                    <span
                      style={{
                        fontSize: 12,
                        color: "#dc3545",
                        fontWeight: 100,
                      }}
                    >
                      {errors.manufacture}
                    </span>
                  )}
                </Form.Group>
              </div>

              {/* <div className="col-md-4">
                <Form.Group style={{ marginTop: 10 }}>
                  <Form.Label>Xuất xứ:</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="Nhập nơi xuất xứ"
                    onChange={(e) => setField("device_group", e.target.value)}
                    isInvalid={!!errors.device_group}
                  />
                  {errors.device_group && (
                    <span
                      style={{
                        fontSize: 12,
                        color: "#dc3545",
                        fontWeight: 100,
                      }}
                    >
                      {errors.device_group}
                    </span>
                  )}
                </Form.Group>
              </div> */}

              <div className="col-md-4">
                <Form.Group style={{ marginTop: 10 }}>
                  <Form.Label>Xuất xứ:</Form.Label>
                  <Select
                    showSearch
                    placeholder="Chọn nơi xuất xứ"
                    optionFilterProp="children"
                    value={form.countries}
                    onChange={(e) => setField("countries", e)}
                    // onSearch={onSearch}
                    style={{ width: "100%" }}
                    options={countryOptions}
                    isInvalid={!!errors.countries}
                    filterOption={(input, option) =>
                      (option?.label ?? "")
                        .toLowerCase()
                        .includes(input.toLowerCase())
                    }
                  />
                  {errors.countries && (
                    <span
                      style={{
                        fontSize: 12,
                        color: "#dc3545",
                        fontWeight: 100,
                      }}
                    >
                      {errors.countries}
                    </span>
                  )}
                </Form.Group>
              </div>

              {/* <div className="col-md-4">
                <Form.Group style={{ marginTop: 10 }}>
                  <Form.Label>Loại thiết bị:</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="Nhập loại thiết bị"
                    onChange={(e) => setField("device_type", e.target.value)}
                    isInvalid={!!errors.device_type}
                  />
                  {errors.device_type && (
                    <span
                      style={{
                        fontSize: 12,
                        color: "#dc3545",
                        fontWeight: 100,
                      }}
                    >
                      {errors.device_type}
                    </span>
                  )}
                </Form.Group>
              </div> */}

              <div className="col-md-4">
                <Form.Group style={{ marginTop: 10 }}>
                  <Form.Label>Loại thiết bị:</Form.Label>
                  <Select
                    placeholder="Chọn loại thiết bị"
                    value={form.type}
                    onChange={(e) => setField("type", e)}
                    style={{ width: "100%" }}
                    options={typeConfig}
                    isInvalid={!!errors.type}
                  />
                  {errors.type && (
                    <span
                      style={{
                        fontSize: 12,
                        color: "#dc3545",
                        fontWeight: 100,
                      }}
                    >
                      {errors.type}
                    </span>
                  )}
                </Form.Group>
              </div>

              <div className="col-md-4">
                <Form.Group style={{ marginTop: 10 }}>
                  <Form.Label>Vật tư đi kèm:</Form.Label>
                  <Form.Control
                    // type="text"
                    as="textarea"
                    rows={3}
                    placeholder="Nhập vật tư đi kèm thiết bị"
                    onChange={(e) => setField("accessory", e.target.value)}
                    isInvalid={!!errors.accessory}
                  />
                  {errors.accessory && (
                    <span
                      style={{
                        fontSize: 12,
                        color: "#dc3545",
                        fontWeight: 100,
                      }}
                    >
                      {errors.accessory}
                    </span>
                  )}
                </Form.Group>
              </div>

              {/* <div className="col-md-4">
                <Form.Group style={{ marginTop: 10 }}>
                  <Form.Label>Người quản lý:</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="Nhập người quản lý thiết bị"
                    onChange={(e) => setField("manager_device", e.target.value)}
                    isInvalid={!!errors.manager_device}
                  />
                  {errors.manager_device && (
                    <span
                      style={{
                        fontSize: 12,
                        color: "#dc3545",
                        fontWeight: 100,
                      }}
                    >
                      {errors.manager_device}
                    </span>
                  )}
                </Form.Group>
              </div> */}

              <div className="col-md-4 mb-2">
                <Form.Group style={{ marginTop: 10 }}>
                  <Form.Label>Nhà cung cấp:</Form.Label>
                  <Select
                    placeholder="Chọn nhà cung cấp"
                    value={form.provider_id}
                    onChange={(e) => setField("provider_id", e)}
                    style={{ width: "100%" }}
                    options={providerConfig}
                    isInvalid={!!errors.provider_id}
                  />
                  {errors.provider_id && (
                    <span
                      style={{
                        fontSize: 12,
                        color: "#dc3545",
                        fontWeight: 100,
                      }}
                    >
                      {errors.provider_id}
                    </span>
                  )}
                </Form.Group>
              </div>

              <div className="col-md-4 mb-2">
                <Form.Group style={{ marginTop: 10 }}>
                  <Form.Label>Khoa/Phòng:</Form.Label>
                  <Select
                    placeholder="Chọn Khoa/Phòng"
                    value={form.department_id}
                    onChange={(e) => setField("department_id", e)}
                    style={{ width: "100%" }}
                    options={departmentConfig}
                    isInvalid={!!errors.department_id}
                  />
                  {errors.department_id && (
                    <span
                      style={{
                        fontSize: 12,
                        color: "#dc3545",
                        fontWeight: 100,
                      }}
                    >
                      {errors.department_id}
                    </span>
                  )}
                </Form.Group>
              </div>

              <div className="col-md-4 mb-2">
                <Form.Group style={{ marginTop: 10 }}>
                  <Form.Label>Người quản lý:</Form.Label>
                  <Select
                    placeholder="Chọn người quản lý"
                    value={form.user_id}
                    onChange={(e) => setField("user_id", e)}
                    style={{ width: "100%" }}
                    options={userConfig}
                    isInvalid={!!errors.user_id}
                  />
                  {errors.user_id && (
                    <span
                      style={{
                        fontSize: 12,
                        color: "#dc3545",
                        fontWeight: 100,
                      }}
                    >
                      {errors.user_id}
                    </span>
                  )}
                </Form.Group>
              </div>

              <div className="col-md-4">
                <Form.Group style={{ marginTop: 10 }}>
                  <Form.Label>Trạng thái:</Form.Label>
                  <Select
                    placeholder="Chọn trạng thái"
                    value={form.status}
                    onChange={(e) => setField("status", e)}
                    style={{ width: "100%" }}
                    options={statusConfig}
                    isInvalid={!!errors.status}
                  />
                  {errors.status && (
                    <span
                      style={{
                        fontSize: 12,
                        color: "#dc3545",
                        fontWeight: 100,
                      }}
                    >
                      {errors.status}
                    </span>
                  )}
                </Form.Group>
              </div>

              <div className="col-md-4">
                <Form.Group style={{ marginTop: 10 }}>
                  <Form.Label>Ngày nhập:</Form.Label>
                  <Form.Control
                    type="date"
                    placeholder="Enter import date"
                    onChange={(e) => setField("import_date", e.target.value)}
                    isInvalid={!!errors.import_date}
                  />
                  {errors.import_date && (
                    <span
                      style={{
                        fontSize: 12,
                        color: "#dc3545",
                        fontWeight: 100,
                      }}
                    >
                      {errors.import_date}
                    </span>
                  )}
                </Form.Group>
              </div>
              <div className="col-md-4">
                <Form.Group style={{ marginTop: 10 }}>
                  <Form.Label>Ngày bàn giao:</Form.Label>
                  <Form.Control
                    type="date"
                    placeholder="Enter handover date"
                    onChange={(e) => setField("handover_date", e.target.value)}
                    isInvalid={!!errors.handover_date}
                  />
                  {errors.handover_date && (
                    <span
                      style={{
                        fontSize: 12,
                        color: "#dc3545",
                        fontWeight: 100,
                      }}
                    >
                      {errors.handover_date}
                    </span>
                  )}
                </Form.Group>
              </div>
              <div className="col-md-4">
                <Form.Group style={{ marginTop: 10 }}>
                  <Form.Label>Hạn bảo hành:</Form.Label>
                  <Form.Control
                    type="date"
                    placeholder="Enter expire date"
                    onChange={(e) => setField("expire_date", e.target.value)}
                    isInvalid={!!errors.expire_date}
                  />
                  {errors.expire_date && (
                    <span
                      style={{
                        fontSize: 12,
                        color: "#dc3545",
                        fontWeight: 100,
                      }}
                    >
                      {errors.expire_date}
                    </span>
                  )}
                </Form.Group>
              </div>

              <div className="col-md-4 mb-2">
                <Form.Group style={{ marginTop: 10 }}>
                  <Form.Label>Ảnh mô tả:</Form.Label>
                  <Form.Control
                    style={{ padding: "4px 12px" }}
                    type="file"
                    accept="image/*"
                    onChange={(e) => {
                      handleUpload(e);
                    }}
                    isInvalid={!!errors.avatar}
                  />
                  {errors.avatar && (
                    <span
                      style={{
                        fontSize: 12,
                        color: "#dc3545",
                        fontWeight: 100,
                      }}
                    >
                      {errors.avatar}
                    </span>
                  )}
                </Form.Group>
              </div>

              {/* <div className="col-md-4 mb-2">
				<form>
					<div style={{ marginTop: 10 }}>
					<label>Hồ sơ đi kèm:</label>
					<input
						style={{ padding: "4px 12px" }}
						type="file"
						accept=".pdf"
						onChange={handleUploadd}
					/>
					{file && (
						<button type="button" onClick={handleDownload}>
						Tải xuống
						</button>
					)}
					</div>
				</form>
   			 </div> */}
            </div>
          </Form>
        </Modal.Body>
        <Modal.Footer style={{ justifyContent: "center", marginTop: 10 }}>
          <button
            type="submit"
            className="btn btn-primary"
            style={{ marginRight: 10, padding: "10px 10px" }}
            onClick={handleSubmit}
            disabled={loadingButton == true}
          >
            {loadingButton === true && (
              <div style={{ width: 100.01, padding: 0 }}>
                <MDBSpinner
                  color="primary"
                  role="status"
                  size="sm"
                ></MDBSpinner>
              </div>
            )}
            {loadingButton === false && <>Lưu</>}
          </button>

          <button
            type="button"
            className="btn btn-secondary"
            style={{ marginLeft: 10, padding: "10px 10px" }}
            onClick={handleClose}
          >
            Hủy
          </button>
        </Modal.Footer>
      </Modal>

      <Modal show={showEdit} size="xl" dialogClassName="dialog-style">
        <Modal.Header style={{ justifyContent: "center" }}>
          <Modal.Title className="mt-0 text-center" style={{ fontSize: 21 }}>
            {isClickDetail
              ? "Thông tin chi tiết thiết bị"
              : "Cập nhật thông tin thiết bị"}
          </Modal.Title>
        </Modal.Header>
        {loadingForm === true && (
          <div
            className="d-flex justify-content-center"
            style={{ height: 200, alignItems: "center" }}
          >
            <MDBSpinner role="status"></MDBSpinner>
          </div>
        )}
        {loadingForm === false && (
          <>
            <Modal.Body>
              <Form>
                <Form.Group>
                  <Form.Label>Tên thiết bị: </Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="Nhập tên thiết bị"
                    value={form.device_name}
                    readOnly={isShowDetail}
                    onChange={(e) => setField("device_name", e.target.value)}
                    isInvalid={!!errors.device_name}
                  />
                  {errors.device_name && (
                    <span
                      style={{
                        fontSize: 12,
                        color: "#dc3545",
                        fontWeight: 100,
                      }}
                    >
                      {errors.device_name}
                    </span>
                  )}
                </Form.Group>
                <div className="row">
                  <div className="col-md-4 mb-2">
                    <Form.Group style={{ marginTop: 10 }}>
                      <Form.Label>Mã thiết bị:</Form.Label>
                      <Form.Control
                        type="text"
                        placeholder="Nhập mã thiết bị"
                        readOnly={isShowDetail}
                        value={form.code}
                        onChange={(e) => setField("code", e.target.value)}
                        isInvalid={!!errors.code}
                      />
                      {errors.code && (
                        <span
                          style={{
                            fontSize: 12,
                            color: "#dc3545",
                            fontWeight: 100,
                          }}
                        >
                          {errors.code}
                        </span>
                      )}
                    </Form.Group>
                  </div>

                  <div className="col-md-4 mb-2">
                    <Form.Group style={{ marginTop: 10 }}>
                      <Form.Label>Model:</Form.Label>
                      <Form.Control
                        type="text"
                        placeholder="Nhập số model"
                        value={form.model}
                        readOnly={isShowDetail}
                        onChange={(e) => setField("model", e.target.value)}
                        isInvalid={!!errors.model}
                      />
                      {errors.model && (
                        <span
                          style={{
                            fontSize: 12,
                            color: "#dc3545",
                            fontWeight: 100,
                          }}
                        >
                          {errors.model}
                        </span>
                      )}
                    </Form.Group>
                  </div>

                  <div className="col-md-4 mb-2">
                    <Form.Group style={{ marginTop: 10 }}>
                      <Form.Label>Serial:</Form.Label>
                      <Form.Control
                        type="text"
                        placeholder="Nhập số serial"
                        value={form.serial}
                        readOnly={true}
                        onChange={(e) => {
                          if (!isShowDetail) setField("serial", e.target.value);
                        }}
                        isInvalid={!!errors.serial}
                      />
                      {errors.serial && (
                        <span
                          style={{
                            fontSize: 12,
                            color: "#dc3545",
                            fontWeight: 100,
                          }}
                        >
                          {errors.serial}
                        </span>
                      )}
                    </Form.Group>
                  </div>

                  <div className="col-md-4 mb-2">
                    <Form.Group style={{ marginTop: 10 }}>
                      <Form.Label>Hãng sản xuất:</Form.Label>
                      <Form.Control
                        type="text"
                        value={form.manufacture}
                        placeholder="Nhập hãng sản xuất"
                        readOnly={isShowDetail}
                        onChange={(e) => {
                          if (!isShowDetail)
                            setField("manufacture", e.target.value);
                        }}
                        isInvalid={!!errors.manufacture}
                      />
                      {errors.manufacture && (
                        <span
                          style={{
                            fontSize: 12,
                            color: "#dc3545",
                            fontWeight: 100,
                          }}
                        >
                          {errors.manufacture}
                        </span>
                      )}
                    </Form.Group>
                  </div>

                  {/* <div className="col-md-4 mb-2">
                    <Form.Group style={{ marginTop: 10 }}>
                      <Form.Label>Xuất xứ:</Form.Label>
                      <Form.Control
                        type="text"
                        value={form.device_group}
                        readOnly={isShowDetail}
                        placeholder="Nhập nơi xuất xứ"
                        onChange={(e) => {
                          if (!isShowDetail)
                            setField("device_group", e.target.value);
                        }}
                        isInvalid={!!errors.device_group}
                      />
                      {errors.device_group && (
                        <span
                          style={{
                            fontSize: 12,
                            color: "#dc3545",
                            fontWeight: 100,
                          }}
                        >
                          {errors.device_group}
                        </span>
                      )}
                    </Form.Group>
                  </div> */}

                  <div className="col-md-4 mb-2">
                    <Form.Group style={{ marginTop: 10 }}>
                      <Form.Label>Xuất xứ:</Form.Label>
                      <Select
                        showSearch
                        placeholder="Chọn nơi xuất xứ"
                        value={form.countries}
                        disabled={isShowDetail}
                        onChange={(e) => {
                          if (!isShowDetail) setField("countries", e);
                        }}
                        style={{ width: "100%" }}
                        options={countryOptions}
                        isInvalid={!!errors.countries}
                        filterOption={(input, option) =>
                          (option?.label ?? "")
                            .toLowerCase()
                            .includes(input.toLowerCase())
                        }
                      />
                      {errors.countries && (
                        <span
                          style={{
                            fontSize: 12,
                            color: "#dc3545",
                            fontWeight: 100,
                          }}
                        >
                          {errors.countries}
                        </span>
                      )}
                    </Form.Group>
                  </div>

                  {/* <div className="col-md-4">
                    <Form.Group style={{ marginTop: 10 }}>
                      <Form.Label>Loại thiết bị:</Form.Label>
                      <Form.Control
                        type="text"
                        placeholder="Nhập loại thiết bị"
                        value={form.device_type}
                        readOnly={isShowDetail}
                        onChange={(e) => {
                          if (!isShowDetail)
                            setField("device_type", e.target.value);
                        }}
                        isInvalid={!!errors.device_type}
                      />
                      {errors.device_type && (
                        <span
                          style={{
                            fontSize: 12,
                            color: "#dc3545",
                            fontWeight: 100,
                          }}
                        >
                          {errors.device_type}
                        </span>
                      )}
                    </Form.Group>
                  </div> */}

                  <div className="col-md-4 mb-2">
                    <Form.Group style={{ marginTop: 10 }}>
                      <Form.Label>Loại thiết bị:</Form.Label>
                      <Select
                        placeholder="Chọn loại thiết bị"
                        value={form.type}
                        disabled={isShowDetail}
                        onChange={(e) => {
                          if (!isShowDetail) setField("type", e);
                        }}
                        style={{ width: "100%" }}
                        options={typeConfig}
                        isInvalid={!!errors.type}
                      />
                      {errors.type && (
                        <span
                          style={{
                            fontSize: 12,
                            color: "#dc3545",
                            fontWeight: 100,
                          }}
                        >
                          {errors.type}
                        </span>
                      )}
                    </Form.Group>
                  </div>

                  <div className="col-md-4">
                    <Form.Group style={{ marginTop: 10 }}>
                      <Form.Label>Vật tư đi kèm:</Form.Label>
                      <Form.Control
                        // type="text"
                        as="textarea"
                        rows={3}
                        placeholder="Nhập vật tư đi kèm thiết bị"
                        value={form.accessory}
                        readOnly={isShowDetail}
                        onChange={(e) => {
                          if (!isShowDetail)
                            setField("accessory", e.target.value);
                        }}
                        isInvalid={!!errors.accessory}
                      />
                      {errors.accessory && (
                        <span
                          style={{
                            fontSize: 12,
                            color: "#dc3545",
                            fontWeight: 100,
                          }}
                        >
                          {errors.accessory}
                        </span>
                      )}
                    </Form.Group>
                  </div>
                  {/* <div className="col-md-4">
                    <Form.Group style={{ marginTop: 10 }}>
                      <Form.Label>Người quản lý:</Form.Label>
                      <Form.Control
                        type="text"
                        // as="textarea" rows={3}
                        placeholder="Nhập người quản lý thiết bị"
                        value={form.manager_device}
                        readOnly={isShowDetail}
                        onChange={(e) => {
                          if (!isShowDetail)
                            setField("manager_device", e.target.value);
                        }}
                        isInvalid={!!errors.manager_device}
                      />
                      {errors.manager_device && (
                        <span
                          style={{
                            fontSize: 12,
                            color: "#dc3545",
                            fontWeight: 100,
                          }}
                        >
                          {errors.manager_device}
                        </span>
                      )}
                    </Form.Group>
                  </div> */}

                  <div className="col-md-4 mb-2">
                    <Form.Group style={{ marginTop: 10 }}>
                      <Form.Label>Nhà cung cấp:</Form.Label>
                      <Select
                        placeholder="Chọn nhà cung cấp"
                        value={form.provider_id}
                        disabled={isShowDetail}
                        onChange={(e) => {
                          if (!isShowDetail) setField("provider_id", e);
                        }}
                        style={{ width: "100%" }}
                        options={providerConfig}
                        isInvalid={!!errors.provider_id}
                      />
                      {errors.provider_id && (
                        <span
                          style={{
                            fontSize: 12,
                            color: "#dc3545",
                            fontWeight: 100,
                          }}
                        >
                          {errors.provider_id}
                        </span>
                      )}
                    </Form.Group>
                  </div>

                  <div className="col-md-4 mb-2">
                    <Form.Group style={{ marginTop: 10 }}>
                      <Form.Label>Khoa/Phòng:</Form.Label>
                      <Select
                        placeholder="Chọn Khoa/Phòng"
                        value={form.department_id}
                        disabled={isShowDetail}
                        onChange={(e) => {
                          if (!isShowDetail) setField("department_id", e);
                        }}
                        style={{ width: "100%" }}
                        options={departmentConfig}
                        isInvalid={!!errors.department_id}
                      />
                      {errors.department_id && (
                        <span
                          style={{
                            fontSize: 12,
                            color: "#dc3545",
                            fontWeight: 100,
                          }}
                        >
                          {errors.department_id}
                        </span>
                      )}
                    </Form.Group>
                  </div>

                  <div className="col-md-4 mb-2">
                    <Form.Group style={{ marginTop: 10 }}>
                      <Form.Label>Người quản lý:</Form.Label>
                      <Select
                        placeholder="Chọn người quản lý"
                        value={form.user_id}
                        disabled={isShowDetail}
                        onChange={(e) => {
                          if (!isShowDetail) {
                            setField("user_id", e);
                          }
                        }}
                        style={{ width: "100%" }}
                        options={userConfig}
                        isInvalid={!!errors.user_id}
                      />
                      {errors.user_id && (
                        <span
                          style={{
                            fontSize: 12,
                            color: "#dc3545",
                            fontWeight: 100,
                          }}
                        >
                          {errors.user_id}
                        </span>
                      )}
                    </Form.Group>
                  </div>

                  <div className="col-md-4 mb-2">
                    <Form.Group style={{ marginTop: 10 }}>
                      <Form.Label>Trạng thái:</Form.Label>
                      <Select
                        placeholder="Chọn trạng thái"
                        value={form.status}
                        disabled={isShowDetail}
                        onChange={(e) => {
                          if (!isShowDetail) setField("status", e);
                        }}
                        style={{ width: "100%" }}
                        options={statusConfig}
                        isInvalid={!!errors.status}
                      />
                      {errors.status && (
                        <span
                          style={{
                            fontSize: 12,
                            color: "#dc3545",
                            fontWeight: 100,
                          }}
                        >
                          {errors.status}
                        </span>
                      )}
                    </Form.Group>
                  </div>

                  <div className="col-md-4">
                    <Form.Group style={{ marginTop: 10 }}>
                      <Form.Label>Ngày nhập:</Form.Label>
                      <Form.Control
                        type="date"
                        placeholder="Enter import date"
                        value={form.import_date}
                        readOnly={isShowDetail}
                        onChange={(e) => {
                          if (!isShowDetail)
                            setField("import_date", e.target.value);
                        }}
                        isInvalid={!!errors.import_date}
                      />
                      {errors.import_date && (
                        <span
                          style={{
                            fontSize: 12,
                            color: "#dc3545",
                            fontWeight: 100,
                          }}
                        >
                          {errors.import_date}
                        </span>
                      )}
                    </Form.Group>
                  </div>
                  <div className="col-md-4">
                    <Form.Group style={{ marginTop: 10 }}>
                      <Form.Label>Ngày bàn giao:</Form.Label>
                      <Form.Control
                        type="date"
                        placeholder="Enter handover date"
                        value={form.handover_date}
                        readOnly={isShowDetail}
                        onChange={(e) => {
                          if (!isShowDetail)
                            setField("handover_date", e.target.value);
                        }}
                        isInvalid={!!errors.handover_date}
                      />
                      {errors.handover_date && (
                        <span
                          style={{
                            fontSize: 12,
                            color: "#dc3545",
                            fontWeight: 100,
                          }}
                        >
                          {errors.handover_date}
                        </span>
                      )}
                    </Form.Group>
                  </div>
                  <div className="col-md-4">
                    <Form.Group style={{ marginTop: 10 }}>
                      <Form.Label>Hạn bảo hành:</Form.Label>
                      <Form.Control
                        type="date"
                        placeholder="Enter expire date"
                        readOnly={isShowDetail}
                        value={form.expire_date}
                        onChange={(e) => {
                          if (!isShowDetail)
                            setField("expire_date", e.target.value);
                        }}
                        isInvalid={!!errors.expire_date}
                      />
                      {errors.expire_date && (
                        <span
                          style={{
                            fontSize: 12,
                            color: "#dc3545",
                            fontWeight: 100,
                          }}
                        >
                          {errors.expire_date}
                        </span>
                      )}
                    </Form.Group>
                  </div>

                  <div className="col-md-4 mb-2">
                    <Form.Group style={{ marginTop: 10 }}>
                      <Form.Label>Ảnh mô tả:</Form.Label>
                      {!isShowDetail && (
                        <>
                          <Form.Control
                            style={{ padding: "4px 12px" }}
                            type="file"
                            accept="image/*"
                            readOnly={isShowDetail}
                            disabled={isShowDetail}
                            onChange={(e) => {
                              handleUpload(e);
                            }}
                            isInvalid={!!errors.avatar}
                          />
                          {errors.avatar && (
                            <span
                              style={{
                                fontSize: 12,
                                color: "#dc3545",
                                fontWeight: 100,
                              }}
                            >
                              {errors.avatar}
                            </span>
                          )}
                        </>
                      )}
                      {isShowDetail && (
                        <div>
                          <img
                            src={form.avatar}
                            style={{
                              border: "0.5px solid",
                              borderRadius: "5px",
                              width: "120px",
                              height: "120px",
                            }}
                            onError={errorImg}
                          />
                        </div>
                      )}
                    </Form.Group>
                  </div>
                </div>
              </Form>
            </Modal.Body>
          </>
        )}

        <Modal.Footer style={{ justifyContent: "center", marginTop: 10 }}>
          {!isShowDetail && (
            <button
              type="submit"
              className="btn btn-primary"
              style={{ marginRight: 10, padding: "10px 10px" }}
              onClick={() => handleUpdate(idEdit)}
              disabled={loadingButton == true}
            >
              {loadingButton === true && (
                <div style={{ width: 100.01, padding: 0 }}>
                  <MDBSpinner
                    color="primary"
                    role="status"
                    size="sm"
                  ></MDBSpinner>
                </div>
              )}
              {loadingButton === false && <>Cập nhật</>}
            </button>
          )}

          <button
            type="button"
            className="btn btn-secondary"
            style={{ marginLeft: 10, padding: "10px 10px" }}
            onClick={handleEditOff}
          >
            Hủy
          </button>
        </Modal.Footer>
      </Modal>

      <Modal show={showBroken} size="xl" dialogClassName="dialog-style">
        <Modal.Header style={{ justifyContent: "center" }}>
          <Modal.Title className="mt-0 text-center" style={{ fontSize: 21 }}>
            Báo hỏng thiết bị
          </Modal.Title>
        </Modal.Header>
        {loadingForm === true && (
          <div
            className="d-flex justify-content-center"
            style={{ height: 200, alignItems: "center" }}
          >
            <MDBSpinner role="status"></MDBSpinner>
          </div>
        )}
        {loadingForm === false && (
          <>
            <Modal.Body>
              <Form>
                <div className="row">
                  <div className="col-md-4 mb-2">
                    <Form.Group style={{ marginTop: 10 }}>
                      <Form.Label>Tên thiết bị: </Form.Label>
                      <Form.Control
                        type="text"
                        placeholder="Nhập tên thiết bị"
                        value={form.device_name}
                        readOnly={true}
                        // onChange={ ( e ) => setField( 'device_name', e.target.value ) }
                        // isInvalid={ !!errors.device_name }
                      />
                      {/* { errors.device_name && <span style={ { fontSize: 12, color: '#dc3545', fontWeight: 100 } }>{ errors.device_name }</span> } */}
                    </Form.Group>
                  </div>

                  <div className="col-md-4 mb-2">
                    <Form.Group style={{ marginTop: 10 }}>
                      <Form.Label>Mã thiết bị:</Form.Label>
                      <Form.Control
                        type="text"
                        placeholder="Nhập mã thiết bị"
                        readOnly={true}
                        value={form.code}
                        // onChange={ ( e ) => setField( 'code', e.target.value ) }
                        // isInvalid={ !!errors.code }
                      />
                      {/* { errors.code && <span style={ { fontSize: 12, color: '#dc3545', fontWeight: 100 } }>{ errors.code }</span> } */}
                    </Form.Group>
                  </div>

                  <div className="col-md-4 mb-2">
                    <Form.Group style={{ marginTop: 10 }}>
                      <Form.Label>Model:</Form.Label>
                      <Form.Control
                        type="text"
                        placeholder="Nhập số model"
                        value={form.model}
                        readOnly={true}
                        // onChange={ ( e ) => setField( 'model', e.target.value ) }
                        // isInvalid={ !!errors.model }
                      />
                      {/* { errors.model && <span style={ { fontSize: 12, color: '#dc3545', fontWeight: 100 } }>{ errors.model }</span> } */}
                    </Form.Group>
                  </div>

                  <div className="col-md-4 mb-2">
                    <Form.Group style={{ marginTop: 10 }}>
                      <Form.Label>Khoa/Phòng:</Form.Label>
                      <Select
                        placeholder="Chọn Khoa/Phòng"
                        value={form.department_id}
                        // readOnly={true}
                        disabled={true}
                        onChange={(e) => {
                          if (!isShowDetail) {
                            setField("department_id", e);
                          }
                        }}
                        style={{ width: "100%" }}
                        options={departmentConfig}
                        isInvalid={!!errors.department_id}
                      />
                      {errors.department_id && (
                        <span
                          style={{
                            fontSize: 12,
                            color: "#dc3545",
                            fontWeight: 100,
                          }}
                        >
                          {errors.department_id}
                        </span>
                      )}
                    </Form.Group>
                  </div>

                  {/* <div className="col-md-4 mb-2">
                    <Form.Group style={{ marginTop: 10 }}>
                      <Form.Label>Người quản lý:</Form.Label>
                      <Form.Control
                        type="text"
                        placeholder="Nhập số model"
                        value={form.manager_device}
                        readOnly={true}
                        onChange={ ( e ) => setField( 'model', e.target.value ) }
                        isInvalid={ !!errors.model }
                      />
                      { errors.model && <span style={ { fontSize: 12, color: '#dc3545', fontWeight: 100 } }>{ errors.model }</span> }
                    </Form.Group>
                  </div> */}

                  <div className="col-md-4 mb-2">
                    <Form.Group style={{ marginTop: 10 }}>
                      <Form.Label>Người quản lý:</Form.Label>
                      <Select
                        placeholder="Chọn người quản lý"
                        value={form.user_id}
                        // readOnly={true}
                        disabled={true}
                        onChange={(e) => {
                          if (!isShowDetail) {
                            setField("user_id", e);
                          }
                        }}
                        style={{ width: "100%" }}
                        options={userConfig}
                        isInvalid={!!errors.user_id}
                      />
                      {errors.user_id && (
                        <span
                          style={{
                            fontSize: 12,
                            color: "#dc3545",
                            fontWeight: 100,
                          }}
                        >
                          {errors.user_id}
                        </span>
                      )}
                    </Form.Group>
                  </div>

                  <div className="col-md-4">
                    <Form.Group style={{ marginTop: 10 }}>
                      <Form.Label>Ngày báo hỏng:</Form.Label>
                      <Form.Control
                        type="date"
                        placeholder="Enter import date"
                        value={form.import_date}
                        readOnly={isShowDetail}
                        onChange={(e) => {
                          if (!isShowDetail)
                            setField("import_date", e.target.value);
                        }}
                        isInvalid={!!errors.import_date}
                      />
                      {errors.import_date && (
                        <span
                          style={{
                            fontSize: 12,
                            color: "#dc3545",
                            fontWeight: 100,
                          }}
                        >
                          {errors.import_date}
                        </span>
                      )}
                    </Form.Group>
                  </div>

                  <div className="col-md-4 mb-2">
                    <Form.Group style={{ marginTop: 10 }}>
                      <Form.Label>Lý do hỏng:</Form.Label>
                      <Checkbox.Group>
                        <Row>
                          {optionsBroken.map((option) => (
                            <Col span={12}>
                              <Checkbox value={option.value}>
                                {option.label}
                              </Checkbox>
                            </Col>
                          ))}
                        </Row>
                      </Checkbox.Group>
                      {errors.model && (
                        <span
                          style={{
                            fontSize: 12,
                            color: "#dc3545",
                            fontWeight: 100,
                          }}
                        >
                          {errors.model}
                        </span>
                      )}
                    </Form.Group>
                  </div>

                  <div className="col-md-4 mb-2">
                    <Form.Group style={{ marginTop: 10 }}>
                      <Form.Label>Lý do khác:</Form.Label>
                      <Form.Control
                        as="textarea"
                        rows={3}
                        placeholder="Nhập lý do khác"
                        onChange={(e) => setField("model", e.target.value)}
                        isInvalid={!!errors.model}
                      />
                      {errors.model && (
                        <span
                          style={{
                            fontSize: 12,
                            color: "#dc3545",
                            fontWeight: 100,
                          }}
                        >
                          {errors.model}
                        </span>
                      )}
                    </Form.Group>
                  </div>
                </div>
              </Form>
            </Modal.Body>
          </>
        )}

        <Modal.Footer style={{ justifyContent: "center", marginTop: 10 }}>
          <button
            type="submit"
            className="btn btn-primary"
            style={{ marginRight: 10, padding: "10px 10px" }}
            onClick={() => handleBroken(idBroken)}
            disabled={loadingButton == true}
          >
            {loadingButton === true && (
              <div style={{ width: 100.01, padding: 0 }}>
                <MDBSpinner
                  color="primary"
                  role="status"
                  size="sm"
                ></MDBSpinner>
              </div>
            )}
            {loadingButton === false && <>Báo hỏng</>}
          </button>

          <button
            type="button"
            className="btn btn-secondary"
            style={{ marginLeft: 10, padding: "10px 10px" }}
            onClick={handleBrokenOff}
          >
            Hủy
          </button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default DevicePage;
