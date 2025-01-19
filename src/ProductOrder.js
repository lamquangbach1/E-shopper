

import axios from 'axios';
import React, { useContext, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useNavigate } from "react-router-dom";
import { UserContext } from './UserContext';


function ProductOrder() {
    const [productOrder, setProductOrder] = useState({})
    const [errors, setErrors] = useState([])
    const { id } = useParams()
    const navigate = useNavigate();
    const [numberOfProduct, setNumberOfProduct] = useState(0)
    const [total, setTotal] = useState(0)
    const [context, setContext] = useContext(UserContext);
    useEffect(() => {
        if (productOrder.price) { //check sp có tồn tại không
            setTotal(productOrder.price * numberOfProduct)
        }
    }, [numberOfProduct])


    useEffect(() => {
        axios.get("http://localhost/laravel8/laravel8/public/api/product/detail/" + id)
            .then(response => {
                console.log(response)
                if (response.data.errors) {
                    setErrors(response.data.errors)
                    console.log(response)
                } else {
                    setProductOrder(response.data.data)
                    setNumberOfProduct(1)
                }
            })
            .catch(function (error) {
                console.log(error)
            })

    }, [])


    function addToCart(productId, qty) {
        let cart = JSON.parse(localStorage.getItem("cart")) || {}
        qty = parseInt(qty) //đưa về số nguyên
        if (cart[productId]) {
            cart[productId] += qty
        }
        else {
            cart[productId] = qty
        }
        localStorage.setItem("cart", JSON.stringify(cart))
        
        //setContext(context + qty)
        alert("Sản phẩm đã được mua!");
    }

    const changeNumberOfProduct = (e) => {
        setNumberOfProduct(e.target.value)
    };

    const renderProductOrder = () => {
        let image = [];
        try {
            image = JSON.parse(productOrder.image);
        } catch (error) {
            console.error("Lỗi phân tích chuỗi JSON từ ảnh:", error);
        }
        return (
            <div class="product-details" key={productOrder.id}>
                <div class="col-sm-5">
                    <div class="view-product">
                        <img src={"http://localhost/laravel8/laravel8/public/upload/product/" + productOrder.id_user + "/" + image[0]} alt=''
                            style={{ cursor: 'pointer', width: '100%' }}
                        />
                    </div>

                </div>
                <div class="col-sm-7">
                    <div class="product-information">
                        <img src="images/product-details/new.jpg" class="newarrival" alt="" />
                        <h2>{productOrder.name}</h2>
                        <p>{productOrder.id_user}</p>
                        <img src="images/product-details/rating.png" alt="" />
                        <span>
                            <span>{productOrder.price}</span>
                            <label>Quantity:</label>
                            <input type="text" value={numberOfProduct} onChange={changeNumberOfProduct} />
                            <p>Money:{total}</p>
                            <button
                                type="button"
                                className="btn btn-default cart"   
                                onClick={() => addToCart(productOrder.id, numberOfProduct)}                                       >
                                <i className="fa fa-shopping-cart"></i> Pay                                   
                            </button>

                        </span>
                        <p><b>Availability:</b>In Stock</p>
                        <p><b>Condition:</b> New</p>
                        <p><b>Brand:</b> E-SHOPPER</p>
                        <a href=""><img src="images/product-details/share.png" class="share img-responsive" alt="" /></a>
                    </div>
                </div>
            </div>

        )
    }

    return (
        <div class="col-sm-9 padding-right">

            {renderProductOrder()}


        </div>
    );
}
export default ProductOrder;
