import * as Pomelo from 'pomelo';
import * as path from 'path';

import { ExcelBuilder } from '../modules/FileDataBuilder';
const builder = new ExcelBuilder('../../shared/files', '../../shared/data/', {
    input: 'sss',
    out: '',
    idName: 'id',
});
builder.build();
return;
/**
 * Init app for client.
 */
const app = Pomelo.createApp();
/*
*  configure for global
*  全局设置
*/
app.configure('production|development', () => {
    app.before(Pomelo.filters.toobusy());
    // app.filter(pomelo.filters.timeout())
    app.set('errorHandler', (err: Error, msg: string, resp: any, session: any, next: Function) => {
        console.error(err);
    });
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
