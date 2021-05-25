import React from 'react';
import Auth from '../utils/auth';
import { useLocation } from 'react-router-dom';

function SingleOrder() {

    const location = useLocation();
    const orderId = Auth.getSingleOrder();
    const orders = Auth.getOrders();

    return (
        location.pathname === `/order/${orderId}` &&
        <>
    	    <div className="flex-c-column content">
                <div className="flex-start-column order-container">
                    <div className="single-order-list"><b>Order ID:</b> {orders[0]._id}</div>
                    <div className="single-order-list"><b>Order Created:</b> {orders[0].createdAt}</div>              
                    <div className="single-order-list"><b>Delivery Date:</b> {orders[0].deliveryDate}</div>
                    <div className="single-order-list flex-start-row"><b>Delivery Status:</b> {orders[0].delivered ? (<div className="confirm">Delivered</div>) : (<div className="not-confirm">Not Delivered</div>)}</div>
                    {orders[0].orders.map((order) => (
                        <div className="flex-start-row">
                            <div className="single-order-list"><b>Product Name:</b> {order.orderName}</div>
                            <div className="single-order-list"><b>Product ID:</b> {order.productId}</div>
                            <div className="single-order-list"><b>Product Category:</b> {order.orderCategory}</div>
                            <div className="single-order-list"><b>Product Weight:</b> {order.orderWeight}</div>
                            <div className="single-order-list"><b>Product Price:</b> {order.orderPrice}</div>
                        </div>
                    ))}
                    <div className="single-order-list"><b>Total:</b> {orders[0].orderTotal}</div>
                </div>

            </div>

        </>
    )
}

export default SingleOrder;