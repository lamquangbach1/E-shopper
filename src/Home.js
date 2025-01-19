import axios from "axios";
import { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { UserContext } from "./UserContext";
import { useNavigate } from "react-router-dom";

function Home() {


    const [productsHome, setProductsHome] = useState([])
    
	const [context, setContext] = useContext(UserContext);
    const navigate = useNavigate();

    useEffect(() => {
        axios.get('http://localhost/laravel8/laravel8/public/api/product')
            .then(response => {
                console.log(response)
                setProductsHome(response.data.data)
            })
            .catch(function (error) {
                console.log(error)
            })
    }, [])


    function AddToWishlish(productID) {
        let wishList = JSON.parse(localStorage.getItem("wishlist")) || []
        if (!wishList.includes(productID)) {   //check sp vs prodictID có ton tai trong mang k
            wishList.push(productID)
            localStorage.setItem('wishlist', JSON.stringify(wishList))
            alert("đã thêm sản phẩm và mục yêu thích")
            navigate("/product/wishlist")
        } else {
            alert("Sản phẩm đã có trong mục yêu thích")
        }
        var currentContextWishList = context
		currentContextWishList[1] = currentContextWishList[1] + wishList

		setContext([...currentContextWishList]) 
    }


    const renderProductsHome = () => {
        const response = productsHome.map(product => {
            const images = JSON.parse(product.image)
            return (
                <div class="col-sm-4" key={product.id}>
                    <div class="product-image-wrapper">
                        <div class="single-products">
                            <div class="productinfo text-center">
                                <img src={"http://localhost/laravel8/laravel8/public/upload/product/" + product.id_user + "/" + images[0]} alt="" />
                                <h2>{product.price}</h2>
                                <p>{product.name}</p>
                                {/* <a href="#" class="btn btn-default add-to-cart"><i class="fa fa-shopping-cart"></i>Add to cart</a> */}

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
                                <li onClick={() => AddToWishlish(product.id)}>
                                    <a href="#"><i class="fa fa-plus-square"></i>Add to wishlist</a>
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
        <div class="col-sm-9 padding-right">
            <div class="features_items">
                <h2 class="title text-center">Features Items</h2>

                {renderProductsHome()}
            </div>
        </div>
    );
}

export default Home;