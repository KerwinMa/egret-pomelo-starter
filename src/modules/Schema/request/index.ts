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

    public static AUTH_LOGIN: object = {
        account: Joi.string().required(),
        password: Joi.string().required(),
    };
}
