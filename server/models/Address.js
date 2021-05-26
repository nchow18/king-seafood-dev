const { Schema } = require('mongoose');

const addressSchema = new Schema(
    {
        street_name: {
            type: String,
            required: true
        },
        street_number: {
            type: String,
            required: true,   
        },
        city: {
            type: String,
            required: true  
        },
        postal_code: {
            type: String,
            required: true  
        },
        region: {
            type: String,
            required: true 
        },
        state: {
            type: String,
            required: true 
        }
    }
);

module.exports = addressSchema;