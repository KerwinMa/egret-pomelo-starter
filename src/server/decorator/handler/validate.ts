import * as Joi from 'joi';

import code from '../../../shared/code';

/**
 * Joi 验证装饰器
 * @param schema Joi的验证schema https://github.com/hapijs/joi/blob/v13.0.0/API.md
 * @param convert 是否转换入参，默认为true
 */
export function validate(schema: object) {
    return function (target: any, name: string, descriptor: PropertyDescriptor) {
        return validateDescriptor(target, name, descriptor, schema);
    };
}

function validateDescriptor(target: any, name: string, descriptor: PropertyDescriptor, schema: object) {
    const fn = descriptor.value;

    // rewrite the descriptored function
    descriptor.value = validateSchema;

    function validateSchema(args: any, session: any, next: Function) {
        // convert request schema before valite
        if (args.__route__) delete args['__route__'];
        const { error, value } = Joi.validate(args, schema);
        if (error && next) return next(null, {
            code: code.VALIDATE,
            msg: error.message,
        });
        arguments[0] = value;

        return fn.apply(this, arguments);
    }

    return descriptor;
}
