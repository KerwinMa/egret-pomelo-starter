import * as Joi from 'joi';

/**
 * Joi 验证装饰器
 * @param schema Joi的验证schema https://github.com/hapijs/joi/blob/v13.0.0/API.md
 * @param convert 是否转换入参，默认为true
 */
export function validate(schema: object, convert: boolean = true) {
    return function (target: any, name: string, descriptor: PropertyDescriptor) {
        return validateDescriptor(target, name, descriptor, schema, convert);
    };
} 


function validateDescriptor(target: any, name: string, descriptor: PropertyDescriptor, schema: object, convert: boolean = true) {
    const fn = descriptor.value;

    // rewrite the descriptored function
    descriptor.value = validateSchema;

    function validateSchema(args: any, session: any, next: Function) {
        // convert request schema before valite
        let convertArgs = args;
        if (convert) {
            convertArgs = convertShema(args, schema);
        }

        const { error, value } = Joi.validate(convertArgs, schema);
        if (error && next) return next(error.name, error.message);
        arguments[0] = value;

        return fn.apply(this, arguments);
    }

    function convertShema(args: any, schema: object) {
        const schemaKeys = Object.keys(schema);
        const newArgs: any = {};
        Object.keys(args).forEach((key, index) => {
            if (/^[0-9]*$/.test(key) && schemaKeys[parseInt(key, 0)]) {
                newArgs[schemaKeys[parseInt(key, 0)]] = args[key];
            }
        });
        return newArgs;
    }

    return descriptor;
}
