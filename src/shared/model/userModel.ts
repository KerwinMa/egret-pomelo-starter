/**
 * 模型层 model
 * 模型层不实现业务逻辑、域逻辑，只是对系统数据的高度抽象,更不依赖于运行环境,这样使得前后端可以共享模型层。
 * 对模型层的操作使用代理(proxy) 进行，前端的代理即是http/socket service，后端的代理即是数据库service
 * 
 * by PengJu
 */

export default class UserModel {
    /**
     * 数据库主键id
    */
    id: String;

    /**
     * 用户唯一数字号码
    */
    userNo: Number;

    /**
     * 用户的昵称
    */
    nickName: String;

    /**
     * 用户的头像地址
    */
    avatar: String;

    /**
     * 用户的金币
    */
    gold: Number;

    /**
     * 用户当前的钻石数量
    */
    diamond: Number;

    /**
     * 用户获赠的钻石总量
    */
    givenDiamond: Number;

    /**
     * 用户购买的钻石总量
    */
    buyDiamond: Number;

    /**
     * 用户的当前等级
    */
    lvl: Number;

    /**
     * 用户的当前等级经验
    */
    lvlExpc: Number;

    /**
     * 用户的当前vip
    */
    vip: Number;

    /**
     * 用户的当前vip经验
    */
    vipExpc: Number;

    /**
     * 用户的背包
    */
    bag: Object;

    /**
     * 用户的娱乐场id，相当于服务器
    */
    serverId: String;

    /**
     * 用户的签到数据
    */
    checkInData: Object;

    /**
     * 用户的活动数据
    */
    activityData: Object;

}
