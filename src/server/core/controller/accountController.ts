/**
 * 业务逻辑层 controller
 * 在这里写业务逻辑的代码，一个函数实现一个业务
 * 错误的抛出使用thro new ApiError的形式，这样就可以在handler中捕获
 * 
 * by PengJu
 */

import * as md5 from 'md5';
import * as jwt from 'jsonwebtoken';

import * as AccountProxy from '../proxy/dbProxy/accountProxy';
import code from '../../../shared/code';
import { ApiError } from '../util/common';
import config from '../../config';

/**
 * 账户注册
 * @param accountName 账户名
 * @param password 密码
 * @return account实例
 */
export const signUp = async (accountName: string, password: string) => {
    let account = await AccountProxy.findByAccountName(accountName);
    if (account) throw new ApiError(code.ACCOUNT.FA_ACCOUNT_EXISTS);
    account = await AccountProxy.insertAccount(accountName);
    return account.export();
};

/**
 * 选服之前的账户登录，返回相应的token
 * @param accountName 账户名 
 * @param password 密码
 * @return 用来连接使用的token
 */
export const signIn = async (accountName: string, password: string): Promise <any> => {
    const JWT_SECRET = config.system.JWT.JWT_SECRET;
    const EXPIRESIN = config.system.JWT.EXPIRESIN;
    const account = await AccountProxy.findByAccountName(accountName);
    if (!account) throw new ApiError(code.ACCOUNT.FA_ACCOUNT_NOT_EXIST);
    const md5Password = account.password;
    const passwordIn = md5(password);
    if (md5Password !== passwordIn) throw new ApiError(code.AUTH.FA_PASSWORD_NOT_CORRECT);
    const token = jwt.sign({ accountId: account.id, accountNo: account.accountNo }, JWT_SECRET, { expiresIn:  EXPIRESIN });
    return { token };
};
