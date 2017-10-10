var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var game;
(function (game) {
    var LoginUI = (function (_super) {
        __extends(LoginUI, _super);
        function LoginUI() {
            var _this = _super.call(this) || this;
            _this.skinName = "resource/ui/login/LoginUI.exml";
            return _this;
        }
        LoginUI.prototype.childrenCreated = function () {
            this.x = 700;
            this.y = 200;
            this.btn_wechat.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onWechatTap, this);
            this.btn_qq.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onQQtap, this);
        };
        LoginUI.prototype.onWechatTap = function () {
            // game.AppFacade.getInstance().sendNotification(LoginNotify.TAP_WECHAT);
            game.AppFacade.getInstance().sendNotification(LoginNotify.CLOSE_LOGINUI);
            game.AppFacade.getInstance().sendNotification(SceneNotify.CLOSE_LOGIN);
            game.AppFacade.getInstance().sendNotification(SceneNotify.OPEN_HALL);
            game.AppFacade.getInstance().sendNotification(HallNotify.OPEN_HALLUI);
        };
        LoginUI.prototype.onQQtap = function () {
            // game.AppFacade.getInstance().sendNotification(LoginNotify.TAP_QQ);
            game.AppFacade.getInstance().sendNotification(LoginNotify.CLOSE_LOGINUI);
            game.AppFacade.getInstance().sendNotification(SceneNotify.CLOSE_LOGIN);
            game.AppFacade.getInstance().sendNotification(SceneNotify.OPEN_HALL);
            game.AppFacade.getInstance().sendNotification(HallNotify.OPEN_HALLUI);
        };
        LoginUI.prototype.partAdded = function (partName, instance) {
            _super.prototype.partAdded.call(this, partName, instance);
        };
        return LoginUI;
    }(eui.Component));
    game.LoginUI = LoginUI;
    __reflect(LoginUI.prototype, "game.LoginUI");
})(game || (game = {}));
//# sourceMappingURL=LoginUI.js.map