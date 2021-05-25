import React from 'react';
import Auth from '../utils/auth';
import '../css/Cart.css';
import '../css/App.css';
import { useMutation, useQuery } from '@apollo/react-hooks';
import { REMOVE_CART } from '../utils/mutations';
import { USER, PRODUCTS } from '../utils/queries';

function Cart() {

    const profileData = Auth.getProfile();
    const user_id = profileData.data._id;
    const [removeCart, { error }] = useMutation(REMOVE_CART);
    const {data: dataR} = useQuery(USER, { variables: { user_id: user_id }});
    const user_data = dataR?.user || {};
    const {loading, data} = useQuery(PRODUCTS);
    const product_data = data?.products || {};
    const cartArr = [];
    const user_cart = cartArr;
    const cart_price = [];
    console.log(user_cart);

    if (user_data) {
        for (var i = 0; i < user_data.cart.length; i++) {
            for (var t = 0; t < product_data.length; t++) {
                if (user_data.cart[i].product_id === product_data[t]._id) {
                    cartArr.push(product_data[t])
                    cartArr[i].quantity = product_data[t].product_price;
                    cart_price.push(product_data[t].product_price);

                }
            }
        }
    }
    
    const cart_total = cart_price.reduce((a,b) => a + b, 0);

    function viewProduct(id) {
        Auth.setSingleProduct(id);
        Auth.viewSingleProduct();
    }

    const removeProduct = async (id) => {
        try {
            removeCart({
                variables: {
                    product_id: id
                }
            })
            alert('removed from cart')
        } catch (error) {
            console.log(error)
        }
    }

    Auth.getCartTotal(cart_total);

    if (loading) return `...Loading`;
    if (error) return '...ERROR';

    return (
        <>
    	    <div className="flex-c-column content">
                <div className="flex-top-center-row">
                    <div className="flex-start-column">
                        {user_cart.map((cart) => (
                        <div key={cart.product_id} className="flex-start-row cart-row">
                            <div>
                                <img className="cart-picture" alt={cart.product_id} src={cart.product_picture} />
                            </div>
                            <div className="flex-start-between-column cart-column">
                                <span><b>Order Details</b></span>
                                <span>{cart.product_name}</span>
                                <span>{cart.product_description}</span>
                                <button key={cart._id} onClick={() => {viewProduct(cart._id)}}>VIEW ITEM</button>
                                <button key={cart._id} onClick={() => {removeProduct(cart._id)}}>REMOVE</button>
                            </div>
                            <div className="flex-middle-column cart-column-small">
                                <div className="flex-middle-column">
                                    <span><b>Price</b></span>
                                    <span>{cart.product_price} RM</span>
                                </div>
                                <div className="flex-middle-column">
                                    <span><b>Weight</b></span>
                                    <span>{cart.product_weight}</span>
                                </div>

                            </div>
                            <div className="flex-middle-column cart-column-small">
                                <span><b>Quantity</b></span>
                                <span>{cart.quantity}</span>
                            </div>
                        </div>
                        ))}
                    </div>
                    <div className="flex-start-column payment-column cart-row">
                        <span><b>Cart Total: </b>{cart_total} RM</span>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Cart;