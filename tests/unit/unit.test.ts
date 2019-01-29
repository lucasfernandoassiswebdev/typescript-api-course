import { testDouble, expect } from './config/helpers';
import User from '../../server/modules/User/service';
const model = require('../../server/models');

describe('Testes Unitários do Controller', () => {
    const defaultUser = {
        id: 1,
        name: 'Default User',
        email: 'defaultuser@email.com',
        password: '1234'
    }

    beforeEach((done) => {
        model.User.destroy({
            where: {}
        })
            .then(() => {
                model.User.create(defaultUser).then(() => {
                    console.log(`Default User created`)
                    done();
                });
            })
    });

    describe('Método create', () => {
        it('Deve criar um novo usuário', () => {
            const novoUsuario = {
                id: 2,
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
            const usuarioAtualizado = {
                name: 'Nome Atualizado',
                email: 'atualizado@email.com'
            };
            const user = new User();
            return user.update(1, usuarioAtualizado)//1 = id do único usuário na base 
                .then(data => {
                    expect(data[0]).to.be.equal(1); //1 = quantos registros foram atualizados   
                });
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
            const user = new User();
            return user.delete(1).then(data => {
                expect(data).to.be.equal(1);
            });
        });
    });
});
