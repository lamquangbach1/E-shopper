import { useEffect, useState } from "react";
import axios from "axios";

function UpdateAccount() {
    const [error, setError] = useState({})

    const [user, setUser] = useState({
        username: '',
        email: '',
        password: '',
        level: 0,
        phone: '',
        address: '',
        avatar: '',
        id: ''
    })

    useEffect(() => {
        let userData = localStorage.getItem("loginInfo")
        if (userData) {
            //console.log(userData)
            userData = JSON.parse(userData)
            setUser({
                name: userData.Auth.name,
                password: userData.Auth.password,
                email: userData.Auth.email,
                address: userData.Auth.address,
                phone: userData.Auth.phone,
                level: userData.Auth.level,
                id: userData.Auth.id,
            })
        }
    }, [])

    function handleUserInputFile(e) {
        const file = e.target.files[0];
        let reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = function (e) {
            setUser({
                ...user,
                avatar: e.target.result
            });
        };
    }


    const handleChange = (e) => {
        const name = e.target.name
        const value = e.target.value
        setUser(state => ({ ...state, [name]: value }))
    }
    const validateFile = () => {
        let errorSubmit = {};
        let isValid = true;
        if (!user.name) {
            isValid = false;
            errorSubmit.name = "Vui lòng nhập tên.";
        }
        if (!user.email) {
            isValid = false;
            errorSubmit.email = "Vui lòng nhập email"
        } else if (!/\S+@\S+\.\S+/.test(user.email)) {
            isValid = false;
            errorSubmit.email = "Email không hợp lệ.";
        }
        if (!user.password) {
            isValid = false;
            errorSubmit.password = "Vui lòng nhập mật khẩu.";
        }

        if (!user.address) {
            isValid = false;
            errorSubmit.address = "Vui lòng nhập địa chỉ.";
        }

        if (!user.phone) {
            isValid = false;
            errorSubmit.phone = "Vui lòng nhập số điện thoại.";
        }
        if (!user.file) {
            isValid = false;
            errorSubmit.file = "Vui lòng tải lên ảnh đại diện.";
        }
        if (!isValid) {
            setError(errorSubmit)
        } else {
            console.log("Thành công")
        }
        return isValid
    }
    const handleSubmit = (e) => {
        e.preventDefault();
        alert(user.id)
        if (validateFile()) {
            const formData = { ...user }
            console.log("Form data:", formData);
            const loginInfo = JSON.parse(localStorage.getItem("loginInfo"))
            let config = {
                headers: {
                    'Authorization': 'Bearer ' + loginInfo.token,
                    'Content-Type': 'application/x-www-form-urlencoded',
                    'Accept': 'application/json'
                }
            };
            axios.post("http://localhost/laravel8/laravel8/public/api/user/update/"+user.id,formData,config)
                .then((response) => {
                    if (response.data.error) { //kiểm tra xem có lỗi từ máy chủ trả về kh
                        // setError(response.data.error)
                    } else {
                        localStorage.setItem("loginInfo", JSON.stringify(response.data))
                    }
                })
        }

    }
    return (
        <div className="col-sm-9">
            <div class="blog-post-area">
                <h2 class="title text-center">Update user</h2>
                <div class="signup-form">
                    <h2>New User Signup!</h2>
                    <form action="#" onSubmit={handleSubmit}>
                        <input type="text" name="email" placeholder="Email Address" value={user.email} readOnly />
                        <input type="password" name="password" placeholder="Password" value={user.password} onChange={handleChange} />
                        <input type="text" name="address" placeholder="Address" value={user.address} onChange={handleChange} />
                        <input type="text" name="phone" placeholder="Phone" value={user.phone} onChange={handleChange} />
                        <input type="file" onChange={handleUserInputFile} enctype="multipart/form-data" />
                        <input type="text" name="level" placeholder="level" value={user.level} onChange={handleChange} />
                        <button type="submit" class="btn btn-default">Signup</button>
                    </form>
                </div>
            </div>
        </div>
    );
}

export default UpdateAccount;