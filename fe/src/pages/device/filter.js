import { Input, Select } from "antd";
import { setField } from "../../api/common";
import { useState } from "react";
import { Form } from "react-bootstrap";
import { useEffect } from "react";

export const FilterDevice = (props) => {
  const [form, setForm] = useState({
    id: null,
    code: null,
    device_name: null,
    status: null,
    department_id: null,
    provider_id: null,
    manufacture: null,
  });
  const [status, setStatus] = useState([]);

  useEffect(() => {
    setStatus([
      { value: 1, label: "Đang sử dụng" },
      { value: 2, label: "Đang báo hỏng" },
      { value: 3, label: "Đang sửa chữa" },
      { value: 4, label: "Đang bảo hành" },
    ]);
  }, []);

  const submitForm = (type) => {
    let paging = { ...props.paging };
    if (type === 1) {
      if (form.code) {
        form.code = form.code.trim();
        setForm({ ...form, code: form.code.trim() });
      }
      if (form.id) {
        form.id = form.id.trim();
        setForm({ ...form, id: form.id.trim() });
      }
      if (form.manufacture) {
        form.manufacture = form.manufacture.trim();
        setForm({ ...form, manufacture: form.manufacture.trim() });
      }
      if (form.device_name) {
        form.device_name = form.device_name.trim();
        setForm({ ...form, device_name: form.device_name.trim() });
      }
      props.getDeviceList({ ...props.paging, page: 1, ...form });
      props.setParams(form);
      props.setPaging(paging);
    } else {
      setForm({
        id: null,
        code: null,
        device_name: null,
        status: null,
        department_id: null,
        provider_id: null,
        manufacture: null,
      });
      props.getDeviceList({ ...props.paging });
      props.setParams({
        id: null,
        code: null,
        device_name: null,
        status: null,
        department_id: null,
        provider_id: null,
        manufacture: null,
      });
      props.setPaging(paging);
    }
  };
  return (
    <>
      <div className="row mb-4">
        {/* <div className="col-md-3 mb-2 form-group">
					<Form.Group>
						<Form.Label> ID: </Form.Label>
						<Input className="form-control" value={ form.id } placeholder="Enter id" onChange={ ( e ) => setField( form, 'id', e.target.value, setForm ) } />

					</Form.Group>
				</div> */}
        <div className="col-md-3 mb-2 form-group">
          <Form.Group>
            <Form.Label>Mã thiết bị: </Form.Label>
            <Input
              className="form-control"
              value={form.code}
              placeholder="Nhập mã thiết bị"
              onChange={(e) => setField(form, "code", e.target.value, setForm)}
            />
          </Form.Group>
        </div>
        <div className="col-md-3 mb-2 form-group">
          <Form.Group>
            <Form.Label>Hãng sản xuất: </Form.Label>
            <Input
              className="form-control"
              value={form.manufacture}
              placeholder="Nhập hãng sản xuất"
              onChange={(e) =>
                setField(form, "manufacture", e.target.value, setForm)
              }
            />
          </Form.Group>
        </div>
        <div className="col-md-3 mb-2 form-group">
          <Form.Group>
            <Form.Label>Tên thiết bị: </Form.Label>
            <Input
              className="form-control"
              value={form.device_name}
              placeholder="Nhập tên thiết bị"
              onChange={(e) => setField(form, "device_name", e.target.value, setForm)}
            />
          </Form.Group>
        </div>
        <div className="col-md-3 mb-2">
          <Form.Group>
            <Form.Label>Trạng thái: </Form.Label>
            <Select
              placeholder="Chọn trạng thái"
              value={form.status}
              onChange={(e) => setField(form, "status", e, setForm)}
              style={{ width: "100%" }}
              options={status}
            />
          </Form.Group>
        </div>

        {props.departmentConfig.length > 0 && props.role !== 3 && (
          <div className="col-md-3 mb-2">
            <Form.Group>
              <Form.Label>Khoa/Phòng: </Form.Label>
              <Select
                placeholder="Chọn Khoa/Phòng"
                value={form.department_id}
                onChange={(e) => setField(form, "department_id", e, setForm)}
                style={{ width: "100%" }}
                options={props.departmentConfig}
              />
            </Form.Group>
          </div>
        )}

        {props.providerConfig.length > 0 && (
          <div className="col-md-3 mb-2">
            <Form.Group>
              <Form.Label>Nhà cung cấp: </Form.Label>
              <Select
                placeholder="Chọn nhà cung cấp"
                value={form.provider_id}
                onChange={(e) => setField(form, "provider_id", e, setForm)}
                style={{ width: "100%" }}
                options={props.providerConfig}
              />
            </Form.Group>
          </div>
        )}
      </div>

      <button
        type="button"
        className="btn btn-primary"
        style={{ marginRight: 10, padding: "10px 10px" }}
        onClick={(e) => submitForm(1)}
      >
        <i className="nc-icon nc-zoom-split mr-2"></i>Tìm kiếm
      </button>

      <button
        type="button"
        className="btn btn-secondary"
        style={{ marginLeft: 10, padding: "10px 10px" }}
        onClick={(e) => submitForm(0)}
      >
        <i className="nc-icon nc-refresh-02 mr-2"></i>Tải lại
      </button>
    </>
  );
};
