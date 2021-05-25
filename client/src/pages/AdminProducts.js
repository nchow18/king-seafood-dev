import React, { useState } from 'react';
import Auth from '../utils/auth';
import '../css/Admin.css';
import AdminCategories from '../components/AdminComponents/Products';
import { useMutation, useQuery } from '@apollo/react-hooks';
import { ADD_PRODUCT } from '../utils/mutations';
import { PRODUCTS } from '../utils/queries';

function AdminProducts() {

    const [formData, setProductFormData] = useState({
        product_name: '',
        product_category: '',
        product_weight: '',
        product_price: '',
        product_picture: '',
        product_nameChinese: '',
        product_descriptionChinese: '',
    })

    const [addProduct, { error }] = useMutation(ADD_PRODUCT);
    const { loading, data } = useQuery(PRODUCTS);
    const products = data?.products || {};

    const handleInputChange = (event) => {
        const { name, value } = event.target;
        setProductFormData({
            ...formData,
            [name]: value
        })
    }

    const addProductFormSubmit = async (e) => {
        e.preventDefault();

        try {
            addProduct({ variables: { input: {
                product_name: formData.product_name,
                product_description: formData.product_description,
                product_price: parseInt(formData.product_price),
                product_weight: formData.product_weight,
                product_nameChinese: formData.product_nameChinese,
                product_descriptionChinese: formData.product_descriptionChinese,
                product_picture: formData.product_picture,
                product_category: formData.product_category,
                product_status: JSON.parse(formData.product_status.toLowerCase())
            } }})

            alert('product added');
        } catch (e) {
            console.log(e);
        }
    } 

    const catArr = Auth.getCategories();

    const categories = catArr;

    var chosenArr = '';

    const sortCategory = async (event) => {
        event.preventDefault();
        const e = document.getElementById('select-category');
        const category = e.value;
        
        Auth.adminSetCategory(category);
    }

    if (products) {
        if (Auth.adminGetCategory() === 'All') {
            chosenArr = products;
        } else {
            chosenArr = products.filter((product) => product.category === Auth.adminGetCategory());
        }
    }

    const [mounted, setMounted] = useState(true);
    const toggle = () => setMounted(!mounted);

    if (loading) return `..Loading`;
    if (error) return `...ERROR`;

    return (
        <>
        <div className="flex-start-column">
            <div className="page-title bold font-2rem">
                    ADD NEW PRODUCT
            </div>
            <div className="admin-product-row flex-start-row night-bg">
                <div className="product-id" value="ID">ID</div>
                <form className="flex-start-row" onSubmit={addProductFormSubmit}>
                        <div className="flex-start-column">
                            <label className="bold">Name</label>
                            <input value={formData.product_name} onChange={handleInputChange} className="product-name admin-input-width" name='product_name' type="text"></input>
                        </div>
                        <div className="flex-start-column">
                            <label className="bold">Category</label>
                            <input value={formData.product_category} onChange={handleInputChange} className="product-category admin-input-width" name='product_category' type="text"></input>
                        </div>
                        <div className="flex-start-column">
                            <label className="bold">Price</label>
                            <input value={formData.product_price} onChange={handleInputChange} className="product-price admin-input-width" name='product_price' type="text"></input>
                        </div>
                        <div className="flex-start-column">
                            <label className="bold">Description</label>
                            <input value={formData.product_description} onChange={handleInputChange} className="product-description admin-input-width" name='product_description' type="text"></input>
                        </div>
                        <div className="flex-start-column">
                            <label className="bold">Weight</label>
                            <input value={formData.product_weight} onChange={handleInputChange} className="product-weight admin-input-width" name='product_weight' type="text"></input>
                        </div>
                        <div className="flex-start-column">
                            <label className="bold">Chinese Name</label>
                            <input value={formData.product_nameChinese} onChange={handleInputChange} className="product-name-chinese admin-input-width" name='product_nameChinese' type="text"></input>
                        </div>
                        <div className="flex-start-column">
                            <label className="bold">Chinese Description</label>
                            <input value={formData.product_descriptionChinese} onChange={handleInputChange} className="product-description-chinese admin-input-width" name='product_descriptionChinese' type="text"></input>
                        </div>
                        <div className="flex-start-column">
                            <label className="bold">Product Status: true/false</label>
                            <input value={formData.product_status} onChange={handleInputChange} className="product-description-chinese admin-input-width" name='product_status' type="text"></input>
                        </div>
                        <div className="flex-start-column">
                            <label className="bold">Picture Location</label>
                            <input value={formData.product_picture} onChange={handleInputChange} className="product-picture admin-input-width" name='product_picture' type="text"></input>
                        </div>
                            <button className="admin-product-button admin-input-width" type='submit'>ADD PRODUCT</button>
                    </form>
            </div>
            <div className="flex-start-row">
                <div className="page-title bold font-2rem">
                    CURRENT PRODUCTS
                </div>
                <form className="sort-list" onSubmit={sortCategory}>
                    <label>Sort by CATEGORY:</label>
                    <select id="select-category" name="category">
                        {categories.map((category) => (
                            <option key={category} value={category}>{category}</option>
                        ))}
                    </select>
                    <button onClick={toggle} type="submit">SELECT</button>
                     (Click twice to REFRESH)
                </form>
            </div>
            {mounted && <AdminCategories
            chosenArr={chosenArr}
             />}


        </div>

        </>
    )
}

export default AdminProducts;