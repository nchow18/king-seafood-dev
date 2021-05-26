require('dotenv').config();

const { AuthenticationError, UserInputError, ApolloError } = require('apollo-server-express');

const { User, Promo, Product, Order } = require('../models');
const { signToken } = require('../utils/auth');
const mongoose = require('mongoose');
const stripe = require('stripe')(process.env.STRIPE_KEY || process.env.STRIPE_TEST_SK);


const resolvers = {
    Query: {
        user: async (parent, { user_id }, context) => {
            console.log( user_id )
            return await User.findById(user_id)
                .select('-__v -password')
        },
        users: async (parent, args, context) => {
            return await User.find({})
                .select('-__v -password');
        },
        userMe: async (parent, args, context) => {
            if (context.user) {
                const user = await User.findByOne({ _id: context.user._id })
                    .select('-__v -password');

                return user;
            }
            throw new AuthenticationError('Not logged in');
        },
        product: async (parent, { product_id }, context) => {
            console.log( product_id )
            return await Product.findById(product_id)
        },
        products: async (parent, args, context) => {
            return await Product.find({})
        },
        order: async(parent, { order_id }, context) => {
            return await Order.findById(order_id)
        },
        orders: async(parent, args, context) => {
            return await Order.find({})
        },
        promo: async (parent, args, context) => {
            return await Promo.find({})
        }

    },
    Mutation: {
        addUser: async (parent, { input }) => {
            const user = await User.create(input);
            const token = signToken(user);

            return { token, user };
        },
        login: async (parent, { email, password }) => {
            const user = await User.findOne({ email })

            if (!user) {
                throw new AuthenticationError('User not found');
            }

            const correctPw = await user.isCorrectPassword(password);

            if (!correctPw) {
                throw new AuthenticationError('Incorrect credentials');
            }

            const token = signToken(user);

            return { token, user }
        },
        addCart: async (parent, { input }, context) => {

            if (context.user) {
                const product_id = input[0].product_id;
                const user = await User.findById(context.user._id)

                var duplicate = '';

                for (var i = 0; i < user.cart.length; i++ ) {
                    if (product_id === user.cart[i].product_id) {
                        duplicate = 'exists';
                    }
                }

                if (duplicate !== 'exists') {
                    return await User.findByIdAndUpdate(
                        { _id: context.user._id },
                        {$addToSet: { cart: input[0] }},
                        { new: true }
                    )
                }
                throw new AuthenticationError('Item exists in cart');
            }
        throw new AuthenticationError('Not Logged in');
        },
        removeCart: async(parent, { product_id }, context) => {

            if(context.user) {

                return await User.findByIdAndUpdate(
                    context.user._id,
                    { $pull: { cart: { product_id: product_id }}},
                    { new: true }
                )
            }
            throw new AuthenticationError('Not logged in');
        },
        updateUser: async (parent, { input }, context) => {

            console.log(input);
            console.log(context.user);

            if (context.user) {
                return await User.findByIdAndUpdate(
                    context.user._id,
                    {...input},
                    { new: true }
                )
            }
            throw new AuthenticationError('Not logged in');
        },  
        addProduct: async(parent, { input }, context) => {

            if (context.user.admin === true) {
    
                const product = await Product.create(input);
    
                return product;
            } 
            throw new AuthenticationError('Not Admin');
        },
        updateProduct: async(parent, { input, product_id }, context) => {
            if (context.user.admin === true) {
                return await Product.findByIdAndUpdate(
                    product_id,
                    {...input},
                    { new: true }
                )
            }
            throw new AuthenticationError('Not Admin')
        },
        removeProduct: async(parent, { input, product_id }, context) => {
            if (context.user.admin === true) {
                return await Product.findByIdAndDelete(
                    product_id,
                )
            }
        },
        addOrder: async (parent, { input }, context) => {

            if (context.user) {
            const user_data = await User.findById(context.user._id);
            const user_cart = user_data.cart;
            const productArr = await Product.find({});
            
            var cart_total = [];
            var cart_array = [];

            for (var i = 0; i < user_cart.length; i++) {

                const cart_price = productArr.filter(product => product._id = user_cart[i].product_id)
                const price = cart_price[0].product_price;
                const quantity = user_cart[i].quantity;

                cart_total.push(price * quantity);
            }

            //add the total of the cart, product_price * quantity
            const order_total = cart_total.reduce((a,b) => a + b, 0);

                return await Order.create(
                    { paid: input.paid, delivery_date: input.delivery_date, orderTotal: order_total }
                )
            }
            throw new AuthenticationError('Not logged in');
        },
        updateOrder: async(parent, { input, order_id }, context) => {
  
            if (context.user) {
                const user_id = context.user._id;
                const user_data = await User.findById(user_id);
                const cart_data = user_data.cart;
                var cart_array = [];

                for (var i = 0; i < cart_data.length; i++) {
                    cart_array.push(cart_data[i])
                }

                return await Order.findByIdAndUpdate(
                    order_id,
                    {$push: { cart: cart_array }},
                    { new: true }
                )
            }
            throw new AuthenticationError('Not Logged In');
        },
        updateOrderStatus: async(parent, { input, order_id }, context) => {
            if (context.user.admin === true ) {
                return await Order.findByIdAndUpdate(
                    order_id,
                    {...input},
                    { new: true }
                )
            }
            throw new AuthenticationError('Not Admin')
        },
        createPromo: async(parent, { input }, context) => {
            if (context.user.admin === true) {
                const promoQty = await Promo.find({})
                if (promoQty.length >= 1) {

                throw new AuthenticationError('request cancelled')
                }
                return await Promo.create(
                    input
                )
            }
            throw new AuthenticationError('Not Admin');
        },
        updatePromo: async(parent, { input, promo_id }, context) => {
            if (context.user.admin === true) {
                return await Promo.findByIdAndUpdate(
                    promo_id,
                    {...input},
                    { new: true }
                )
            }
            throw new AuthenticationError('Not Admin');
        },
        updateUserAddress: async(parent, { input, user_id }, context) => {
            if(context.user) {

                console.log(input);
                await User.findByIdAndUpdate(
                    user_id,
                    {$set: { address: [] }},
                    { new: true }
                )
                return await User.findByIdAndUpdate(
                    user_id,
                    {$push: { address: input }}
                )
            }
            throw new AuthenticationError('Not Logged In');
        },
        updateUserAccount: async(parent, { input, user_id }, context) => {
            if (context.user) {
                return await User.findByIdAndUpdate(
                    user_id,
                    {...input},
                    { new: true }
                )
            }
            throw new AuthenticationError('Not Logged In');
        }
        

    }
};

module.exports = resolvers;
