
// App.js

import axios from "axios";
import { useEffect } from "react";
import { useState } from "react";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";


function Wishlist() {

    const [productWishList, setproductWishList] = useState([])
    const [errors, setErrors] = useState([])

    useEffect(() => {
        axios.get("http://localhost/laravel8/laravel8/public/api/product/wishlist")
            .then(response => {
                if (response.data.errors) {
                    setErrors(response.data.errors)
                } else {
                    const wishListId = JSON.parse(localStorage.getItem("wishlist")) || []
                    const filterProduct = response.data.data.filter((product) =>
                        wishListId.includes(product.id)
                    )
                    setproductWishList(filterProduct)
                }
            })
            .catch(function (error) {
                console.log(error)
            })
    }, [])

    const renmoveWishList = (id) => {
        const productWishListAfterDelete = productWishList.filter(pro => pro.id !== id)
        setproductWishList([...productWishListAfterDelete])
        const localWishList = JSON.parse(localStorage.getItem("wishlist")) || []
        const localWishListAfterDelete = localWishList.filter((wishId) => wishId !== id)
        localStorage.setItem("wishlist", JSON.stringify(localWishListAfterDelete))
    }

    const renderProductWishLish = () => {
        const response = productWishList.map(product => {
            const images = JSON.parse(product.image)
            return (
                <div class="col-sm-4" key={product.id}>
                    <div class="product-image-wrapper">
                        <div class="single-products">
                            <div class="productinfo text-center">
                                <img src={"http://localhost/laravel8/laravel8/public/upload/product/" + product.id_user + "/" + images[0]} alt="" />
                                <h2>{product.price}</h2>
                                <p>{product.name}</p>
                            </div>
                            <div class="product-overlay">
                                <div class="overlay-content">
                                    <h2>{product.price}</h2>
                                    <p>{product.name}</p>
                                    <Link to={`/Product/Order/${product.id}`}><a href="#" class="btn btn-default add-to-cart"><i class="fa fa-shopping-cart">
                                    </i>Buy Now</a></Link>
                                </div>
                            </div>
                        </div>
                        <div class="choose">
                            <ul class="nav nav-pills nav-justified">
                                <li>
                                    <a onClick={() => { renmoveWishList(product.id) }}><i class="fa fa-plus-square" ></i>Remove to wishlist</a>
                                </li>

                                <Link to={`/ProductDetail/${product.id}`}><li><a href="#"><i class="fa fa-plus-square"></i>More</a></li></Link>
                            </ul>
                        </div>
                    </div>
                </div>
            )
        })
        return response
    }



    return (
        <>
            <div class="col-sm-9 padding-right">
                <div class="features_items">
                    <h2 class="title text-center">Features Items</h2>
                    {renderProductWishLish()}
                </div>
            </div>
        </>
    );
}

export default Wishlist;
