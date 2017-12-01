/**
 * 常量类 AccountState
 * 成员的命名方式必须为大写加下划线的形式
 * 尽可能的不使用0, 1, 2这种晦涩难懂的数字
 * 
 * by PengJu
 */

export default class AccountState {

    public static NORMAL: String = 'normal'; // 正常状态
    public static FORBIDDEN_BY_ACCOUNT: String = 'forbidden_by_account'; // 账户封号
    public static FORBIDDEN_BY_DEVICE: String = 'forbidden_by_device'; // 设备封号

}
