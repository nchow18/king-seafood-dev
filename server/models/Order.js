const { Schema, model } = require('mongoose');
const dateFormat = require('../utils/dateFormat');

const orderCartSchema = new Schema(
    {
        product_id: String,
        quantity: Number
    }
)

const orderSchema = new Schema(
    {
        orderTotal: Number,
        cart: [String],
        delivery_status: {
            type: Boolean,
            required: true,
            default: false
        },
        delivery_date: {
            type: String,
            required: true,
        },
        createdAt: {
            type: Date,
            default: Date.now,
            get: timestamp => dateFormat(timestamp)
        },
        paid: {
            type: Boolean,
            required: true
        },
        cart: [orderCartSchema],
    },
    {
        toJSON: {
            getters: true
        }
    }
);

orderSchema.virtual('order_count').get(function () {
    return this.order.length;
});


const Order = model('Order', orderSchema);

module.exports = Order;