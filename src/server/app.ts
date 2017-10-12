import * as Pomelo from 'pomelo';
import * as path from 'path';
import { AppFacade } from './AppFacade';

/**
 * Init app for client.
 */
const app = Pomelo.createApp();
app.set('name', 'egret-pomelo');

/*
*  set environment fro nodejs
*  default development
*/
const env = app.get('env') || 'development';
process.env.NODE_ENV = env;

/*
*  configure for global
*  全局设置
*/
app.configure('production|development', () => {
    // app global filter
    app.before(Pomelo.filters.toobusy());
    app.filter(Pomelo.filters.timeout());

    // app global errorhandler
    app.set('errorHandler', (err: Error, msg: string, resp: any, session: any, next: Function) => {
        console.error(err);
    });
});

/*
*  start pureMvc
*  get instance appFacade of pureMvc
*/
app.configure('production|development', 'master', () => {
    // start up pureMvc
    const appFacade = AppFacade.getInstance();
    appFacade.start();

    app.set('appFacade', appFacade, true);
});

/*
*  websocket gate server
*  connector 负载均衡服务器
*/
app.configure('production|development', 'gate', () => {
    app.set('connectorConfig',{ 
        connector: Pomelo.connectors.hybridconnector,
        useProtobuf: true,
    });
});

/*
*  websocket connector server
*  socket连接服务器,负责收发消息,维护连接
*/
app.configure('production|development', 'connector', () => {
    app.set('connectorConfig',{
        connector: Pomelo.connectors.hybridconnector,
        heartbeat: 3,
        useDict: true,
        useProtobuf: true,
    });
});

// start app
app.start();

process.on('uncaughtException', (err) => {
    console.error(' Caught exception: ' + err.stack);
});
