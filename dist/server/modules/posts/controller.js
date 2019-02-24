"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var _ = require("lodash");
var handlers_1 = require("../../api/responses/handlers");
var service_1 = require("./service");
var PostController = /** @class */ (function () {
    function PostController() {
    }
    PostController.prototype.getAll = function (req, res) {
        service_1.default.getAll()
            .then(_.partial(handlers_1.default.onSuccess, res))
            .catch(_.partial(handlers_1.default.onError, res, 'Erro ao buscar todos os posts'));
    };
    PostController.prototype.createPost = function (req, res) {
        service_1.default.create(req.body)
            .then(_.partial(handlers_1.default.onSuccess, res))
            .catch(_.partial(handlers_1.default.dbErrorHandler, res))
            .catch(_.partial(handlers_1.default.onError, res, 'Erro ao inserir novo post'));
    };
    PostController.prototype.getById = function (req, res) {
        service_1.default.getById(parseInt(req.params.id))
            .then(_.partial(handlers_1.default.onSuccess, res))
            .catch(_.partial(handlers_1.default.onError, res, 'Erro ao buscar post'));
    };
    PostController.prototype.updatePost = function (req, res) {
        service_1.default.update(parseInt(req.params.id), req.body)
            .then(_.partial(handlers_1.default.onSuccess, res))
            .catch(_.partial(handlers_1.default.onError, res, 'Erro ao atualizar post'));
    };
    PostController.prototype.deletePost = function (req, res) {
        service_1.default.delete(parseInt(req.params.id))
            .then(_.partial(handlers_1.default.onSuccess, res))
            .catch(_.partial(handlers_1.default.onError, res, 'Erro ao excluir o post'));
    };
    return PostController;
}());
exports.default = new PostController();
