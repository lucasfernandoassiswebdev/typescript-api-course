"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var jwt = require("jwt-simple");
var HTTPStatus = require("http-status");
var helpers_1 = require("./config/helpers");
var HttpStatus = require("http-status");
describe('Testes de Integração', function () {
    'use strict';
    var config = require('../../server/config/env/config')();
    //apenas a pasta models pois o sequelize através do arquivo index que é gerado automaticamente
    //nos devolve a instância do modelo
    var model = require('../../server/models');
    var id;
    var token;
    var userTest = {
        id: 100,
        name: 'Usuário teste',
        email: 'teste@email.com',
        password: 'teste'
    };
    var userDefault = {
        id: 1,
        name: 'Lucas',
        email: 'l.assis@eddydata.com.br',
        password: '123'
    };
    //executar instruções antes da execução de cada caso de teste
    beforeEach(function (done) {
        model.User.destroy({
            where: {} //excluir todos os registros da base de dados
        })
            .then(function () {
            return model.User.create(userDefault);
        })
            .then(function (user) {
            model.User.create(userTest)
                .then(function () {
                token = jwt.encode({ id: user.id }, config.secret);
                done();
            });
        });
    });
    describe('POST /token', function () {
        it('Deve receber um JWT', function (done) {
            var credentials = {
                email: userDefault.email,
                password: userDefault.password
            };
            helpers_1.request(helpers_1.app).post('/token')
                .send(credentials)
                .end(function (error, res) {
                helpers_1.expect(res.status).to.equal(HttpStatus.OK);
                helpers_1.expect(res.body.token).to.equal("" + token);
                done(error);
            });
        });
        it('Não deve gerar Token', function (done) {
            var credentials = {
                email: 'email@emailqualquer.com',
                passport: 'password qualquer'
            };
            helpers_1.request(helpers_1.app).post('/token')
                .send(credentials)
                .end(function (error, res) {
                helpers_1.expect(res.status).to.equal(HttpStatus.UNAUTHORIZED);
                helpers_1.expect(res.body).to.empty;
                done(error);
            });
        });
    });
    describe('GET /', function () {
        it('Deve retornar a mensagem Hello World', function (done) {
            helpers_1.request(helpers_1.app)
                .get('/')
                .end(function (error, res) {
                helpers_1.expect(res.status).to.equal(HTTPStatus.OK);
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
                helpers_1.expect(res.status).to.equal(HTTPStatus.OK);
                helpers_1.expect(res.text).to.be.eql('Hello, Typescript Course!');
                done(error);
            });
        });
    });
    describe(('GET /api/users/all'), function () {
        it('Deve retornar um Array com todos os usuários', function (done) {
            helpers_1.request(helpers_1.app)
                .get('/api/users/all')
                .set('Content-Type', 'application/json')
                .set('Authorization', "jwt " + token)
                .end(function (error, res) {
                helpers_1.expect(res.status).to.equal(HTTPStatus.OK);
                helpers_1.expect(res.body.payload).to.be.an('array');
                helpers_1.expect(res.body.payload[0].name).to.be.equal(userDefault.name);
                helpers_1.expect(res.body.payload[0].email).to.be.equal(userDefault.email);
                done(error);
            });
        });
    });
    describe(('GET /api/users/:id'), function () {
        it('Deve retornar um Array com os dados do usuário do id informado', function (done) {
            helpers_1.request(helpers_1.app)
                .get("/api/users/" + userDefault.id)
                .set('Content-Type', 'application/json')
                .set('Authorization', "jwt " + token)
                .end(function (error, res) {
                helpers_1.expect(res.status).to.equal(HTTPStatus.OK);
                helpers_1.expect(res.body.payload.id).to.equal(userDefault.id);
                //objeto do corpo da resposta deve ter todas as propriedades(chaves) especificadas
                helpers_1.expect(res.body.payload).to.have.all.keys([
                    'id', 'name', 'email', 'password'
                ]);
                done(error);
            });
        });
    });
    describe(('POST /api/users/create'), function () {
        it('Deve cadastrar um novo usuário', function (done) {
            var user = {
                id: 2,
                name: 'Lucas',
                email: 'lucas@email.com',
                password: '567'
            };
            helpers_1.request(helpers_1.app)
                .post('/api/users/create')
                .set('Content-Type', 'application/json')
                .set('Authorization', "jwt " + token)
                .send(user) //corpo da requisição
                .end(function (error, res) {
                helpers_1.expect(res.status).to.equal(HTTPStatus.OK);
                helpers_1.expect(res.body.payload.id).to.eql(user.id);
                helpers_1.expect(res.body.payload.name).to.eql(user.name);
                helpers_1.expect(res.body.payload.email).to.eql(user.email);
                done(error);
            });
        });
    });
    describe(('PUT /api/users/:id/update'), function () {
        it('Deve atualizar os dados de um usuário', function (done) {
            var user = {
                id: 2,
                name: 'TestUpdate',
                email: 'update@email.com',
                password: 'asdhklaj kasjdlaskjasdlkd'
            };
            userTest.id = user.id;
            helpers_1.request(helpers_1.app)
                .put("/api/users/" + userTest.id + "/update")
                .set('Content-Type', 'application/json')
                .set('Authorization', "jwt " + token)
                .send(user)
                .end(function (error, res) {
                helpers_1.expect(res.status).to.equal(HTTPStatus.OK);
                helpers_1.expect(res.body.payload.length).to.equal(1);
                done(error);
            });
        });
    });
    describe(('DELETE /api/users/:id/destroy'), function () {
        it('Deve deletar um usuário', function (done) {
            helpers_1.request(helpers_1.app)
                .delete("/api/users/" + userTest.id + "/destroy")
                .set('Content-Type', 'application/json')
                .set('Authorization', "jwt " + token)
                .end(function (error, res) {
                helpers_1.expect(res.status).to.equal(HTTPStatus.OK);
                done(error);
            });
        });
    });
});
