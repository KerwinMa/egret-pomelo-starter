var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
/**
  * 主界面消息
  * by dily
  * (c) copyright 2014 - 2035
  * All Rights Reserved.
  * 包括 角色UI、主功能、活动等等
  */
var HallNotify = (function () {
    function HallNotify() {
    }
    //打开主界面UI
    HallNotify.OPEN_HALLUI = "HallNotify_OPEN_HALLUI";
    //关闭主界面UI
    HallNotify.CLOSE_HALLUI = "HallNotify_CLOSE_HALLUI";
    // 进入金币商店状态
    HallNotify.ENTER_SHOP_GOLD_STATE = "HallNotify_ENTER_SHOP_GOLD_STATE";
    // 进入钻石商店状态
    HallNotify.ENTER_SHOP_DIAMOND_STATE = "HallNotify_ENTER_SHOP_DIAMOND_STATE";
    // 进入主页面状态
    HallNotify.ENTER_HOME_STATE = "HallNotify_ENTER_HOME_STATE";
    return HallNotify;
}());
__reflect(HallNotify.prototype, "HallNotify");
//# sourceMappingURL=HallNotify.js.map