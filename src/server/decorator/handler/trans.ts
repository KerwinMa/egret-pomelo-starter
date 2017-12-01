// import { DSTrans } from '../../../../modules/JsonTrans';

/**
 * 返回值json数据的转换装饰器
 * @param dsName 要转换的数据结构的名称
 */
export function dsTrans(dsName: string) {
    return function (target: any, propertyKey: string, descriptor: PropertyDescriptor) {
        return transDescriptor(target, propertyKey, descriptor, dsName);
    };
}

function transDescriptor(target: any, propertyKey: string, descriptor: PropertyDescriptor, dsName: string) {
    const fn = descriptor.value;
    // const trans = new DSTrans();
    // // rewrite the descriptored function
    // descriptor.value = transDs;

    // function transDs(args: any, session: any, next: any) {
    //     arguments[2] = transWithNext;

    //     function transWithNext(err: any, data: any) {
    //         const converted = data;
    //         if (data.b) {
    //             converted.b = trans.transJson(data.b, dsName);
    //         }
    //         next.call(null, err, converted);
    //     }

    //     return fn.apply(this, arguments);
    // }
}
