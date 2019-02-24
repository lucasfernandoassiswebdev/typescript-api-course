import { Request, Response } from 'express';
import * as _ from 'lodash';
import Handlers from '../../api/responses/handlers';
import Author from './service';

class AuthorController {

    getAll(req: Request, res: Response) {
        Author.getAll()
            .then(_.partial(Handlers.onSuccess, res))
            .catch(_.partial(Handlers.onError, res, 'Erro ao buscar todos os autores'));
    }

    createAuthor(req: Request, res: Response) {
        Author.create(req.body)
            .then(_.partial(Handlers.onSuccess, res))
            .catch(_.partial(Handlers.dbErrorHandler, res))
            .catch(_.partial(Handlers.onError, res, 'Erro ao inserir novo autor'));
    }

    getById(req: Request, res: Response) {
        Author.getById(parseInt(req.params.id))
            .then(_.partial(Handlers.onSuccess, res))
            .catch(_.partial(Handlers.onError, res, 'Erro ao buscar autor'));
    }

    updateAuthor(req: Request, res: Response) {
        Author.update(parseInt(req.params.id), req.body)
            .then(_.partial(Handlers.onSuccess, res))
            .catch(_.partial(Handlers.onError, res, 'Erro ao atualizar autor'));
    }

    deleteAuthor(req: Request, res: Response) {
        Author.delete(parseInt(req.params.id))
            .then(_.partial(Handlers.onSuccess, res))
            .catch(_.partial(Handlers.onError, res, 'Erro ao excluir o autor'));
    }
}

export default new AuthorController();