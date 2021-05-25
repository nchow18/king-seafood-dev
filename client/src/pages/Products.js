import React, { useState } from 'react';
import Auth from '../utils/auth';
import ProductCard from '../components/ProductCard';
// import { useLocation } from 'react-router-dom';
import ProductHeader from '../components/ProductHeader';

function Products() {

//   const location = useLocation();

  const [productLinks] = useState([
		{
			name: 'All',
			href: '/products'
		},
		{
			name: 'Meat',
			href: '/products'
		},
		{
			name: 'Seafood',
			href: '/products'
		},
		{
			name: 'Vegetables',
			href: '/products'
		},
		{
			name: 'Fruits',
			href: '/products'
		},

	])

  const [currentProductLink, setCurrentProductLink] = useState(productLinks[0])
  const currentProduct = { product: currentProductLink.name }
  Auth.setProduct(currentProduct.product)

  return (
    // location.pathname !== `/products` &&
    <>
		<ProductHeader 
			productLinks={productLinks}
			currentProductLink={currentProductLink}
			setCurrentProductLink={setCurrentProductLink}
		/>
		PRODUCT - {currentProduct.product}
    	<div className="flex-c-row content">
        	<ProductCard />
      	</div>
    </>
  )
}

export default Products;