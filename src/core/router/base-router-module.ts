import { Request, Response } from 'express';

export interface ModuleEndpointMap {
    [key: string]: HttpVerbMap;
}

export interface HttpVerbMap {
    //? = opcional    
    get?: Array<FeatureModuleRouterInfo>,
    post?: Array<FeatureModuleRouterInfo>,
    put?: Array<FeatureModuleRouterInfo>,
    patch?: Array<FeatureModuleRouterInfo>,
    delete?: Array<FeatureModuleRouterInfo>
}

export interface FeatureModuleRouterInfo {
    endpoint: string;
    callback: Function;
    isProtected: boolean;
}

export class BaseRouterModule {

    protected readonly context: string = '/api';
    protected version: string = 'v1';
    protected moduleName: string = 'rest-api';

    constructor(moduleName: string) {
        if (typeof moduleName === 'string') {
            this.moduleName = moduleName;
        }
    }

    //contrato que cada feature_module deve implementar(exemplo/guia)
    protected MODULES_ENDPOINT_MAP: ModuleEndpointMap = {
        [this.moduleName]: {
            get: [
                {
                    endpoint: `${this.context}/${this.version}/${this.moduleName}`, //endpoint recomendado(não obrigatório)
                    callback: (req: Request, res: Response) => {
                        res.sendStatus(200).send({ status: 200, msg: 'OK' });
                    },
                    isProtected: false
                }
            ]
        }
    }

    public getRoutesFromModules(): ModuleEndpointMap {
        return this.MODULES_ENDPOINT_MAP;
    }
}