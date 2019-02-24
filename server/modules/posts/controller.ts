import { Request, Response } from 'express';
import * as _ from 'lodash';
import Handlers from '../../api/responses/handlers';
import Post from './service';

class PostController {

    getAll(req: Request, res: Response) {
        Post.getAll()
            .then(_.partial(Handlers.onSuccess, res))
            .catch(_.partial(Handlers.onError, res, 'Erro ao buscar todos os posts'));
    }

    createPost(req: Request, res: Response) {
        Post.create(req.body)
            .then(_.partial(Handlers.onSuccess, res))
            .catch(_.partial(Handlers.dbErrorHandler, res))
            .catch(_.partial(Handlers.onError, res, 'Erro ao inserir novo post'));
    }

    getById(req: Request, res: Response) {
        Post.getById(parseInt(req.params.id))
            .then(_.partial(Handlers.onSuccess, res))
            .catch(_.partial(Handlers.onError, res, 'Erro ao buscar post'));
    }

    updatePost(req: Request, res: Response) {
        Post.update(parseInt(req.params.id), req.body)
            .then(_.partial(Handlers.onSuccess, res))
            .catch(_.partial(Handlers.onError, res, 'Erro ao atualizar post'));
    }

    deletePost(req: Request, res: Response) {
        Post.delete(parseInt(req.params.id))
            .then(_.partial(Handlers.onSuccess, res))
            .catch(_.partial(Handlers.onError, res, 'Erro ao excluir o post'));
    }
}

export default new PostController();