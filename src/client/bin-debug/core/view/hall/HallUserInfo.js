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
    var HallUserInfo = (function (_super) {
        __extends(HallUserInfo, _super);
        function HallUserInfo() {
            var _this = _super.call(this) || this;
            _this.skinName = "resource/ui/hall/HallUserInfo.exml";
            return _this;
        }
        HallUserInfo.prototype.childrenCreated = function () {
            this.addEventListener(egret.TouchEvent.TOUCH_TAP, this.openUserPanel, this);
        };
        HallUserInfo.prototype.openUserPanel = function () {
            game.AppFacade.getInstance().sendNotification(HallPanelNotify.OPEN_USERINFO);
        };
        return HallUserInfo;
    }(eui.Component));
    game.HallUserInfo = HallUserInfo;
    __reflect(HallUserInfo.prototype, "game.HallUserInfo");
})(game || (game = {}));
//# sourceMappingURL=HallUserInfo.js.map