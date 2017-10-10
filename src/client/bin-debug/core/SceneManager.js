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
  * 场景管理类
  * by dily
  * (c) copyright 2014 - 2035
  * All Rights Reserved.
  * 所有的弹窗都需要在register注册事件
  * 在execute添加消息处理面板打开关闭事件
  */
var game;
(function (game) {
    var SceneManager = (function (_super) {
        __extends(SceneManager, _super);
        function SceneManager() {
            return _super.call(this) || this;
        }
        /**
         * 注册消息
         */
        SceneManager.prototype.register = function () {
            this.facade.registerCommand(SceneNotify.OPEN_LOGIN, SceneManager); // 打开login场景
            this.facade.registerCommand(SceneNotify.CLOSE_LOGIN, SceneManager); // 关闭login场景
            this.facade.registerCommand(SceneNotify.OPEN_HALL, SceneManager); // 打开大厅场景
            this.facade.registerCommand(SceneNotify.CLOSE_HALL, SceneManager); // 关闭大厅场景
        };
        SceneManager.prototype.execute = function (notification) {
            var data = notification.getBody(); //携带数据
            var panelCon = GameLayerManager.gameLayer().sceneLayer;
            // 场景实例
            var loginScene = game.SceneManager.loginScene;
            var hallScene = game.SceneManager.hallScene;
            switch (notification.getName()) {
                case SceneNotify.OPEN_LOGIN:
                    if (loginScene == null) {
                        loginScene = new game.Login();
                        panelCon.addChild(loginScene);
                        game.SceneManager.loginScene = loginScene;
                    }
                    break;
                case SceneNotify.CLOSE_LOGIN:
                    if (loginScene != null) {
                        panelCon.removeChild(loginScene);
                        loginScene = null;
                        game.SceneManager.loginScene = null;
                    }
                    break;
                case SceneNotify.OPEN_HALL:
                    if (hallScene == null) {
                        hallScene = new game.Hall();
                        panelCon.addChild(hallScene);
                        game.SceneManager.hallScene = hallScene;
                    }
                    break;
                case SceneNotify.CLOSE_HALL:
                    if (hallScene != null) {
                        panelCon.removeChild(hallScene);
                        hallScene = null;
                        game.SceneManager.hallScene = null;
                    }
                    break;
            }
        };
        SceneManager.NAME = "SceneManager";
        return SceneManager;
    }(puremvc.SimpleCommand));
    game.SceneManager = SceneManager;
    __reflect(SceneManager.prototype, "game.SceneManager", ["puremvc.ICommand", "puremvc.INotifier"]);
})(game || (game = {}));
//# sourceMappingURL=SceneManager.js.map