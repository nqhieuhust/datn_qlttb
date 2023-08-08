import React, { useEffect, useState } from "react";
import { Modal, Form } from "react-bootstrap";
import { MDBSpinner } from "mdb-react-ui-kit";
import { Card, Table, Container, Row, Col } from "react-bootstrap";
import providerApi from "api/admin/providerService";
import accessoryApi from "api/admin/accessoryService";
import moment from "moment";
import { useDispatch } from "react-redux";
import { toggleShowLoading } from "redux/actions/common-action";
import { timeDelay } from "../../common";
import { Pagination, message } from "antd";
import { FilterAccessory } from "./filter";

function AccessoryPage() {
  // const [loading, setLoading] = useState(false);
  const [loadingForm, setLoadingForm] = useState(false);
  const [loadingButton, setLoadingButton] = useState(false);

  const [currentPage, setCurrentPage] = useState(1);
  const [paging, setPaging] = useState({ page: 1, page_size: 20, total: 0 });
  const [params, setParams] = useState({});

  const [accessories, setAccessories] = useState([]);

  const [accessory_name, setAccessoryName] = useState();
  const [quantity, setQuantity] = useState();
  const [unit, setUnit] = useState();
  const [import_date, setImportDate] = useState();
  const [status, setStatus] = useState();
  const [provider, setProvider] = useState();

  const [providerConfig, setProviderConfig] = useState([]);

  const [idDel, setIdDel] = useState();
  const [idEdit, setIdEdit] = useState();

  const [showModal, setShowModal] = useState(false);
  const [showCre, setShowCre] = useState(false);
  const [showEdit, setShowEdit] = useState(false);

  const dispatch = useDispatch();
  const role = Number(localStorage.getItem("role"));

  const clearAccessoryEdit = () => {
    setAccessoryName(null);
    setQuantity(null);
    setUnit(null);
    setImportDate(null);
    setStatus(null);
    setProvider(null);
  };

  const handleClose = () => {
    setShowCre(false);
    setErrors({});
    setForm({});
    setLoadingButton(false);
  };

  const handleEditOn = (id) => {
    getAccessoryById(id);
    setShowEdit(true);
    setForm({});
    setErrors({});
  };

  const handleEditOff = () => {
    setShowEdit(false);
    setErrors({});
    setForm({});
    setLoadingButton(false);
    clearAccessoryEdit();
  };

  const [form, setForm] = useState({});
  const [errors, setErrors] = useState({});

  useEffect(() => {
    getProviderList({ page: 1, page_size: 200 });
  }, []);

  useEffect(() => {
    paging.page = currentPage;
    getAccessoryList({ ...paging });
  }, [currentPage]);

  const getAccessoryList = async (filters) => {
    try {
      // setLoading(true);
      dispatch(toggleShowLoading(true));
      const response = await accessoryApi.getAccessories(filters);
      await timeDelay(1000);
      if (response.status === 200 || response.status === "success") {
        setAccessories(response.data.accessories);
        setPaging({ ...response.data.meta });
      }
      // setLoading(false);
      dispatch(toggleShowLoading(false));
    } catch (e) {
      console.log("list acc-------> ", e);
      dispatch(toggleShowLoading(false));
      // setLoading(false);
    }
  };

  const getProviderList = async (filters) => {
    try {
      const response = await providerApi.getProviders(filters);
      if (response.status === 200 || response.status === "success") {
        setProviderConfig(response.data.providers);
      }
    } catch (e) {
      console.log("list p----------> ", e);
    }
  };

  const getAccessoryById = async (id) => {
    try {
      setLoadingForm(true);
      dispatch(toggleShowLoading(true));
      const response = await accessoryApi.getAccessoryById(id);
      await timeDelay(1000);
      if (response.status == 200 || response.status === "success") {
        setIdEdit(id);
        setAccessoryName(response.data.accessory_name);
        setQuantity(response.data.quantity);
        setUnit(response.data.unit);
        setImportDate(moment(response.data.import_date).format("YYYY-MM-DD"));
        setStatus(response.data.status);
        setProvider(response.data.provider_id);
        setForm({
          accessory_name: response.data.accessory_name,
          quantity: response.data.quantity,
          unit: response.data.unit,
          import_date: response.data.import_date,
          status: response.data.status,
          provider_id: response.data?.provider_id,
        });
      }
      setLoadingForm(false);
      dispatch(toggleShowLoading(false));
    } catch (e) {
      console.log("id acc-------> ", e);
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
        form.status = parseInt(form.status);
        form.provider_id = parseInt(form.provider_id);
        form.quantity = parseInt(form.quantity);
        dispatch(toggleShowLoading(true));
        const response = await accessoryApi.createAccessory(form);
        await timeDelay(1000);
        if (
          response.status === 201 ||
          response.status === 200 ||
          response.status === "success"
        ) {
          getAccessoryList({ page: 1 });
          handleClose();
          message.success("Create accessory successfully!");
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
      message.error(error.message);
      setLoadingButton(false);
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
      } else {
        form.status = parseInt(form.status);
        form.provider_id = parseInt(form.provider_id);
        form.quantity = parseInt(form.quantity);
        dispatch(toggleShowLoading(true));
        const response = await accessoryApi.updateAccessory(id, form);
        await timeDelay(1000);
        if (response.status === 200 || response.status === "success") {
          getAccessoryList({ page: 1 });
          handleEditOff();
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
          message.error(response.message);
        }
        dispatch(toggleShowLoading(false));
      }
    } catch (e) {
      console.log("update error-------> ", e);
      message.error(e.message);
      setLoadingButton(false);
      dispatch(toggleShowLoading(false));
    }
  };

  const handleDelete = async (id) => {
    try {
      dispatch(toggleShowLoading(true));
      const response = await accessoryApi.deleteAccessory(id);
      if (response.status === 200 || response.status === "success") {
        getAccessoryList({ page: 1 });
        setShowModal(false);
        setIdDel(null);
        message.success("Remove accessory successfully!");
      } else {
        message.error(response.message);
      }
      dispatch(toggleShowLoading(false));
    } catch (e) {
      message.error(e.message);
      console.log("delete error-----> ", e);
      dispatch(toggleShowLoading(false));
    }
  };

  const unitConfig = [
    { id: 1, value: "Tấm" },
    { id: 2, value: "Cái" },
    { id: 3, value: "Bộ" },
    { id: 4, value: "Lọ" },
  ];

  const statusConfig = [
    { id: 1, value: "Đang còn" },
    { id: 2, value: "Đã hết" },
  ];

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
      if (!form.accessory_name || form.accessory_name === "")
        newErrors.accessory_name = "Tên vật tư không được để trống!";
      if (!form.quantity || form.quantity === "")
        newErrors.quantity = "Số lương không được để trống!";
      if (!form.unit || form.unit === "")
        newErrors.unit = "Đơn vị tính không được để trống!";
      if (!form.import_date || form.import_date === "")
        newErrors.import_date = "Ngày nhập không được để trống!";
      if (!form.status || form.status === "")
        newErrors.status = "Trạng thái không được để trống!";
      if (!form.provider_id || form.provider_id === "")
        newErrors.provider_id = "Nhà cung cấp không được để trống!";
    }
    if (type == 2) {
      if (!accessory_name || accessory_name === "")
        newErrors.accessory_name = "Tên vật tư không được để trống!";
      // if (!quantity || quantity === "")
      //   newErrors.quantity = "Số lượng không được để trống!";
      if (!unit || unit === "")
        newErrors.unit = "Đơn vị tính không được để trống!";
      if (!import_date || import_date === "")
        newErrors.import_date = "Ngày nhập không được để trống!";
      if (!status || status === "")
        newErrors.status = "Trạng thái không được để trống!";
      if (!form.provider_id || !form.provider_id === "")
        newErrors.provider_id = "Nhà cung cấp không được để trống!";
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
                  Danh sách vật tư
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
                  <FilterAccessory
                    providerConfig={providerConfig}
                    paging={paging}
                    setPaging={setPaging}
                    getAccessoryList={getAccessoryList}
                    setParams={setParams}
                  />
                </div>
              </Card.Header>
              <Card.Body className="table-wrapper-scroll-y my-custom-scrollbar">
                <Table className="table-hover table-striped">
                  <thead>
                    <tr>
                      <th className="border-0">STT</th>
                      <th className="border-0">Tên vật tư</th>
                      <th className="border-0">Số lượng</th>
                      <th className="border-0">Đơn vị</th>
                      <th className="border-0">Ngày nhập</th>
                      <th className="border-0">Nhà cung cấp</th>
                      <th className="border-0">Trạng thái</th>
                      {role !== 3 && <th className="border-0">Hành động</th>}
                    </tr>
                  </thead>
                  {/* {loading === true &&
                                        <tbody>
                                            <tr>
                                                <td colSpan={8} style={{ backgroundColor: '#ffff' }}>
                                                    <div className='d-flex justify-content-center align-items-center' style={{ height: 500 }}>
                                                        <MDBSpinner role='status'></MDBSpinner>
                                                    </div>
                                                </td>
                                            </tr>
                                        </tbody>
                                    } */}
                  <tbody>
                    {accessories.length > 0 ? (
                      accessories.map((item, index) => (
                        <tr key={index}>
                          <td>
                            {(paging.page - 1) * paging.page_size + (index + 1)}
                          </td>
                          <td className="text-break" style={{ minWidth: 250 }}>
                            {item.accessory_name || "N/A"}
                          </td>
                          <td className="text-nowrap" style={{ minWidth: 100 }}>
                            {item.quantity == 0 ? 0 : item.quantity || "N/A"}
                          </td>
                          <td className="text-break" style={{ minWidth: 100 }}>
                            {item.unit || "N/A"}
                          </td>
                          <td className="text-nowrap" style={{ minWidth: 150 }}>
                            {moment(item.import_date).format("DD/MM/YYYY")}
                          </td>
                          <td className="text-break" style={{ minWidth: 250 }}>
                            {item.provider?.provider_name || "N/A"}
                          </td>
                          <td
                            className={
                              item.status === 1 ? "text-success" : "text-danger"
                            }
                            style={{ minWidth: 100 }}
                          >
                            {item.status === 1 && "Đang còn"}
                            {item.status === 2 && "Đã hết"}
                          </td>

                          <td className="d-flex justify-between align-items-center">
                            {role !== 3 && (
                              <button
                                className={"btn btn-sm btn-info text-nowrap"}
                                style={{ padding: "3px 8px", width: 80 }}
                                onClick={() => handleEditOn(item.id)}
                              >
                                Sửa
                              </button>
                            )}
                            {role === 1 && (
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
                            )}
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
                      getAccessoryList({ ...paging, page: e, ...params })
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
          Bạn có muốn xóa vật tư này không?
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
            Hủy{" "}
          </button>
        </Modal.Footer>
      </Modal>

      <Modal show={showCre} size="lg" dialogClassName="dialog-style">
        <Modal.Header style={{ justifyContent: "center" }}>
          <div style={{ fontSize: 21 }}>Thêm mới vật tư</div>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group>
              <Form.Label>Tên vật tư: </Form.Label>
              <Form.Control
                type="text"
                placeholder="Nhập tên vật tư"
                onChange={(e) => setField("accessory_name", e.target.value)}
                isInvalid={!!errors.accessory_name}
              />
              {errors.accessory_name && (
                <span
                  style={{ fontSize: 12, color: "#dc3545", fontWeight: 100 }}
                >
                  {errors.accessory_name}
                </span>
              )}
            </Form.Group>
            <div className="row">
              <div className="col-md-6 mb-2">
                <Form.Group style={{ marginTop: 10 }}>
                  <Form.Label>Số lượng:</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="Nhập số lượng"
                    onChange={(e) => setField("quantity", e.target.value)}
                    isInvalid={!!errors.quantity}
                  />
                  {errors.quantity && (
                    <span
                      style={{
                        fontSize: 12,
                        color: "#dc3545",
                        fontWeight: 100,
                      }}
                    >
                      {errors.quantity}
                    </span>
                  )}
                </Form.Group>
              </div>
              <div className="col-md-6 mb-2">
                <Form.Group style={{ marginTop: 10 }}>
                  <Form.Label>Đơn vị:</Form.Label>
                  <Form.Control
                    as="select"
                    onChange={(e) => setField("unit", e.target.value)}
                    isInvalid={!!errors.unit}
                  >
                    <option className="d-none" value="">
                      Chọn đơn vị
                    </option>
                    {unitConfig &&
                      unitConfig.map((item, index) => (
                        <option key={index} value={item.value}>
                          {item.value}
                        </option>
                      ))}
                  </Form.Control>
                  {errors.unit && (
                    <span
                      style={{
                        fontSize: 12,
                        color: "#dc3545",
                        fontWeight: 100,
                      }}
                    >
                      {errors.unit}
                    </span>
                  )}
                </Form.Group>
              </div>
            </div>
            <div className="row">
              <div className="col-md-6 mb-2">
                <Form.Group style={{ marginTop: 10 }}>
                  <Form.Label>Ngày nhập:</Form.Label>
                  <Form.Control
                    type="date"
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
              <div className="col-md-6 mb-2">
                <Form.Group style={{ marginTop: 10 }}>
                  <Form.Label>Trạng thái:</Form.Label>
                  <Form.Control
                    as="select"
                    onChange={(e) => setField("status", e.target.value)}
                    isInvalid={!!errors.status}
                  >
                    <option className="d-none" value="">
                      Chọn trạng thái
                    </option>
                    {statusConfig &&
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
              <Form.Label>Nhà cung cấp:</Form.Label>
              <Form.Control
                as="select"
                onChange={(e) => setField("provider_id", e.target.value)}
                isInvalid={!!errors.provider_id}
              >
                <option className="d-none" value="">
                  Chọn nhà cung cấp
                </option>
                {providerConfig.length > 0 &&
                  providerConfig.map((item, index) => (
                    <option key={index} value={item.id}>
                      {item.provider_name}
                    </option>
                  ))}
              </Form.Control>
              {errors.provider_id && (
                <span
                  style={{ fontSize: 12, color: "#dc3545", fontWeight: 100 }}
                >
                  {errors.provider_id}
                </span>
              )}
            </Form.Group>
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
          <div style={{ fontSize: 21 }}>Cập nhật thông tin vật tư</div>
        </Modal.Header>
        {loadingForm === true && (
          <Modal.Body>
            <div
              className="d-flex justify-content-center align-items-center"
              style={{ height: 500 }}
            >
              <MDBSpinner role="status"></MDBSpinner>
            </div>
          </Modal.Body>
        )}
        {loadingForm === false && (
          <>
            <Modal.Body>
              <Form>
                <Form.Group>
                  <Form.Label>Tên vật tư: </Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="Nhập tên vật tư"
                    value={accessory_name || ""}
                    onChange={(e) => {
                      setAccessoryName(e.target.value);
                      setField("accessory_name", e.target.value);
                    }}
                    isInvalid={!!errors.accessory_name}
                  />
                  {errors.accessory_name && (
                    <span
                      style={{
                        fontSize: 12,
                        color: "#dc3545",
                        fontWeight: 100,
                      }}
                    >
                      {errors.accessory_name}
                    </span>
                  )}
                </Form.Group>
                <div className="row">
                  <div className="col-md-6 mb-2">
                    <Form.Group style={{ marginTop: 10 }}>
                      <Form.Label>Số lượng:</Form.Label>
                      <Form.Control
                        type="text"
                        placeholder="Nhập số lượng"
                        value={quantity || ""}
                        onChange={(e) => {
                          setQuantity(e.target.value);
                          setField("quantity", e.target.value);
                        }}
                        isInvalid={!!errors.quantity}
                      />
                      {errors.quantity && (
                        <span
                          style={{
                            fontSize: 12,
                            color: "#dc3545",
                            fontWeight: 100,
                          }}
                        >
                          {errors.quantity}
                        </span>
                      )}
                    </Form.Group>
                  </div>
                  <div className="col-md-6 mb-2">
                    <Form.Group style={{ marginTop: 10 }}>
                      <Form.Label>Đơn vị:</Form.Label>
                      <Form.Control
                        as="select"
                        value={unit || ""}
                        onChange={(e) => {
                          setUnit(e.target.value);
                          setField("unit", e.target.value);
                        }}
                        isInvalid={!!errors.unit}
                      >
                        <option className="d-none" value="">
                          Chọn đơn vị
                        </option>
                        {unitConfig &&
                          unitConfig.map((item, index) => (
                            <option key={index} value={item.value}>
                              {item.value}
                            </option>
                          ))}
                      </Form.Control>
                      {errors.unit && (
                        <span
                          style={{
                            fontSize: 12,
                            color: "#dc3545",
                            fontWeight: 100,
                          }}
                        >
                          {errors.unit}
                        </span>
                      )}
                    </Form.Group>
                  </div>
                </div>
                <div className="row">
                  <div className="col-md-6 mb-2">
                    <Form.Group style={{ marginTop: 10 }}>
                      <Form.Label>Ngày nhập:</Form.Label>
                      <Form.Control
                        type="date"
                        value={import_date || ""}
                        onChange={(e) => {
                          setImportDate(e.target.value);
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
                  <div className="col-md-6 mb-2">
                    <Form.Group style={{ marginTop: 10 }}>
                      <Form.Label>Trạng thái:</Form.Label>
                      <Form.Control
                        as="select"
                        value={status || ""}
                        onChange={(e) => {
                          setStatus(e.target.value);
                          setField("status", e.target.value);
                        }}
                        isInvalid={!!errors.status}
                      >
                        {statusConfig &&
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
                  <Form.Label>Nhà cung cấp:</Form.Label>
                  <Form.Control
                    as="select"
                    value={provider || ""}
                    onChange={(e) => {
                      setProvider(e.target.value);
                      setField("provider_id", e?.target.value);
                    }}
                    isInvalid={!!errors.provider_id}
                  >
                    {providerConfig.length > 0 &&
                      providerConfig.map((item, index) => (
                        <option key={index} value={item.id}>
                          {item.provider_name}
                        </option>
                      ))}
                  </Form.Control>
                  {errors?.provider_id && (
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
              </Form>
            </Modal.Body>
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
          </>
        )}
      </Modal>
    </>
  );
}

export default AccessoryPage;
