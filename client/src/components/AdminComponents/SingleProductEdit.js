import React, { useState } from 'react';
import Auth from '../../utils/auth';
import { PRODUCT } from '../../utils/queries';
import { useMutation, useQuery } from '@apollo/react-hooks';
import { REMOVE_PRODUCT, UPDATE_PRODUCT } from '../../utils/mutations';
import { useLocation } from 'react-router-dom';
import '../../css/Admin.css';

function SingleProductEdit() {


    const location = useLocation();
    const product_id = Auth.getSingleProductId();
    const [removeProduct, { error }] = useMutation(REMOVE_PRODUCT);
    const [updateProduct] = useMutation(UPDATE_PRODUCT);
    const { loading, data} = useQuery(PRODUCT, { variables: { product_id: product_id }})

    const product = data?.product || {};

    const [formData, setProductFormData] = useState({
        product_name: product.product_name,
        product_description: product.product_description,
        product_category: product.product_category,
        product_weight: product.product_weight,
        product_price: product.product_price,
        product_picture: product.product_picture,
        product_nameChinese: product.product_nameChinese,
        product_descriptionChinese: product.product_descriptionChinese,
    })

    const handleInputChange = (event) => {
        const { name, value } = event.target;
        setProductFormData({
            ...formData,
            [name]: value
        })
    }

    const updateProductFormSubmit = async (e) => {

        try {
            updateProduct({ variables: {
                product_id: product_id, 
                input: {
                    product_name: formData.product_name,
                    product_description: formData.product_description,
                    product_price: parseInt(formData.product_price),
                    product_weight: formData.product_weight,
                    product_nameChinese: formData.product_nameChinese,
                    product_descriptionChinese: formData.product_descriptionChinese,
                    product_picture: formData.product_picture,
                    product_category: formData.product_category,
                    product_status: JSON.parse(formData.product_status.toLowerCase())
                },
             }})

            alert('product updated');
        } catch (e) {
            console.log(e);
        }
    } 

    const deleteProductFormSubmit = async (e) => {
        var confirm = window.confirm('Continue to DELETE product');

        if (confirm === false) {
            return false;
        }

        try {
            removeProduct({ variables: {
                product_id: product_id
            }})

            window.location.href =`/admindashboard`;
        } catch (e) {
            console.log(e);
        }
    }

    function returnDashboard() {
        window.location.href = `/admindashboard`;
    }

    if (loading) return 'Loading...';
    if (error) return `Error! ${error.message}`;

    console.log(product);

    return (
        location.pathname === `/productupdate/${product_id}` &&
        <>
            <div className="flex-c-column content">
                <button className="margin-2rem" onClick={returnDashboard}>Return To Product List</button>
                <form className="flex-c-column product-form-container" onSubmit={updateProductFormSubmit}>
                    <div className="product-id id-input-width" value={product._id}>{product._id}</div>
                    <div className="flex-start-column">
                            <label className="bold">Name</label>
                            <input value={formData.product_name} onChange={handleInputChange} className="product-name admin-input-width" name='product_name' placeholder={product.product_name} type="text"></input>
                        </div>
                        <div className="flex-start-column">
                            <label className="bold">Category</label>
                            <input value={formData.product_category} onChange={handleInputChange} className="product-category admin-input-width" name='product_category' placeholder={product.product_category} type="text"></input>
                        </div>
                        <div className="flex-start-column">
                            <label className="bold">Price</label>
                            <input value={formData.product_price} onChange={handleInputChange} className="product-price admin-input-width" name='product_price' placeholder={product.product_price} type="text"></input>
                        </div>
                        <div className="flex-start-column">
                            <label className="bold">Description</label>
                            <input value={formData.product_description} onChange={handleInputChange} className="product-description admin-input-width" name='product_description' placeholder={product.product_description} type="text"></input>
                        </div>
                        <div className="flex-start-column">
                            <label className="bold">Weight</label>
                            <input value={formData.product_weight} onChange={handleInputChange} className="product-weight admin-input-width" name='product_weight' placeholder={product.product_weight} type="text"></input>
                        </div>
                        <div className="flex-start-column">
                            <label className="bold">Chinese Name</label>
                            <input value={formData.product_nameChinese} onChange={handleInputChange} className="product-name-chinese admin-input-width" name='product_nameChinese' placeholder={product.product_nameChinese} type="text"></input>
                        </div>
                        <div className="flex-start-column">
                            <label className="bold">Chinese Description</label>
                            <input value={formData.product_descriptionChinese} onChange={handleInputChange} className="product-description-chinese admin-input-width" placeholder={product.product_descriptionChinese} name='product_descriptionChinese' type="text"></input>
                        </div>
                        <div className="flex-start-column">
                            <label className="bold">Product Status: true/false</label>
                            <input value={formData.product_status} onChange={handleInputChange} className="product-description-chinese admin-input-width" name='product_status' placeholder={product.product_status.toString()} type="text"></input>
                        </div>
                        <div className="flex-start-column">
                            <label className="bold">Picture Location</label>
                            <input value={formData.product_picture} onChange={handleInputChange} className="product-picture admin-input-width" name='product_picture' placeholder={product.product_picture} type="text"></input>
                        </div>
                            <button id={product._id} onClick={() => {updateProductFormSubmit()}} className="admin-product-button admin-input-width" type='submit'>UPDATE</button>
                            <button className="admin-product-button admin-input-width" id={product._id} onClick={() => { deleteProductFormSubmit()}}>DELETE</button>
                    </form>
                </div>
        </>
    )
}

export default SingleProductEdit;