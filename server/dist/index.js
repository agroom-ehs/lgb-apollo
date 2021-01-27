"use strict";

require("dotenv/config");

var _express = _interopRequireDefault(require("express"));

var _apolloServerExpress = require("apollo-server-express");

var _cookieParser = _interopRequireDefault(require("cookie-parser"));

var _cors = _interopRequireDefault(require("cors"));

var _jsonwebtoken = require("jsonwebtoken");

var _user = require("./type_defs/user");

var _resolvers = require("resolvers/");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

//import { createAccessToken, createRefreshToken } from './auth'
//import { sendRefreshToken } from './sendRefreshToken'
var app = (0, _express["default"])();
app.use((0, _cors["default"])({
  origin: 'http://localhost:3000',
  credentials: true
}));
app.use((0, _cookieParser["default"])()); // The ApolloServer constructor requires two parameters: your schema
// definition and your set of resolvers.

var typeDefs = {
  user: _user.user
};
var resolvers = {
  user_resolver: _resolvers.user_resolver
};
var server = new _apolloServerExpress.ApolloServer({
  typeDefs: typeDefs,
  resolvers: resolvers
}); // The `listen` method launches a web server.

server.listen().then(function (_ref) {
  var url = _ref.url;
  console.log("\uD83D\uDE80  Server ready at ".concat(url));
});