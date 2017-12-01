/**
 * 模型层 model
 * 模型层不实现业务逻辑、域逻辑，只是对系统数据的高度抽象,更不依赖于运行环境,这样使得前后端可以共享模型层。
 * 对模型层的操作使用代理(proxy) 进行，前端的代理即是http/socket service，后端的代理即是数据库service
 * 
 * by PengJu
 */

export default class AccountModel {
    /**
     * 数据库主键id
    */
    id: string;

    /**
     * 账户唯一数字号码
    */
    accountNo: number;

    /**
     * 账户名,一般由渠道提供
    */
    accountName: string;

    /**
     * 账户邮箱
    */
    email: string = null;

    /**
     * 邮箱是否验证
    */
    emailValiDated: Boolean = false;

    /**
     * 账户手机号
    */
    phone: number = null;

    /**
     * 手机号是否验证
    */
    phoneValiDated: Boolean = false;

    /**
     * 账户的密码
    */
    password: string;

    /**
     * 账户的设备id,由渠道提供
    */
    devicedId: string;

    /**
     * 账户的状态, 正常, 普通封号, 设备封号
    */
    state: string;

    /**
     * 拥有角色的娱乐场，相当于服务器
    */
    servers: string[] = [];

    /**
     * 渠道数据
    */
    sdkData: Object = {};

    /**
     * 账户的渠道号
    */
    channelId: number = null;

    /**
     * 账户的总登录次数
    */
    loginCount: number = 0;

    /**
     * 账户的创建时间
     */
    createTime: Date;

    /**
     * 账户的最后更新时间
     */
    updateTime: Date;

    constructor (data: any) {
        this.id = data.id;
        this.accountNo = data.accountNo;
        this.accountName = data.accountName;
        this.email = data.email;
        this.emailValiDated = data.emailValiDated;
        this.phone = data.phone;
        this.phoneValiDated = data.phoneValiDated;
        this.password = data.password;
        this.devicedId = data.devicedId;
        this.state = data.state;
        this.servers = data.servers;
        this.sdkData = data.sdkData;
        this.channelId = data.channelId;
        this.loginCount = data.loginCount;
        this.createTime = data.createTime;
        this.updateTime = data.updateTime;
    }

    export () {
        const temp: any = {
            id: this.id,
            accountNo: this.accountNo,
            accountName: this.accountName,
            state: this.state,
            servers: this.servers,
            createTime: this.createTime,
            updateTime: this.updateTime,
        };
        return temp;
    }
}
