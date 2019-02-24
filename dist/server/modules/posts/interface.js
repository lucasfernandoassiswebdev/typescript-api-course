"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function createPost(_a) {
    var id = _a.id, title = _a.title, text = _a.text, Author = _a.Author;
    return {
        id: id, title: title, text: text, Author: Author
    };
}
exports.createPost = createPost;
function createPosts(data) {
    return data.map(createPost);
}
exports.createPosts = createPosts;
