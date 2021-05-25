import React from 'react';
import Auth from '../../utils/auth';
import '../../css/Products.css';
import { useMutation, useQuery } from '@apollo/react-hooks';
import { PRODUCTS } from '../../utils/queries';
import { ADD_CART } from '../../utils/mutations';
import ViewProduct from '../Buttons/ViewProduct';

function ProductCard() {

    const { loading, data } = useQuery(PRODUCTS);
    const [addCart, {error}] = useMutation(ADD_CART);

    const products = data?.products || {};

    const addToCart = async (data) => {

        try {
            addCart({ variables: {
                input: {
                    product_id: data,
                    quantity: 1,
                }
            }})
            alert('Added to cart');
        } catch (e) {
            console.log(e);
        }
    }

    var currentProduct = '';

    if (Auth.getProduct() === 'All') {
        currentProduct = products;
    } else {
        currentProduct = products.filter((product) => product.category === Auth.getProduct());
    }

    if (loading) return 'Loading...';
    if (error) return '...ERROR';

    
    return (
        <>
        {currentProduct.map((product) => (
            <div key={product._id} className="product-card night-bg">
                <div className="product-card-picture-container">
                    <img alt={product.product_name} src={product.product_picture} className="product-card-picture"/>
                </div>
                <div className="product-card-description">
                    <div>
                        <p className="bold">{product.product_name} {product.product_nameChinese !== '' && (
                            <>({ product.product_nameChinese })</> )}</p>
                        <p>RM {product.product_price}</p>
                        {product.product_weight !== '' && (
                            <p>{product.product_weight}</p>
                        )}
                        {product.product_description !== 0 ? (
                            <p>Product Available</p>
                        ) : (
                            <p>Out Of Stock</p>
                        )}
                        <p>{product.product_description}</p>
                    </div>
                    <div>
                        <ViewProduct product_id={product._id} />
                        <div className="product-button" key={product._id} onClick={() => { addToCart(product._id) }}>ADD TO CART</div>
                    </div>
                </div>
            </div>
        ))}
        </>
    )
}

export default ProductCard;