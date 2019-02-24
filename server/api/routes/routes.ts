import { Application, Request, Response } from 'express';
import UserRoutes from '../../modules/User/routes';
import TokenRoutes from '../../modules/auth/auth';
import AuthorRoutes from '../../modules/author/routes';

class Routes {
    
    initRoutes(app: Application, auth: any): void {        
        app.route('/').get((req: Request, res: Response) => res.send('Hello, world!'));
        app.route('/ola/:nome').get((req: Request, res: Response) => res.send(`Hello, ${req.params.nome}!`));
    
        app.route('/api/users/all').all(auth.authenticate()).get(UserRoutes.index);
        app.route('/api/users/:id').all(auth.authenticate()).get(UserRoutes.findOne);
        app.route('/api/users/create').all(auth.authenticate()).post(UserRoutes.create);
        app.route('/api/users/:id/update').all(auth.authenticate()).put(UserRoutes.update);
        app.route('/api/users/:id/destroy').all(auth.authenticate()).delete(UserRoutes.destroy);

        app.route('/api/author/all').all(auth.authenticate()).get(AuthorRoutes.index);
        app.route('/api/author/:id').all(auth.authenticate()).get(AuthorRoutes.findOne);
        app.route('/api/author/create').all(auth.authenticate()).post(AuthorRoutes.create);
        app.route('/api/author/:id/update').all(auth.authenticate()).put(AuthorRoutes.update);
        app.route('/api/author/:id/destroy').all(auth.authenticate()).delete(AuthorRoutes.destroy);
        
        app.route('/token').post(TokenRoutes.auth);
    }
}

export default new Routes();
