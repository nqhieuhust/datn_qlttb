import providerApi from "api/admin/providerService";
import React, { useEffect, useState } from "react";
import { Modal, Form } from "react-bootstrap";
import { MDBSpinner } from "mdb-react-ui-kit";
import { Card, Table, Container, Row, Col } from "react-bootstrap";
import { Pagination, message } from "antd";
import { toggleShowLoading } from "redux/actions/common-action";
import { useDispatch } from "react-redux";
import { timeDelay } from "api/common";
import { FilterProvider } from "./filters";

function ProviderPage() {
  const [loading, setLoading] = useState(false);
  const [loadingForm, setLoadingForm] = useState(false);
  const [loadingButton, setLoadingButton] = useState(false);
  const [paging, setPaging] = useState({ page: 1, page_size: 20, total: 0 });

  const [providers, setProviders] = useState([]);

  const [providerName, setProviderName] = useState();
  const [address, setAddress] = useState();
  const [representator, setrepresentator] = useState();
  const [mobile, setMobile] = useState();
  const [email, setEmail] = useState();

  const [idDel, setIdDel] = useState();
  const [idEdit, setIdEdit] = useState();

  const [showModal, setShowModal] = useState(false);
  const [showCre, setShowCre] = useState(false);
  const [showEdit, setShowEdit] = useState(false);
  const [params, setParams] = useState({
    provider_name: "",
    email: "",
    mobile: "",
  });

  const clearProviderEdit = () => {
    setProviderName(null);
    setAddress(null);
    setrepresentator(null);
    setMobile(null);
    setEmail(null);
  };

  const handleClose = () => {
    setShowCre(false);
    setErrors({});
    setForm({});
    setLoadingButton(false);
  };

  const handleEditOn = (id) => {
    getProviderById(id);
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
    // paging.page = currentPage;
    getProviderList({ ...paging });
  }, []);

  const getProviderList = async (filters) => {
    try {
      setLoading(true);
      dispatch(toggleShowLoading(true));
      const response = await providerApi.getProviders(filters);
      await timeDelay(1000);
      if (response.status === "success") {
        setProviders(response.data.providers);
        setPaging({ ...response.data.meta });
        setLoading(false);
        dispatch(toggleShowLoading(false));
      } else {
        message.error(response.message || "Lỗi! Vui lòng thử lại.");
        dispatch(toggleShowLoading(false));
      }
      setLoading(false);
    } catch (e) {
      console.log(e);
      setLoading(false);
      message.error(response.message || "Lỗi! Vui lòng thử lại.");
      dispatch(toggleShowLoading(false));
    }
  };

  const getProviderById = async (id) => {
    try {
      setLoadingForm(true);
      dispatch(toggleShowLoading(true));
      const response = await providerApi.getProviderById(id);
      await timeDelay(1000);
      if (response.status == 200 || response.status === "success") {
        setIdEdit(response.data.id);
        setProviderName(response.data.provider_name);
        setAddress(response.data.address);
        setrepresentator(response.data.representator);
        setMobile(response.data.mobile);
        setEmail(response.data.email);
        setForm({
          provider_name: response.data.provider_name,
          address: response.data.address,
          representator: response.data.representator,
          mobile: response.data.mobile,
          email: response.data.email,
        });
        setLoadingForm(false);
        dispatch(toggleShowLoading(false));
      } else {
        message.error(response.message || "Lỗi! Vui lòng thử lại.");
        setLoadingForm(false);
        dispatch(toggleShowLoading(false));
      }
    } catch (e) {
      console.log(e);
      message.error(response.message || "Lỗi! Vui lòng thử lại.");
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
        const response = await providerApi.createProvider(form);
        if (response.status === 201 || response.status === "success") {
          await getProviderList({ page: 1 });
          handleClose();
          message.success("Thêm mới thành công!");
          setLoadingButton(false);
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
      message.error(response.message || "Lỗi! Vui lòng thử lại.");
      setLoadingForm(false);
      dispatch(toggleShowLoading(false));
    }
  };

  const handleUpdate = async (id) => {
    try {
      setLoadingButton(true);
      const newErrors = findFormErrors(2);
      if (Object.keys(newErrors).length > 0) {
        setErrors(newErrors);
        setLoadingButton(false);
        // console.log(123);
      } else {
        // console.log(456);
        dispatch(toggleShowLoading(true));
        const response = await providerApi.updateProvider(id, form);
        if (response.status === "success") {
          await getProviderList({ page: 1 });
          handleEditOff();
          message.success("Cập nhật thành công!");
          dispatch(toggleShowLoading(false));
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
      dispatch(toggleShowLoading(true));
      const response = await providerApi.deleteProvider(id);
      if (response.status === "success") {
        await getProviderList({ page: 1 });
        setShowModal(false);
        setIdDel(null);
        message.success("Xóa thành công!");
        dispatch(toggleShowLoading(false));
      } else {
        message.error(response.message || "Lỗi! Vui lòng thử lại.");
        dispatch(toggleShowLoading(false));
      }
    } catch (e) {
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
      if (!form.provider_name || form.provider_name === "")
        newErrors.provider_name = "Nhà cung cấp không được để trống!";
      if (!form.address || form.address === "")
        newErrors.address = "Địa chỉ không được để trống!";
      if (!form.representator || form.representator === "")
        newErrors.representator = "Người đại diện không được để trống!";
      if (!form.mobile || form.mobile === "")
        newErrors.mobile = "Số điện thoại không được để trống!";
      else if (!form.mobile.match("[0-9]{10}"))
        newErrors.mobile = "Số điện thoại không hợp lệ!";
      if (!form.email || form.email === "")
        newErrors.email = "Email không được để trống!";
      else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(form.email))
        newErrors.email = "Email không hợp lệ!";
    }
    if (type == 2) {
      if (!providerName || providerName === "")
        newErrors.provider_name = "Nhà cung cấp không được để trống!";
      if (!address || address === "")
        newErrors.address = "Địa chỉ không được để trống!";
      if (!representator || representator === "")
        newErrors.representator = "Người đại diện không được để trống!";
      if (!mobile || mobile === "")
        newErrors.mobile = "Số điện thoại không được để trống!";
      else if (!mobile.match("[0-9]{10}"))
        newErrors.mobile = "Số điện thoại không hợp lệ!";
      if (!email || email === "")
        newErrors.email = "Email không được để trống!";
      else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(email))
        newErrors.email = "Email không hợp lệ!";
    }

    return newErrors;
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
                  Danh sách Nhà cung cấp
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
                  <FilterProvider
                    getProviderList={getProviderList}
                    paging={paging}
                    setPaging={setPaging}
                    setParams={setParams}
                  />
                </div>
              </Card.Header>

              <Card.Body className="table-wrapper-scroll-y my-custom-scrollbar">
                <Table className="table-hover table-striped">
                  <thead>
                    <tr>
                      <th className="border-0 text-nowrap">STT</th>
                      <th className="border-0 text-nowrap">Tên nhà cung cấp</th>
                      <th className="border-0 text-nowrap">Địa chỉ</th>
                      <th className="border-0 text-nowrap">Người đại diện</th>
                      <th className="border-0 text-nowrap">Số điện thoại</th>
                      <th className="border-0 text-nowrap">Email</th>
                      <th className="border-0 text-nowrap">Hành động</th>
                    </tr>
                  </thead>
                  <tbody>
                    {providers.length > 0 ? (
                      providers.map((item, index) => (
                        <tr key={index}>
                          <td>
                            {(paging.page - 1) * paging.page_size + (index + 1)}
                          </td>
                          <td className="text-break" style={{ minWidth: 350 }}>
                            {item.provider_name || "N/A"}
                          </td>
                          <td className="text-break" style={{ minWidth: 330 }}>
                            {item.address || "N/A"}
                          </td>
                          <td className="text-break" style={{ minWidth: 150 }}>
                            {item.representator || "N/A"}
                          </td>
                          <td className="text-nowrap" style={{ minWidth: 150 }}>
                            {item.mobile || "N/A"}
                          </td>
                          <td className="text-nowrap">{item.email || "N/A"}</td>
                          <td>
                            <div className="d-flex justify-between align-items-center">
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
                            </div>
                          </td>
                        </tr>
                      ))
                    ) : (
                      <>
                        <tr>
                          <td
                            colSpan={7}
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
            Bạn có muốn xóa nhà cung cấp này không?
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

        <Modal show={showCre} size="lg" dialogClassName="dialog-style">
          <Modal.Header style={{ justifyContent: "center" }}>
            <div style={{ fontSize: 21 }}>Thêm mới nhà cung cấp</div>
          </Modal.Header>
          <Modal.Body>
            <Form>
              <Form.Group>
                <Form.Label>Tên nhà cung cấp: </Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Nhập tên nhà cung cấp"
                  onChange={(e) => setField("provider_name", e.target.value)}
                  isInvalid={!!errors.provider_name}
                />
                {errors.provider_name && (
                  <span
                    style={{ fontSize: 12, color: "#dc3545", fontWeight: 100 }}
                  >
                    {errors.provider_name}
                  </span>
                )}
              </Form.Group>

              <Form.Group style={{ marginTop: 10 }}>
                <Form.Label>Địa chỉ:</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Nhập địa chỉ"
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
              <Form.Group style={{ marginTop: 10 }}>
                <Form.Label>Người đại diện:</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Nhập tên người đại diện"
                  onChange={(e) => setField("representator", e.target.value)}
                  isInvalid={!!errors.representator}
                />
                {errors.representator && (
                  <span
                    style={{ fontSize: 12, color: "#dc3545", fontWeight: 100 }}
                  >
                    {errors.representator}
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
                      placeholder="Nhập Email"
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
            <div style={{ fontSize: 21 }}>Cập nhật thông tin Nhà cung cấp</div>
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
                    <Form.Label>Tên nhà cung cấp: </Form.Label>
                    <Form.Control
                      type="text"
                      placeholder="Nhập tên nhà cung cấp"
                      value={providerName || ""}
                      onChange={(e) => {
                        setProviderName(e.target.value);
                        setField("provider_name", e.target.value);
                      }}
                      isInvalid={!!errors.provider_name}
                    />
                    {errors.provider_name && (
                      <span
                        style={{
                          fontSize: 12,
                          color: "#dc3545",
                          fontWeight: 100,
                        }}
                      >
                        {errors.provider_name}
                      </span>
                    )}
                  </Form.Group>

                  <Form.Group style={{ marginTop: 10 }}>
                    <Form.Label>Địa chỉ:</Form.Label>
                    <Form.Control
                      type="text"
                      placeholder="Nhập địa chỉ"
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
                  <Form.Group style={{ marginTop: 10 }}>
                    <Form.Label>Người đại diện:</Form.Label>
                    <Form.Control
                      type="text"
                      placeholder="Nhập tên người đại diện"
                      value={representator || ""}
                      onChange={(e) => {
                        setrepresentator(e.target.value);
                        setField("representator", e.target.value);
                      }}
                      isInvalid={!!errors.representator}
                    />
                    {errors.representator && (
                      <span
                        style={{
                          fontSize: 12,
                          color: "#dc3545",
                          fontWeight: 100,
                        }}
                      >
                        {errors.representator}
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
                          placeholder="Nhập Email"
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

export default ProviderPage;
