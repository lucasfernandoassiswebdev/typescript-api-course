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
                done(error);
            });
        });
    });
    describe(('GET /api/users/:id'), function () {
        it('Deve retornar um JSON com os dados do usuário do id informado', function (done) {
            helpers_1.request(helpers_1.app)
                .get("/api/users/" + 1) //id qualquer
                .end(function (error, res) {
                helpers_1.expect(res.status).to.equal(200);
                done(error);
            });
        });
    });
    describe(('POST /api/users/create'), function () {
        it('Deve cadastrar um novo usuário', function (done) {
            var user = {
                nome: 'Teste'
            };
            helpers_1.request(helpers_1.app)
                .post('/api/users/create')
                .send(user) //corpo da requisição
                .end(function (error, res) {
                helpers_1.expect(res.status).to.equal(200);
                done(error);
            });
        });
    });
    describe(('PUT /api/users/:id/update'), function () {
        it('Deve atualizar os dados de um usuário', function (done) {
            var user = {
                nome: 'TesteUpdate'
            };
            helpers_1.request(helpers_1.app)
                .put("/api/users/" + 1 + "/update")
                .send(user) //corpo da requisição
                .end(function (error, res) {
                helpers_1.expect(res.status).to.equal(200);
                done(error);
            });
        });
    });
    describe(('DELETE /api/users/:id/destroy'), function () {
        it('Deve deletar um usuário', function (done) {
            helpers_1.request(helpers_1.app)
                .delete("/api/users/" + 1 + "/destroy")
                .end(function (error, res) {
                helpers_1.expect(res.status).to.equal(200);
                done(error);
            });
        });
    });
});
