"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var _ = require("lodash");
var handlers_1 = require("../../api/responses/handlers");
var service_1 = require("./service");
var UserController = /** @class */ (function () {
    function UserController() {
    }
    UserController.prototype.getAll = function (req, res) {
        service_1.default.getAll()
            .then(_.partial(handlers_1.default.onSuccess, res))
            .catch(_.partial(handlers_1.default.onError, res, 'Erro ao buscar todos os usuários'));
    };
    UserController.prototype.getById = function (req, res) {
        service_1.default.getById(parseInt(req.params.id))
            .then(_.partial(handlers_1.default.onSuccess, res))
            .catch(_.partial(handlers_1.default.onError, res, 'Erro ao buscar usuário'));
    };
    UserController.prototype.createUser = function (req, res) {
        service_1.default.create(req.body)
            .then(_.partial(handlers_1.default.onSuccess, res))
            .catch(_.partial(handlers_1.default.dbErrorHandler, res))
            .catch(_.partial(handlers_1.default.onError, res, 'Erro ao cadastrar usuário'));
    };
    UserController.prototype.updateUser = function (req, res) {
        service_1.default.update(parseInt(req.params.id), req.body)
            .then(_.partial(handlers_1.default.onSuccess, res))
            .catch(_.partial(handlers_1.default.dbErrorHandler, res))
            .catch(_.partial(handlers_1.default.onError, res, 'Erro ao cadastrar usuário'));
    };
    UserController.prototype.deleteUser = function (req, res) {
        service_1.default.delete(parseInt(req.params.id))
            .then(_.partial(handlers_1.default.onSuccess, res))
            .catch(_.partial(handlers_1.default.dbErrorHandler, res))
            .catch(_.partial(handlers_1.default.onError, res, 'Erro ao excluir usuário'));
        ;
    };
    return UserController;
}());
exports.default = UserController;
