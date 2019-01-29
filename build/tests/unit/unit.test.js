"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var helpers_1 = require("./config/helpers");
var service_1 = require("../../server/modules/User/service");
var model = require('../../server/models');
describe('Testes Unitários do Controller', function () {
    var defaultUser = {
        id: 1,
        name: 'Default User',
        email: 'defaultuser@email.com',
        password: '1234'
    };
    beforeEach(function (done) {
        model.User.destroy({
            where: {}
        })
            .then(function () {
            model.User.create(defaultUser).then(function () {
                console.log("Default User created");
                done();
            });
        });
    });
    describe('Método create', function () {
        it('Deve criar um novo usuário', function () {
            var novoUsuario = {
                id: 2,
                name: 'Novo Usuário',
                email: 'novousuario@gmail.com',
                password: '1234'
            };
            var user = new service_1.default();
            return user.create(novoUsuario)
                .then(function (data) {
                //a ordem das colunas deve ser esta, pois é a ordem na qual as colunas vem do banco de dados
                helpers_1.expect(data.dataValues).to.have.all.keys(['email', 'id', 'name', 'password', 'updatedAt', 'createdAt']);
            });
        });
    });
    describe('Método Update', function () {
        it('Deve atualizar um usuáruo', function () {
            var usuarioAtualizado = {
                name: 'Nome Atualizado',
                email: 'atualizado@email.com'
            };
            var user = new service_1.default();
            return user.update(1, usuarioAtualizado) //1 = id do único usuário na base 
                .then(function (data) {
                helpers_1.expect(data[0]).to.be.equal(1); //1 = quantos registros foram atualizados   
            });
        });
    });
    describe('Método GET Users', function () {
        it('Deve retornar uma lista com todos os usuários', function () {
            var user = new service_1.default();
            return user.getAll().then(function (data) {
                helpers_1.expect(data).to.be.an('array');
                //no resultado da consulta apenas estes campos são devolvidos
                helpers_1.expect(data[0]).to.have.all.keys(['email', 'id', 'name', 'password']);
            });
        });
    });
    describe('Método GetById', function () {
        it('Deve retornar o usuário do id especificado', function () {
            var user = new service_1.default();
            return user.getById(1).then(function (data) {
                helpers_1.expect(data).property('id').to.be.equal(1);
                helpers_1.expect(data).to.have.all.keys(['email', 'id', 'name', 'password']);
            });
        });
    });
    describe('Método GetByEmail', function () {
        it('Deve retornar o usuário do email especificado', function () {
            var user = new service_1.default();
            return user.getByEmail('defaultuser@email.com').then(function (data) {
                helpers_1.expect(data).property('id').to.be.equal(1);
                helpers_1.expect(data).to.have.all.keys(['email', 'id', 'name', 'password']);
            });
        });
    });
    describe('Método Delete', function () {
        it('Deve deletar um usuário', function () {
            var user = new service_1.default();
            return user.delete(1).then(function (data) {
                helpers_1.expect(data).to.be.equal(1);
            });
        });
    });
});
