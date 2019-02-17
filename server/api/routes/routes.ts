import { Application, Request, Response } from 'express';
import UserRoutes from '../../modules/User/routes';
import TokenRoutes from '../../modules/auth/auth';

class Routes {
    
    initRoutes(app: Application, auth: any): void {        
        app.route('/').get((req: Request, res: Response) => res.send('Hello, world!'));
        app.route('/ola/:nome').get((req: Request, res: Response) => res.send(`Hello, ${req.params.nome}!`));
    
        app.route('/api/users/all').all(auth.authenticate()).get(UserRoutes.index);
        app.route('/api/users/:id').all(auth.authenticate()).get(UserRoutes.findOne);
        app.route('/api/users/create').all(auth.authenticate()).post(UserRoutes.create);
        app.route('/api/users/:id/update').all(auth.authenticate()).put(UserRoutes.update);
        app.route('/api/users/:id/destroy').all(auth.authenticate()).delete(UserRoutes.destroy);
        app.route('/token').post(TokenRoutes.auth);
    }
}

export default new Routes();
