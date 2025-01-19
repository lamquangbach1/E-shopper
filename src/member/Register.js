import axios from "axios";
import { useEffect, useState } from "react";


function Register() {
    

    const [formValues, setFormValues] = useState({
        name: '',
        email: '',
        password: '',
        level: 0,
        phone: '',
        address: '',
        avatar: ''
    });

    const [file, setFile] = useState(null); 
    const [errors, setErrors] = useState({}); 
    const handleChange = (e) => {       
        const name = e.target.name
        const value = e.target.value
        setFormValues(state => ({...state,[name]:value}))
    }
    function handleUserInputFile(e) {
        const file = e.target.files[0];
        let reader = new FileReader();
        reader.readAsDataURL(file);

        reader.onload = function (e) {
            setFormValues({
                ...formValues,
                avatar: e.target.result
            });
            setFile(file);
        };
    }

    const validateFile = () => {
        let errorSubmit = {};
        let isValid = true;
        if (!formValues.name) {
            isValid = false;
            errorSubmit.name = "Vui lòng nhập tên.";
        }
        if (!formValues.email) {
            isValid = false;
            errorSubmit.email = "Vui lòng nhập email"
        } else if (!/\S+@\S+\.\S+/.test(formValues.email)) {
            isValid = false;
            errorSubmit.email = "Email không hợp lệ.";
        }
        if (!formValues.password) {
            isValid = false;
            errorSubmit.password = "Vui lòng nhập mật khẩu.";
        }

        if (!formValues.address) {
            isValid = false;
            errorSubmit.address = "Vui lòng nhập địa chỉ.";
        }

        if (!formValues.phone) {
            isValid = false;
            errorSubmit.phone = "Vui lòng nhập số điện thoại.";
        }
        if (!file) {
            isValid = false;
            errorSubmit.file = "Vui lòng tải lên ảnh đại diện.";
        }
        if (!isValid) {
            setErrors(errorSubmit)
        } else {
            console.log("Thành công")
        }
        return isValid
    }
    const handleSubmit = (e) => {
        e.preventDefault();
        if (validateFile()) {
            // Gửi form và file đã mã hóa (avatar) qua API
            const formData = {...formValues}
                          
            console.log("Form data:", formData);

            axios.post("http://localhost/laravel8/laravel8/public/api/register",formData)
                .then((response) => {
                    console.log(response)
                    if (response.data.errors) {
                        setErrors(response.data.errors)
                        console.log("API response:", response.data);
                    } else {
                        setFormValues({
                            name: '',
                            email: '',
                            password: '',
                            level: 0,
                            phone: '',
                            address: '',
                            avatar: ''
                        });
                        setFile(null);
                        setErrors({});
                        alert("Thành công")
                    }
                })
        }
    }

    return (
        <div class="signup-form">
            <h2>New User Signup!</h2>
            <form action="#" onSubmit={handleSubmit}>
                <input type="text" name="name" placeholder="Name" onChange={handleChange} />
                {/* {error.name && <p style={{ color: 'red' }}>{error.name}</p>} */}
                <input type="text" name="email" placeholder="Email Address" onChange={handleChange} />
                <input type="password" name="password" placeholder="Password" onChange={handleChange} />
                <input type="text" name="address" placeholder="Address" onChange={handleChange} />
                <input type="text" name="phone" placeholder="Phone" onChange={handleChange} />
                <input type="file" onChange={handleUserInputFile} enctype="multipart/form-data" />
                <input type="text" name="level" placeholder="level" onChange={handleChange} />
                <button type="submit" class="btn btn-default">Signup</button>
            </form>
            {Object.keys(errors).map((key, index) => (
                <li key={index} style={{ color: "red" }}>
                    {errors[key]}
                </li>
            ))}
        </div>
    );
}

export default Register;
