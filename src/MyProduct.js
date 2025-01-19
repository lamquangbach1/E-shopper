import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useNavigate } from "react-router-dom";
import { useParams } from 'react-router-dom';
import { Link } from 'react-router-dom';

function MyProduct() {
  const navigate = useNavigate();
  const [product, setProduct] = useState([]);
  const [error, setError] = useState(null);
  let params = useParams();

  useEffect(() => {
    const loginInfo = JSON.parse(localStorage.getItem("loginInfo"));
    if (!loginInfo || !loginInfo.token) {
      setError("Bạn cần đăng nhập để xem sản phẩm.");
      return;
    }

    let config = {
      headers: {
        'Authorization': 'Bearer ' + loginInfo.token,
        'Content-Type': 'application/x-www-form-urlencoded',
        'Accept': 'application/json'
      }
    };

    axios.get('http://localhost/laravel8/laravel8/public/api/user/my-product', config)
      .then(response => {
        console.log(response);
        setProduct(response.data.data || []);
      })
      .catch(error => {
        console.error(error);
        setError("Có lỗi xảy ra khi tải sản phẩm.");
      });
  }, []);

  const deleteProduct = (id) => {

    const loginInfo = JSON.parse(localStorage.getItem("loginInfo"))
    if (!loginInfo) {
      alert("Bạn cần phải login")
      return
    }
    let config = {
      headers: {
        'Authorization': 'Bearer ' + loginInfo.token,
        'Content-Type': 'application/x-www-form-urlencoded',
        'Accept': 'application/json'
      }
    };
    axios.get("http://localhost/laravel8/laravel8/public/api/user/product/delete/" + id, config)
      .then(res => {
        console.log(res)
        setProduct(res.data.data)
        navigate("/account/product/list");       
      })
      .catch(function (error) {
        console.log(error)
      })
  }

  const renderProducts = () => {
    return Object.keys(product).map(key => {
      const item = product[key];
      const imagesArray = JSON.parse(item.image);
      return (
        <tr key={item.id}>
          <td className="cart_product">
            {imagesArray && imagesArray.map((image, index) => (
              <img
                key={index}
                src={"http://localhost/laravel8/laravel8/public/upload/product/" + item.id_user + "/" + image}
                alt="Product"
                width="100"
              />
            ))}
          </td>
          <td className="cart_description">
            <h4><a href="#">{item.name}</a></h4>
          </td>
          <td className="cart_price">
            <p>{item.price}</p>
          </td>
          <td className="cart_total">
            {/* <a href="#">Edit</a>  */}
            <Link to={`/account/product/edit/${item.id}`}>Edit</Link>
            | <a href="#" onClick={() => deleteProduct(item.id)}>Delete</a>
          </td>
        </tr>
      );
    });
  };



  return (
    <div className="col-sm-9">
      {error && <div className="alert alert-danger">{error}</div>}
      <div className="table-responsive cart_info">
        <table className="table table-condensed">
          <thead>
            <tr className="cart_menu">
              <td className="image">Image</td>
              <td className="description">Name</td>
              <td className="price">Price</td>
              <td className="total">Action</td>
            </tr>
          </thead>
          <tbody>
            {renderProducts()}
          </tbody>
        </table>
      </div>
      <div>
        <button onClick={() => navigate("/account/product/add")}>Add Product</button>
      </div>
    </div>
  );
}

export default MyProduct;
