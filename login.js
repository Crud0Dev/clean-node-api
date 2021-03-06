// eslint-disable-next-line max-classes-per-file
const express = require('express');

const router = express.Router();

module.exports = () => {
  const router = new SignUpRouter();
  router.post('/signup', new ExpressRouterAdapter.adapt(router));
};

class ExpressRouterAdapter {
  static adapt(router) {
    return async (req, res) => {
      const httpRequest = {
        body: req.body,
      };
      const httpResponse = await router.route(httpRequest);
      res.status(httpResponse).json(httpResponse.body);
    };
  }
}
// presentation-layer
// signup-router
class SignUpRouter {
  async route(httpRequest) {
    const { email, password, repeatPassword } = httpRequest.body;
    const user = new SignUpUseCase().signUp(email, password, repeatPassword);
    return {
      statusCode: 200,
      body: user,
    };
  }
}
// domain
// signup-usecase
class SignUpUseCase {
  async signUp(email, password, repeatPassword) {
    if (password === repeatPassword) {
      new AddAccountrepository().add(email, password);
    }
  }
}
// Infra
// add-account-repo
const mongoose = require('mongoose');

const AccountModel = mongoose.model('Account');

class AddAccountrepository {
  async add(email, password, repeatPassword) {
    const user = await AccountModel.create({ email, password });
    return user;
  }
}
