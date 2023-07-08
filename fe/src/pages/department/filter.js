import { Input, Select } from "antd";
import { setField } from "../../api/common";
import { useState } from "react";
import { Form } from "react-bootstrap";
import { useEffect } from "react";

export const FilterDepartment = ( props ) =>
{
	const [ form, setForm ] = useState( {
		department_name: null
	} );
	

	const submitForm = ( type ) =>
	{
		let paging = { ...props.paging };
		if ( type === 1 )
		{
			if ( form.department_name )
			{
				form.department_name = form.department_name.trim();
				setForm( { ...form, department_name: form.department_name.trim() } )
			}
			props.getDepartmentList( { ...props.paging, page: 1, ...form } );
			props.setParams( form );
			props.setPaging( paging );

		} else
		{
			setForm({department_name: null})
			props.getDepartmentList( { ...props.paging } );
			props.setParams( {department_name: null} );
			props.setPaging( paging );

		}

	}
	return (
		<>
			<div className="row mb-4">
				<div className="col-md-4 mb-2 form-group">
					<Form.Group>
						<Form.Label>Tên Khoa/Phòng: </Form.Label>
						<Input className="form-control" value={form.department_name} placeholder="Nhập tên Khoa/Phòng" onChange={ ( e ) => setField( form, 'department_name', e.target.value, setForm ) }/>
						
					</Form.Group>
				</div>
			</div>


			<button type="button" className="btn btn-primary" style={ { marginRight: 10, padding: '10px 10px' } } onClick={ ( e ) => submitForm( 1 ) }>
				<i className="nc-icon nc-zoom-split mr-2"></i>Tìm kiếm
			</button>

			<button type="button" className="btn btn-secondary" style={ { marginLeft: 10, padding: '10px 10px' } } onClick={ ( e ) => submitForm( 0 ) }>
				<i className="nc-icon nc-refresh-02 mr-2"></i>Tải lại
			</button>
		</>
	);
}