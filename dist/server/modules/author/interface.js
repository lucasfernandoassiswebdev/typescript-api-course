"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function createAuthor(_a) {
    var id = _a.id, name = _a.name, Posts = _a.Posts;
    return {
        id: id, name: name, Posts: Posts
    };
}
exports.createAuthor = createAuthor;
function createAuthors(data) {
    return data.map(createAuthor);
}
exports.createAuthors = createAuthors;
