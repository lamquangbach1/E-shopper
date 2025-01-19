import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";




function EditProduct() {
  const [categories, setCategories] = useState([]);
  const [brand, setBrand] = useState([]);
  const [errors, setErrors] = useState([])
  const [files, setFiles] = useState()
  let params = useParams();
  const [array, setArray] = useState([])
  const navigate = useNavigate();
  const [data, setData] = useState({  // lưu thông tin sản phẩm cần chỉnh sửa
    name: '',
    price: '',
    category: '',
    brand: '',
    status: '1',
    sale: '',
    detail: '',
    company: '',
    images: [],
    user: ''
  })
  useEffect(() => {

    let loginInfo = JSON.parse(localStorage.getItem("loginInfo"))
    let config = {
      headers: {
        'Authorization': 'Bearer ' + loginInfo.token,
        'Content-Type': 'application/x-www-form-urlencoded',
        'Accept': 'application/json'
      }
    };

    axios.get('http://localhost/laravel8/laravel8/public/api/category-brand')
      .then(response => {
        console.log(response)
        setCategories(response.data.category);
        setBrand(response.data.brand);
      })


    axios.get('http://localhost/laravel8/laravel8/public/api/user/product/' + params.id, config)
      .then(response => {
        if (response.data.errors) {
          setErrors(response.data.errors)
          console.log(response)
        } else {
          var obj = { //lấy dữ liệu từ api và cập nhật vào state data
            name: response.data.data.name,
            price: response.data.data.price,
            category: response.data.data.id_category,
            brand: response.data.data.id_brand,
            status: response.data.data.status,
            sale: response.data.data.sale,
            detail: response.data.data.detail,
            company: response.data.data.company_profile,
            images: response.data.data.image,
            user: response.data.data.id_user
          }
          setData(obj)
        }
      })
  }, []);

  const handleChange = (e) => { //Hàm này cập nhật dữ liệu trong data khi có thay đổi từ input của form.
    const { name, value } = e.target;
    setData((state) => ({ ...state, [name]: value }));
  };

  const handleUserInputFile = (e) => { //chuyển đổi danh sách tệp được chọn từ input thành mảng và lưu trong files.
    const selectedFiles = Array.from(e.target.files);
    setFiles(selectedFiles);
  };

  const validateFile = () => {
    let errorSubmit = {};
    let isValid = true;

    if (!data.name) {
      isValid = false;
      errorSubmit.name = "Vui lòng nhập tên.";
    }
    if (!data.price) {
      isValid = false;
      errorSubmit.price = "Vui lòng nhập giá";
    }
    if (!data.category) {
      isValid = false;
      errorSubmit.category = "Vui lòng chọn loại.";
    }
    if (!data.brand) {
      isValid = false;
      errorSubmit.brand = "Vui lòng chọn thương hiệu.";
    }
    if (!files.length) {
      isValid = false;
      errorSubmit.file = "Vui lòng tải lên ảnh đại diện.";
    }
    if (!isValid) {
      setErrors(errorSubmit);
    } else {
      console.log("Thành công");
    }
    return isValid;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validateFile()) {
      // const formData = { ...data }
      const loginInfo = JSON.parse(localStorage.getItem("loginInfo"))
      const formData = new FormData() //Tạo formData để chứa dữ liệu cần gửi.
      formData.append('name',data.name)
      formData.append('price',data.price)
      formData.append('category',data.category)
      formData.append('brand',data.brand)
      formData.append('status',data.status)
      formData.append('sale', "1")
      formData.append('detail',data.detail)
      formData.append('company',data.company)
      formData.append('user',data.user)
      formData.append('image',data.images)

      data.images.map(img => {   //// Thêm danh sách hình ảnh hiện tại (nếu cần)
        formData.append('curentImage[]', img);
      })
      files.map(file => {   // thêm từng file upload mới
        formData.append('file[]', file);
      })
      array.map(img => {
        formData.append('avatarCheckBox[]',img)
      })

      let config = {
        headers: {
          'Authorization': 'Bearer ' + loginInfo.token,
          'Content-Type': 'application/x-www-form-urlencoded',
          'Accept': 'application/json'
        }        
      };
      axios.post("http://localhost/laravel8/laravel8/public/api/user/product/update/" + params.id,formData,config)
        .then((respone) => {
          if (respone.data.errors) {
            setErrors(respone.data.errors)
          } else {
            navigate("/account/product/list");
          }
        })
    }
  }

  const handChangeCheckbox = (e, image) => {
    console.log(e.target.checked, image)
    let arr;
    if (e.target.checked) {
      arr = [...array]
      arr.push(image)
    }
    else {
      arr = [...array.filter(img => img != image)]
    }
    setArray(arr)
  }

  return (
    <div className="col-sm-9">
      <div className="blog-post-area">
        <h2 className="title text-center">Update user</h2>
        <div className="signup-form">
          <h2>Update Product</h2>
          <form onSubmit={handleSubmit}>
            <input type="text" name="name" placeholder="Name" onChange={handleChange} value={data.name} />
            <input type="text" name="price" placeholder="Price" onChange={handleChange} value={data.price} />
            <select name="category" onChange={handleChange} placeholder="Please choose category" value={data.category} >
              <option value="">Please choose category</option>
              {categories.map(category => (
                <option key={category.id} value={category.id}>{category.category}</option>
              ))}
            </select>
            <select name="brand" onChange={handleChange} placeholder="Please choose brand" value={data.brand} >
              <option value="">Please choose brand</option>
              {brand.map(brandItem => (
                <option key={brandItem.id} value={brandItem.id}>{brandItem.brand}</option>
              ))}
            </select>
            <select name="status" onChange={handleChange} id="select" value={data.status} >
              <option value="1">New</option>
              <option value="0">Sale</option>
            </select>
            {data.status == "0" ? <input type="number" name="sale" placeholder="Sale" onChange={handleChange} /> : null}
            <input type="file" name="file" onChange={handleUserInputFile} multiple />
            <div style={{ display: 'flex', gap: '5px', padding: '10px' }}>
              {
                data.images.map((img, index) => {
                  return (
                    <div key={index} style={{ width: '50px', height: '80px' }}>
                      <img
                        height={'50%'}
                        width={'100%'}
                        src={"http://localhost/laravel8/laravel8/public/upload/product/" + data.user + "/" + img}>
                      </img>
                      <input type="checkbox" onChange={(e) => handChangeCheckbox(e, img)}></input>
                    </div>)
                })
              }
            </div>
            <textarea name="detail" placeholder="Enter product details here" onChange={handleChange} value={data.detail}></textarea>
            <input type="text" name="company" placeholder="Company" onChange={handleChange} value={data.company} />
            <button type="submit" className="btn btn-default">Update</button>
          </form>
        </div>
      </div>
    </div>
  )

}
export default EditProduct;
