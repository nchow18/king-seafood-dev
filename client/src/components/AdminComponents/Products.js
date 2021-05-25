import React, { useState } from 'react'
import Auth from '../../utils/auth';
import { PRODUCTS } from '../../utils/queries';
import { useQuery } from '@apollo/react-hooks';

function AdminCategories(props) {

    const [mounted, setMounted] = useState(true);
    const { loading, data} = useQuery(PRODUCTS)

    const productArr = data?.products || {};

    const updateProductFormSubmit = async (e) => {
        Auth.setAdminSingleProductId(e);
        Auth.updateSingleProduct();
    } 

    if (loading) return 'Loading...';

    const toggle = () => setMounted(!mounted);

    return (
        <>  
        <div className="flex-start-column">
            <button onClick={toggle} >Refresh Products Data</button>
            {productArr.map((product) => (
                <div key={product._id} className="admin-product-row flex-start-row night-bg">
                    <div className="product-id id-input-width" value={`${product._id}`}>{product._id}</div>
                    <div className="flex-start-row">
                        <div className="flex-start-row">
                            <div className="flex-start-column">
                                <label className="bold">Name</label>
                                <div className="product-admin-list">{product.product_name}</div>
                            </div>
                            <div className="flex-start-column">
                                <label className="bold">Category</label>
                                <div className="product-admin-list">{product.product_category}</div>
                            </div>
                            <div className="flex-start-column">
                                <label className="bold">Price</label>
                                <div className="product-admin-list">{product.product_price}</div>
                            </div>
                            <div className="flex-start-column">
                                <label className="bold">Description</label>
                                <div className="product-admin-list">{product.product_description}</div>
                            </div>
                            <div className="flex-start-column">
                                <label className="bold">Weight</label>
                                <div className="product-admin-list">{product.product_weight}</div>
                            </div>
                            <div className="flex-start-column">
                                <label className="bold">Chinese Name</label>
                                <div className="product-admin-list">{product.product_chineseName}</div>
                            </div>
                            <div className="flex-start-column">
                                <label className="bold">Chinese Description</label>
                                <div className="product-admin-list">{product.product_chineseDescrition}</div>
                            </div>
                            <div className="flex-start-column">
                                <label className="bold">Status: true/false</label>
                                <div className="product-admin-list">{product.product_status}</div>
                            </div>
                            <div className="flex-start-column">
                                <label className="bold">Picture Location</label>
                                <div className="product-admin-list">{product.product_picture}</div>
                            </div>
                            <button id={product._id} onClick={() => {updateProductFormSubmit( product._id )}} className="admin-product-button admin-input-width">UPDATE</button>
                        </div>
                    </div>
                </div>
            ))}
        </div>
        </>
    )
}

export default AdminCategories;