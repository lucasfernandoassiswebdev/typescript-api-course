import { CoreModule } from '../core/core';
import * as http from 'http';
const { serverPort } = require('../config/env');

export class Server {

    private db;
    private express;

    constructor(databaseConnector) {
        if (databaseConnector) {
            this.db = databaseConnector;
            this.express = new CoreModule().express;
            this.syncDataBase();
        }
    }

    private async syncDataBase() {
        try {
            const syncData = await this.db.sync();
            this.databaseSyncHandler(syncData);
        } catch (error) {
            this.databaseSyncErrorHandler(error);
        }
    }

    private databaseSyncHandler(databaseInfo) {
        const { options, config, modelManager } = databaseInfo;
        const { models } = modelManager;
        this.upServer();
        this.logDataBaseConnection({ models, options, config });
    }

    private logDataBaseConnection({ models, options, config }) {
        const { dialect, host } = options;
        const { database, port } = config;

        if (dialect && host && database && port && models) {
            console.log(`Database Dialect: ${dialect}`);
            console.log(`Database Host: ${host}`);
            console.log(`Database Name: ${database}`);
            console.log(`Database Port: ${port}`);
            console.log(`Created Tables: ${models}`);
        }
    }

    private databaseSyncErrorHandler(error) {
        console.error(`Can't connect on database bause ${error}`);
        this.upServer(); //aplicação não conseguiu se conectar corretamente ao banco, mas ainda deve inicializar
    }

    private upServer() {
        http
            .createServer(this.express)
            .listen(serverPort)
            .on('listening', this.onServerUp.bind(this, serverPort))
            .on('error', this.onServerStartupError.bind(this));
    }

    private onServerUp(port: number) {
        console.log(`Server is running on port ${port}`)
    }

    private onServerStartupError(error: NodeJS.ErrnoException) {
        console.error(`ERROR ${error}`);
    }
}