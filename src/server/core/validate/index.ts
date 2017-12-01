import * as Joi from 'joi';

(Joi as any).objectId = require('joi-objectid')(Joi);

export default class RequestSchema {
    ////////////////////////////////////////////////////////////////////////////////////////////
    // STATIC
    ////////////////////////////////////////////////////////////////////////////////////////////
    public static ID: object = Joi.object({
        id: Joi.string().required(),
    });

    public static ACCOUNT_SIGNIN: object = Joi.object({
        accountName: Joi.string().required(),
        password: Joi.string().required(),
    });

    public static ACCOUNT_SIGNUP: object = Joi.object({
        accountName: Joi.string().required(),
        password: Joi.string().required(),
    });

    public static SERVER_ENTRY: object = Joi.object({
        token: Joi.string().required(),
        serverId: (Joi as any).objectId().required(),
    });
}
