import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";


function Add_Product() {
  const [categories, setCategories] = useState([]);
  const [brand, setBrand] = useState([]);
  const navigate = useNavigate();
  const [formValues, setFormValues] = useState({  //chứa các giá trị nhập liệu của form
    name: '',
    price: '',
    category: '',
    brand: '',
    status:'1',
    sale: '1',
    detail: '',
    company: ''
  });

  useEffect(() => {
    axios.get('http://localhost/laravel8/laravel8/public/api/category-brand')
      .then(response => {
        console.log(response)
        setCategories(response.data.category); 
        setBrand(response.data.brand);
      });
  }, []);

  const [files, setFiles] = useState([]);
  const [error, setError] = useState({});
  
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormValues((state) => ({ ...state, [name]: value }));
  };

  const handleUserInputFile = (e) => {
    const selectedFiles = Array.from(e.target.files);   //Array.from để chuyển danh sách file (FileList)
    setFiles(selectedFiles); 
};
  const validateFile = () => {
    let errorSubmit = {};
    let isValid = true;

    if (!formValues.name) {
      isValid = false;
      errorSubmit.name = "Vui lòng nhập tên.";
    }
    if (!formValues.price) {
      isValid = false;
      errorSubmit.price = "Vui lòng nhập giá";
    }
    if (!formValues.category) {
      isValid = false;
      errorSubmit.category = "Vui lòng chọn loại.";
    }
    if (!formValues.brand) {
      isValid = false;
      errorSubmit.brand = "Vui lòng chọn thương hiệu.";
    }
    
    if (!files.length) {
      isValid = false;
      errorSubmit.file = "Vui lòng tải lên ảnh đại diện.";
    }
    if (!isValid) {
      setError(errorSubmit);
    } else {
      console.log("Thành công");
    }
    return isValid;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validateFile()) {

      const formData = new FormData()  //lưu trữ all dữ liệu từ formValues và files
      
      // formData = { ...formValues };
      Object.keys(formValues).map((key) =>{    //thêm từng trường formValue và formData
        formData.append(key ,formValues[key])
      })
      files.map(file => {   // thêm từng file vào formData
        formData.append('file[]', file);
      })
      console.log("Form data:", formData);
      const loginInfo = JSON.parse(localStorage.getItem("loginInfo"));
      let config = {
        headers: {
          'Authorization': 'Bearer ' + loginInfo.token,
          'Content-Type': 'application/x-www-form-urlencoded',
          'Accept': 'application/json'
        }
      };
      axios.post("http://localhost/laravel8/laravel8/public/api/user/product/add", formData, config)
        .then(response => {
          console.log(response);
          navigate("/account/product/list");
        })
        .catch(error => {
          console.log(error);
        });
    }
  };

  return (
    <div className="col-sm-9">
      <div className="blog-post-area">
        <h2 className="title text-center">Update user</h2>
        <div className="signup-form">
          <h2>Create Product</h2>
          <form onSubmit={handleSubmit}>
            <input type="text" name="name" placeholder="Name" onChange={handleChange} />
            <input type="text" name="price" placeholder="Price" onChange={handleChange} />
            <select name="category" onChange={handleChange} placeholder="Please choose category">
              <option value="">Please choose category</option>
              {categories.map(category => (
                <option key={category.id} value={category.id}>{category.category}</option>
              ))}
            </select>
            <select name="brand" onChange={handleChange} placeholder="Please choose brand">
              <option value="">Please choose brand</option>
              {brand.map(brandItem => (
                <option key={brandItem.id} value={brandItem.id}>{brandItem.brand}</option>
              ))}
            </select>
            <select name="status" onChange={handleChange} id="select">
                  <option value="1">New</option>
                  <option value="0">Sale</option>
            </select>
            { formValues.status == "0" ? <input type="number" name="sale" placeholder="Sale" onChange={handleChange}/> : null }                              
            <input type="file" name="file" onChange={handleUserInputFile} multiple />
             
            <textarea name="detail" placeholder="Enter product details here" onChange={handleChange}></textarea>
            <input type="text" name="company" placeholder="Company" onChange={handleChange} />
            <button type="submit" className="btn btn-default">Signup</button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Add_Product;
