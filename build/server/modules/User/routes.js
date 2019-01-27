"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var controller_1 = require("./controller");
var userController;
var UserRoutes = /** @class */ (function () {
    function UserRoutes() {
        userController = new controller_1.default();
    }
    UserRoutes.prototype.index = function (req, res) {
        return userController.getAll(req, res);
    };
    UserRoutes.prototype.create = function (req, res) {
        return userController.createUser(req, res);
    };
    UserRoutes.prototype.findOne = function (req, res) {
        return userController.getById(req, res);
    };
    UserRoutes.prototype.update = function (req, res) {
        return userController.updateUser(req, res);
    };
    UserRoutes.prototype.destroy = function (req, res) {
        return userController.deleteUser(req, res);
    };
    return UserRoutes;
}());
exports.default = UserRoutes;
