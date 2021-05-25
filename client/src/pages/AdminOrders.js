import React from 'react';
import Auth from '../utils/auth';

function AdminOrders() {

    const orders = Auth.getOrders();

    const updateDelivered = event => {
        window.confirm('DELIVERED UPDATED')
    }

    function viewSingleOrder(orderId) {
        Auth.setSingleOrder(orderId);
        Auth.viewSingleOrder();
    }
    
    return (
        <>
        {orders && (
            <div className="flex-start-column">
            {orders.map((order) => (
                <div className="flex-start-column order-container">
                    <div className="order-title flex-start-row">
                        <div className="order-section">Order ID: {order._id}</div>
                        <div className="order-section">Order Date: {order.createdAt}</div>
                        <div className="order-section">Delivery Date: {order.deliveryDate}</div>
                        <div className="order-section">TOTAL: {order.orderTotal}</div>
                        {order.delivered === false && (
                            <div onClick={updateDelivered} className="order-button">UPDATE TO DELIVERED</div>
                        )}
                        <div key={order._id} onClick={() => {viewSingleOrder(order._id)}} className="order-button">VIEW ORDER</div>

                        {order.delivered ? (
                            <div className="order-section confirm font-2rem">DELIVERED</div>
                        ) : (
                            <div className="order-section not-confirm font-2rem">NOT DELIVERED</div>
                        )}
                    </div>
                </div>
            ))}
        </div>
        )}

        </>
    )
}

export default AdminOrders;