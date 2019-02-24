"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var _ = require("lodash");
var handlers_1 = require("../../api/responses/handlers");
var service_1 = require("./service");
var AuthorController = /** @class */ (function () {
    function AuthorController() {
    }
    AuthorController.prototype.getAll = function (req, res) {
        service_1.default.getAll()
            .then(_.partial(handlers_1.default.onSuccess, res))
            .catch(_.partial(handlers_1.default.onError, res, 'Erro ao buscar todos os autores'));
    };
    AuthorController.prototype.createAuthor = function (req, res) {
        service_1.default.create(req.body)
            .then(_.partial(handlers_1.default.onSuccess, res))
            .catch(_.partial(handlers_1.default.dbErrorHandler, res))
            .catch(_.partial(handlers_1.default.onError, res, 'Erro ao inserir novo autor'));
    };
    AuthorController.prototype.getById = function (req, res) {
        service_1.default.getById(parseInt(req.params.id))
            .then(_.partial(handlers_1.default.onSuccess, res))
            .catch(_.partial(handlers_1.default.onError, res, 'Erro ao buscar autor'));
    };
    AuthorController.prototype.updateAuthor = function (req, res) {
        service_1.default.update(parseInt(req.params.id), req.body)
            .then(_.partial(handlers_1.default.onSuccess, res))
            .catch(_.partial(handlers_1.default.onError, res, 'Erro ao atualizar autor'));
    };
    AuthorController.prototype.deleteAuthor = function (req, res) {
        service_1.default.delete(parseInt(req.params.id))
            .then(_.partial(handlers_1.default.onSuccess, res))
            .catch(_.partial(handlers_1.default.onError, res, 'Erro ao excluir o autor'));
    };
    return AuthorController;
}());
exports.default = new AuthorController();
