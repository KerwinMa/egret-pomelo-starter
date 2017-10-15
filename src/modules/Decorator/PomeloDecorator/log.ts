import * as Logger from 'pomelo-logger';
import * as path from 'path';

/**
 * log 装饰器, 打印此方法的请求 响应信息
 * @param fileName 修饰的方法所在的文件路径
 */

export function log(fileName: string) {
    return function (target: any, propertyKey: string, descriptor: PropertyDescriptor) {
        return logDescriptor(target, propertyKey, descriptor, fileName);
    };
}

function logDescriptor(target: any, propertyKey: string, descriptor: PropertyDescriptor, fileName: string) {
    const fileBaseName = path.basename(fileName);
    // log when request
    const requestlogger = Logger.getLogger('request', fileBaseName, propertyKey);
    // log when response
    const responsetlogger = Logger.getLogger('response', fileBaseName, propertyKey);
    const fn = descriptor.value;

    // rewrite the descriptored function
    descriptor.value = detailLog;

    function detailLog(args: any, session: any, next: any) {
        // log when request
        requestlogger.info('args:', args, 'session:', `{id: ${session.id} uid: ${session.uid} frontendId: ${session.frontendId}}`);

        arguments[2] = nextWithLog;

        function nextWithLog(...entryArgs: any[]) {
            responsetlogger.info('error:' , entryArgs[0], ', data:', entryArgs[1]);
            next.call(null, ...entryArgs);
        }

        return fn.apply(this, arguments);
    }
}
