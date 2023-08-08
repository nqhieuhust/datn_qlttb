import { message } from "antd";
import { timeDelay } from "../../common";
import profileApi from "api/profile/profileService";
import { MDBSpinner } from "mdb-react-ui-kit";
import React, { useState, useEffect } from "react";

import { Button, Card, Form, Container, Row, Col } from "react-bootstrap";
import { connect } from "react-redux";
import { toggleShowLoading } from "redux/actions/common-action";

function User({ dispatch, showLoading }) {
  // const [loading, setLoading] = useState(false);
  const [loadingButton, setLoadingButton] = useState(false);

  const [nameShow, setNameShow] = useState();
  const [emailShow, setEmailShow] = useState();
  const [mobileShow, setMobileShow] = useState();
  const [addressShow, setAddressShow] = useState();

  const [full_name, setFullName] = useState();
  const [email, setEmail] = useState();
  const [mobile, setMobile] = useState();
  const [address, setAddress] = useState();

  const [form, setForm] = useState({});
  const [errors, setErrors] = useState({});

  useEffect(() => {
    getProfile();
  }, []);

  const getProfile = async () => {
    try {
      // setLoading(true);
      dispatch(toggleShowLoading(true));
      const response = await profileApi.getProfile();
      await timeDelay(1000);
      if (response.status === "success") {
        setNameShow(response.data.full_name);
        setEmailShow(response.data.email);
        setMobileShow(response.data.mobile);
        setAddressShow(response.data.address);
        setFullName(response.data.full_name);
        setEmail(response.data.email);
        setMobile(response.data.mobile);
        setAddress(response.data.address);
      } else {
        message.error(response.message || "Lỗi! Vui lòng thử lại");
      }
      // setLoading(false);
      dispatch(toggleShowLoading(false));
    } catch (e) {
      // setLoading(false);
      dispatch(toggleShowLoading(false));
    }
  };

  const updateProfile = async () => {
    try {
      setLoadingButton(true);

      const newErrors = findFormErrors();
      if (Object.keys(newErrors).length > 0) {
        setErrors(newErrors);
        setLoadingButton(false);
      } else {
        dispatch(toggleShowLoading(true));
        const response = await profileApi.updateProfile(form);
        await timeDelay(1000);
        if (response.status === "success") {
          await getProfile();
          message.success("Cập nhật thông tin thành công!");
          setLoadingButton(false);
        } else {
          message.error(response.message);
          setLoadingButton(false);
        }
      }
      dispatch(toggleShowLoading(false));
    } catch (e) {
      console.log(e);
      message.error(e.message);
      setLoadingButton(false);
      dispatch(toggleShowLoading(false));
    }
  };

  const setField = (field, value) => {
    console.log(field, value);
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


  // Tìm kiếm lỗi khi nhập thông tin và hiển thị thông báo lỗi cho người dùng
  const findFormErrors = () => {
    const newErrors = {};
    if (!full_name || full_name === "")
      newErrors.full_name = "Họ và tên không được để trống!";
    if (!address || address === "")
      newErrors.address = "Địa chỉ không được để trống!";
    if (!mobile || mobile === "") newErrors.mobile = "Số điện thoại không được để trống!";
    else if (!/((09|03|07|08|05|04|\+84|84)+([0-9]{8,9})\b)/g.test(mobile))
      newErrors.mobile = "Số điện thoại không hợp lệ!";
    if (!email || email === "") newErrors.email = "Email không được để trống!";
    else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(email))
      newErrors.email = "Email không hợp lệ!";
    return newErrors;
  };

  return (
    <>
      <Container fluid>
        <Row>
          <Col md="8">
            <Card>
              <Card.Header>
                <Card.Title as="h4">Cập nhật thông tin người dùng</Card.Title>
              </Card.Header>
              <Card.Body>
                <Form>
                  <Form.Group>
                    <Form.Label>Họ và tên: </Form.Label>
                    <Form.Control
                      type="text"
                      placeholder="Nhập họ và tên"
                      value={full_name || ""}
                      onChange={(e) => {
                        setFullName(e.target.value);
                        setField("full_name", e.target.value);
                      }}
                      isInvalid={!!errors.full_name}
                    />
                    {errors.full_name && (
                      <span
                        style={{
                          fontSize: 12,
                          color: "#dc3545",
                          fontWeight: 100,
                        }}
                      >
                        {errors.full_name}
                      </span>
                    )}
                  </Form.Group>

                  <Form.Group>
                    <Form.Label>Email: </Form.Label>
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

                  <Form.Group>
                    <Form.Label>Số điện thoại: </Form.Label>
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

                  <Form.Group>
                    <Form.Label>Địa chỉ: </Form.Label>
                    <Form.Control
                      type="text"
                      placeholder="Enter address"
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

                  {/* <Form.Group style={{ marginTop: 10 }}>
                    <Form.Label>Ảnh đại diện:</Form.Label>
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
                  </Form.Group> */}

                  <div className="d-flex justify-content-center">
                    {loadingButton === true && (
                      <Button
                        className="btn-fill pull-right mt-3"
                        type="button"
                        variant="info"
                      >
                        <div style={{ width: 101.16, padding: 0 }}>
                          <MDBSpinner
                            color="primary"
                            role="status"
                            size="sm"
                          ></MDBSpinner>
                        </div>
                      </Button>
                    )}
                    {loadingButton === false && (
                      <Button
                        className="btn-fill pull-right mt-3"
                        type="button"
                        variant="info"
                        onClick={updateProfile}
                      >
                        Cập nhật thông tin
                      </Button>
                    )}
                  </div>
                </Form>
              </Card.Body>
            </Card>
          </Col>

          <Col md="4">
            <Card className="card-user">
              {showLoading && (
                <div
                  className="d-flex justify-content-center"
                  style={{ height: 400, alignItems: "center" }}
                >
                  <MDBSpinner role="status"></MDBSpinner>
                </div>
              )}
              {!showLoading && (
                <>
                  <div className="card-image">
                    <img
                      alt="..."
                      src={require("assets/img/photo-1431578500526-4d9613015464.jpeg")}
                    ></img>
                  </div>
                  <Card.Body>
                    <div className="author">
                      <a href="#pablo" onClick={(e) => e.preventDefault()}>
                        <img
                          alt="..."
                          className="avatar border-gray"
                          src={require("assets/img/default-avatar.png")}
                        ></img>
                        <h5 className="title">{nameShow}</h5>
                      </a>
                      <p className="description">{emailShow}</p>
                    </div>
                    <p className="description text-center">{mobileShow}</p>
                    <p className="description text-center">{addressShow}</p>
                  </Card.Body>
                  <hr></hr>
                  
                </>
              )}
            </Card>
          </Col>
        </Row>
      </Container>
    </>
  );
}
const mapStateToProps = function (state) {
  return {
    showLoading: state.commonReducer.showLoading,
  };
};
export default connect(mapStateToProps)(User);
