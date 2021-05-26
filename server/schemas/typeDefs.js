const { gql } = require('apollo-server-express');

const typeDefs = gql`
    type User {
        _id: ID
        first_name: String
        last_name: String
        email: String
        admin: Boolean
        address: [Address]
        phone: String
        stripe_customer_id: String
        stripe_setup_intent: String
        cart: [Cart]
        pastOrders: [String]
    }

    type Cart {
        product_id: String
        quantity: Int
    }

    input CartInput {
        product_id: String
        quantity: Int
    }

    input UserInput {
        first_name: String
        last_name: String
        email: String
        password: String
        admin: Boolean
        address: [AddressInput]
        phone: String
        cart: [String]
    }

    input UserAccountInput {
        first_name: String
        last_name: String
        email: String!
        password: String
        admin: Boolean
        address: [AddressInput]
        phone: String
        cart: [String]
        stripe_customer_id: String
        stripe_setup_intent: String
    }

    type Product {
        _id: ID
        product_name: String
        product_category: String
        product_price: Int
        product_description: String
        product_weight: String
        product_picture: String
        product_nameChinese: String
        product_descriptionChinese: String
        product_status: Boolean!
    }

    input ProductInput {
        product_name: String!
        product_category: String!
        product_price: Int!
        product_description: String
        product_weight: String
        product_picture: String
        product_nameChinese: String
        product_descriptionChinese: String
        product_status: Boolean
    }

    type Order {
        _id: ID
        orderTotal: Int
        cart: [Cart]
        paid: Boolean
        delivery_date: String
        delivery_status: Boolean
        createdAt: String
    }

    input OrderInput {
        orderTotal: Int
        cart: [CartInput]
        paid: Boolean!
        delivery_date: String!
        delivery_status: Boolean
    }

    input OrderUpdate {
        cart: [CartInput]
    }

    input OrderStatus {
        delivery_status: Boolean!
    }

    type Address {
        street_name: String!
        city: String!
        street_number: String!
        postal_code: String!
        region: String!
        state: String!
    }

    input AddressInput {
        street_name: String!
        city: String!
        street_number: String!
        postal_code: String!
        region: String!
        state: String!
    }

    type Promo {
        _id: ID
        promoMsg1: String
        promo1Start: String
        promo1End: String
        promoMsg2: String
        promo2Start: String
        promo2End: String
        promoMsg3: String
        promo3Start: String
        promo3End: String
        mainPromo: String
        featuredProduct1: String
        featuredProduct2: String
        featuredProduct3: String
    }

    input PromoInput {
        promoMsg1: String
        promo1Start: String
        promo1End: String
        promoMsg2: String
        promo2Start: String
        promo2End: String
        promoMsg3: String
        promo3Start: String
        promo3End: String
        mainPromo: String
        featuredProduct1: String
        featuredProduct2: String
        featuredProduct3: String
    }

    type Customer {
        id: String
        object: String
        address: stripeAddress
        balance: Float
        currency: String
        description: String
        email: String
        name: String
        phone: String
    }

    type stripeAddress {
        city: String
        country: String
        line1: String
        line2: String
        postal_code: String
        state: String
    }

    type Charge {
        id: String
        object: String
        amount: Int
        receipt_url: String
        status: String
    }

    type Payment{
        id: String
        amount: Int
        created: Int
        currency: String
        description: String
        status: String
    }

    type Payments {
        data: [Payment]
    }

    type Auth {
        token: ID!
        user: User
    }

    type Query {
        user(user_id: ID!): User
        users: [User]
        userMe: User

        product(product_id: ID!): Product
        products: [Product]

        order(order_id: ID!): Order
        orders: [Order]

        promo: [Promo]
    }

    type Mutation {
        addUser(input: UserInput): Auth
        login(email: String!, password: String!): Auth
        addCart(input: [CartInput]): User
        removeCart(product_id: ID!): User
        updateUser(input: UserAccountInput): User
        addProduct(input: ProductInput!): Product
        updateProduct(input: ProductInput!, product_id: ID!): Product
        removeProduct(product_id: ID!): Product
        addOrder(input: OrderInput!): Order
        updateOrder(input: OrderUpdate, order_id: ID!): Order
        updateOrderStatus(input: OrderStatus, order_id: ID!): Order
        createPromo(input: PromoInput): Promo
        updatePromo(input: PromoInput, promo_id: ID!): Promo
        updateUserAccount(input: UserInput, user_id: ID!): User
        updateUserAddress(input: AddressInput, user_id: ID!): User
    }

`;

module.exports = typeDefs;
