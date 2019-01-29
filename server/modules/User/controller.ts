import * as HTTPStatus from 'http-status';
import { Request, Response } from 'express';
import User from './service';

class UserController {

    private UserService: User;

    constructor() {
        this.UserService = new User();
    }

    getAll(req: Request, res: Response) {
        this.UserService.getAll().then(data => {
            res.status(HTTPStatus.OK).json({ payload: data });
        }).catch(err => {
            res.status(HTTPStatus.INTERNAL_SERVER_ERROR).json({ payload: 'Erro ao buscar todos os usuários' });
        });
    }

    createUser(req: Request, res: Response) {
        this.UserService.create(req.body).then(data => {
            res.status(HTTPStatus.OK).json({ payload: data });
        }).catch(err => {
            res.status(HTTPStatus.INTERNAL_SERVER_ERROR).json({ payload: 'Erro ao cadastrar usuário' });
        });
    }

    getById(req: Request, res: Response) {
        this.UserService.getById(parseInt(req.params.id)).then(data => {
            res.status(HTTPStatus.OK).json({ payload: data });
        }).catch(err => {
            res.status(HTTPStatus.INTERNAL_SERVER_ERROR).json({ payload: 'Erro ao buscar usuário' });
        });
    }

    updateUser(req: Request, res: Response) {
        this.UserService.update(parseInt(req.params.id), req.body).then(data => {
            res.status(HTTPStatus.OK).json({
                payload: data
            });
        }).catch(err => {
            res.status(HTTPStatus.INTERNAL_SERVER_ERROR).json({ payload: 'Erro ao atualizar usuário' });
        });
    }

    deleteUser(req: Request, res: Response) {
        this.UserService.delete(parseInt(req.params.id)).then(data => {
            res.status(HTTPStatus.OK).json({ payload: data });
        }).catch(err => { 
            res.status(HTTPStatus.INTERNAL_SERVER_ERROR).json({ payload: 'Erro ao excluir usuário' });
        });
    }
}

export default UserController;