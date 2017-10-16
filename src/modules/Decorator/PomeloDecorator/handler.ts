import MediaHandlerMap from '../../../server/core/view/MediatorHandlerMap';

/**
 * pomelo 的handler不支持拆分，故自己写了个从mediator的方法中选择性的注册到相应服务器的handlerMap的装饰器
 * 如果mediator中的方法没有使用 @handler 将不会被pomelo 调用,注册的函数将在app运行时生成iface
 * @param route 
 * @param fileName 
 */
export function handler(route: string, fileName: string) {
    return function (target: any, propertyKey: string, descriptor: PropertyDescriptor) {
        return handlerDescriptor(target, propertyKey, descriptor, route, fileName);
    };
}

function handlerDescriptor(target: any, propertyKey: string, descriptor: PropertyDescriptor, route: string, fileName: string) {
    if (!MediaHandlerMap.HANDLERMAP[route]) MediaHandlerMap.HANDLERMAP[route] = new Map();

    MediaHandlerMap.HANDLERMAP[route].set(propertyKey, {
        fileName,
        func: descriptor.value,
    });

    return descriptor;
}

