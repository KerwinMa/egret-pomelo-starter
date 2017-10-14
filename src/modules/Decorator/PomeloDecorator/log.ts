import * as Logger from 'pomelo-logger';
import * as path from 'path';

export function log(fileName: string) {
    return function (target: any, propertyKey: string, descriptor: PropertyDescriptor) {
        return logDescriptor(target, propertyKey, descriptor, fileName);
    };
}

function logDescriptor(target: any, propertyKey: string, descriptor: PropertyDescriptor, fileName: string) {
    const fileBaseName = path.basename(fileName);
    const requestlogger = Logger.getLogger('request', fileBaseName, propertyKey);
    const fn = descriptor.value;

    // rewrite the descriptored function
    descriptor.value = detailLog;

    function detailLog(args: any, session: any, next: any) {
        // log when request
        requestlogger.info('args:', `${args}`, 'session:', `{id: ${session.id} uid: ${session.uid} frontendId: ${session.frontendId}}`);

        arguments[2] = nextWithLog;

        function nextWithLog(...entryArgs: any[]) {
            // log when response
            const responsetlogger = Logger.getLogger('response', fileBaseName, propertyKey);
            responsetlogger.info('error:' , entryArgs[0], ', data:', entryArgs[1]);
            next.call(null, ...entryArgs);
        }

        return fn.apply(this, arguments);
    }
}
