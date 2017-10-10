var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
/**
  * login界面消息
  * by pengju
  * (c) copyright 2014 - 2035
  * All Rights Reserved.
  * 包括 角色UI、主功能、活动等等
  */
var LoginNotify = (function () {
    function LoginNotify() {
    }
    // 打开loginUI界面
    LoginNotify.OPEN_LOGINUI = "LoginNotify_OPEN_LOGINUI";
    // 关闭login界面
    LoginNotify.CLOSE_LOGINUI = "LoginNotify_CLOSE_LOGINUI";
    // 点击微信登录
    LoginNotify.TAP_WECHAT = "LoginNotify_TAP_WECHAT";
    // 点击qq登录
    LoginNotify.TAP_QQ = "LoginNotify_TAP_QQ";
    return LoginNotify;
}());
__reflect(LoginNotify.prototype, "LoginNotify");
//# sourceMappingURL=LoginNotify.js.map