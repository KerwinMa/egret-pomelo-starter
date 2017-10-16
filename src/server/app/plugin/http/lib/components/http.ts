import * as Pomelo from 'pomelo';
import * as assert from 'assert';
import * as fs from 'fs';
import * as path from 'path';
import * as Koa from 'koa';
import * as http from 'http';
import * as https from 'https';


import * as koa from '../../koa/index';


const DEFAULT_HOST = '127.0.0.1';
const DEFAULT_PORT = 3001;

const defaultLogger = function () {
    return {
        debug: console.log,
        info: console.log,
        warn: console.warn,
        error: console.error,
    };
};

class Http {
    public app: Pomelo.Application;
    public http: any;
    public server: any;

    public host: string;
    public port: any;
    public useSSL: boolean;
    public sslOpts: object;
    public logger: any;
    public beforeFilters: object[];
    public afterFilters: object[];

    constructor(app: Pomelo.Application, opts: any = {}) {
        this.app = app;
        this.http = koa;

        this.host = opts.host || DEFAULT_HOST;
        this.port = opts.port || DEFAULT_PORT;

        if (!!opts.isCluster) {
            const serverId = app.getServerId();
            const params = serverId.split('-');
            const idx = parseInt(params[params.length - 1], 10);
            if (/\d+\+\+/.test(this.port)) {

                this.port = parseInt(this.port.substr(0, this.port.length - 2), 0);
            } else {
                assert.ok(false, 'http cluster expect http port format like "3000++"');
            }

            this.port = this.port + idx;
        }

        this.useSSL = !!opts.useSSL;
        this.sslOpts = {};
        if (this.useSSL) {
            this.sslOpts = {
                key: fs.readFileSync(path.join(app.getBase(), opts.keyFile)),
                cert: fs.readFileSync(path.join(app.getBase(), opts.certFile)),
            };
        }

        this.logger = opts.logger || defaultLogger();

        this.beforeFilters = require('../../index').beforeFilters;
        this.afterFilters = require('../../index').afterFilters;
    }

    // pomelo will call this hook when loadRoutes
    loadRoutes() {
        const routesPath = path.join(this.app.getBase(), 'app/servers', this.app.getServerType(), 'route');
        assert.ok(fs.existsSync(routesPath), 'Cannot find route path: ' + routesPath);

        fs.readdirSync(routesPath).forEach((file) => {
            if (/.js$/.test(file)) {
                const routePath = path.join(routesPath, file);
                // self.logger.info(routePath);
                require(routePath)(this.app, this.http, this);
            }
        });
    }

    // pomelo will call this hook when start
    start(cb: Function) {
        this.beforeFilters.forEach((elem) => {
            this.http.use(elem);
        });

        this.loadRoutes();

        this.afterFilters.forEach((elem) => {
            this.http.use(elem);
        });

        if (this.useSSL) {
            this.server = https.createServer(this.sslOpts, this.http).listen(this.port, this.host, () => {
                this.logger.info('Http start', this.app.getServerId(), 'url: https://' + this.host + ':' + this.port);
                this.logger.info('Http start success');
                process.nextTick(cb);
            });
        } else {
            this.server = http.createServer(this.http).listen(this.port, this.host, function () {
                this.logger.info('Http start', this.app.getServerId(), 'url: http://' + this.host + ':' + this.port);
                this.logger.info('Http start success');
                process.nextTick(cb);
            });
        }
    }

    // pomelo will call this hook when afterStart
    afterStart(cb: Function) {
        this.logger.info('Http afterStart');
        process.nextTick(cb);
    }

    // pomelo will call this hook when stop
    stop() {

    }
}
