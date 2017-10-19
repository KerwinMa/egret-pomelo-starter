import * as util from 'util';
import * as events from 'events';


const ST_INITED = 0;
const ST_CLOSED = 1;

/**
 * 构造
 *  每当有http请求的时候 都会构造本socket给pomelo用(pomelo用来创建session)
 * @param id    服务端对请求编号
 * @param socket http 的 response 对象
 * @auth Guofeng.Ding
 */
export default class Socket {
    public id: string;
    public state: number;
    public socket: any;
    public response: any;
    public remoteAddress: string;
    public emit: Function;
    
    constructor (id: string, res: any, response: any) {
        events.EventEmitter.call(this);

        this.id = id;
        this.socket = res;
        this.response = response;
        this.state = ST_INITED;
        this.remoteAddress = res.connection.remoteAddress;
         /**
         * 当http response对象主动关闭的时候 触发断开连接
         */
        this.socket.on('close',this.emit.bind(this,'disconnect'));

        // /**
        //  * 当http response 对象有错误信息的时候把该错误转发给本socket(意味着转发给pomelo内部处理)
        //  */
        // this.socket.on('error',this.emit.bind(this,'error'));

        // /**
        //  * 当 http response 对象完成后 触发断开连接(转发给pomelo内部处理session断开)
        //  */
        // this.socket.on('finish',this.emit.bind(this,'disconnect'));
    }

    /**
     * socket 必须实现的函数( pomelo 规范api 内部有错误或者 内部触发销毁该socket时调用)
     */
    disconnect () {
        if (this.state === ST_CLOSED) {
            return;
        }
        this.state = ST_CLOSED;
    }

    /**
     * 发送消息给客户端
     * 发送完成后会触发 finish 事件
     * @param msg
     */
    send(msg: object) {
        this.response.body = msg;
    }
}

util.inherits(Socket, events.EventEmitter);
