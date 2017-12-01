/**
 * 数据库模型
 * 对数据库表的ORM建模，因为不能在前端使用，所以没有使用schema作为model层
 * 一个schema对应一个model，从数据库中取出数据后再创建model的实例后使用
 * id, createTime, updateTime等字段会自动创建，无需声明
 * 
 * by PengJu
 */
import AccountState from '../../../../shared/consts/ServerState';

const DEFAULT_STATE = AccountState.NORMAL;

export const attributes: any = {
    serverName: {
        type: String,
        index: true,
        unique: true,
        rquired: true,
    },
    state: {
        type: String,
        default: DEFAULT_STATE,
    },
};

export const opts: any = {

};
