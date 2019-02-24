"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var controller_1 = require("./controller");
var AuthorRoutes = /** @class */ (function () {
    function AuthorRoutes() {
    }
    AuthorRoutes.prototype.index = function (req, res) {
        return controller_1.default.getAll(req, res);
    };
    AuthorRoutes.prototype.create = function (req, res) {
        return controller_1.default.createAuthor(req, res);
    };
    AuthorRoutes.prototype.findOne = function (req, res) {
        return controller_1.default.getById(req, res);
    };
    AuthorRoutes.prototype.update = function (req, res) {
        return controller_1.default.updateAuthor(req, res);
    };
    AuthorRoutes.prototype.destroy = function (req, res) {
        return controller_1.default.deleteAuthor(req, res);
    };
    return AuthorRoutes;
}());
exports.default = new AuthorRoutes();
