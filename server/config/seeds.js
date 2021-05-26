const db = require('./connection');
const { Order, Product, Promo, User } = require('../models');

db.once('open', async () => {
    console.log('opened');
    
    await User.deleteMany();

    await User.create(
        {
            first_name: 'Nathan',
            last_name: 'Chow',
            email: 'emailme@nathanchow.ca',
            admin: true,
            password: 'adminNathan123'
        }
    )

    await User.create(
        {
            first_name: 'Grace',
            last_name: 'Jong',
            email: 'grace.jong@gmail.com',
            admin: true,
            password: 'ilovekelvin'
        }
    )

    console.log('order seeded');

    process.exit();

});