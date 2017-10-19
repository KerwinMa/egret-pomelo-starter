import * as util from 'util';
import * as events from 'events';
import * as pomelo from 'pomelo';
import * as Koa from 'koa';
import * as kcors from 'kcors';
import * as url from 'url';
import * as koaBody from 'koa-body';
import * as querystring from 'querystring';
import * as Router from 'koa-router';
import * as uidSafe from 'uid-safe';

import Socket from './websocket';

const app = new Koa();
const router = new Router();

/**
 * connector 构造
 * @param port
 * @param host
 * @returns {Connector}
 * @constructor
 */
class Connector {
    public static instance: Connector;
    public static getinstance (port: number, host: string) {
        if (!this.instance) this.instance = new Connector(port, host);
        return this.instance;
    }

    public host: string;
    public port: number;
    public emit: Function;
    public msg: any;

    public sessionService: pomelo.SessionService;

    constructor (port: number, host: string) {
        this.host = host;
        this.port = port;

        events.EventEmitter.call(this);
    }

    /**
     * 启动服务 ( pomelo 内置规范接口 )
     * @param cb
     */
    start (cb: Function) {
        const congigure = pomelo.app.get('connectorConfig');
        this.sessionService = pomelo.app.get('sessionService');

        router.get('/',(ctx: Koa.Context, next: Koa.Middleware) => {
            return processRequest(ctx.request, ctx.response, ctx.res, this);
        });

        router.post('/',(ctx: Koa.Context, next: Koa.Middleware) => {
            return processRequest(ctx.request, ctx.response, ctx.res, this);
        });

        app.use(koaBody());
        app.use(getMethodParser);
        app.use(kcors());
        app.use(router.routes());
        app.use(router.allowedMethods());

        app.listen(this.port, () => {
        });
        process.nextTick(cb);
    }

    /**
     * 停止服务 ( pomelo 内置规范接口 )
     * @param force
     * @param cb
     */
    stop (cb: Function) {
        process.nextTick(cb);
    }
    /**
     * 发送消息编码 ( pomelo 内置规范接口 ) pomelo handler处理完请求后返回数据
     * @type {encode}
     */
    encode (sid: number, route: string, msg: object) {
        if (sid) {
            // request-response 返回
            return msg;
        } else {
            // notify-push 返回
            return JSON.stringify(msg);
        }
    }

    /**
     * 收到消息解码 ( pomelo 内置规范接口 ) 收到http请求后将请求体转化成pomleo的格式
     * @type {decode}
     */
    decode (msg: any) {
        return {
            id: msg.body.sid,
            route: msg.body.route || '',
            body: msg.body.body || {},
            type: 0,
            compressRoute:0,
            compressGzip:0,
        };
    }

    /**
     * 发送消息 ( pomelo 内置规范接口 )
     * @param msg
     */
    send (msg: any) {
        this.msg = msg;
    }
}


util.inherits(Connector, events.EventEmitter);

/**
* 处理http请求，构造一个socket发送给pomelo
* @param ctx
* @param next
* @param next
*/
function processRequest(request: any, response: any, res: any, self: Connector) {
    const sid = request.body.sid || uidSafe.sync(18);
    const websocket = new Socket(sid, res, response);
    self.emit('connection', websocket);
    request.body.sid = websocket.id;
    websocket.emit('message', request);
}

/**
* 如果请求是get，转换查询参数到body,供pomelo使用
* @param ctx
* @param next
* @param next
*/
async function getMethodParser(ctx: Koa.Context, next: Function) {
    if (ctx.method === 'GET') {
        ctx.request.body = {};
        ctx.request.body.route = ctx.request.query.route || '';
        ctx.request.body.body = ctx.request.query.body || {};
        ctx.request.body.sid = ctx.request.query.sid || null;
    }
    await next();
}

/**
 * pomelo加载connector时会调用此函数
 */
module.exports = function (port: number, host: string): any {
    if (!(this instanceof Connector)) {
        return Connector.getinstance(port, host);
    }
    events.EventEmitter.call(this);

    this.host = host;
    this.port = port;
};
