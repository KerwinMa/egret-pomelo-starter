import * as Koa from 'koa';
import * as convert from 'koa-convert';
import * as Json from 'koa-json';
import * as kcors from 'kcors';
import * as compress from 'koa-compress';

import { Route } from './middleware/router/Route';


const app = new Koa();
const router = new Route(app);

// 跨域
app.use(kcors());

// gzip
app.use(compress({
    // tslint:disable-next-line:variable-name
    filter (content_type: any) {
        return /text/i.test(content_type);
    },
    threshold: 2048,
    flush: require('zlib').Z_SYNC_FLUSH,
}));

// 注册路由
router.registerRouters(`${__dirname}/apis`);

// 错误
app.on('error', (err: any, ctx: Koa.Context) => {
    console.log('==========>>>>>', err);
});

exports = app;

