import departmentApi from "api/admin/departmentService";
import React, { useEffect, useState } from "react";
import { Modal, Form } from "react-bootstrap";
import { MDBSpinner } from "mdb-react-ui-kit";
import { Card, Table, Container, Row, Col } from "react-bootstrap";
import moment from "moment";
import { Pagination, message } from "antd";
import { useDispatch } from "react-redux";
import { toggleShowLoading } from "redux/actions/common-action";
import { timeDelay } from "../../common";
import { FilterDepartment } from "./filter";

function DepartmentPage() {
  // const [loading, setLoading] = useState(false);
  const [loadingForm, setLoadingForm] = useState(false);
  const [loadingButton, setLoadingButton] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [paging, setPaging] = useState({ page: 1, page_size: 20, total: 0 });
  const [params, setParams] = useState({ department_name: null });

  const [departments, setDepartments] = useState([]);

  const [deName, setDeName] = useState();
  const [address, setAdress] = useState();
  const [manager, setManager] = useState();
  const [mobile, setMobile] = useState();

  const [idDel, setIdDel] = useState();
  const [idEdit, setIdEdit] = useState();

  const [deNameEdit, setDeNameEdit] = useState();
  const [addressEdit, setAdressEdit] = useState();
  const [managerEdit, setManagerEdit] = useState();
  const [mobileEdit, setMobileEdit] = useState();

  const [showModal, setShowModal] = useState(false);
  const [showCre, setShowCre] = useState(false);

  const role = Number(localStorage.getItem("role"));

  const handleClose = () => {
    setShowCre(false);
    setErrors({});
    setForm({});
    setLoadingButton(false);
    setDeName(null);
    setAdress(null);
    setManager(null);
    setMobile(null);
  };

  const [edit, setEdit] = useState(false);

  const handleEditOn = (id) => {
    getDepartmentById(id);
    setEdit(true);
    setForm({});
    setErrors({});
  };

  const handleEditOff = () => {
    setEdit(false);
    setErrors({});
    setForm({});
    setLoadingButton(false);
    setDeNameEdit(null);
    setAdressEdit(null);
    setManagerEdit(null);
    setMobileEdit(null);
  };

  const [form, setForm] = useState({});
  const [errors, setErrors] = useState({});
  const dispatch = useDispatch();

  useEffect(() => {
    paging.page = currentPage;
    getDepartmentList({ ...paging });
  }, [currentPage]);

  const getDepartmentList = async (filters) => {
    try {
      // setLoading(true);
      dispatch(toggleShowLoading(true));
      const response = await departmentApi.getDepartments(filters);
      await timeDelay(1000);
      if (response.status === "success" || response.status === 200) {
        setDepartments(response.data.departments);
        setPaging({ ...response.data.meta });
      } else {
        message.error(response.message || "Lỗi! Vui lòng thử lại.");
      }
      // setLoading(false);
      dispatch(toggleShowLoading(false));
    } catch (e) {
      console.log(e);
      dispatch(toggleShowLoading(false));
      // setLoading(false);
    }
  };

  const getDepartmentById = async (id) => {
    try {
      setLoadingForm(true);
      dispatch(toggleShowLoading(true));
      const response = await departmentApi.getDepartmentById(id);
      await timeDelay(1000);
      if (response.status === "success" || response.status === 200) {
        setIdEdit(response.data.id);
        setDeNameEdit(response.data.department_name);
        setAdressEdit(response.data.address);
        setManagerEdit(response.data.manager);
        setMobileEdit(response.data.mobile);
        setForm({
          deNameEdit: response.data.department_name,
          addressEdit: response.data.address,
          managerEdit: response.data.manager,
          mobileEdit: response.data.mobile,
        });
      } else {
        message.error(response.message || "Lỗi! Vui lòng thử lại.");
      }
      setLoadingForm(false);
      dispatch(toggleShowLoading(false));
    } catch (e) {
      console.log(e);
      setLoadingForm(false);
      dispatch(toggleShowLoading(false));
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
        let data = {
          department_name: deName,
          address: address,
          manager: manager,
          mobile: mobile,
        };
        const response = await departmentApi.createDepartment(data);
        await timeDelay(1000);
        if (
          response.status === 201 ||
          response.status === 200 ||
          response.status === "success"
        ) {
          await getDepartmentList({ page: 1 });
          handleClose();
          setLoadingForm(false);
          message.success("Thêm mới thành công!");
          dispatch(toggleShowLoading(false));
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
          setLoadingForm(false);
          dispatch(toggleShowLoading(false));
        }
      }
    } catch (e) {
      console.log(e);
      message.error(e.message || "Lỗi! Vui lòng thử lại.");
      setLoadingButton(false);
      dispatch(toggleShowLoading(false));
    }
  };

  const handleUpdate = async (id) => {
    // console.log(id);
    try {
      setLoadingButton(true);
      const newErrors = findFormErrors(2);
      if (Object.keys(newErrors).length > 0) {
        setErrors(newErrors);
        setLoadingButton(false);
        // console.log('Sai');
      } else {
        dispatch(toggleShowLoading(true));
        let data = {
          department_name: deNameEdit,
          address: addressEdit,
          manager: managerEdit,
          mobile: mobileEdit,
        };
        console.log(456);
        const response = await departmentApi.updateDepartment(id, data);
        // console.log(response);
        await timeDelay(1000);
        if (response.status === 200 || response.status === "success") {
          await getDepartmentList({ page: 1 });
          handleEditOff();
          setLoadingButton(false);
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
          setLoadingButton(false);

          dispatch(toggleShowLoading(false));
        }
      }
    } catch (e) {
      console.log(e);
      message.error(e.message || "Lỗi! Vui lòng thử lại.");
      setLoadingButton(false);
      dispatch(toggleShowLoading(false));
    }
  };

  const handleDelete = async (id) => {
    try {
      const response = await departmentApi.deleteDepartment(id);
      dispatch(toggleShowLoading(true));
      if (response.status === 200 || response.status === "success") {
        getDepartmentList({ page: 1 });
        setShowModal(false);
        setIdDel(null);
        message.success("Xóa thành công!");
      } else {
        message.error(response.message || "Lỗi! Vui lòng thử lại.");
      }
      dispatch(toggleShowLoading(false));
    } catch (e) {
      console.log(e);
      message.error(e.message || "Lỗi! Vui lòng thử lại.");
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
      if (!form.deName || form.deName === "")
        newErrors.deName = "Tên Khoa/Phòng không được để trống!";
      if (!form.address || form.address === "")
        newErrors.address = "Địa chỉ không được để trống!";
      if (!form.manager || form.manager === "")
        newErrors.manager = "Trưởng khoa/phòng không được để trống!";
      if (!form.mobile || form.mobile === "")
        newErrors.mobile = "Số điện thoại không được để trống!";
      else if (!form.mobile.match("[0-9]{10}"))
        newErrors.mobile = "Số điện thoại không hợp lệ!";
    }
    if (type == 2) {
      if (!deNameEdit || deNameEdit === "")
        newErrors.deNameEdit = "Tên Khoa/Phòng không được để trống!";
      if (!addressEdit || addressEdit === "")
        newErrors.addressEdit = "Địa chỉ không được để trống!";
      if (!managerEdit || managerEdit === "")
        newErrors.managerEdit = "Trưởng khoa/phòng không được để trống!";
      if (!mobileEdit || mobileEdit === "")
        newErrors.mobileEdit = "Số điện thoại không được để trống!";
    }

    return newErrors;
  };

  return (
    <>
      <Container fluid>
        <Row>
          <Col md="12">
            <Card className="strpied-tabled-with-hover">
              <Card.Header style={{}}>
                <Card.Title
                  className={"d-flex justify-content-between"}
                  as="h4"
                >
                  Danh sách Khoa/Phòng
                  {role === 1 && (
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
                  <FilterDepartment
                    paging={paging}
                    setPaging={setPaging}
                    getDepartmentList={getDepartmentList}
                    setParams={setParams}
                  />
                </div>
              </Card.Header>
              <Card.Body className="table-wrapper-scroll-y my-custom-scrollbar">
                <Table className="table-hover table-striped">
                  <thead>
                    <tr>
                      <th className="border-0">STT</th>
                      <th className="border-0">Tên khoa/Phòng</th>
                      <th className="border-0">Địa chỉ</th>
                      <th className="border-0">Trưởng khoa/phòng</th>
                      <th className="border-0">Số điện thoại</th>

                      {role === 1 && (
                        <>
                          {/* <th className="border-0">Ngày tạo</th> */}
                          <th className="border-0">Hành động</th>
                        </>
                      )}
                    </tr>
                  </thead>
                  {/* {loading === true &&
                                        <tbody>
                                            <tr>
                                                <td colSpan={4} style={{ backgroundColor: '#ffff' }}>
                                                    <div className='d-flex justify-content-center align-items-center' style={{ height: 500 }}>
                                                        <MDBSpinner role='status'></MDBSpinner>
                                                    </div>
                                                </td>
                                            </tr>
                                        </tbody>
                                    } */}

                  <tbody>
                    {departments.length > 0 ? (
                      departments.map((item, index) => (
                        <tr key={index}>
                          <td>
                            {(paging.page - 1) * paging.page_size + (index + 1)}
                          </td>
                          <td className="text-break" style={{ minWidth: 265 }}>
                            {item.department_name || "N/A"}
                          </td>
                          <td className="text-break" style={{ minWidth: 200 }}>
                            {item.address || "N/A"}
                          </td>
                          <td className="text-break" style={{ minWidth: 250 }}>
                            {item.manager || "N/A"}
                          </td>
                          <td className="text-break" style={{ minWidth: 250 }}>
                            {item.mobile || "N/A"}
                          </td>

                          {role === 1 && (
                            <>
                              {/* <td style={ { minWidth: 200 }}>{moment(item.created_at).format("DD/MM/yyyy")}</td> */}
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
                                    "btn btn-sm btn-danger text-nowrap ml-2"
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
                            </>
                          )}
                        </tr>
                      ))
                    ) : (
                      <>
                        <tr>
                          <td
                            colSpan={4}
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
                      getProviderList({ ...paging, page: e, ...params })
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
            Bạn có muốn xóa Khoa/Phòng này không?
          </Modal.Body>
          <Modal.Footer className="d-flex justify-content-center">
            <button
              className="btn btn-primary"
              style={{ padding: "5px 20px", marginRight: 5 }}
              onClick={() => handleDelete(idDel)}
            >
              Đồng ý
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

        <Modal show={showCre}>
          <Modal.Header style={{ justifyContent: "center" }}>
            <div style={{ fontSize: 21 }}>Thêm mới Khoa/Phòng</div>
          </Modal.Header>
          <Modal.Body>
            <Form>
              <Form.Group>
                <Form.Label>Tên Khoa/Phòng: </Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Nhập tên Khoa/Phòng"
                  onChange={(e) => {
                    setField("deName", e.target.value);
                    setDeName(e.target.value);
                  }}
                  isInvalid={!!errors.deName}
                />
                {errors.deName && (
                  <span
                    style={{ fontSize: 12, color: "#dc3545", fontWeight: 100 }}
                  >
                    {errors.deName}
                  </span>
                )}
              </Form.Group>

              <Form.Group style={{ marginTop: 15 }}>
                <Form.Label>Địa chỉ:</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Nhập địa chỉ"
                  onChange={(e) => {
                    setField("address", e.target.value);
                    setAdress(e.target.value);
                  }}
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

              <Form.Group style={{ marginTop: 15 }}>
                <Form.Label>Trưởng khoa/phòng:</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Nhập tên Trưởng khoa/phòng"
                  onChange={(e) => {
                    setField("manager", e.target.value);
                    setManager(e.target.value);
                  }}
                  isInvalid={!!errors.manager}
                />
                {errors.manager && (
                  <span
                    style={{ fontSize: 12, color: "#dc3545", fontWeight: 100 }}
                  >
                    {errors.manager}
                  </span>
                )}
              </Form.Group>

              <Form.Group style={{ marginTop: 15 }}>
                <Form.Label>Số điện thoại:</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Nhập số điện thoại"
                  onChange={(e) => {
                    setField("mobile", e.target.value);
                    setMobile(e.target.value);
                  }}
                  isInvalid={!!errors.mobile}
                />
                {errors.mobile && (
                  <span
                    style={{ fontSize: 12, color: "#dc3545", fontWeight: 100 }}
                  >
                    {errors.mobile}
                  </span>
                )}
              </Form.Group>
            </Form>
          </Modal.Body>
          <Modal.Footer style={{ justifyContent: "center", marginTop: 15 }}>
            <button
              type="submit"
              className="btn btn-primary"
              style={{ marginRight: 5, padding: "5px 10px" }}
              onClick={handleSubmit}
              disabled={loadingButton == true}
            >
              {loadingButton === true && (
                <div style={{ width: 50.05, padding: 0 }}>
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
              style={{ marginLeft: 5, padding: "5px 10px" }}
              onClick={handleClose}
            >
              Hủy
            </button>
          </Modal.Footer>
        </Modal>

        <Modal show={edit}>
          <Modal.Header style={{ justifyContent: "center" }}>
            <div style={{ fontSize: 21 }}>Cập nhật thông tin Khoa/Phòng</div>
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
                    <Form.Label>Tên Khoa/Phòng: </Form.Label>
                    <Form.Control
                      type="text"
                      placeholder="Nhập tên Khoa/Phòng"
                      value={deNameEdit || ""}
                      onChange={(e) => {
                        setDeNameEdit(e.target.value);
                        setField("deNameEdit", e.target.value);
                      }}
                      isInvalid={!!errors.deNameEdit}
                    />
                    {errors.deNameEdit && (
                      <span
                        style={{
                          fontSize: 12,
                          color: "#dc3545",
                          fontWeight: 100,
                        }}
                      >
                        {errors.deNameEdit}
                      </span>
                    )}
                  </Form.Group>

                  <Form.Group style={{ marginTop: 15 }}>
                    <Form.Label>Địa chỉ:</Form.Label>
                    <Form.Control
                      type="text"
                      placeholder="Nhập địa chỉ"
                      value={addressEdit || ""}
                      onChange={(e) => {
                        setAdressEdit(e.target.value);
                        setField("addressEdit", e.target.value);
                      }}
                      isInvalid={!!errors.addressEdit}
                    />
                    {errors.addressEdit && (
                      <span
                        style={{
                          fontSize: 12,
                          color: "#dc3545",
                          fontWeight: 100,
                        }}
                      >
                        {errors.addressEdit}
                      </span>
                    )}
                  </Form.Group>

                  <Form.Group style={{ marginTop: 15 }}>
                    <Form.Label>Trưởng khoa/phòng:</Form.Label>
                    <Form.Control
                      type="text"
                      placeholder="Nhập tên Trưởng khoa/phòng"
                      value={managerEdit || ""}
                      onChange={(e) => {
                        setManagerEdit(e.target.value);
                        setField("managerEdit", e.target.value);
                      }}
                      isInvalid={!!errors.managerEdit}
                    />
                    {errors.managerEdit && (
                      <span
                        style={{
                          fontSize: 12,
                          color: "#dc3545",
                          fontWeight: 100,
                        }}
                      >
                        {errors.managerEdit}
                      </span>
                    )}
                  </Form.Group>

                  <Form.Group style={{ marginTop: 15 }}>
                    <Form.Label>Số điện thoại:</Form.Label>
                    <Form.Control
                      type="text"
                      placeholder="Nhập số điện thoại"
                      value={mobileEdit || ""}
                      onChange={(e) => {
                        setMobileEdit(e.target.value);
                        setField("mobileEdit", e.target.value);
                      }}
                      isInvalid={!!errors.mobileEdit}
                    />
                    {errors.mobileEdit && (
                      <span
                        style={{
                          fontSize: 12,
                          color: "#dc3545",
                          fontWeight: 100,
                        }}
                      >
                        {errors.mobileEdit}
                      </span>
                    )}
                  </Form.Group>
                </Form>
              </Modal.Body>
              <Modal.Footer style={{ justifyContent: "center", marginTop: 15 }}>
                <button
                  type="submit"
                  className="btn btn-primary"
                  style={{ marginRight: 5, padding: "5px 10px", width: 90 }}
                  onClick={() => handleUpdate(idEdit)}
                >
                  {loadingButton === true && (
                    <div style={{ width: 60, padding: 0 }}>
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
                  style={{ marginLeft: 5, padding: "5px 10px" }}
                  onClick={handleEditOff}
                >
                  Hủy
                </button>
              </Modal.Footer>
            </>
          )}
        </Modal>
      </Container>
    </>
  );
}

export default DepartmentPage;
