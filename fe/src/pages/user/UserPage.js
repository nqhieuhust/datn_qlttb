import userApi from "api/admin/userService";
import departmentApi from "api/admin/departmentService";
import React, { useEffect, useState } from "react";
import { Modal, Form } from "react-bootstrap";
import { MDBSpinner } from "mdb-react-ui-kit";
import { Card, Table, Container, Row, Col } from "react-bootstrap";
import { Pagination, message } from "antd";
import { FilterUser } from "./filter";
import { timeDelay } from "api/common";
import { useDispatch } from "react-redux";
import { toggleShowLoading } from "redux/actions/common-action";

function UserPage() {
  const [loading, setLoading] = useState(false);
  const [loadingForm, setLoadingForm] = useState(false);
  const [loadingButton, setLoadingButton] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [paging, setPaging] = useState({ page: 1, page_size: 20, total: 0 });

  const [users, setUsers] = useState([]);

  const [name, setName] = useState();
  const [username, setUsername] = useState();
  const [password, setPassword] = useState();
  const [role, setRole] = useState();
  const [status, setStatus] = useState();
  const [email, setEmail] = useState();
  const [mobile, setMobile] = useState();
  const [address, setAddress] = useState();
  const [department_id, setDepartmentId] = useState();

  const [departmentConfig, setDepartmentConfig] = useState([]);

  const [idDel, setIdDel] = useState();
  const [idEdit, setIdEdit] = useState();

  const [showModal, setShowModal] = useState(false);
  const [showCre, setShowCre] = useState(false);
  const [showEdit, setShowEdit] = useState(false);
  const [params, setParams] = useState({
    id: null,
    username: null,
    email: null,
    status: null,
    mobile: null,
    department_id: null,
  });

  const clearProviderEdit = () => {
    setName(null);
    setUsername(null);
    setPassword(null);
    setRole(null);
    setAddress(null);
    setMobile(null);
    setEmail(null);
    setStatus(null);
    setDepartmentId(null);
  };

  const handleClose = () => {
    setShowCre(false);
    setErrors({});
    setForm({});
    setLoadingButton(false);
  };

  const handleEditOn = (id) => {
    getUserById(id);
    setShowEdit(true);
    setForm({});
    setErrors({});
  };

  const handleEditOff = () => {
    setShowEdit(false);
    setErrors({});
    setForm({});
    setLoadingButton(false);
    clearProviderEdit();
  };

  const [form, setForm] = useState({});
  const [errors, setErrors] = useState({});
  const dispatch = useDispatch();

  useEffect(() => {
    getDepartmentList({ page: 1, page_size: 200 });
  }, []);

  useEffect(() => {
    paging.page = currentPage;
    getUserList({ ...paging });
  }, [currentPage]);

  const getUserList = async (filters) => {
    try {
      setLoading(true);
      dispatch(toggleShowLoading(true));
      const response = await userApi.getUsers(filters);
      // console.log(response);
      await timeDelay(1000);
      if (response.status === 200 || response.status === "success") {
        setUsers(response.data.users);
        setPaging({ ...response.data.meta });
        dispatch(toggleShowLoading(false));
      } else {
        message.error(response.message || "Lỗi! Vui lòng thử lại");
        dispatch(toggleShowLoading(false));
      }
      setLoading(false);
    } catch (e) {
      message.error(e.message || "Lỗi! Vui lòng thử lại");
      dispatch(toggleShowLoading(false));
      setLoading(false);
    }
  };

  const getDepartmentList = async (filters) => {
    try {
      const response = await departmentApi.getDepartments(filters);
      if (response.status === 200 || response.status === "success") {
        setDepartmentConfig(response.data.departments);
      }
    } catch (e) {
      console.log(e);
    }
  };

  const getUserById = async (id) => {
    try {
      setLoadingForm(true);
      dispatch(toggleShowLoading(true));
      const response = await userApi.getUserById(id);
      if (response.status == 200 || response.status === "success") {
        setIdEdit(response.data.id);
        setName(response.data.full_name);
        setUsername(response.data.username);
        // setPassword( response.data.password );
        setRole(response.data.role);
        setStatus(response.data.status);
        setAddress(response.data.address);
        setDepartmentId(response.data.department_id);
        setMobile(response.data.mobile);
        setEmail(response.data.email);
        setForm({
          full_name: response.data.full_name,
          username: response.data.username,
          address: response.data.address,
          department_id: response.data.department_id,
          mobile: response.data.mobile,
          email: response.data.email,
        });
        setLoadingForm(false);
        dispatch(toggleShowLoading(false));
      } else {
        message.error(response.message || "Lỗi! Vui lòng thử lại");
        dispatch(toggleShowLoading(false));
      }
      setLoadingButton(false);
    } catch (e) {
      message.error(e.message || "Lỗi! Vui lòng thử lại");
      dispatch(toggleShowLoading(false));
      setLoadingButton(false);
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
        form.role = Number(form.role);
        form.status = Number(form.status);
        if (form.department_id) {
          form.department_id = Number(form.department_id);
        }
        const response = await userApi.createUser(form);
        await timeDelay(1000);
        console.log("res-----> ", response);
        if (response.status === "success") {
          getUserList({ page: 1 });
          handleClose();
          dispatch(toggleShowLoading(false));
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
          message.error(response.message || "Lỗi! Vui lòng thử lại");
          dispatch(toggleShowLoading(false));
        }
        setLoadingButton(false);
      }
    } catch (e) {
      message.error(e.message || "Lỗi! Vui lòng thử lại");
      dispatch(toggleShowLoading(false));
      setLoadingButton(false);
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
        if (form.role) form.role = Number(form.role);
        if (form.status) form.status = Number(form.status);
        if (form.department_id) {
          form.department_id = Number(form.department_id);
        }
        const response = await userApi.updateUser(id, form);
        if (response.status === 200 || response.status === "success") {
          await getUserList({ page: 1 });
          handleEditOff();
          dispatch(toggleShowLoading(false));
          message.success("Cập nhật thành công!");
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
          message.error(response.message || "Lỗi! Vui lòng thử lại.");
          dispatch(toggleShowLoading(false));
        }
        setLoadingButton(false);
      }
    } catch (e) {
      message.error(e.message || "Lỗi! Vui lòng thử lại");
      dispatch(toggleShowLoading(false));
      setLoadingButton(false);
    }
  };

  const handleDelete = async (id) => {
    try {
      dispatch(toggleShowLoading(true));
      const response = await userApi.deleteUser(id);
      if (response.status === 200 || response.status === "success") {
        await getUserList({ page: 1 });
        setShowModal(false);
        setIdDel(null);
        alert("Removed successfully!");
        message.success("Xóa thành công!");
        dispatch(toggleShowLoading(false));
      } else {
        message.error(response.message || "Lỗi! Vui lòng thử lại");
        dispatch(toggleShowLoading(false));
      }
    } catch (e) {
      message.error(e.message || "Lỗi! Vui lòng thử lại");
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
      if (!form.full_name || form.full_name === "")
        newErrors.full_name = "Họ và tên không được để trống!";
      if (!form.username || form.username === "")
        newErrors.username = "Tài khoản không được để trống!";
      if (!form.password || form.password === "")
        newErrors.password = "Mật khẩu không được để trống!";
      if (!form.role || form.role === "")
        newErrors.role = "Phân quyền không được để trống!";
      if (!form.status || form.status === "")
        newErrors.status = "Trạng thái không được để trống!";
      // if ( !form.address || form.address === '' ) newErrors.address = 'Address cannot be blank!';
      if (!form.department_id || form.department_id === "")
        newErrors.department_id = "Khoa/Phòng không được để trống!";
      // if ( !form.mobile || form.mobile === '' ) newErrors.mobile = 'Mobile cannot be blank!';
      if (form.mobile && !form.mobile.match("[0-9]{10}"))
        newErrors.mobile = "Số điện thoại không hợp lệ!";
      if (!form.email || form.email === "")
        newErrors.email = "Email không được để trống!";
      else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(form.email))
        newErrors.email = "Email không hợp lệ!";
    }
    if (type == 2) {
      if (!name || name === "") newErrors.name = "Họ và tên không được để trống!";
      if (!username || username === "")
        newErrors.username = "Tài khoản không được để trống!";
      // if ( !password || password === '' ) newErrors.password = 'Password cannot be blank!';
      if (!role || role === "") newErrors.role = "Phân quyền không được để trống!";
      if (!status || status === "")
        newErrors.status = "Trạng tháu không được để trống!";
      // if ( !address || address === '' ) newErrors.address = 'Address cannot be blank!';
      if (!department_id || department_id === "")
        newErrors.department_id = "Khoa/Phòng không được để trống!";
      // if ( !mobile || mobile === '' ) newErrors.mobile = 'Mobile cannot be blank!';
      else if (!mobile.match("[0-9]{10}"))
        newErrors.mobile = "Số điện thoại không hợp lệ!";
      if (!email || email === "") newErrors.email = "Email không được để trống!";
      else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(email))
        newErrors.email = "Email không hợp lệ!";
    }

    return newErrors;
  };

  const roleConfig = [
    { id: 1, value: "Quản trị hệ thống" },
    { id: 2, value: "Quản lý phòng thiết bị" },
    { id: 3, value: "Nhân viên Khoa/Phòng" },
  ];

  const statusConfig = [
    { id: -1, value: "Ngừng sử dụng" },
    { id: 1, value: "Đang sử dụng" },
  ];

  const genStatusClass = (status) => {
    if (status) {
      let nameStatus = statusConfig.find((item) => item.id === status);
      switch (status) {
        case 1:
          return (
            <span className="text-success">{nameStatus?.value || "N/A"}</span>
          );
        default:
          return (
            <span className="text-danger">{nameStatus?.value || "N/A"}</span>
          );
      }
    }
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
                  Danh sách người dùng
                  <button
                    onClick={() => setShowCre(true)}
                    type="button"
                    className="btn btn-info"
                    style={{ padding: "6px 14px", fontSize: 14 }}
                  >
                    <span>Thêm mới</span>
                  </button>
                </Card.Title>
                <div className="my-4">
                  <FilterUser
                    departmentConfig={departmentConfig}
                    paging={paging}
                    setPaging={setPaging}
                    getUserList={getUserList}
                    setParams={setParams}
                  />
                </div>
              </Card.Header>
              <Card.Body className="table-wrapper-scroll-y my-custom-scrollbar">
                <Table className="table-hover table-striped">
                  <thead>
                    <tr>
                      <th className=" text-nowrap">STT</th>
                      <th className="border-0 text-nowrap">Họ và tên</th>
                      <th className="border-0 text-nowrap">Tài khoản</th>
                      <th className="border-0 text-nowrap">Email</th>
                      <th className="border-0 text-nowrap">Số điện thoại</th>
                      <th className="border-0">Địa chỉ</th>
                      <th className="border-0 text-nowrap">Khoa/Phòng</th>
                      <th className="border-0 text-nowrap">Trạng thái</th>
                      <th className="border-0 text-nowrap">Hành động</th>
                    </tr>
                  </thead>
                  <tbody>
                    {users.length > 0 ? (
                      users.map((item, index) => (
                        <tr key={index}>
                          <td>
                            {(paging.page - 1) * paging.page_size + (index + 1)}
                          </td>
                          <td className="text-break" style={{ minWidth: 200 }}>
                            {item.full_name || "N/A"}
                          </td>
                          <td className="text-break" style={{ minWidth: 120 }}>
                            {item.username || "N/A"}
                          </td>
                          <td className="text-nowrap" style={{ minWidth: 200 }}>
                            {item.email || "N/A"}
                          </td>
                          <td className="text-nowrap" style={{ minWidth: 130 }}>
                            {item.mobile || "N/A"}
                          </td>
                          <td className="text break" style={{ minWidth: 250 }}>
                            {item.address || "N/A"}
                          </td>
                          <td className="text-break" style={{ minWidth: 250 }}>
                            {item.department?.department_name || "N/A"}
                          </td>
                          <td className="text-nowrap" style={{ minWidth: 100 }}>
                            {genStatusClass(item.status)}
                          </td>
                          <td className="d-flex justify-between align-items-center">
                            <button
                              className={"btn btn-sm btn-info text-nowrap"}
                              style={{ padding: "3px 8px", width: 65 }}
                              onClick={() => handleEditOn(item.id)}
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
                          </td>
                        </tr>
                      ))
                    ) : (
                      <>
                        <tr>
                          <td
                            colSpan={8}
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

        <Modal show={showModal} dialogClassName="dialog-confirm">
          <Modal.Body className="d-flex justify-content-center">
            Bạn có muốn xóa người dùng này không?
          </Modal.Body>
          <Modal.Footer className="d-flex justify-content-center">
            <button
              className="btn btn-primary"
              style={{ padding: "5px 20px", marginRight: 5 }}
              onClick={() => handleDelete(idDel)}
            >
              Đống ý
            </button>
            <button
              className="btn btn-secondary"
              style={{ padding: "5px 20px", marginLeft: 5 }}
              onClick={() => setShowModal(false)}
            >
              Hủy
            </button>
          </Modal.Footer>
        </Modal>

        <Modal show={showCre} size="lg" dialogClassName="dialog-style">
          <Modal.Header style={{ justifyContent: "center" }}>
            <div style={{ fontSize: 21 }}>Thêm mới người dùng</div>
          </Modal.Header>
          <Modal.Body>
            <Form>
              <Form.Group>
                <Form.Label>Họ và tên: </Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Nhập họ và tên"
                  onChange={(e) => setField("full_name", e.target.value)}
                  isInvalid={!!errors.full_name}
                />
                {errors.full_name && (
                  <span
                    style={{ fontSize: 12, color: "#dc3545", fontWeight: 100 }}
                  >
                    {errors.full_name}
                  </span>
                )}
              </Form.Group>
              <div className="row">
                <div className="col-md-6 mb-2">
                  <Form.Group style={{ marginTop: 10 }}>
                    <Form.Label>Tài khoản:</Form.Label>
                    <Form.Control
                      type="text"
                      placeholder="Nhập tên tài khoản"
                      onChange={(e) => setField("username", e.target.value)}
                      isInvalid={!!errors.username}
                    />
                    {errors.username && (
                      <span
                        style={{
                          fontSize: 12,
                          color: "#dc3545",
                          fontWeight: 100,
                        }}
                      >
                        {errors.username}
                      </span>
                    )}
                  </Form.Group>
                </div>
                <div className="col-md-6 mb-2">
                  <Form.Group style={{ marginTop: 10 }}>
                    <Form.Label>Khoa/Phòng:</Form.Label>
                    <Form.Control
                      as="select"
                      onChange={(e) =>
                        setField("department_id", e.target.value)
                      }
                      isInvalid={!!errors.department_id}
                    >
                      <option className="d-none" value="">
                        Chọn Khoa/Phòng
                      </option>
                      {departmentConfig.length > 0 &&
                        departmentConfig.map((item, index) => (
                          <option key={index} value={item.id}>
                            {item.department_name}
                          </option>
                        ))}
                    </Form.Control>
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
              </div>
              <div className="row">
                <div className="col-md-6 mb-2">
                  <Form.Group style={{ marginTop: 10 }}>
                    <Form.Label>Mật khẩu:</Form.Label>
                    <Form.Control
                      type="password"
                      placeholder="Nhập mật khẩu"
                      onChange={(e) => setField("password", e.target.value)}
                      isInvalid={!!errors.password}
                    />
                    {errors.password && (
                      <span
                        style={{
                          fontSize: 12,
                          color: "#dc3545",
                          fontWeight: 100,
                        }}
                      >
                        {errors.password}
                      </span>
                    )}
                  </Form.Group>
                </div>
                <div className="col-md-3 mb-2">
                  <Form.Group style={{ marginTop: 10 }}>
                    <Form.Label>Phân quyền:</Form.Label>
                    <Form.Control
                      as="select"
                      placeholder="Enter role"
                      onChange={(e) => setField("role", e.target.value)}
                      isInvalid={!!errors.role}
                    >
                      <option className="d-none" value="">
                        Chọn vai trò
                      </option>
                      {roleConfig.length > 0 &&
                        roleConfig.map((item, index) => (
                          <option key={index} value={item.id}>
                            {item.value}
                          </option>
                        ))}
                    </Form.Control>
                    {errors.role && (
                      <span
                        style={{
                          fontSize: 12,
                          color: "#dc3545",
                          fontWeight: 100,
                        }}
                      >
                        {errors.role}
                      </span>
                    )}
                  </Form.Group>
                </div>
                <div className="col-md-3 mb-2">
                  <Form.Group style={{ marginTop: 10 }}>
                    <Form.Label>Trạng thái:</Form.Label>
                    <Form.Control
                      as="select"
                      placeholder="Enter status"
                      onChange={(e) => setField("status", e.target.value)}
                      isInvalid={!!errors.status}
                    >
                      <option className="d-none" value="">
                        Chọn trạng thái
                      </option>
                      {statusConfig.length > 0 &&
                        statusConfig.map((item, index) => (
                          <option key={index} value={item.id}>
                            {item.value}
                          </option>
                        ))}
                    </Form.Control>
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
              </div>
              <Form.Group style={{ marginTop: 10 }}>
                <Form.Label>Địa chỉ:</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Nhập địa chỉ của người dùng"
                  onChange={(e) => setField("address", e.target.value)}
                  isInvalid={!!errors.address}
                />
                {errors.address && (
                  <span
                    style={{ fontSize: 12, color: "#dc3545", fontWeight: 100 }}
                  >
                    {errors.address}
                  </span>
                )}
              </Form.Group>
              <div className="row">
                <div className="col-md-6 mb-2">
                  <Form.Group style={{ marginTop: 10 }}>
                    <Form.Label>Số điện thoại:</Form.Label>
                    <Form.Control
                      type="text"
                      placeholder="Nhập số điện thoại"
                      onChange={(e) => setField("mobile", e.target.value)}
                      isInvalid={!!errors.mobile}
                    />
                    {errors.mobile && (
                      <span
                        style={{
                          fontSize: 12,
                          color: "#dc3545",
                          fontWeight: 100,
                        }}
                      >
                        {errors.mobile}
                      </span>
                    )}
                  </Form.Group>
                </div>
                <div className="col-md-6 mb-2">
                  <Form.Group style={{ marginTop: 10 }}>
                    <Form.Label>Email:</Form.Label>
                    <Form.Control
                      type="text"
                      placeholder="Nhập email"
                      onChange={(e) => setField("email", e.target.value)}
                      isInvalid={!!errors.email}
                    />
                    {errors.email && (
                      <span
                        style={{
                          fontSize: 12,
                          color: "#dc3545",
                          fontWeight: 100,
                        }}
                      >
                        {errors.email}
                      </span>
                    )}
                  </Form.Group>
                </div>
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
              className="btn btn-light"
              style={{ marginLeft: 10, padding: "10px 10px" }}
              onClick={handleClose}
            >
              Hủy
            </button>
          </Modal.Footer>
        </Modal>

        <Modal show={showEdit} size="lg" dialogClassName="dialog-style">
          <Modal.Header style={{ justifyContent: "center" }}>
            <div style={{ fontSize: 21 }}>Cập nhật thông tin người dùng</div>
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
                    <Form.Label>Họ và tên: </Form.Label>
                    <Form.Control
                      type="text"
                      placeholder="Nhập họ và tên"
                      value={name || ""}
                      onChange={(e) => {
                        setName(e.target.value);
                        setField("full_name", e.target.value);
                      }}
                      isInvalid={!!errors.name}
                    />
                    {errors.name && (
                      <span
                        style={{
                          fontSize: 12,
                          color: "#dc3545",
                          fontWeight: 100,
                        }}
                      >
                        {errors.name}
                      </span>
                    )}
                  </Form.Group>
                  <div className="row">
                    <div className="col-md-6 mb-2">
                      <Form.Group style={{ marginTop: 10 }}>
                        <Form.Label>Tài khoản:</Form.Label>
                        <Form.Control
                          type="text"
                          placeholder="Nhập tên tài khoản"
                          value={username || ""}
                          onChange={(e) => {
                            setUsername(e.target.value);
                            setField("username", e.target.value);
                          }}
                          isInvalid={!!errors.username}
                        />
                        {errors.username && (
                          <span
                            style={{
                              fontSize: 12,
                              color: "#dc3545",
                              fontWeight: 100,
                            }}
                          >
                            {errors.username}
                          </span>
                        )}
                      </Form.Group>
                    </div>
                    <div className="col-md-6 mb-2">
                      <Form.Group style={{ marginTop: 10 }}>
                        <Form.Label>Khoa/Phòng:</Form.Label>
                        <Form.Control
                          as="select"
                          value={department_id || ""}
                          onChange={(e) => {
                            setDepartmentId(e.target.value);
                            setField("department_id", e.target.value);
                          }}
                          isInvalid={!!errors.department_id}
                        >
                          <option className="d-none" value="">
                            Chọn Khoa/Phòng
                          </option>
                          {departmentConfig.length > 0 &&
                            departmentConfig.map((item, index) => (
                              <option key={index} value={item.id}>
                                {item.department_name}
                              </option>
                            ))}
                        </Form.Control>
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
                  </div>
                  <div className="row">
                    <div className="col-md-6 mb-2">
                      <Form.Group style={{ marginTop: 10 }}>
                        <Form.Label>Mật khẩu:</Form.Label>
                        <Form.Control
                          type="password"
                          placeholder="Nhập mật khẩu"
                          value={password || ""}
                          onChange={(e) => {
                            setPassword(e.target.value);
                            setField("password", e.target.value);
                          }}
                          isInvalid={!!errors.password}
                        />
                        {errors.password && (
                          <span
                            style={{
                              fontSize: 12,
                              color: "#dc3545",
                              fontWeight: 100,
                            }}
                          >
                            {errors.password}
                          </span>
                        )}
                      </Form.Group>
                    </div>
                    <div className="col-md-3 mb-2">
                      <Form.Group style={{ marginTop: 10 }}>
                        <Form.Label>Phân quyền:</Form.Label>
                        <Form.Control
                          as="select"
                          placeholder="Enter role"
                          value={role || ""}
                          onChange={(e) => {
                            setRole(Number(e.target.value));
                            setField("role", e.target.value);
                          }}
                          isInvalid={!!errors.role}
                        >
                          <option className="d-none" value="">
                            Chọn vai trò
                          </option>
                          {roleConfig.length > 0 &&
                            roleConfig.map((item, index) => (
                              <option key={index} value={item.id}>
                                {item.value}
                              </option>
                            ))}
                        </Form.Control>
                        {errors.role && (
                          <span
                            style={{
                              fontSize: 12,
                              color: "#dc3545",
                              fontWeight: 100,
                            }}
                          >
                            {errors.role}
                          </span>
                        )}
                      </Form.Group>
                    </div>
                    <div className="col-md-3 mb-2">
                      <Form.Group style={{ marginTop: 10 }}>
                        <Form.Label>Trạng thái:</Form.Label>
                        <Form.Control
                          as="select"
                          placeholder="Enter status"
                          value={status || ""}
                          onChange={(e) => {
                            setStatus(e.target.value);
                            setField("status", e.target.value);
                          }}
                          isInvalid={!!errors.status}
                        >
                          <option className="d-none" value="">
                            Chọn trạng thái
                          </option>
                          {statusConfig.length > 0 &&
                            statusConfig.map((item, index) => (
                              <option key={index} value={item.id}>
                                {item.value}
                              </option>
                            ))}
                        </Form.Control>
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
                  </div>
                  <Form.Group style={{ marginTop: 10 }}>
                    <Form.Label>Địa chỉ:</Form.Label>
                    <Form.Control
                      type="text"
                      placeholder="Nhập địa chỉ người dùng"
                      value={address || ""}
                      onChange={(e) => {
                        setAddress(e.target.value);
                        setField("address", e.target.value);
                      }}
                      isInvalid={!!errors.address}
                    />
                    {errors.address && (
                      <span
                        style={{
                          fontSize: 12,
                          color: "#dc3545",
                          fontWeight: 100,
                        }}
                      >
                        {errors.address}
                      </span>
                    )}
                  </Form.Group>
                  <div className="row">
                    <div className="col-md-6 mb-2">
                      <Form.Group style={{ marginTop: 10 }}>
                        <Form.Label>Số điện thoại:</Form.Label>
                        <Form.Control
                          type="text"
                          placeholder="Nhập số điện thoại"
                          value={mobile || ""}
                          onChange={(e) => {
                            setMobile(e.target.value);
                            setField("mobile", e.target.value);
                          }}
                          isInvalid={!!errors.mobile}
                        />
                        {errors.mobile && (
                          <span
                            style={{
                              fontSize: 12,
                              color: "#dc3545",
                              fontWeight: 100,
                            }}
                          >
                            {errors.mobile}
                          </span>
                        )}
                      </Form.Group>
                    </div>
                    <div className="col-md-6 mb-2">
                      <Form.Group style={{ marginTop: 10 }}>
                        <Form.Label>Email:</Form.Label>
                        <Form.Control
                          type="text"
                          placeholder="Nhập email"
                          value={email || ""}
                          onChange={(e) => {
                            setEmail(e.target.value);
                            setField("email", e.target.value);
                          }}
                          isInvalid={!!errors.email}
                        />
                        {errors.email && (
                          <span
                            style={{
                              fontSize: 12,
                              color: "#dc3545",
                              fontWeight: 100,
                            }}
                          >
                            {errors.email}
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

            <button
              type="button"
              className="btn btn-light"
              style={{ marginLeft: 10, padding: "10px 10px" }}
              onClick={handleEditOff}
            >
              Hủy
            </button>
          </Modal.Footer>
        </Modal>
      </Container>
    </>
  );
}

export default UserPage;
