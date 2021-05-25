import gql from 'graphql-tag';

// 1 USER
// 2 PRODUCT
// 3 PRODUCTS
// 4 ORDER
// 5 ORDERS
// 6 PROMO

export const USER = gql`
query user($user_id: ID!) {
  user(user_id: $user_id) {
    _id
    first_name
    last_name
    email
		phone
    cart {
      product_id
      quantity
    }
    address{
      street_name
      street_number
      city
      region
      state
      postal_code
    }
  }
}

`;

export const PRODUCT = gql`
query product($product_id: ID!) {
  product(product_id:$product_id) {
    _id
    product_name
    product_category
    product_price
    product_description
    product_weight
    product_picture
    product_nameChinese
    product_descriptionChinese
    product_status
  }
}
`;

export const PRODUCTS = gql`
query {
  products {
    _id
    product_name
    product_category
    product_price
    product_description
    product_weight
    product_picture
    product_nameChinese
    product_descriptionChinese
    product_status
  }
}
`;

export const ORDER = gql`
query {
  order {
    _id
    orderTotal
    paid
    delivery_date
    delivery_status
    createdAt
  }
}
`;

export const ORDERS = gql`
query {
  orders {
    _id
    orderTotal
    paid
    delivery_date
    delivery_status
    createdAt
  }
}
`;

export const PROMO = gql`
query {
  promo {
    _id
    promoMsg1
    promo1Start
    promo1End
    promoMsg2
    promo2Start
    promo2End
    promoMsg3
    promo3Start
    promo3End
    mainPromo
    featuredProduct1
    featuredProduct2
    featuredProduct3
  }
}
`;