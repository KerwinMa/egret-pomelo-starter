/**
 * 数据库模型
 * 对数据库表的ORM建模，因为不能在前端使用，所以没有使用schema作为model层
 * 一个schema对应一个model，从数据库中取出数据后再创建model的实例后使用
 * id, createTime, updateTime等字段会自动创建，无需声明
 * 
 * by PengJu
 */

import * as md5 from 'md5';

import MongoClient from '../../../lib/DB/mongoose';
import AccountState from '../../../../shared/consts/AccountState';

const DEFAULT_STATE  = AccountState.NORMAL;

export const attributes: any = {
    accountNo: {
        type: Number,
        index: true,
        unique: true,
        rquired: true,
    },
    accountName: {
        type: String,
        index: true,
        unique: true,
        rquired: true,
    },
    email: {
        type: String,
    },
    emailValiDated: {
        type: Boolean,
        default: false,
    },
    phone: {
        type: Number,
    },
    phoneValiDated: {
        type: Boolean,
        default: false,
    },
    password: {
        type: String,
        required: true,
    },
    state: {
        type: String,
        default: DEFAULT_STATE,
    },
    devicedId: {
        type: Number,
    },
    servers: {
        type: [MongoClient.types.ObjectId],
        default: <any[]> [],
    },
    sdkData: {
        type: Object,
        default: {},
    },
    channelId: {
        type: Number,
    },
    loginCount: {
        type: Number,
        default: 0,
    },
};

export const opts = {

};
