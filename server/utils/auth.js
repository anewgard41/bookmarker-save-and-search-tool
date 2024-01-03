const jwt = require('jsonwebtoken');
// import error handling
const { GraphQLError } = require('graphql');

// set token secret and expiration date
const secret = 'mysecretsshhhhh';
const expiration = '2h';

module.exports = {
  AuthenticationError: new GraphQLError('Authentication Error.', {
    extensions: {
      code: 'UNAUTHENTICATED',
    },
  }),
  // function for our authenticated routes
  authMiddleware: function ({req}) {
    // allows token to be sent via  req.query or headers
    let token = req.query.token || req.headers.authorization || req.body.token;

    // ["Bearer", "<tokenvalue>"]
    if (req.headers.authorization) {
      token = token.split(' ').pop().trim();
    }

    if (!token) {
      return req;
    }

    // verify token and get user data out of it
    try {
      const { data } = jwt.verify(token, secret, { maxAge: expiration });
      req.user = data;
    } catch {
      console.log('Invalid token');
      throw new GraphQLError('Invalid token', {
        extensions: {
          code: 'UNAUTHENTICATED',
        },
      });
    }

    return req;
  },
  signToken: function ({ username, email, _id }) {
    const payload = { username, email, _id };

    return jwt.sign({ data: payload }, secret, { expiresIn: expiration });
  },
};
