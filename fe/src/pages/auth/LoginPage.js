import React, { useEffect, useState } from "react";
import './style.scss';
import { authLogin, authRegister } from "../../api/auth";
import {
	MDBContainer,
	MDBCol,
	MDBRow,
	MDBIcon,
	MDBSpinner
}
	from 'mdb-react-ui-kit';
import { Container, Form } from "react-bootstrap";
import { useDispatch } from "react-redux";
import { toggleShowLoading } from "redux/actions/common-action";
import { message } from "antd";

function LoginPage() {
	const [username, setUsername] = useState("");
	const [password, setPassword] = useState("");
	const [email, setEmail] = useState("");

	const [loadingButton, setLoadingButton] = useState(false);
	const [passwordShown, setPasswordShown] = useState(false);

	const [loginForm, setLoginForm] = useState(true);
	const [signupForm, setSignupForm] = useState(false);

	const [form, setForm] = useState({});
	const [errors, setErrors] = useState({});
	const dispatch = useDispatch();

	useEffect(() => {
		setLoginForm(true);
		setSignupForm(false);
		document.title = 'Login';
	}, []);

	const togglePassword = () => {
		setPasswordShown(!passwordShown);
	};

	const changeForm = (type) => {
		if (type == 1) {
			setSignupForm(false);
			setLoginForm(true);
			setForm({});
			setErrors({});
		} else {
			setLoginForm(false);
			setSignupForm(true);
			setForm({});
			setErrors({});
			setUsername("");
			setEmail("");
			setPassword("");
		}
	}

	const setField = (field, value) => {
		setForm({
			...form,
			[field]: value
		});

		if (!!errors[field]) {
			setErrors({
				...errors,
				[field]: null
			});
		}
	}

	const findFormErrors = (type) => {
		const newErrors = {}
		if (type == 1) {
			if (!form.username || form.username === '') newErrors.username = 'Tên người dùng không được để trống!';
			if (!form.password || form.password === '') newErrors.password = 'Mật khẩu không được để trống!';
		}
		if (type == 2) {
			if (!username || username === '') newErrors.username = 'Tên người dùng không được để trống!';
			if (!password || password === '') newErrors.password = 'Mật khẩu không được để trống!';
			if (!email || email === '') newErrors.email = 'Email cannot be blank!';
			else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(email)) newErrors.email = 'Email invalid!';
		}

		return newErrors;
	}

	const handleLogin = async () => {
		try {
			// setLoadingButton(true);
			dispatch(toggleShowLoading(true));
			const newErrors = findFormErrors(1);
			if (Object.keys(newErrors).length > 0) {
				setErrors(newErrors);
				dispatch(toggleShowLoading(false));
			} else {
				const response = await authLogin(form, dispatch);
				dispatch(toggleShowLoading(false));
				if (response) {
					window.location.href = '/';
				} else {
					setLoadingButton(false);
				}
			}
		} catch (e) {
			// setLoadingButton(false);
			dispatch(toggleShowLoading(false));
		}
	}

	return (
		<>
			<MDBContainer className="p-10 my-5 ">

				<MDBRow>

					<MDBCol col='10' md='6'>
						<img src={require("assets/img/login.png")} className="img-fluid" alt="Phone image" />
					</MDBCol>

					<MDBCol col='4' md='6'>
						{loginForm === true &&
							<>
								<Form>
									<h2 style={{textAlign: 'center', fontWeight: 'bold'}}>Đăng nhập</h2>

									<Form.Group className="mb-4">
										<Form.Label>Tên đăng nhập: </Form.Label>
										<Form.Control
											type="text"
											placeholder="Enter username"
											onChange={(e) => { setField('username', e.target.value) }}
											isInvalid={!!errors.username}
										/>
										{errors.username && <span style={{ fontSize: 12, color: '#dc3545', fontWeight: 100 }}>{errors.username}</span>}
									</Form.Group>

									<Form.Group className="mb-4">
										<Form.Label>Mật khẩu: </Form.Label>
										<div style={{
											position:"relative",
										}}>
											<Form.Control
												type={passwordShown ? "text" : "password"}
												placeholder="Enter password"
												onChange={(e) => { setField('password', e.target.value) }}
												isInvalid={!!errors.password}
											/>
											<span  style={{
												position:"absolute",
												right: "10px",
												top:"5px"
											}} onClick={togglePassword}><MDBIcon icon='key' style={{cursor: "pointer"}} /></span>
											
										</div>
										{errors.password && <span style={{ fontSize: 12, color: '#dc3545', fontWeight: 100 }}>{errors.password}</span>}
									</Form.Group>

								</Form>


								{/*<div className="d-flex justify-content-end mx-4 mb-4">*/}
								{/*	<a href="!#">Forgot password?</a>*/}
								{/*</div>*/}

								<button className="btn btn-primary w-100" type="button" onClick={handleLogin} size="lg" style={{ backgroundColor: '#007bff', color: '#ffff' }}>
									{loadingButton === true &&
										<MDBSpinner color='primary' role='status' size='sm'></MDBSpinner>
									}
									{loadingButton === false && <>Đăng nhập</>}
								</button>

								{/*<div className="divider d-flex align-items-center my-4">*/}
								{/*	<p className="text-center fw-bold mx-3 mb-0">OR</p>*/}
								{/*</div>*/}


								{/*<button className="btn btn-primary mb-4 w-100" type="button" size="lg" style={{ border: 'none', backgroundColor: 'rgb(65 225 186)', color: '#ffff' }}*/}
								{/*	onClick={() => changeForm(2)}*/}
								{/*>*/}
								{/*	Sign up*/}
								{/*</button>*/}

								{/*<div className="row">*/}
								{/*	<div className="col-6">*/}
								{/*		<button className="btn btn-primary mb-4 w-100" size="lg" style={{ border: 'none', backgroundColor: '#3b5998', color: '#ffff' }}>*/}
								{/*			<MDBIcon fab icon="facebook-f" className="mx-2" />*/}
								{/*			Continue with facebook*/}
								{/*		</button>*/}
								{/*	</div>*/}
								{/*	<div className="col-6">*/}
								{/*		<button className="btn btn-primary w-100" size="lg" style={{ border: 'none', backgroundColor: '#55acee', color: '#ffff' }}>*/}
								{/*			<MDBIcon fab icon="twitter" className="mx-2" />*/}
								{/*			Continue with twitter*/}
								{/*		</button>*/}
								{/*	</div>*/}
								{/*</div>*/}
							</>
						}

						{signupForm === true &&
							<>
								<Form>

									<Form.Group className="mb-4">
										<Form.Label>Email: </Form.Label>
										<Form.Control
											type="text"
											placeholder="Enter email"
											value={email || ''}
											onChange={(e) => { setEmail(e.target.value); setField('email', e.target.value) }}
											isInvalid={!!errors.email}
										/>
										{errors.email && <span style={{ fontSize: 12, color: '#dc3545', fontWeight: 100 }}>{errors.email}</span>}
									</Form.Group>

									<Form.Group className="mb-4">
										<Form.Label>Username: </Form.Label>
										<Form.Control
											type="text"
											placeholder="Enter username"
											value={username || ''}
											onChange={(e) => { setUsername(e.target.value); setField('username', e.target.value) }}
											isInvalid={!!errors.username}
										/>
										{errors.username && <span style={{ fontSize: 12, color: '#dc3545', fontWeight: 100 }}>{errors.username}</span>}
									</Form.Group>

									<Form.Group className="mb-4">
										<Form.Label>Password: </Form.Label>
										<Form.Control
											type="password"
											placeholder="Enter password"
											value={password || ''}
											onChange={(e) => { setPassword(e.target.value); setField('password', e.target.value); }}
											isInvalid={!!errors.password}
										/>
										{errors.password && <span style={{ fontSize: 12, color: '#dc3545', fontWeight: 100 }}>{errors.password}</span>}
									</Form.Group>

								</Form>

								<button className="btn btn-primary w-100" type="button" onClick={handleSignup} size="lg" style={{ border: 'none', backgroundColor: 'rgb(65 225 186)', color: '#ffff' }}>
									{loadingButton === true &&
										<MDBSpinner color='primary' role='status' size='sm'></MDBSpinner>
									}
									{loadingButton === false && <>Sign up</>}
								</button>


								{/*<div className="divider d-flex align-items-center my-4">*/}
								{/*	<p className="text-center fw-bold mx-3 mb-0">OR</p>*/}
								{/*</div>*/}

								{/*<button className="btn btn-primary mb-4 w-100" type="button" size="lg" style={{ backgroundColor: '#007bff', color: '#ffff' }}*/}
								{/*	onClick={() => changeForm(1)}*/}
								{/*>*/}
								{/*	Sign in*/}
								{/*</button>*/}

								{/*<div className="row">*/}
								{/*	<div className="col-6">*/}
								{/*		<button className="btn btn-primary mb-4 w-100" size="lg" style={{ border: 'none', backgroundColor: '#3b5998', color: '#ffff' }}>*/}
								{/*			<MDBIcon fab icon="facebook-f" className="mx-2" />*/}
								{/*			Continue with facebook*/}
								{/*		</button>*/}
								{/*	</div>*/}
								{/*	<div className="col-6">*/}
								{/*		<button className="btn btn-primary w-100" size="lg" style={{ border: 'none', backgroundColor: '#55acee', color: '#ffff' }}>*/}
								{/*			<MDBIcon fab icon="twitter" className="mx-2" />*/}
								{/*			Continue with twitter*/}
								{/*		</button>*/}
								{/*	</div>*/}
								{/*</div>*/}
							</>
						}


					</MDBCol>

				</MDBRow>

			</MDBContainer>
		</>
	);
}

export default LoginPage;
