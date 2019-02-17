import { Request, Response } from 'express';
import * as _ from 'lodash';
import Handlers from '../../api/responses/handlers';
import User from './service';

class UserController {

    constructor() { }

    getAll(req: Request, res: Response) {
        User.getAll()
            .then(_.partial(Handlers.onSuccess, res))
            .catch(_.partial(Handlers.onError, res, 'Erro ao buscar todos os usuários'));
    }

    getById(req: Request, res: Response) {
        User.getById(parseInt(req.params.id))
            .then(_.partial(Handlers.onSuccess, res))
            .catch(_.partial(Handlers.onError, res, 'Erro ao buscar usuário'));
    }

    createUser(req: Request, res: Response) {
        User.create(req.body)
            .then(_.partial(Handlers.onSuccess, res))
            .catch(_.partial(Handlers.dbErrorHandler, res))
            .catch(_.partial(Handlers.onError, res, 'Erro ao cadastrar usuário'));
    }

    updateUser(req: Request, res: Response) {
        User.update(parseInt(req.params.id), req.body)
            .then(_.partial(Handlers.onSuccess, res))
            .catch(_.partial(Handlers.dbErrorHandler, res))
            .catch(_.partial(Handlers.onError, res, 'Erro ao cadastrar usuário'));
    }

    deleteUser(req: Request, res: Response) {
        User.delete(parseInt(req.params.id))
            .then(_.partial(Handlers.onSuccess, res))
            .catch(_.partial(Handlers.dbErrorHandler, res))
            .catch(_.partial(Handlers.onError, res, 'Erro ao excluir usuário'));;
    }
}

export default new UserController();