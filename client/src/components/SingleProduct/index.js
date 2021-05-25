import React, { useState } from 'react';
import Auth from '../../utils/auth';
import { useLocation } from 'react-router-dom';
import '../../css/Products.css';
import { useMutation, useQuery } from '@apollo/react-hooks';
import { PRODUCT } from '../../utils/queries';
import { ADD_CART } from '../../utils/mutations';

function SingleProduct() {

    const productId = Auth.getSingleProduct();
    // const productType = Auth.getProduct();
    const location = useLocation();
    const { loading, data } = useQuery(PRODUCT, { variables: { product_id: productId }});
    const [addCart, {error}] = useMutation(ADD_CART);
    const [ formData, setFormData ] = useState ({
        quantity: '',
    })

    if (Auth.getMode() === 'dark') {
        Auth.getMode();
    }

    const product = data?.product || {};

    const handleInputChange = (event) => {
        const { name, value } = event.target;
        setFormData({
            ...formData,
            [name]: value
        })
    }

    const addToCart = async (e) => {

        try {
            addCart({ variables: {
                input: {
                    product_id: product._id,
                    quantity: parseInt(formData.quantity),
                }
            }})
            alert('Added to cart');
        } catch (e) {
            console.log(e);
        }
    }

    if (loading) return 'Loading...';
    if (error) return '...ERROR';

    return (
        location.pathname === `/product/${productId}` &&
        <>
    	    <div className="flex-c-column content">
                <div className="single-product-container">
                    <div>
                        <img alt={product._id} src={product.product_picture} className="single-product-img" />
                    </div>
                    <div className="flex-start-column single-product-details">
                        <span><b>Name: </b>{product.product_name}</span>
                        {product.product_nameChinese !== '' && (
                            <span><b>Chinese Name: </b>{product.product_nameChinese}</span>
                        )}
                        <span><b>Price: </b>{product.product_name}</span>
                        <span><b>Description: </b>{product.product_name}</span>
                        {product.descriptionChinese !== '' && (
                            <span><b>Chinese Description: </b>{product.product_name}</span>
                        )}
                        {product.weight !== ''&& (
                            <span><b>Weight: </b>{product.product_weight}</span>
                        )}

                        {product.product_status !== 0 ? (
                            <>
                                <span><b>Availability: </b>In Stock</span>
                            </>
                        ) : (
                            <>
                                <span><b>Availability: </b>Out Of Stock</span>
                            </>
                        )}
                        <span><b>Quantity: </b></span><input value={formData.quantity} onChange={handleInputChange} name="quantity" />
                        <button className="product-button" onClick={() => { addToCart() }}>ADD TO CART</button>
                    </div>
                </div>                
            </div>

        </>
    )
}

export default SingleProduct;