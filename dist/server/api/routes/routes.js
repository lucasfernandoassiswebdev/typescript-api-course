"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var routes_1 = require("../../modules/User/routes");
var auth_1 = require("../../modules/auth/auth");
var Routes = /** @class */ (function () {
    function Routes() {
    }
    Routes.prototype.initRoutes = function (app, auth) {
        app.route('/').get(function (req, res) { return res.send('Hello, world!'); });
        app.route('/ola/:nome').get(function (req, res) { return res.send("Hello, " + req.params.nome + "!"); });
        app.route('/api/users/all').all(auth.authenticate()).get(routes_1.default.index);
        app.route('/api/users/:id').all(auth.authenticate()).get(routes_1.default.findOne);
        app.route('/api/users/create').all(auth.authenticate()).post(routes_1.default.create);
        app.route('/api/users/:id/update').all(auth.authenticate()).put(routes_1.default.update);
        app.route('/api/users/:id/destroy').all(auth.authenticate()).delete(routes_1.default.destroy);
        app.route('/token').post(auth_1.default.auth);
    };
    return Routes;
}());
exports.default = new Routes();
