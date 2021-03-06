import * as Joi from 'joi';

export default class RequestSchema {
    ////////////////////////////////////////////////////////////////////////////////////////////
    // STATIC
    ////////////////////////////////////////////////////////////////////////////////////////////
    public static ID: object = {
        id: Joi.number().required(),
    };

    public static USER_ID: object = {
        userId: Joi.number().required(),
    };

    public static USER_SIGNIN: object = {
        account: Joi.string().required(),
        password: Joi.string().required(),
        token: Joi.string(),
    };

    public static AUTH_CONNECT: object = {
        token: Joi.string().required(),
    };

    public static USER_SIGNUP: object = {
        account: Joi.string().required(),
        password: Joi.string().required(),
    };
}
