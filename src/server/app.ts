import * as Pomelo from 'pomelo';
import * as path from 'path';

import { AppFacade } from './core/AppFacade';
import * as sessionService from './app/component/session';
/**
 * Init a pomelo application.
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
    // load system config for all server
    app.loadConfig('systemConfig', path.join(app.getBase(), '../../config/development/system.json'));

    // app global filter
    app.before(Pomelo.filters.toobusy());
    app.filter(Pomelo.filters.timeout());

    // app handler hot update
    app.set('serverConfig', { reloadHandlers: true });

    // app remote hot update
    app.set('remoteConfig', { reloadRemotes: true });


    // app global errorhandler
    app.set('errorHandler', errorHandler);

    function errorHandler(code: Error, msg: string, resp: any, session: any, next: Function) {
        next(null, {
            c: code || 'InternalError',
            m: resp,
        });
    }
});

/*
*  rewrited sessionService for pomelo
*  为所有前端服务器添加, 需要改一下pomelo源码
*/
app.configure('production|development', () => {
    app.load(sessionService, {});
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

/*
*  http connector server
*  自己封装的http connector，处理http请求，调用app内资源
*/
app.configure('production|development', 'httpconnector', () => {
    app.set('connectorConfig',{
        connector: require('./app/connector/httpconnector/').webconnector,
        methods: 'all',
    });
});

// start pomelo application
app.start(() => {
    const serverId = app.getServerId();
    const appFacade = AppFacade.getInstance(serverId);
    appFacade.start(app);
});

process.on('uncaughtException', (err) => {
    console.error(' Caught exception: ' + err.stack);
});
