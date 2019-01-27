"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var helpers_1 = require("./config/helpers");
describe('Testes de Integração', function () {
    describe('GET /', function () {
        it('Deve retornar a mensagem Hello World', function (done) {
            helpers_1.request(helpers_1.app)
                .get('/')
                .end(function (error, res) {
                helpers_1.expect(res.status).to.equal(200);
                helpers_1.expect(res.text).to.be.eql('Hello, world!');
                done(error);
            });
        });
    });
    describe('GET /ola:nome', function () {
        it('Deve retornar a mensagem Hello Typescript Course', function (done) {
            var nome = "Typescript Course";
            helpers_1.request(helpers_1.app)
                .get("/ola/" + nome)
                .end(function (error, res) {
                helpers_1.expect(res.status).to.equal(200);
                helpers_1.expect(res.text).to.be.eql('Hello, Typescript Course!');
                done(error);
            });
        });
    });
    describe(('GET /api/users/all'), function () {
        it('Deve retornar um JSON com todos os usuários', function (done) {
            helpers_1.request(helpers_1.app)
                .get('/api/users/all')
                .end(function (error, res) {
                helpers_1.expect(res.status).to.equal(200);
            });
        });
    });
    describe(('GET /api/users/:id'), function () {
        it('Deve retornar um JSON com os dados do usuário do id informado', function (done) {
            helpers_1.request(helpers_1.app)
                .get("/api/users/" + 1) //id qualquer
                .end(function (error, res) {
                helpers_1.expect(res.status).to.equal(200);
            });
        });
    });
    describe(('POST /api/users/new'), function () {
        it('Deve cadastrar um novo usuário', function (done) {
            var user = {
                nome: 'Teste'
            };
            helpers_1.request(helpers_1.app)
                .post('/api/users/new') //id qualquer
                .send(user) //corpo da requisição
                .end(function (error, res) {
                helpers_1.expect(res.status).to.equal(200);
            });
        });
    });
    describe(('PUT /api/users/:id/edit'), function () {
        it('Deve atualizar os dados de um usuário', function (done) {
            var user = {
                nome: 'TesteUpdate'
            };
            helpers_1.request(helpers_1.app)
                .put("/api/users/" + 1 + "/edit")
                .send(user) //corpo da requisição
                .end(function (error, res) {
                helpers_1.expect(res.status).to.equal(200);
            });
        });
    });
    describe(('DELETE /api/users/:id'), function () {
        it('Deve deletar um usuário', function (done) {
            helpers_1.request(helpers_1.app)
                .delete("/api/users/" + 1)
                .end(function (error, res) {
                helpers_1.expect(res.status).to.equal(200);
            });
        });
    });
});
