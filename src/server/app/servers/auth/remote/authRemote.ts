import * as jwt from 'jsonwebtoken';
import * as bluebird from 'bluebird';

import * as AccountProxy from '../../../../core/proxy/dbProxy/accountProxy';
import AccountState from '../../../../../shared/consts/accountState';
import config from '../../../../config';
import code from '../../../../../shared/code';
import { ApiError } from '../../../../core/util/common';

/**
 * 提供jsonwebtoken的验证方式
 * @param token token令牌
 * @param cb 回调函数，pomelo rpc必须调用回调函数否则会产生rpc超时,比较蛋疼
 */
export const jwtAuth = async (token: string, cb: Function) => {
    const verifyPromise = bluebird.promisify(jwt.verify);

    try {
        // 把传过来的token进行解密验证
        const decoded = <any> await verifyPromise(token, config.system.JWT.JWT_SECRET)
        .catch((err) => {
            throw new ApiError(code.AUTH.FA_TOKEN_VERIFY_FAIL);
        });

        // 查找token对应的账户并验证账户状态
        const account = await AccountProxy.findByAccountNo(decoded.accountNo);
        if (!account) throw new ApiError(code.ACCOUNT.FA_ACCOUNT_NOT_EXIST);
        if (account.state === AccountState.FORBIDDEN_BY_ACCOUNT) throw new ApiError(code.AUTH.FA_ACCOUNT_FORBIDDEN_BY_ACCOUNT);
        if (account.state === AccountState.FORBIDDEN_BY_DEVICE) throw new ApiError(code.AUTH.FA_ACCOUNT_FORBIDDEN_BY_DEVICE);
        cb(null, account);
    } catch (err) {
        cb(err.code);
    }
};
