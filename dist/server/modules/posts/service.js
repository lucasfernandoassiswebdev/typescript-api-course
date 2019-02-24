"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var interface_1 = require("./interface");
var model = require('../../models');
var Post = /** @class */ (function () {
    function Post() {
    }
    Post.prototype.create = function (post) {
        return model.Post.create(post);
    };
    Post.prototype.getAll = function () {
        return model.Post.findAll({
            order: ['title'],
            include: [{ model: model.Author }]
        }).then(interface_1.createPosts);
    };
    Post.prototype.getById = function (id) {
        return model.Post.findOne({
            where: { id: id },
            order: ['title'],
            include: [{ model: model.Author }]
        }).then(interface_1.createPost);
    };
    Post.prototype.update = function (id, post) {
        return model.Post.update(post, {
            where: { id: id },
            fields: ['title', 'text', 'authorId'],
            hooks: true,
            individualHooks: true
        });
    };
    Post.prototype.delete = function (id) {
        return model.Post.destroy({
            where: { id: id }
        });
    };
    return Post;
}());
exports.default = new Post();
