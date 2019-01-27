import * as HTTPStatus from 'http-status';
import { app, request, expect } from './config/helpers';

describe('Testes de Integração', () => {
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

    describe(('GET /api/users/all'), () => {
        it('Deve retornar um JSON com todos os usuários', done => {
            request(app)
                .get('/api/users/all')
                .end((error, res) => {
                    expect(res.status).to.equal(HTTPStatus.OK);
                    done(error);
                });
        });
    });

    describe(('GET /api/users/:id'), () => {
        it('Deve retornar um JSON com os dados do usuário do id informado', done => {
            request(app)
                .get(`/api/users/${1}`) //id qualquer
                .end((error, res) => {
                    expect(res.status).to.equal(HTTPStatus.OK);
                    done(error);
                });
        });
    });

    describe(('POST /api/users/create'), () => {
        it('Deve cadastrar um novo usuário', done => {
            const user = {
                nome: 'Teste'
            }

            request(app)
                .post('/api/users/create')
                .send(user)//corpo da requisição
                .end((error, res) => {
                    expect(res.status).to.equal(HTTPStatus.OK);
                    done(error);
                });
        });
    });

    describe(('PUT /api/users/:id/update'), () => {
        it('Deve atualizar os dados de um usuário', done => {
            const user = {
                nome: 'TesteUpdate'
            }

            request(app)
                .put(`/api/users/${1}/update`)
                .send(user)//corpo da requisição
                .end((error, res) => {
                    expect(res.status).to.equal(HTTPStatus.OK);
                    done(error);
                });
        });
    });

    describe(('DELETE /api/users/:id/destroy'), () => {
        it('Deve deletar um usuário', done => {
            request(app)
                .delete(`/api/users/${1}/destroy`)
                .end((error, res) => {
                    expect(res.status).to.equal(HTTPStatus.OK);
                    done(error);
                });
        });
    });
});