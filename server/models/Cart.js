const { Schema } = require('mongoose');

const cartSchema = new Schema( 
    {
        cart_list: [String],
        paid: {
            type: Boolean,
            required: true,
            trim: true
        },
        deliveryDate: {
            type: String,
            trim: true
        },
        time: {
            type: String,
            trim: true
        }
    },
);

module.exports = cartSchema;