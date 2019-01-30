import { Response } from 'express';
import * as HTTPStatus from 'http-status';

export function oneRROR(res: Response, message: String, err: any) {
    console.log(`Error: ${err}`);
    res.status(HTTPStatus.INTERNAL_SERVER_ERROR).json({ payload: err });
}