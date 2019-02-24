"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var controller_1 = require("./controller");
var PostRoutes = /** @class */ (function () {
    function PostRoutes() {
    }
    PostRoutes.prototype.index = function (req, res) {
        return controller_1.default.getAll(req, res);
    };
    PostRoutes.prototype.create = function (req, res) {
        return controller_1.default.createPost(req, res);
    };
    PostRoutes.prototype.findOne = function (req, res) {
        return controller_1.default.getById(req, res);
    };
    PostRoutes.prototype.update = function (req, res) {
        return controller_1.default.updatePost(req, res);
    };
    PostRoutes.prototype.destroy = function (req, res) {
        return controller_1.default.deletePost(req, res);
    };
    return PostRoutes;
}());
exports.default = new PostRoutes();
