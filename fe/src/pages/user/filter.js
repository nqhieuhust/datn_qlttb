import { Input, Select } from "antd";
import { setField } from "../../api/common";
import { useState } from "react";
import { Form } from "react-bootstrap";
import { useEffect } from "react";

export const FilterUser = ( props ) =>
{
	const [ form, setForm ] = useState( {
		id: null,
		username: null,
		email: null,
		status: null,
		mobile: null,
		department_id: null,
	} );
	const [ department, setDepartment ] = useState( [] );
	const [ status, setStatus ] = useState( [] );
	useEffect( () =>
	{
		if ( props.departmentConfig )
		{
			let departments = props.departmentConfig.reduce( ( newArr, item ) =>
			{
				let obj = {
					value: item.id,
					label: item.department_name
				}
				newArr.push( obj );
				return newArr;
			}, [] );
			setDepartment( departments );
		}
	}, [ props.departmentConfig ] );

	useEffect( () =>
	{
		setStatus( [
			{
				label: 'Ngừng sử dụng',
				value: -1
			},
			{
				label: 'Đang sử dụng',
				value: 1
			},
		] )
	}, [] )


	const submitForm = ( type ) =>
	{
		let paging = { ...props.paging };
		if ( type === 1 )
		{
			if ( form.username )
			{
				form.username = form.username.trim();
				setForm( { ...form, username: form.username.trim() } )
			}
			if ( form.id )
			{
				form.id = form.id.trim();
				setForm( { ...form, id: form.id.trim() } )
			}
			if ( form.email )
			{
				form.email = form.email.trim();
				setForm( { ...form, email: form.email.trim() } )
			}
			if ( form.mobile )
			{
				form.mobile = form.mobile.trim();
				setForm( { ...form, mobile: form.mobile.trim() } )
			}
			props.getUserList( { ...props.paging, page: 1, ...form } );
			props.setParams( form );
			props.setPaging( paging );

		} else
		{
			setForm( {
				id: null,
				username: null,
				email: null,
				status: null,
				mobile: null,
				department_id: null,
			} )
			props.getUserList( { ...props.paging } );
			props.setParams( {
				id: null,
				username: null,
				email: null,
				status: null,
				mobile: null,
				department_id: null
			} );
			props.setPaging( paging );

		}

	}
	return (
		<div>
			<div className="row mb-4">
				{/* <div className="col-md-4 mb-2 form-group ">
					<Form.Group>
						<Form.Label>User ID: </Form.Label>
						<Input className="form-control" value={ form.id } placeholder="Enter user id" onChange={ ( e ) => setField( form, 'id', e.target.value, setForm ) } />

					</Form.Group>
				</div> */}
				<div className="col-md-4 mb-2 form-group">
					<Form.Group>
						<Form.Label>Tên tài khoản: </Form.Label>
						<Input className="form-control" value={ form.username } placeholder="Nhập tên tài khoản" onChange={ ( e ) => setField( form, 'username', e.target.value, setForm ) } />

					</Form.Group>
				</div>
				<div className="col-md-4 mb-2 form-group">
					<Form.Group>
						<Form.Label>Email: </Form.Label>
						<Input className="form-control" value={ form.email } placeholder="Nhập email" onChange={ ( e ) => setField( form, 'email', e.target.value, setForm ) } />

					</Form.Group>
				</div>
				<div className="col-md-4 mb-2 form-group">
					<Form.Group>
						<Form.Label>Trạng thái: </Form.Label>

						<Select
							placeholder="Chọn trạng thái"
							value={ form.status }
							onChange={ ( e ) => setField( form, 'status', e, setForm ) }
							style={ { width: '100%' } }
							options={ status }
						/>
					</Form.Group>
				</div>
				<div className="col-md-4 mb-2 form-group">
					<Form.Group>
						<Form.Label>Khoa/Phòng:</Form.Label>
						<Select
							placeholder="Chọn Khoa/Phòng"
							value={ form.department_id }
							onChange={ ( e ) => setField( form, 'department_id', e, setForm ) }
							style={ { width: '100%' } }
							options={ department }
						/>

					</Form.Group>
				</div>
			</div>


			<button type="button" className="btn btn-primary" style={ { marginRight: 10, padding: '10px 10px' } } onClick={ ( e ) => submitForm( 1 ) }>
				<i className="nc-icon nc-zoom-split mr-2"></i>Tìm Kiếm
			</button>

			<button type="button" className="btn btn-secondary" style={ { marginLeft: 10, padding: '10px 10px' } } onClick={ ( e ) => submitForm( 0 ) }>
				<i className="nc-icon nc-refresh-02 mr-2"></i>Tải lại
			</button>
		</div>
	);
}