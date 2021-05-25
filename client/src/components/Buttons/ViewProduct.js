import React from 'react';
import Auth from '../../utils/auth';

function viewProduct(props) {

    const {
        product_id
    } = props

    function viewProduct(productId) {
        Auth.setSingleProduct(productId);
        Auth.viewSingleProduct();
    }

    return (
        <>
            <div className="product-button" key={product_id} onClick={() => { viewProduct(product_id) }}>VIEW PRODUCT</div>
        </>
    )
}

export default viewProduct;