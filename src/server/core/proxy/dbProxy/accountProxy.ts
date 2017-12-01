/**
 * 数据代理层 proxy
 * 在这里实现对本地数据或数据库数据的操作，并返回相应的模型实例或实例列表
 * 业务逻辑代码中需要用到的数据都来源于proxy,这样使得如果数据库发生变化时，业务逻辑代码不用重构
 * 
 * by PengJu
 */
import * as md5 from 'md5';

import config from '../../../config';
import MongoClient from '../../../lib/DB/mongoose';
import AccountModel from '../../../../shared/model/accountModel';

const DEFAULT_ACCOUNT_NO = config.system.DEFAULT.START_ACCOUNT_NO;
const DEFAULT_PASSWORD = config.system.DEFAULT.DEFAULT_PASSWORD;

const mongoSchemas = MongoClient.schemas;

/**
 * 通过账户名查找账户
 * @param accountName 账户名 
 * @return account实例
 */
export const findByAccountName = async (accountName: string): Promise<AccountModel> => {
    const accountData = await mongoSchemas.Account.findOne({ accountName })
    .catch((err) => {
        throw err;
    });
    if (!accountData) return null;
    return new AccountModel(accountData);
};

/**
 * 通过账户号码查找账户
 * @param accountNo 账户号码
 * @return account实例
 */
export const findByAccountNo = async (accountNo: number): Promise<AccountModel> => {
    const accountData = await mongoSchemas.Account.findOne({ accountNo })
    .catch((err) => {
        throw err;
    });
    if (!accountData) return null;
    return new AccountModel(accountData);
};

/**
 * 添加一个账户,自动分配自增的账户号码
 * @param accountName 账户名 
 * @param password 账户密码
 * @return account实例
 */
export const insertAccount = async (accountName: string, password: string = DEFAULT_PASSWORD): Promise<AccountModel> => {
    const count = await mongoSchemas.Account.count({});
    const accountNo = DEFAULT_ACCOUNT_NO + count + 1;
    const md5Password = md5(password);
    const accountData = await mongoSchemas.Account.create({ accountName, accountNo, password: md5Password })
    .catch((err) => {
        throw err;
    });
    return new AccountModel(accountData);
};
