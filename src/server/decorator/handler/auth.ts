import code from '../../../shared/code';

/**
 * 验证装饰器,添加此装饰器表示接口需要登录才可以使用
 * 
 */
export function auth() {
    return function (target: any, name: string, descriptor: PropertyDescriptor) {
        return authDescriptor(target, name, descriptor);
    };
}

function authDescriptor(target: any, name: string, descriptor: PropertyDescriptor) {
    const fn = descriptor.value;

    descriptor.value = authFunc;

    function authFunc(args: any, session: any, next: Function) {
        if (!session.uid) {
            next(code.AUTH.FA_NOT_SIGNIN);
        }
        
        return fn.apply(this, arguments);
    }

    return descriptor;
}
