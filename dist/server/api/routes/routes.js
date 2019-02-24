"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var routes_1 = require("../../modules/User/routes");
var auth_1 = require("../../modules/auth/auth");
var routes_2 = require("../../modules/author/routes");
var routes_3 = require("../../modules/posts/routes");
var Routes = /** @class */ (function () {
    function Routes() {
    }
    Routes.prototype.initRoutes = function (app, auth) {
        app.route('/').get(function (req, res) { return res.send('Hello, world!'); });
        app.route('/ola/:nome').get(function (req, res) { return res.send("Hello, " + req.params.nome + "!"); });
        app.route('/token').post(auth_1.default.auth);
        app.route('/api/users/all').all(auth.authenticate()).get(routes_1.default.index);
        app.route('/api/users/:id').all(auth.authenticate()).get(routes_1.default.findOne);
        app.route('/api/users/create').all(auth.authenticate()).post(routes_1.default.create);
        app.route('/api/users/:id/update').all(auth.authenticate()).put(routes_1.default.update);
        app.route('/api/users/:id/destroy').all(auth.authenticate()).delete(routes_1.default.destroy);
        app.route('/api/author/all').all(auth.authenticate()).get(routes_2.default.index);
        app.route('/api/author/:id').all(auth.authenticate()).get(routes_2.default.findOne);
        app.route('/api/author/create').all(auth.authenticate()).post(routes_2.default.create);
        app.route('/api/author/:id/update').all(auth.authenticate()).put(routes_2.default.update);
        app.route('/api/author/:id/destroy').all(auth.authenticate()).delete(routes_2.default.destroy);
        app.route('/api/post/all').all(auth.authenticate()).get(routes_3.default.index);
        app.route('/api/post/:id').all(auth.authenticate()).get(routes_3.default.findOne);
        app.route('/api/post/create').all(auth.authenticate()).post(routes_3.default.create);
        app.route('/api/post/:id/update').all(auth.authenticate()).put(routes_3.default.update);
        app.route('/api/post/:id/destroy').all(auth.authenticate()).delete(routes_3.default.destroy);
    };
    return Routes;
}());
exports.default = new Routes();
