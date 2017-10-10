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
    var HallUserInfoPanel = (function (_super) {
        __extends(HallUserInfoPanel, _super);
        function HallUserInfoPanel() {
            var _this = _super.call(this) || this;
            _this.skinName = "resource/ui/panel/hall/HallUserInfo.exml";
            _this.addEventListener(eui.UIEvent.COMPLETE, _this.createCompleteEvent, _this);
            return _this;
        }
        HallUserInfoPanel.prototype.childrenCreated = function () {
            this.close_panel_btn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.closePanel, this);
        };
        HallUserInfoPanel.prototype.createCompleteEvent = function (event) {
            this.removeEventListener(eui.UIEvent.COMPLETE, this.createCompleteEvent, this);
        };
        HallUserInfoPanel.prototype.partAdded = function (partName, instance) {
            _super.prototype.partAdded.call(this, partName, instance);
        };
        // 关闭个人中心
        HallUserInfoPanel.prototype.closePanel = function () {
            game.AppFacade.getInstance().sendNotification(HallPanelNotify.CLOSE_USERINFO);
        };
        return HallUserInfoPanel;
    }(eui.Component));
    game.HallUserInfoPanel = HallUserInfoPanel;
    __reflect(HallUserInfoPanel.prototype, "game.HallUserInfoPanel");
})(game || (game = {}));
//# sourceMappingURL=HallUserInfoPanel.js.map