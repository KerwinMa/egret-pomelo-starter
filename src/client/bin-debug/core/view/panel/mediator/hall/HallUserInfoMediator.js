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
    var HallUserInfoMediator = (function (_super) {
        __extends(HallUserInfoMediator, _super);
        function HallUserInfoMediator(viewComponent) {
            if (viewComponent === void 0) { viewComponent = null; }
            var _this = _super.call(this, HallUserInfoMediator.NAME, viewComponent) || this;
            // 角色面板实例化
            _this.hallUserInfoPanel = new game.HallUserInfoPanel();
            return _this;
        }
        HallUserInfoMediator.prototype.listNotificationInterests = function () {
            return [
                HallPanelNotify.OPEN_USERINFO,
                HallPanelNotify.CLOSE_USERINFO
            ];
        };
        HallUserInfoMediator.prototype.handleNotification = function (notification) {
            var data = notification.getBody();
            switch (notification.getName()) {
                case HallPanelNotify.OPEN_USERINFO:
                    //显示角色面板
                    this.showUI(this.hallUserInfoPanel, true, 0, 0, 1);
                    break;
                case HallPanelNotify.CLOSE_USERINFO:
                    this.closePanel(1);
                    break;
            }
        };
        HallUserInfoMediator.prototype.initUI = function () {
        };
        HallUserInfoMediator.prototype.initData = function () {
        };
        HallUserInfoMediator.NAME = "HallUserInfoMediator";
        return HallUserInfoMediator;
    }(BaseMediator));
    game.HallUserInfoMediator = HallUserInfoMediator;
    __reflect(HallUserInfoMediator.prototype, "game.HallUserInfoMediator");
})(game || (game = {}));
//# sourceMappingURL=HallUserInfoMediator.js.map