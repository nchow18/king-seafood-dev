const jwt = require('jsonwebtoken');
require('dotenv').config();

const secret = process.env.JWT_SECRET||'mysecretsshhhhh';
const expiration = '2h';

module.exports = {

    authMiddleware: function ({ req }) {
        // allows token to be sent via req.body, req.query, or headers
        let token = req.body.token || req.query.token || req.headers.authorization;

        // ["Bearer", "<tokenvalue>"]
        if (req.headers.authorization) {
            token = token
                .split(' ')
                .pop()
                .trim();
        }

        if (!token) {
            return req;
        }

        try {
            const { data } = jwt.verify(token, secret, { maxAge: expiration });
            req.user = data;      
        }
        catch {
            console.log('Invalid token');
        }

        return req;
    },
    signToken: function({ first_name, last_name, email, _id, admin }) {
        const payload = { first_name, last_name, email, _id, admin };

        return jwt.sign({ data: payload }, secret, { expiresIn: expiration })
    },
}