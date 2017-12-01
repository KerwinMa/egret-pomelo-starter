import * as util from 'util';
import * as events from 'events';
import * as pomelo from 'pomelo';
import * as uidSafe from 'uid-safe';
import * as http from 'http';
import * as express from 'express';
import * as Logger from 'pomelo-logger';

import Http from './websocket';

const exp = express();
const logger = Logger.getLogger('httpconnector', __filename);

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

        http.createServer(exp).listen(this.port, () => {
            logger.debug('http connector is listening on', this.port);
        });

        exp.use(getMethodParser);
        exp.post('*',(request: any, response: any) => {
            return processRequest(request, response, this);
        });
        exp.get('*',(request: any, response: any) => {
            return processRequest(request, response, this);
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
        }
        // notify-push 返回
        return JSON.stringify(msg);
    }

    /**
     * 收到消息解码 ( pomelo 内置规范接口 ) 收到http请求后将请求体转化成pomleo的格式
     * @type {decode}
     */
    decode (msg: any) {
        // get请求的body可能为string
        if (typeof msg.body.body === 'string') msg.body.body = JSON.parse(msg.body.body);
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
function processRequest(request: any, response: any, self: Connector) {
    const sid = request.query.sid || uidSafe.sync(18);
    const http = new Http(sid, response);
    self.emit('connection', http);
    request.body.sid = http.id;
    http.emit('message', request);
}

/**
* express 中间件,处理request参数
* @param ctx
* @param next
* @param next
*/
function getMethodParser(request: any, response: any, next: Function) {
    if (request.method === 'GET') {
        request.body = {};
        request.body.route = request.query.route || '';
        request.body.body = request.query.body || {};
        request.body.sid = request.query.sid || null;
    }
    next();
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
