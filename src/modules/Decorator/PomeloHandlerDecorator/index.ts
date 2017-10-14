import * as Joi from 'joi';

export function validate (schema: object, convert: boolean = true) {
    return function(target: any, name: string, descriptor: PropertyDescriptor){
        return validateDescriptor(target, name, descriptor, schema, convert);
    }
} 


function validateDescriptor(target: any, name: string, descriptor: PropertyDescriptor, schema: object, convert: boolean = true) {
    const fn = descriptor.value;

    descriptor.value = validateSchema

    function validateSchema (args: any, session: any, next: Function) { 
        // convert request schema before valite
        if (convert) {
            args = convertShema(args, schema);
            arguments[0] = args;
        }
        const {error, value} = Joi.validate(args, schema);
        if (error) return next(error);

        return fn.apply(this, arguments);
    }

    function convertShema (args: any, schema: object) {
        const schemaKeys = Object.keys(schema);
        let newArgs: any = {}

        Object.keys(args).forEach(key => {
            if (schemaKeys[parseInt(key)]) {
                newArgs[schemaKeys[parseInt(key)]] = args[key];
            }
        })
        return newArgs;
    }

    return descriptor;
}