"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var HTTPStatus = require("http-status");
var service_1 = require("./service");
var UserController = /** @class */ (function () {
    function UserController() {
        this.UserService = new service_1.default();
    }
    UserController.prototype.getAll = function (req, res) {
        this.UserService.getAll().then(function (data) {
            res.status(HTTPStatus.OK).json({ payload: data });
        }).catch(function (err) {
            res.status(HTTPStatus.INTERNAL_SERVER_ERROR).json({ payload: 'Erro ao buscar todos os usuários' });
        });
    };
    UserController.prototype.createUser = function (req, res) {
        this.UserService.create(req.body).then(function (data) {
            res.status(HTTPStatus.OK).json({ payload: data });
        }).catch(function (err) {
            res.status(HTTPStatus.INTERNAL_SERVER_ERROR).json({ payload: 'Erro ao cadastrar usuário' });
        });
    };
    UserController.prototype.getById = function (req, res) {
        this.UserService.getById(parseInt(req.params.id)).then(function (data) {
            res.status(HTTPStatus.OK).json({ payload: data });
        }).catch(function (err) {
            res.status(HTTPStatus.INTERNAL_SERVER_ERROR).json({ payload: 'Erro ao buscar usuário' });
        });
    };
    UserController.prototype.updateUser = function (req, res) {
        this.UserService.update(parseInt(req.params.id), req.body).then(function (data) {
            res.status(HTTPStatus.OK).json({
                payload: data
            });
        }).catch(function (err) {
            res.status(HTTPStatus.INTERNAL_SERVER_ERROR).json({ payload: 'Erro ao atualizar usuário' });
        });
    };
    UserController.prototype.deleteUser = function (req, res) {
        this.UserService.delete(parseInt(req.params.id)).then(function (data) {
            res.status(HTTPStatus.OK).json({ payload: data });
        }).catch(function (err) {
            res.status(HTTPStatus.INTERNAL_SERVER_ERROR).json({ payload: 'Erro ao excluir usuário' });
        });
    };
    return UserController;
}());
exports.default = UserController;
