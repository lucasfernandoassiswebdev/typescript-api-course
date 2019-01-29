"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var helpers_1 = require("./config/helpers");
var service_1 = require("../../server/modules/User/service");
describe('Testes Unitários do Controller', function () {
    describe('Método create', function () {
        it('Deve criar um novo usuário', function () {
            var novoUsuario = {
                id: 1,
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
    // describe('Método Update', () => {
    //     it('Deve atualizar um usuáruo', () => {
    //     });
    // });
    // describe('Método GET Users', () => {
    //     it('Deve retornar uma lista com todos os usuários', () => {
    //     });
    // });
    // describe('Método Delete', () => {
    //     it('Deve deletar um usuário', () => {
    //     });
    // });
});
