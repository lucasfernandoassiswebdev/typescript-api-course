import { Request, Response } from 'express';

class UserController {

    constructor() {

    }

    getAll(req: Request, res: Response) {
        res.status(200).json({
            message: 'ok'
        });
    }

    createUser(req: Request, res: Response) {
        res.status(200).json({
            message: 'ok'
        });
    }

    getById(req: Request, res: Response) {
        res.status(200).json({
            message: 'ok'
        });
    }

    updateUser(req: Request, res: Response) {
        res.status(200).json({
            message: 'ok'
        });
    }

    deleteUser(req: Request, res: Response) {
        res.status(200).json({
            message: 'ok'
        });
    }
}

export default UserController;