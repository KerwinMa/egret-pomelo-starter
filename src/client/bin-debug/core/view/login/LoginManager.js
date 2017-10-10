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
/**
  * login 场景管理类
  * by pengju
  * (c) copyright 2014 - 2035
  * All Rights Reserved.
  * 所有的弹窗都需要在register注册事件
  * 在execute添加消息处理面板打开关闭事件
  */
var game;
(function (game) {
    var LoginManager = (function (_super) {
        __extends(LoginManager, _super);
        function LoginManager() {
            return _super.call(this) || this;
        }
        /**
         * 注册消息
         */
        LoginManager.prototype.register = function () {
            this.facade.registerCommand(LoginNotify.OPEN_LOGINUI, LoginManager);
            this.facade.registerCommand(LoginNotify.CLOSE_LOGINUI, LoginManager);
        };
        LoginManager.prototype.execute = function (notification) {
            var data = notification.getBody(); //携带数据
            var panelCon = GameLayerManager.gameLayer().mainLayer;
            var LoginUI = game.LoginManager.LoginUI;
            switch (notification.getName()) {
                case LoginNotify.OPEN_LOGINUI:
                    if (LoginUI == null) {
                        LoginUI = new game.LoginUI();
                        panelCon.addChild(LoginUI);
                        game.LoginManager.LoginUI = LoginUI;
                    }
                    break;
                case LoginNotify.CLOSE_LOGINUI:
                    if (LoginUI != null) {
                        panelCon.removeChild(LoginUI);
                        LoginUI = null;
                        game.LoginManager.LoginUI = null;
                    }
                    break;
            }
        };
        LoginManager.NAME = "LoginManager";
        return LoginManager;
    }(puremvc.SimpleCommand));
    game.LoginManager = LoginManager;
    __reflect(LoginManager.prototype, "game.LoginManager", ["puremvc.ICommand", "puremvc.INotifier"]);
})(game || (game = {}));
//# sourceMappingURL=LoginManager.js.map