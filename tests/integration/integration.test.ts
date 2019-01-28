import * as HTTPStatus from 'http-status';
import { app, request, expect } from './config/helpers';

describe('Testes de Integração', () => {
    'use strict';
    const config = require('../../server/config/env/config')();
    //apenas a pasta models pois o sequelize através do arquivo index que é gerado automaticamente
    //nos devolve a instância do modelo
    const model = require('../../server/models');

    let id;

    const userTest = {
        id: 100,
        name: 'Usuário teste',
        email: 'teste@email.com',
        password: 'teste'
    };

    const userDefault = {
        id: 1,
        name: 'Default User',
        email: 'default@email.com',
        password: 'default'
    };

    //executar instruções antes da execução de cada caso de teste
    beforeEach(done => {
        model.User.destroy({
            where: {} //excluir todos os registros da base de dados
        })
            .then(() => {
                return model.User.create(userDefault);
            })
            .then(user => {
                model.User.create(userTest)
                    .then(() => {
                        done();
                    });
            });
    });

    /*
    describe('GET /', () => {
        it('Deve retornar a mensagem Hello World', done => {
            request(app)
                .get('/')
                .end((error, res) => {
                    expect(res.status).to.equal(HTTPStatus.OK);
                    expect(res.text).to.be.eql('Hello, world!');
                    done(error);
                })
        });
    });

    describe('GET /ola:nome', () => {
        it('Deve retornar a mensagem Hello Typescript Course', done => {
            const nome = "Typescript Course";
            request(app)
                .get(`/ola/${nome}`)
                .end((error, res) => {
                    expect(res.status).to.equal(HTTPStatus.OK);
                    expect(res.text).to.be.eql('Hello, Typescript Course!');
                    done(error);
                })
        });
    });
    */

    describe(('GET /api/users/all'), () => {
        it('Deve retornar um Array com todos os usuários', done => {
            request(app)
                .get('/api/users/all')
                .end((error, res) => {
                    expect(res.status).to.equal(HTTPStatus.OK);
                    expect(res.body.payload).to.be.an('array');
                    expect(res.body.payload[0].name).to.be.equal(userDefault.name);
                    expect(res.body.payload[0].email).to.be.equal(userDefault.email);
                    done(error);
                });
        });
    });

    describe(('GET /api/users/:id'), () => {
        it('Deve retornar um Array com os dados do usuário do id informado', done => {
            request(app)
                .get(`/api/users/${userDefault.id}`)
                .end((error, res) => {
                    expect(res.status).to.equal(HTTPStatus.OK);
                    expect(res.body.payload.id).to.equal(userDefault.id);
                    //objeto do corpo da resposta deve ter todas as propriedades(chaves) especificadas
                    expect(res.body.payload).to.have.all.keys([
                        'id', 'name', 'email', 'password'
                    ]);
                    userTest.id = res.body.payload.id;
                    done(error);
                });
        });
    });

    describe(('POST /api/users/create'), () => {
        it('Deve cadastrar um novo usuário', done => {
            const user = {
                id: 2,
                name: 'Usuário Teste',
                email: 'usuario@email.com',
                password: 'novouser'
            };

            request(app)
                .post('/api/users/create')
                .send(user) //corpo da requisição
                .end((error, res) => {
                    expect(res.status).to.equal(HTTPStatus.OK);
                    expect(res.body.payload.id).to.eql(user.id);
                    expect(res.body.payload.name).to.eql(user.name);
                    expect(res.body.payload.email).to.eql(user.email);
                    done(error);
                });
        });
    });

    describe(('PUT /api/users/:id/update'), () => {
        it('Deve atualizar os dados de um usuário', done => {
            const user = {
                name: 'TestUpdate',
                email: 'update@email.com'
            }

            userTest.id = id;

            request(app)
                .put(`/api/users/${userTest.id}/update`)
                .send(user)
                .end((error, res) => {
                    expect(res.status).to.equal(HTTPStatus.OK);
                    expect(res.body.payload.length).to.equal(1);
                    done(error);
                });
        });
    });

    describe(('DELETE /api/users/:id/destroy'), () => {
        it('Deve deletar um usuário', done => {
            request(app)
                .delete(`/api/users/${userTest.id}/destroy`)
                .end((error, res) => {
                    expect(res.status).to.equal(HTTPStatus.OK);
                    expect(res.body.payload.length).to.equal(1);
                    done(error);
                });
        });
    });
});