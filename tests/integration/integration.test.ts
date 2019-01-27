import { app, request, expect } from './config/helpers';

describe('Testes de Integração', () => {
    describe('GET /', () => {
        it('Deve retornar a mensagem Hello World', done => {
            request(app)
                .get('/')
                .end((error, res) => {
                    expect(res.status).to.equal(200);
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
                    expect(res.status).to.equal(200);
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
                    expect(res.status).to.equal(200);
                });
        });
    });

    describe(('GET /api/users/:id'), () => {
        it('Deve retornar um JSON com os dados do usuário do id informado', done => {
            request(app)
                .get(`/api/users/${1}`) //id qualquer
                .end((error, res) => {
                    expect(res.status).to.equal(200);
                });
        });
    });

    describe(('POST /api/users/new'), () => {
        it('Deve cadastrar um novo usuário', done => {
            const user = {
                nome: 'Teste'
            }

            request(app)
                .post('/api/users/new') //id qualquer
                .send(user)//corpo da requisição
                .end((error, res) => {
                    expect(res.status).to.equal(200);
                });
        });
    });

    describe(('PUT /api/users/:id/edit'), () => {
        it('Deve atualizar os dados de um usuário', done => {
            const user = {
                nome: 'TesteUpdate'
            }

            request(app)
                .put(`/api/users/${1}/edit`)
                .send(user)//corpo da requisição
                .end((error, res) => {
                    expect(res.status).to.equal(200);
                });
        });
    });

    describe(('DELETE /api/users/:id'), () => {
        it('Deve deletar um usuário', done => {
            request(app)
                .delete(`/api/users/${1}`)
                .end((error, res) => {
                    expect(res.status).to.equal(200);
                });
        });
    });
});