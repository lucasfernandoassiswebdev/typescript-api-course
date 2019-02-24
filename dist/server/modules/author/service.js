"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var interface_1 = require("./interface");
var model = require('../../models');
var Author = /** @class */ (function () {
    function Author() {
    }
    Author.prototype.create = function (author) {
        return model.Author.create(author);
    };
    Author.prototype.getAll = function () {
        return model.Author.findAll({
            order: ['name'],
            include: [{ model: model.Post }]
        }).then(interface_1.createAuthors);
    };
    Author.prototype.getById = function (id) {
        return model.Author.findOne({
            where: { id: id },
            order: ['name'],
            include: [{ model: model.Post }]
        }).then(interface_1.createAuthor);
    };
    Author.prototype.update = function (id, author) {
        return model.Author.update(author, {
            where: { id: id },
            fields: ['name'],
            hooks: true,
            individualHooks: true
        });
    };
    Author.prototype.delete = function (id) {
        return model.Author.destroy({
            where: { id: id }
        });
    };
    return Author;
}());
exports.default = new Author();
