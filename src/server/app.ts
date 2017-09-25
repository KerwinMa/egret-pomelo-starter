import * as Pomelo from 'pomelo';
import * as path from 'path';
/**
 * Init app for client.
 */
// const app = Pomelo.createApp({
//     base: path.resolve(__dirname, '../../'),
// });
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

// start app
app.start();

process.on('uncaughtException', (err) => {
    console.error(' Caught exception: ' + err.stack);
});
