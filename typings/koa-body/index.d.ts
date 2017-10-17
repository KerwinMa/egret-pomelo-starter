// Type definitions for koa-bodyparser v3.x
// Project: https://github.com/koajs/bodyparser
// Definitions by: Jerry Chin <https://github.com/hellopao/>
// Definitions: https://github.com/hellopao/DefinitelyTyped
/* =================== USAGE ===================
    import bodyParser = require("koa-bodyparser");
    var Koa = require('koa');
    var app = new Koa();
    app.use(bodyParser());
 =============================================== */


 import * as Koa from "koa";
 
 declare module "koa" {
     interface Request {
         body: any;
     }
 }
 
 declare function body(opts?: {
     patchNode?: boolean,
     patchKoa?: boolean,
     jsonLimit?: string,
     formLimit?: string,
     textLimit?: string,
     encoding?: string,
     multipart?: boolean,
     urlencoded?: boolean,
     text?: boolean,
     json?: boolean,
     formidable?: any,
     strict?: boolean,
     /**
      * support custom error handle
      */
     onerror?: (err: Error, ctx: Koa.Context) => void;
 }): Koa.Middleware;
 
 declare namespace body { }
 export = body;