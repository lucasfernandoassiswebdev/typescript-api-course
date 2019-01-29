import { testDouble, expect } from './config/helpers';
import User from '../../server/modules/User/service';

describe('Testes Unitários do Controller', () => {
    describe('Método create', () => {
        it('Deve criar um novo usuário', () => {
            const novoUsuario = {
                id: 1,
                name: 'Novo Usuário',
                email: 'novousuario@gmail.com',
                password: '1234'
            }

            const user = new User();
            return user.create(novoUsuario)
                .then(data => {
                    //a ordem das colunas deve ser esta, pois é a ordem na qual as colunas vem do banco de dados
                    expect(data.dataValues).to.have.all.keys(['email', 'id', 'name', 'password', 'updatedAt', 'createdAt']);
                });
        });
    });

    describe('Método Update', () => {
        it('Deve atualizar um usuáruo', () => {

        });
    });

    describe('Método GET Users', () => {
        it('Deve retornar uma lista com todos os usuários', () => {
            const user = new User();
            return user.getAll().then(data => {
                expect(data).to.be.an('array');
                //no resultado da consulta apenas estes campos são devolvidos
                expect(data[0]).to.have.all.keys(['email', 'id', 'name', 'password']);
            });
        });
    });

    describe('Método Delete', () => {
        it('Deve deletar um usuário', () => {

        });
    });
});
