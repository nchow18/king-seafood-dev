import React from 'react';
import Auth from '../utils/auth';
import { PROMO, PRODUCTS } from '../utils/queries';
import { useQuery } from '@apollo/react-hooks';

import '../css/Home.css';

function Home() {

    const { data } = useQuery(PROMO);
    const promo = data?.promo || {};
    const { data: Data } = useQuery(PRODUCTS);
    const products = Data?.products || {};

    const featuredProducts = [];

    if (promo) {
        for (var i = 0; i < products.length; i++) {
            if (promo[0].featuredProduct1 === products[i]._id) {
                featuredProducts.push(products[i])
            }
            if (promo[0].featuredProduct2 === products[i]._id) {
                featuredProducts.push(products[i])
            }
            if (promo[0].featuredProduct3 === products[i]._id) {
                featuredProducts.push(products[i])
            }
        }
    }

    function viewProduct(id) {
        Auth.setSingleProduct(id);
        Auth.viewSingleProduct();
    }

    return (
        <>
    	    <div className="flex-c-column content">
                <div className="flex-c-row">
                    {featuredProducts.map((product) => (
                        <div key={product._id} className="promo-img-container">
                            <img alt={product.product_name} className="promo-img" src={product.product_picture} />
                            <div key={product._id} onClick={() => { viewProduct( product._id )}} className="promo-img-title">
                                <p>{product.product_name}</p>
                                <p>RM {product.product_price}</p>
                            </div>
                        </div>
                    ))}
                </div>                
            </div>
        </>
    )
}

export default Home;