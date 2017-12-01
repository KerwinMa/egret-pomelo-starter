import * as pomelo from 'pomelo';
import * as path from 'path';

import * as sessionService from './app/component/session';
import RedisSessionStore from './app/service/sessionStore';
import MongoClient from './lib/DB/mongoose';

/**
 * Init a pomelo application.
 */
const app = pomelo.createApp();
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
    app.before(pomelo.filters.toobusy());
    app.filter(pomelo.filters.timeout());

    // app handler hot update
    app.set('serverConfig', { reloadHandlers: true });

    // app remote hot update
    app.set('remoteConfig', { reloadRemotes: true });

    // app global errorHandler
    app.set('errorHandler', (code: string, msg: string, resp: any, session: any, next: Function) => {
        next(null, code);
    });
});

/*
*  rewrited sessionService for pomelo
*  为所有前端服务器添加, 需要改一下pomelo源码
*/
app.configure('production|development', 'connector|httpconnector' ,() => {
    app.load(sessionService, {
        singleSession: false, // 为true代表用户同一时间只能有一个连接(即一个session,注：session在http 和 socket之间是共享的),默认为true
        store: new RedisSessionStore(), // 提供一个储存session的介质,默认为内存,如果提供了介质则session在connector服务器间共享
    });
});

/*
*  websocket 连接服务器
*  socket连接服务器,负责收发消息,维护连接
*/
app.configure('production|development', 'connector', () => {
    app.set('connectorConfig',{
        connector: pomelo.connectors.hybridconnector,
        heartbeat: 10,
        useDict: true,
        useProtobuf: true,
    });
});

/*
*  http 连接服务器
*  自己封装的http connector，处理http请求，调用app内资源
*/
app.configure('production|development', 'httpconnector', () => {
    app.set('connectorConfig', {
        connector: require('./app/connector/httpconnector/').webconnector,
        heartbeat: false, // 如果提供一个值则代表开启http心跳,默认不开启
        timeout: 120, // 多少分钟无任何请求,清理session,默认120
    });
});

/*
*  账户认证服务器
*  提供token以及三方登录验证的服务器
*/
app.configure('production|development', 'auth', () => {

});

/* 
*  配置数据库连接
*  为每个服务器分配一个连接，并初始化schema
*/
app.configure('production|development', () => {
    // 连接mongodb，并初始化schema
    const schemaDirPath = path.resolve(__dirname, './core/schema/mongo');
    MongoClient.connect();
    MongoClient.initModel(schemaDirPath);
});

// start pomelo server
app.start(() => {

});

process.on('uncaughtException', (err) => {
    console.error(' Caught exception: ' + err.stack);
});
