const { Schema, model } = require('mongoose');
const bcrypt = require('bcrypt');

const promoSchema = new Schema(
    {
        promoMsg1: {
            type: String,
            required: false,
            trim: true
        },
        promo1Start: {
            type: String,
            required: false,
            trim: true
        },
        promo1End: {
            type: String,
            required: false,
            trim: true
        },
        promoMsg2: {
            type: String,
            required: false,
            trim: true
        },
        promo2Start: {
            type: String,
            required: false,
            trim: true
        },
        promo2End: {
            type: String,
            required: false,
            trim: true
        },
        promoMsg3: {
            type: String,
            required: false,
            trim: true
        },
        promo3Start: {
            type: String,
            required: false,
            trim: true
        },
        promo3End: {
            type: String,
            required: false,
            trim: true
        },
        mainPromo: {
            type: String,
            required: false,
            trim: true
        },
        featuredProduct1: String,
        featuredProduct2: String,
        featuredProduct3: String,
    },
    {
        toJSON: {
            getters: true
        }
    }
);

const Promo = model('Promo', promoSchema);

module.exports = Promo;
