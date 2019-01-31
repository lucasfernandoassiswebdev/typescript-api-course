import * as HTTPStatus from 'http-status';
import { Request, Response } from 'express';
import * as _ from 'lodash';
import { onError } from '../../api/responses/errorHandler';
import { onSuccess } from '../../api/responses/successHandler';
import { dbErrorHandler } from '../../config/dbErrorHandler';
import User from './service';

class UserController {

    private UserService: User;

    constructor() {
        this.UserService = new User();
    }

    getAll(req: Request, res: Response) {
        this.UserService.getAll()
            .then(_.partial(onSuccess, res))
            .catch(_.partial(onError, res, 'Erro ao buscar todos os usuários'));
    }

    getById(req: Request, res: Response) {
        this.UserService.getById(parseInt(req.params.id))
            .then(_.partial(onSuccess, res))
            .catch(_.partial(onError, res, 'Erro ao buscar usuário'));
    }

    createUser(req: Request, res: Response) {
        this.UserService.create(req.body)
            .then(_.partial(onSuccess, res))
            .catch(_.partial(dbErrorHandler, res))
            .catch(_.partial(onError, res, 'Erro ao cadastrar usuário'));
    }

    updateUser(req: Request, res: Response) {
        this.UserService.update(parseInt(req.params.id), req.body)
            .then(_.partial(onSuccess, res))
            .catch(_.partial(dbErrorHandler, res))
            .catch(_.partial(onError, res, 'Erro ao cadastrar usuário'));
    }

    deleteUser(req: Request, res: Response) {
        this.UserService.delete(parseInt(req.params.id))
            .then(_.partial(onSuccess, res))
            .catch(_.partial(dbErrorHandler, res))
            .catch(_.partial(onError, res, 'Erro ao excluir usuário'));;
    }
}

export default UserController;