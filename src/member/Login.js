import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";


function Login() {
	const navigate = useNavigate()
	const [email, setEmail] = useState('')
	const [password, setPassword] = useState('')
	const [error, setError] = useState('')

	const handleChange = (e) => {
		const { name, value } = e.target;
		if (name === 'email') setEmail(value);
		if (name === 'password') setPassword(value);
	};

	const login = (e) => {
		e.preventDefault()
		const formData = {
			email,
			password,
			level: 0,
		};
		console.log("Form data:", formData);

		axios.post("http://localhost/laravel8/laravel8/public/api/login", formData)
			.then((response) => {
				if (response.data.errors) {
					setError(response.data.errors)
					// alert(response.data.errors.errors)
				} else {
					localStorage.setItem("loginInfo", JSON.stringify(response.data))
					navigate('/home')
				}
			})
			.catch(function (error) {
				console.log(error)
			})
	}
	return (
		<>
			<div className="login-form">
				<h2>Login to your account</h2>
				<form action="#" onSubmit={login}>

					<input type="email" name='email' onChange={handleChange} placeholder="Email Address"
					/>
					<input type="password" name="password" onChange={handleChange} placeholder="Password" 
					/>
					<span>
						<input type="checkbox" class="checkbox" />
						Keep me signed in
					</span>
					<button type="submit" class="btn btn-default">Login</button>
				</form>
			</div>
		</>
	);
}

export default Login;