


import axios from 'axios';
import React, { useEffect, useState } from 'react';

function Cart() {
    const [cartProduct, setCartProduct] = useState([])
    const [cartSubTotal, setCartSubTotal] = useState(0)


    useEffect(() => {
        const localCart = JSON.parse(localStorage.getItem("cart")) || {}
        axios.post("http://localhost/laravel8/laravel8/public/api/product/cart", localCart)
            .then(response => {
                console.log(response)
                if (response.data.data) {
                    const storeQuantity = JSON.parse(localStorage.getItem('cart'))

                    const productQuantity = response.data.data.map(product => {
                        const quantityFromLocalStorage = storeQuantity[product.id] || 1
                        return {
                            ...product,
                            quantity: quantityFromLocalStorage,
                            total: quantityFromLocalStorage * product.price
                        };
                    });
                    setCartProduct(productQuantity);
                }
            })
    }, [])



    useEffect(() => {
        let sum = 0;
        for (var i = 0; i < cartProduct.length; i++) {
            sum = sum + cartProduct[i].total
        }
        setCartSubTotal(sum)

    }, [cartProduct])


    const handleChangeQuantity = (id, event) => {
        const value = event.target.value  //gia tri nguoi dung nhap vao o input
        const productUpdate = cartProduct.find(product => product.id == id)
        productUpdate.quantity = value
        productUpdate.total = productUpdate.quantity * productUpdate.price

        setCartProduct([...cartProduct])
    }



    const increaseQuantity = (id) => {
        const productUpdate = cartProduct.find(product => product.id == id)
        productUpdate.quantity = productUpdate.quantity + 1
        productUpdate.total = productUpdate.quantity * productUpdate.price

        setCartProduct([...cartProduct])
    }



    const decreaseQuantity = (id) => {
        const productUpdate = cartProduct.find(product => product.id == id)
        if (productUpdate.quantity == 1) return
        productUpdate.quantity = productUpdate.quantity - 1
        productUpdate.total = productUpdate.quantity * productUpdate.price
        setCartProduct([...cartProduct])
    }



    const removeProduct = (id) => {
        const cardProductAfterDelete = cartProduct.filter(pro => pro.id != id)
        setCartProduct([...cardProductAfterDelete])

        const localCart = JSON.parse(localStorage.getItem("cart")) || {}
        delete localCart[id];
        localStorage.setItem("cart", JSON.stringify(localCart));
    }


    const renderCartProduct = () => {
        return (
            <div class="table-responsive cart_info" >
                <table class="table table-condensed">
                    <thead>
                        <tr class="cart_menu" >
                            <td class="image">Item</td>
                            <td class="description">Name</td>
                            <td class="price">Price</td>
                            <td class="quantity">Quantity</td>
                            <td class="total">Total</td>
                            <td></td>
                        </tr>
                    </thead>
                    <tbody>
                        {cartProduct.map((product) => {
                            let image = [];
                            try {
                                image = JSON.parse(product.image);
                            } catch (error) {
                                console.error("Lỗi phân tích chuỗi JSON từ ảnh:", error);
                            }
                            return <tr key={product.id}>
                                <td class="cart_product">
                                    <a href="">
                                        <img src={"http://localhost/laravel8/laravel8/public/upload/product/" + product.id_user + "/" + image[0]} alt=''
                                            style={{ width: "100px", height: "100px" }}
                                        />
                                    </a>
                                </td>
                                <td class="cart_description">
                                    <h4><a href="">{product.name}</a></h4>
                                    <p>{product.id}</p>
                                </td>
                                <td class="cart_price">
                                    <p>{product.price}</p>
                                </td>
                                <td class="cart_quantity">
                                    <div class="cart_quantity_button">
                                        <a className="cart_quantity_up" style={{ cursor: 'pointer' }} onClick={() => { increaseQuantity(product.id) }}> + </a>
                                        <input class="cart_quantity_input" type="text" name="quantity "
                                            // onChange={(e) => handleChangeQuantity(product.id, e)} value={product.quantity}
                                            onChange={(e) => { handleChangeQuantity(product.id, e) }} value={product.quantity}
                                            autocomplete="off" size="2" min={1}
                                        />
                                        <a class="cart_quantity_down" style={{ cursor: 'pointer' }} onClick={() => decreaseQuantity(product.id)}> - </a>
                                    </div>
                                </td>
                                <td class="cart_total">
                                    <p class="cart_total_price">{product.total}</p>
                                </td>
                                <td class="cart_delete">
                                    <a class="cart_quantity_delete" onClick={() => removeProduct(product.id)}><i class="fa fa-times"></i></a>
                                </td>
                            </tr>

                        })}

                    </tbody>
                </table>
                <section id="do_action">
                    <div class="container">
                        <div class="heading">
                            <h3>What would you like to do next?</h3>
                            <p>Choose if you have a discount code or reward points you want to use or would like to estimate your delivery cost.</p>
                        </div>
                        <div class="row">
                            <div class="col-sm-6">
                                <div class="chose_area">
                                    <ul class="user_option">
                                        <li>
                                            <input type="checkbox" />
                                            <label>Use Coupon Code</label>
                                        </li>
                                        <li>
                                            <input type="checkbox" />
                                            <label>Use Gift Voucher</label>
                                        </li>
                                        <li>
                                            <input type="checkbox" />
                                            <label>Estimate Shipping & Taxes</label>
                                        </li>
                                    </ul>
                                    <ul class="user_info">
                                        <li class="single_field">
                                            <label>Country:</label>
                                            <select>
                                                <option>United States</option>
                                                <option>Bangladesh</option>
                                                <option>UK</option>
                                                <option>India</option>
                                                <option>Pakistan</option>
                                                <option>Ucrane</option>
                                                <option>Canada</option>
                                                <option>Dubai</option>
                                            </select>

                                        </li>
                                        <li class="single_field">
                                            <label>Region / State:</label>
                                            <select>
                                                <option>Select</option>
                                                <option>Dhaka</option>
                                                <option>London</option>
                                                <option>Dillih</option>
                                                <option>Lahore</option>
                                                <option>Alaska</option>
                                                <option>Canada</option>
                                                <option>Dubai</option>
                                            </select>

                                        </li>
                                        <li class="single_field zip-field">
                                            <label>Zip Code:</label>
                                            <input type="text" />
                                        </li>
                                    </ul>
                                    <a class="btn btn-default update" href="">Get Quotes</a>
                                    <a class="btn btn-default check_out" href="">Continue</a>
                                </div>
                            </div>
                            <div class="col-sm-6">
                                <div class="total_area">
                                    <ul>
                                        <li>Cart Sub Total <span>${cartSubTotal}</span></li>
                                        <li>Eco Tax <span>$2</span></li>
                                        <li>Shipping Cost <span>Free</span></li>
                                        <li>Total <span>${cartSubTotal + 2}</span></li>
                                    </ul>
                                    <a class="btn btn-default update" href="">Update</a>
                                    <a class="btn btn-default check_out" href="">Check Out</a>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
            </div>

        )
    }





    return (
        <section id="cart_items">
            <div class="container">
                <div class="breadcrumbs">
                    <ol class="breadcrumb">
                        <li><a href="#">Home</a></li>
                        <li class="active">Shopping Cart</li>
                    </ol>
                </div>
                {renderCartProduct()}
            </div>
        </section>
    );
}


export default Cart;
